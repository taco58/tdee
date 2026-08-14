"use server"

import { createClient } from "@/lib/supabase/server"

export async function getLogsData() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const { data: logs, error } = await supabase
    .from("logs")
    .select("date, weight, calories, unit")
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

function groupIntoWeeks(logs: any[]) {
  const weeks = []
  
  for (let i = 0; i < logs.length; i += 7) {
    weeks.push(logs.slice(i, i + 7))
  }

  return weeks
}

function gapFill(week: any[], fallbackWeight: number, fallbackCalories: number) {
  const result: any[] = []

  for (let i = 0; i < 7; i++) {
    const day = week[i]

    const parsedWeight = day && day.weight != null ? parseFloat(day.weight) : NaN
    const parsedCalories = day && day.calories != null ? parseInt(day.calories, 10) : NaN

    const hasValidWeight = !isNaN(parsedWeight)
    const hasValidCalories = !isNaN(parsedCalories)

    if (hasValidWeight && hasValidCalories) {
      result.push({
        ...day,
        weight: parsedWeight,
        calories: parsedCalories,
        logged: true,
      })
    } else {
      const prev = result[i - 1]
      const weight = hasValidWeight
        ? parsedWeight
        : prev ? prev.weight : fallbackWeight
      const calories = hasValidCalories
        ? parsedCalories
        : prev ? prev.calories : fallbackCalories

      result.push({
        ...(day || {}),
        weight,
        calories,
        logged: false,
      })
    }
  }
  return result
}

function convertUnits(weight: number, logUnit: string, profileUnit: string) {
  const normLog = logUnit === "kg" || logUnit === "kgs" ? "kg" : "lbs"
  const normProfile = profileUnit === "kg" || profileUnit === "kgs" ? "kg" : "lbs"
  if (normLog === normProfile) return weight
  if (normLog === "lbs" && normProfile === "kg") return weight * 0.453592
  if (normLog === "kg" && normProfile === "lbs") return weight / 0.453592
  return weight
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number)
  if (!y || !m || !d) return dateStr
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function calculateMifflinStJeor(profile: any, currentWeight?: number): number {
  if (!profile) return 2050
  const weight = currentWeight != null && currentWeight > 0
    ? currentWeight
    : (profile.init_weight || profile.start_weight || profile.weight || 150)
  const isKg = profile.units === "kg" || profile.units === "kgs"
  const weightKg = (profile.units === "lbs" || !profile.units) ? weight * 0.453592 : weight
  const heightCm = profile.height_cm || 175
  const age = profile.age || 25
  const rawActivity = parseFloat(profile.activity)
  const activity = (!isNaN(rawActivity) && rawActivity > 0) ? rawActivity : 1.2
  const genderBonus = profile.sex === "female" ? -161 : 5

  return Math.round(activity * (10 * weightKg + 6.25 * heightCm - 5 * age + genderBonus))
}

export async function mifflinStJeor(profile: any, currentWeight?: number): Promise<number> {
  return calculateMifflinStJeor(profile, currentWeight)
}

