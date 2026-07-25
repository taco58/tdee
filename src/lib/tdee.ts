"use server"

import { createClient } from "@/lib/supabase/server"

export async function getLogsData() {
  const supabase = await createClient()

  const eightWeeksAgo = new Date()
  eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56)
  const dateString = eightWeeksAgo.toISOString().split("T")[0]

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const { data: logs, error } = await supabase
    .from("logs")
    .select("date, weight, calories")
    .gte("date", dateString)
    .order("date", { ascending: true })

  if (error) {
    console.error("DB Error:", error.message)
    throw new Error(error.message)
  }

  return logs
}

export async function getProfileData() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single()

  if (error) {
    console.error("DB Error:", error.message)
    throw new Error(error.message)
  }

  return profile
}

function groupIntoWeeks(logs) {
  const weeks = []
  
  for (let i = 0; i < logs.length; i += 7) {
    weeks.push(logs.slice(i, i + 7))
  }

  return weeks
}

function gapFill(week, baseCal, baseWeight) {
    const result = []

    for (let i = 0; i < 7; i++) {
        const day = week[i]
        
        if (day) {
            result.push({ ...day, logged: true })
        } else {
            const prev = result[i-1]
            result.push({
                weight: prev ? prev.weight : baseWeight,
                calories: prev ? prev.calories : baseCal,
                logged: false
            })
        }
    }
    return result
}

export async function mifflinStJeor(profile: any): Promise<number> {
  if (!profile) return 2050
  const startWeight = profile.init_weight || profile.start_weight || profile.weight || 150
  const weightKg = (profile.units === "lbs" || !profile.units) ? startWeight * 0.453592 : startWeight
  const heightCm = profile.height_cm || 175
  const age = profile.age || 25
  const activity = parseFloat(profile.activity) || 1.375
  const genderBonus = profile.sex === "female" ? -161 : 5

  return Math.round(activity * (10 * weightKg + 6.25 * heightCm - 5 * age + genderBonus))
}

export async function calculateAdaptiveTDEE(logs: any[] = [], profile: any = {}) {
  const formulaTDEE = await mifflinStJeor(profile)
  const startWeight = profile?.init_weight

  const isKg = profile?.units === "kg" || profile?.units === "kgs"
  const unitEnergy = isKg ? 7700 : 3500
  const userUnits = isKg ? "kg" : "lbs"

  if (!logs || logs.length === 0) {
    return {
      tdee: formulaTDEE,
      avgWeight: null,
      currentWeight: profile?.init_weight,
      weeklyDelta: 0,
      avgCalories: null,
      daysLogged: 0,
      confidence: 0,
      weeksOfData: 0,
      formulaEstimate: formulaTDEE,
      units: userUnits,
      tdeeHistory: [],
      weightChartData: [],
    }
  }

  const weeks = groupIntoWeeks(logs)
  const averages: any[] = []

  for (let i = 0; i < weeks.length; i++) {
    const fallbackWeight = averages[i - 1]?.avgWeight ?? startWeight
    const fallbackCalories = averages[i - 1]?.avgCalories ?? formulaTDEE

    const filled = gapFill(weeks[i], fallbackWeight, fallbackCalories)

    averages.push({
      avgWeight: filled.reduce((s, d) => s + d.weight, 0) / 7,
      avgCalories: filled.reduce((s, d) => s + d.calories, 0) / 7,
      daysLogged: weeks[i].filter((d) => d.logged).length,
    })
  }

  const weeklyTDEEs = averages.map((week, i) => {
    const prevWeight = i === 0 ? startWeight : averages[i - 1].avgWeight
    const delta = week.avgWeight - prevWeight
    return week.avgCalories - (delta * unitEnergy) / 7
  })

  const recentTDEEs = weeklyTDEEs.slice(-6)
  const adaptedTDEE = recentTDEEs.length > 0
    ? recentTDEEs.reduce((s, t) => s + t, 0) / recentTDEEs.length
    : formulaTDEE

  const dataWeight = Math.min(0.9, logs.length / 60)
  const blendedTDEE = formulaTDEE * (1 - dataWeight) + adaptedTDEE * dataWeight

  const tdeeHistory = recentTDEEs.map((tdee, i) => {
    const weekIdx = weeklyTDEEs.length - recentTDEEs.length + i
    const weekLogs = weeks[weekIdx] || []
    const lastDate = weekLogs[weekLogs.length - 1]?.date
    const dateFormatted = lastDate
      ? new Date(lastDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : `Wk ${weekIdx + 1}`

    return {
      week: `Wk ${weekIdx + 1}`,
      date: dateFormatted,
      tdee: Math.round(tdee / 5) * 5,
    }
  })

  // Format 7-day rolling weight chart data for WeightTrendChart
  const weightChartData = logs.map((log, idx) => {
    const window = logs.slice(Math.max(0, idx - 6), idx + 1)
    const validWeights = window.map((d) => d.weight).filter(Boolean)
    const rollingAvg = validWeights.length > 0
      ? parseFloat((validWeights.reduce((a, b) => a + b, 0) / validWeights.length).toFixed(1))
      : log.weight || startWeight

    const dateFormatted = log.date
      ? new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : `Day ${idx + 1}`

    return {
      date: dateFormatted,
      weight: log.weight || rollingAvg,
      rollingAvg: rollingAvg,
      dayNum: idx + 1,
    }
  })

  const latestAvgWeight = averages.at(-1)?.avgWeight ?? startWeight
  const prevAvgWeight = averages.at(-2)?.avgWeight ?? startWeight
  const rawDelta = averages.length >= 2 ? latestAvgWeight - prevAvgWeight : 0
  const weeklyDelta = parseFloat(rawDelta.toFixed(1))

  return {
    tdee: Math.round(blendedTDEE / 5) * 5,
    avgWeight: parseFloat(latestAvgWeight.toFixed(1)),
    currentWeight: parseFloat(latestAvgWeight.toFixed(1)),
    weeklyDelta,
    avgCalories: Math.round(averages.at(-1)?.avgCalories ?? 2000),
    daysLogged: logs.length,
    confidence: Math.min(100, Math.round((logs.length / 42) * 100)),
    weeksOfData: averages.length,
    formulaEstimate: formulaTDEE,
    units: userUnits,
    tdeeHistory,
    weightChartData,
  }
}