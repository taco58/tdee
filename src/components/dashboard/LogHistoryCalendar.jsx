"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react"

// Helper: get number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// Helper: get day of week for the 1st (0=Sun, shift to Mon start)
function getStartDayOfWeek(year, month) {
  const day = new Date(year, month, 1).getDay()
  // Convert from Sunday=0 to Monday=0
  return day === 0 ? 6 : day - 1
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"]

export default function LogHistoryCalendar({
  calendarDays,
  selectedCalendarDay,
  onSelectDay,
  editDayWeight,
  setEditDayWeight,
  editDayCalories,
  setEditDayCalories,
  onSaveEntry,
  onCancelEntry,
  weightUnit = "lbs",
}) {
  // Current displayed month — start at July 2026 (our mock data month)
  const [viewYear, setViewYear] = useState(2026)
  const [viewMonth, setViewMonth] = useState(6) // 0-indexed: 6 = July

  // Today's date for comparison
  const today = useMemo(() => new Date(), [])
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const todayDate = today.getDate()

  // Compute the grid for the currently viewed month
  const { daysInMonth, startOffset } = useMemo(() => {
    return {
      daysInMonth: getDaysInMonth(viewYear, viewMonth),
      startOffset: getStartDayOfWeek(viewYear, viewMonth),
    }
  }, [viewYear, viewMonth])

  // Navigate months
  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
    onCancelEntry()
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
    onCancelEntry()
  }

  // Whether we're viewing the mock data month (July 2026)
  const isDataMonth = viewYear === 2026 && viewMonth === 6

  // Build day objects for the current view
  const viewDays = useMemo(() => {
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      // Only show data for July 2026 (our mock month)
      const matchingDay = isDataMonth
        ? calendarDays.find((d) => d.dayNumber === i)
        : null

      const isToday =
        viewYear === todayYear && viewMonth === todayMonth && i === todayDate
      const isFuture =
        new Date(viewYear, viewMonth, i) > today

      days.push({
        dayNumber: i,
        isLogged: matchingDay?.isLogged || false,
        isToday,
        isFuture,
        weight: matchingDay?.weight || null,
        calories: matchingDay?.calories || null,
      })
    }
    return days
  }, [daysInMonth, isDataMonth, calendarDays, viewYear, viewMonth, todayYear, todayMonth, todayDate, today])

  // Logged count for this month
  const loggedCount = viewDays.filter((d) => d.isLogged).length

  // Can we go forward past the current month?
  const canGoNext = viewYear < todayYear || (viewYear === todayYear && viewMonth < todayMonth) ||
    (viewYear === 2026 && viewMonth <= 6) // Allow viewing up to our data month

  return (
    <motion.div
      id="calendar-section"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl"
    >
      <div>
        {/* Calendar Grid */}
        <div className="flex-1 min-w-0">
          {/* Month Header Row — matches Dribbble reference layout */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {MONTH_NAMES[viewMonth]}
              </h3>
              <span className="text-lg font-light text-zinc-500">
                {viewYear}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={goToPrevMonth}
                className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNextMonth}
                className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Headers — single letter, Monday start */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAY_LABELS.map((day, i) => (
              <div
                key={i}
                className="text-center text-[11px] font-semibold text-zinc-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day Cells Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewYear}-${viewMonth}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-7"
            >
              {/* Empty offset cells for first week alignment */}
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`offset-${i}`} className="aspect-square" />
              ))}

              {viewDays.map((day) => {
                const isSelected =
                  selectedCalendarDay?.dayNumber === day.dayNumber &&
                  isDataMonth

                return (
                  <button
                    key={day.dayNumber}
                    disabled={day.isFuture && !day.isLogged}
                    onClick={() => onSelectDay(day)}
                    className="aspect-square flex items-center justify-center cursor-pointer group p-[2px]"
                  >
                    <span
                      className={`w-full aspect-square max-w-[44px] rounded-full flex items-center justify-center text-[13px] font-medium transition-all ${
                        isSelected
                          ? "bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/30 scale-105"
                          : day.isToday
                          ? "bg-[#2a2b32] text-white font-bold ring-2 ring-orange-500/50"
                          : day.isLogged
                          ? "bg-orange-500/10 text-zinc-300 group-hover:bg-orange-500/20"
                          : day.isFuture
                          ? "text-zinc-700 cursor-default"
                          : "text-zinc-500 group-hover:bg-white/5 group-hover:text-zinc-300"
                      }`}
                    >
                      {day.dayNumber}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Bottom stats row */}
          {loggedCount > 0 && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-orange-500/15 border border-orange-500/30" />
                  Logged
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-[#2a2b32] ring-1 ring-orange-500/50" />
                  Today
                </div>
              </div>
              <span className="text-[10px] font-semibold text-zinc-500 tabular-nums">
                {loggedCount} of {daysInMonth} days
              </span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedCalendarDay && isDataMonth && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {MONTH_NAMES[viewMonth].slice(0, 3)} {selectedCalendarDay.dayNumber}, {viewYear}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    selectedCalendarDay.isLogged
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-white/5 text-zinc-400 border border-white/10"
                  }`}
                >
                  {selectedCalendarDay.isLogged ? "Logged" : "Empty"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                    Weight ({weightUnit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editDayWeight}
                    onChange={(e) => setEditDayWeight(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white font-bold text-sm tabular-nums focus:border-orange-500/60 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={editDayCalories}
                    onChange={(e) => setEditDayCalories(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white font-bold text-sm tabular-nums focus:border-orange-500/60 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSaveEntry}
                  className="flex-1 rounded-lg bg-orange-500 hover:bg-orange-400 text-white py-2 text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Save Entry
                </button>
                <button
                  onClick={onCancelEntry}
                  className="px-3 py-2 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors cursor-pointer rounded-lg hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