export async function calculateAdaptiveTDEE(logs: any[] = [], profile: any = {}) {
  const formulaTDEE = calculateMifflinStJeor(profile)
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

  const cleanedLogs = logs
    .map((l) => ({
      date: l.date,
      weight: l.weight != null && !isNaN(parseFloat(l.weight)) ? convertUnits(parseFloat(l.weight), l.unit, profile.units) : null,
      calories: l.calories != null && !isNaN(parseInt(l.calories, 10)) ? parseInt(l.calories, 10) : null,
    }))
    .filter((l) => l.date)
    .sort((a, b) => (a.date > b.date ? 1 : -1))

  const [startY, startM, startD] = cleanedLogs[0].date.split("-").map(Number)
  const [endY, endM, endD] = cleanedLogs[cleanedLogs.length - 1].date.split("-").map(Number)

  const startDate = new Date(Date.UTC(startY, startM - 1, startD))
  const endDate = new Date(Date.UTC(endY, endM - 1, endD))
  
  const logMap = new Map<string, { weight: number | null; calories: number | null }>()
  cleanedLogs.forEach((l) => logMap.set(l.date, { weight: l.weight, calories: l.calories }))

  const dailySeries: Array<{ date: string; weight: number | null; calories: number | null }> = []
  let curr = new Date(startDate)
  
  while (curr <= endDate) {
    const dStr = curr.toISOString().split("T")[0]
    const entry = logMap.get(dStr) || { weight: null, calories: null }
    dailySeries.push({ date: dStr, weight: entry.weight, calories: entry.calories })
    curr.setUTCDate(curr.getUTCDate() + 1)
  }

  let wtTrend: number | null = null
  let calTrend: number | null = null
  let tdeeTrend: number = formulaTDEE

  const dailyState: Array<{
    date: string
    rawWeight: number | null
    weightTrend: number | null
    rawCalories: number | null
    calorieTrend: number | null
    tdeeTrend: number
  }> = []

  for (let i = 0; i < dailySeries.length; i++) {
    const day = dailySeries[i]

    if (day.weight !== null) {
      wtTrend = wtTrend === null ? day.weight : 0.06 * day.weight + 0.94 * wtTrend
    }

    if (day.calories !== null) {
      calTrend = calTrend === null ? day.calories : 0.14 * day.calories + 0.86 * calTrend
    }

    if (i > 0 && wtTrend !== null && calTrend !== null) {
      const prevWt = dailyState[i - 1].weightTrend ?? wtTrend
      const rawDelta = wtTrend - prevWt
      
      const maxDailyDelta = isKg ? 0.03 : 0.07
      const clampedDelta = Math.max(-maxDailyDelta, Math.min(maxDailyDelta, rawDelta))

      const rawTDEE = calTrend - clampedDelta * unitEnergy
      tdeeTrend = 0.04 * rawTDEE + 0.96 * tdeeTrend
    }

    dailyState.push({
      date: day.date,
      rawWeight: day.weight,
      weightTrend: wtTrend,
      rawCalories: day.calories,
      calorieTrend: calTrend,
      tdeeTrend,
    })
  }

  const latestState = dailyState[dailyState.length - 1]
  const currentAdaptedTDEE = latestState.tdeeTrend

  const validLoggedCount = cleanedLogs.filter((d) => d.weight !== null && d.calories !== null).length
  const dataWeight = Math.min(0.95, validLoggedCount / 42)
  const finalTDEE = Math.round((formulaTDEE * (1 - dataWeight) + currentAdaptedTDEE * dataWeight) / 5) * 5

  const tdeeHistory: Array<{ week: string; date: string; tdee: number; formula: number }> = []
  for (let idx = 6; idx < dailyState.length; idx += 7) {
    const s = dailyState[idx]
    const dtFormatted = formatDisplayDate(s.date)
    const formulaAtWeek = calculateMifflinStJeor(profile, s.weightTrend ?? startWeight)
    tdeeHistory.push({
      week: `Wk ${tdeeHistory.length + 1}`,
      date: dtFormatted,
      tdee: Math.round(s.tdeeTrend / 5) * 5,
      formula: formulaAtWeek,
    })
  }
  if (dailyState.length > 0) {
    const s = dailyState[dailyState.length - 1]
    const dtFormatted = formatDisplayDate(s.date)
    const lastHist = tdeeHistory[tdeeHistory.length - 1]
    const formulaAtWeek = calculateMifflinStJeor(profile, s.weightTrend ?? startWeight)
    if (!lastHist || lastHist.date !== dtFormatted) {
      tdeeHistory.push({
        week: `Wk ${tdeeHistory.length + 1}`,
        date: dtFormatted,
        tdee: Math.round(s.tdeeTrend / 5) * 5,
        formula: formulaAtWeek,
      })
    }
  }

  const weightChartData = dailyState
    .filter((s) => s.rawWeight !== null || s.weightTrend !== null)
    .map((s, idx) => ({
      date: formatDisplayDate(s.date),
      weight: s.rawWeight || (s.weightTrend ? parseFloat(s.weightTrend.toFixed(1)) : null),
      rollingAvg: s.weightTrend ? parseFloat(s.weightTrend.toFixed(1)) : (startWeight || 150),
      dayNum: idx + 1,
    }))

  const state7DaysAgo = dailyState[Math.max(0, dailyState.length - 8)]
  const rawWeeklyDelta = (latestState.weightTrend && state7DaysAgo?.weightTrend)
    ? latestState.weightTrend - state7DaysAgo.weightTrend
    : 0

  const latestAvgWeight = latestState.weightTrend ?? (startWeight || 150)
  const latestAvgCal = latestState.calorieTrend ?? 2000

  return {
    tdee: finalTDEE,
    avgWeight: parseFloat(latestAvgWeight.toFixed(1)),
    currentWeight: parseFloat(latestAvgWeight.toFixed(1)),
    weeklyDelta: parseFloat(rawWeeklyDelta.toFixed(1)),
    avgCalories: Math.round(latestAvgCal),
    daysLogged: validLoggedCount,
    confidence: Math.min(100, Math.round((validLoggedCount / 42) * 100)),
    weeksOfData: Math.floor(validLoggedCount / 7),
    formulaEstimate: formulaTDEE,
    units: userUnits,
    tdeeHistory,
    weightChartData,
  }
}