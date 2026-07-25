"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import HeroStat from "@/components/dashboard/HeroStat"
import StatGrid from "@/components/dashboard/StatGrid"
import WeightTrendChart from "@/components/dashboard/WeightTrendChart"
import TdeeTrendChart from "@/components/dashboard/TdeeTrendChart"
import LogHistoryCalendar from "@/components/dashboard/LogHistoryCalendar"
import LogTodaySection from "@/components/dashboard/LogTodaySection"
import { createLogEntry } from "@/lib/profile-actions"

const generateCalendarFromLogs = (logs = []) => {
  const days = []
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const todayDate = today.getDate()

  const logMap = new Map()
  logs.forEach((l) => {
    if (l.date) {
      logMap.set(l.date, l)
    }
  })

  logs.forEach((l) => {
    if (!l.date) return
    const isLogged = l.weight !== null || l.calories !== null
    const parts = l.date.split("-").map(Number)
    const d = parts[2]
    days.push({
      dayNumber: d,
      dateStr: l.date,
      isLogged,
      isToday: l.date === today.toISOString().split("T")[0],
      isFuture: false,
      weight: l.weight != null ? l.weight.toString() : null,
      calories: l.calories != null ? l.calories.toString() : null,
    })
  })

  for (let i = 1; i <= daysInMonth; i++) {
    const monthStr = (currentMonth + 1).toString().padStart(2, "0")
    const dayStr = i.toString().padStart(2, "0")
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`
    if (!logMap.has(dateStr)) {
      const isToday = i === todayDate
      const isFuture = new Date(currentYear, currentMonth, i) > today

      days.push({
        dayNumber: i,
        dateStr: dateStr,
        isLogged: false,
        isToday,
        isFuture,
        weight: null,
        calories: null,
      })
    }
  }
  return days
}

export default function DashboardClient({
  initialLogs = [],
  initialProfile = null,
  initialAdaptiveStats = {},
}) {
  const router = useRouter()
  const weightUnit = initialProfile?.units || initialAdaptiveStats?.units || "lbs"

  const [stats, setStats] = useState({
    tdee: initialAdaptiveStats.tdee || (initialAdaptiveStats.formulaEstimate || 2050),
    avgWeight: initialAdaptiveStats.avgWeight ?? null,
    weeklyDelta: initialAdaptiveStats.weeklyDelta ?? 0,
    avgCalories: initialAdaptiveStats.avgCalories ?? null,
    daysLogged: initialAdaptiveStats.daysLogged || initialLogs.length,
    confidence: initialAdaptiveStats.confidence || 0,
    weeksOfData: initialAdaptiveStats.weeksOfData || 0,
    formulaEstimate: initialAdaptiveStats.formulaEstimate || 2050,
    unit: weightUnit,
  })

  const weightData = initialAdaptiveStats.weightChartData || []

  const tdeeData = initialAdaptiveStats.tdeeHistory || []

  const [calendarDays, setCalendarDays] = useState(generateCalendarFromLogs(initialLogs))

  const todayStr = new Date().toISOString().split("T")[0]
  const todayLoggedOnServer = initialLogs.some((l) => l.date === todayStr && (l.weight !== null || l.calories !== null))
  const [isLoggedToday, setIsLoggedToday] = useState(todayLoggedOnServer)

  const [logPanelOpen, setLogPanelOpen] = useState(false)
  const [inputWeight, setInputWeight] = useState(`${stats.avgWeight ?? ""}`)
  const [inputCalories, setInputCalories] = useState(`${stats.avgCalories ?? ""}`)

  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null)
  const [editDayWeight, setEditDayWeight] = useState("")
  const [editDayCalories, setEditDayCalories] = useState("")

  const handleSaveTodayLog = async (e) => {
    e.preventDefault()
    setIsLoggedToday(true)
    setLogPanelOpen(false)

    if (inputWeight && inputCalories) {
      const dateStr = new Date().toISOString().split("T")[0]
      try {
        await createLogEntry({
          date: dateStr,
          weight: inputWeight,
          calories: inputCalories,
        })
        router.refresh()
      } catch (err) {
        console.log("Saving log entry note:", err)
      }

      setStats((prev) => ({
        ...prev,
        avgWeight: parseFloat(inputWeight),
        avgCalories: parseInt(inputCalories, 10),
      }))

      setCalendarDays((prev) => {
        const next = [...prev]
        const idx = next.findIndex((d) => d.dateStr === dateStr)
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            isLogged: true,
            weight: inputWeight,
            calories: inputCalories,
          }
        } else {
          const parts = dateStr.split("-").map(Number)
          next.push({
            dayNumber: parts[2],
            dateStr,
            isLogged: true,
            isToday: true,
            isFuture: false,
            weight: inputWeight,
            calories: inputCalories,
          })
        }
        return next
      })
    }
  }

  const handleSelectDay = (day) => {
    if (day.isFuture) return
    setSelectedCalendarDay(day)
    setEditDayWeight(day.weight != null ? `${day.weight}` : "")
    setEditDayCalories(day.calories != null ? `${day.calories}` : "")
  }

  const handleSaveCalendarEntry = async () => {
    if (!selectedCalendarDay || !selectedCalendarDay.dateStr) return

    const dateStr = selectedCalendarDay.dateStr
    try {
      await createLogEntry({
        date: dateStr,
        weight: editDayWeight,
        calories: editDayCalories,
      })
      router.refresh()
    } catch (err) {
      console.log("Calendar entry save note:", err)
    }

    setCalendarDays((prev) => {
      const next = [...prev]
      const idx = next.findIndex((d) => d.dateStr === dateStr)
      if (idx >= 0) {
        next[idx] = {
          ...next[idx],
          isLogged: true,
          weight: editDayWeight,
          calories: editDayCalories,
        }
      } else {
        const parts = dateStr.split("-").map(Number)
        next.push({
          dayNumber: parts[2],
          dateStr,
          isLogged: true,
          isToday: dateStr === todayStr,
          isFuture: false,
          weight: editDayWeight,
          calories: editDayCalories,
        })
      }
      return next
    })

    setSelectedCalendarDay(null)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-[#F97316]/30 selection:text-white font-sans pb-24 md:pb-12">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <DashboardHeader profile={initialProfile} />

      <main className="relative z-10 max-w-[480px] mx-auto px-4 pt-6 md:max-w-[1200px] md:px-8 md:pt-8">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_380px] md:gap-6 md:items-start">
          
          <div id="trend-charts" className="space-y-6 order-2 md:order-1 md:pb-12">
            <WeightTrendChart weightData={weightData} weightUnit={weightUnit} />

            <TdeeTrendChart
              tdeeData={tdeeData}
              formulaEstimate={stats.formulaEstimate}
              weeksOfData={stats.weeksOfData}
            />

            <LogHistoryCalendar
              calendarDays={calendarDays}
              selectedCalendarDay={selectedCalendarDay}
              onSelectDay={handleSelectDay}
              editDayWeight={editDayWeight}
              setEditDayWeight={setEditDayWeight}
              editDayCalories={editDayCalories}
              setEditDayCalories={setEditDayCalories}
              onSaveEntry={handleSaveCalendarEntry}
              onCancelEntry={() => setSelectedCalendarDay(null)}
              weightUnit={weightUnit}
            />
          </div>

          <div className="space-y-6 order-1 md:order-2 md:sticky md:top-24 md:h-fit mb-6 md:mb-0">
            <HeroStat stats={stats} />

            <StatGrid stats={stats} />

            <LogTodaySection
              isLoggedToday={isLoggedToday}
              setIsLoggedToday={setIsLoggedToday}
              logPanelOpen={logPanelOpen}
              setLogPanelOpen={setLogPanelOpen}
              inputWeight={inputWeight}
              setInputWeight={setInputWeight}
              inputCalories={inputCalories}
              setInputCalories={setInputCalories}
              onSaveTodayLog={handleSaveTodayLog}
              weightUnit={weightUnit}
            />
          </div>

        </div>
      </main>
    </div>
  )
}

