"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import AnnouncementBanner from "@/components/dashboard/AnnouncementBanner"
import HeroStat from "@/components/dashboard/HeroStat"
import StatGrid from "@/components/dashboard/StatGrid"
import WeightTrendChart from "@/components/dashboard/WeightTrendChart"
import TdeeTrendChart from "@/components/dashboard/TdeeTrendChart"
import LogHistoryCalendar from "@/components/dashboard/LogHistoryCalendar"
import LogTodaySection from "@/components/dashboard/LogTodaySection"
import DashboardInfoModal from "@/components/dashboard/DashboardInfoModal"
import CsvImportExportModal from "@/components/dashboard/CsvImportExport"
import { createLogEntry } from "@/lib/profile-actions"

const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function convertUnits(weight, logUnit, profileUnit) {
  if (logUnit === profileUnit) return Math.round(weight * 10) / 10                                                                     
  if (logUnit === "lbs" && profileUnit === "kg") return Math.round(weight * 0.453592 * 10) / 10
  if (logUnit === "kg" && profileUnit === "lbs") return Math.round((weight / 0.453592) * 10) / 10
  return Math.round(weight * 10) / 10
}

const generateCalendarFromLogs = (logs = [], profileUnits) => {
  const days = []
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const todayDate = today.getDate()
  const todayLocalStr = getLocalDateString(today)

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
      isToday: l.date === todayLocalStr,
      isFuture: false,
      weight: l.weight != null ? convertUnits(l.weight, l.unit, profileUnits).toString() : null,
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

  const stats = React.useMemo(
    () => ({
      tdee: initialAdaptiveStats.tdee || (initialAdaptiveStats.formulaEstimate || 2050),
      avgWeight: initialAdaptiveStats.avgWeight ?? null,
      weeklyDelta: initialAdaptiveStats.weeklyDelta ?? 0,
      avgCalories: initialAdaptiveStats.avgCalories ?? null,
      daysLogged: initialAdaptiveStats.daysLogged || initialLogs.length,
      confidence: initialAdaptiveStats.confidence || 0,
      weeksOfData: initialAdaptiveStats.weeksOfData || 0,
      formulaEstimate: initialAdaptiveStats.formulaEstimate || 2050,
      unit: weightUnit,
    }),
    [initialAdaptiveStats, initialLogs, weightUnit]
  )

  const weightData = initialAdaptiveStats.weightChartData || []
  const tdeeData = initialAdaptiveStats.tdeeHistory || []

  const calendarDays = React.useMemo(
    () => generateCalendarFromLogs(initialLogs, weightUnit),
    [initialLogs, weightUnit]
  )

  const todayStr = getLocalDateString()
  const isLoggedToday = React.useMemo(
    () => initialLogs.some((l) => l.date === todayStr && (l.weight !== null || l.calories !== null)),
    [initialLogs, todayStr]
  )

  const [isEditingToday, setIsEditingToday] = useState(false)
  const [logPanelOpen, setLogPanelOpen] = useState(false)
  const [inputWeight, setInputWeight] = useState(
    isLoggedToday ? convertUnits(initialLogs.find((l) => l.date === todayStr)?.weight, initialLogs.find((l) => l.date === todayStr)?.unit, weightUnit) : ""
  )
  const [inputCalories, setInputCalories] = useState(
    isLoggedToday ? initialLogs.find((l) => l.date === todayStr)?.calories : ""
  )
  

  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null)
  const [editDayWeight, setEditDayWeight] = useState("")
  const [editDayCalories, setEditDayCalories] = useState("")

  const handleSaveTodayLog = async (e) => {
    e.preventDefault()
    setIsEditingToday(false)
    setLogPanelOpen(false)

    if (inputWeight && inputCalories) {
      const dateStr = getLocalDateString()
      try {
        const res = await createLogEntry({
          date: dateStr,
          weight: inputWeight,
          calories: inputCalories,
          unit: weightUnit,
        })
        if (res?.success) {
          router.refresh()
        }
      } catch (err) {
        console.log("Saving log entry note:", err)
      }
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
    const hasWeight = editDayWeight !== "" && !isNaN(parseFloat(editDayWeight))
    const hasCalories = editDayCalories !== "" && !isNaN(parseInt(editDayCalories, 10))

    try {
      const res = await createLogEntry({
        date: dateStr,
        weight: hasWeight ? editDayWeight : null,
        calories: hasCalories ? editDayCalories : null,
        unit: weightUnit,
      })
      if (res?.success) {
        router.refresh()
      }
    } catch (err) {
      console.log("Calendar entry save note:", err)
    }

    setSelectedCalendarDay(null)
  }

  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [csvModalOpen, setCsvModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed = localStorage.getItem("adaptdee_dismiss_guide") === "true"
      if (!isDismissed) {
        const timer = setTimeout(() => setInfoModalOpen(true), 0)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-[#F97316]/30 selection:text-white font-sans pb-24 md:pb-12">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <AnnouncementBanner
        id="csv_excel_v1"
        title="New Feature"
        message="You can now import and export CSV files directly from your profile menu!"
        messageSm= "Import and export CSV files from your profile!"
      />

      <DashboardHeader
        profile={initialProfile}
        onOpenInfoModal={() => setInfoModalOpen(true)}
        onOpenCsvModal={() => setCsvModalOpen(true)}
      />

      <main className="relative z-10 max-w-[480px] mx-auto px-4 pt-6 md:max-w-[1200px] md:px-8 md:pt-8">
        <div className="flex flex-col gap-6 md:grid lg:grid-cols-[1fr_380px] lg:gap-6 lg:items-start">
          
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
            
            <LogTodaySection
              key = {`${todayStr}-${weightUnit}`}
              isLoggedToday={isLoggedToday && !isEditingToday}
              setIsLoggedToday={() => setIsEditingToday(true)}
              logPanelOpen={logPanelOpen}
              setLogPanelOpen={setLogPanelOpen}
              inputWeight={inputWeight}
              setInputWeight={setInputWeight}
              inputCalories={inputCalories}
              setInputCalories={setInputCalories}
              onSaveTodayLog={handleSaveTodayLog}
              weightUnit={weightUnit}
            />

            <StatGrid stats={stats} />
          </div>

        </div>
      </main>

      <DashboardInfoModal isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)} />

      <CsvImportExportModal
        isOpen={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
        logs={initialLogs}
        weightUnit={weightUnit}
      />
    </div>
  )
}
