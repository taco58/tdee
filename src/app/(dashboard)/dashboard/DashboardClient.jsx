"use client"

import React, { useState } from "react"

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import HeroStat from "@/components/dashboard/HeroStat"
import StatGrid from "@/components/dashboard/StatGrid"
import WeightTrendChart from "@/components/dashboard/WeightTrendChart"
import TdeeTrendChart from "@/components/dashboard/TdeeTrendChart"
import LogHistoryCalendar from "@/components/dashboard/LogHistoryCalendar"
import LogTodaySection from "@/components/dashboard/LogTodaySection"
import { createLogEntry } from "@/lib/profile-actions"

// Generate calendar day cells dynamically strictly based on server log entries
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

  for (let i = 1; i <= daysInMonth; i++) {
    const monthStr = (currentMonth + 1).toString().padStart(2, "0")
    const dayStr = i.toString().padStart(2, "0")
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`
    const dbEntry = logMap.get(dateStr)

    const isLogged = !!dbEntry && (dbEntry.weight !== null || dbEntry.calories !== null)
    const isToday = i === todayDate
    const isFuture = new Date(currentYear, currentMonth, i) > today

    days.push({
      dayNumber: i,
      dateStr: dateStr,
      isLogged,
      isToday,
      isFuture,
      weight: dbEntry?.weight ? dbEntry.weight.toString() : null,
      calories: dbEntry?.calories ? dbEntry.calories.toString() : null,
    })
  }
  return days
}

export default function DashboardClient({
  initialLogs = [],
  initialProfile = null,
  initialAdaptiveStats = {},
}) {
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

  // Check if server logs contain an entry for today
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
      try {
        await createLogEntry({
          date: new Date().toISOString().split("T")[0],
          weight: inputWeight,
          calories: inputCalories,
        })
      } catch (err) {
        console.log("Saving log entry note:", err)
      }

      setStats((prev) => ({
        ...prev,
        avgWeight: parseFloat(inputWeight),
        avgCalories: parseInt(inputCalories, 10),
      }))
    }
  }

  const handleSelectDay = (day) => {
    if (day.isFuture) return
    setSelectedCalendarDay(day)
    setEditDayWeight(day.weight || `${stats.avgWeight || ""}`)
    setEditDayCalories(day.calories || `${stats.avgCalories || ""}`)
  }

  const handleSaveCalendarEntry = async () => {
    if (!selectedCalendarDay) return

    if (selectedCalendarDay.dateStr) {
      try {
        await createLogEntry({
          date: selectedCalendarDay.dateStr,
          weight: editDayWeight,
          calories: editDayCalories,
        })
      } catch (err) {
        console.log("Calendar entry save note:", err)
      }
    }

    setCalendarDays((prev) =>
      prev.map((d) =>
        d.dayNumber === selectedCalendarDay.dayNumber
          ? {
              ...d,
              isLogged: true,
              weight: editDayWeight,
              calories: editDayCalories,
            }
          : d
      )
    )
    setSelectedCalendarDay(null)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-[#F97316]/30 selection:text-white font-sans pb-24 md:pb-12">
      {/* Background Subtle Radial Glow & Grid Texture matching Landing */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Sticky Dashboard Header */}
      <DashboardHeader profile={initialProfile} />

      {/* Main Content Layout */}
      <main className="relative z-10 max-w-[480px] mx-auto px-4 pt-6 md:max-w-[1200px] md:px-8 md:pt-8">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_380px] md:gap-6 md:items-start">
          
          <div id="trend-charts" className="space-y-6 order-2 md:order-1 md:pb-12">
            {/* Weight Trend Chart */}
            <WeightTrendChart weightData={weightData} weightUnit={weightUnit} />

            {/* TDEE Trend Chart */}
            <TdeeTrendChart
              tdeeData={tdeeData}
              formulaEstimate={stats.formulaEstimate}
              weeksOfData={stats.weeksOfData}
            />

            {/* Log History Calendar */}
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
            {/* Hero Adapted TDEE Stat */}
            <HeroStat stats={stats} />

            {/* 2x2 Stat Grid */}
            <StatGrid stats={stats} />

            {/* Log Today Section (Desktop Card / Mobile Pill & Bottom Sheet) */}
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
