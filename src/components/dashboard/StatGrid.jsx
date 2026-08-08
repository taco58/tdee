"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function StatGrid({ stats }) {
  const [selectedGoal, setSelectedGoal] = useState("maintain")
  const [selectedRate, setSelectedRate] = useState(1.0)
  const [rateInput, setRateInput] = useState("1.0")
  const [savedSuccess, setSavedSuccess] = useState(false)

  const isKg = stats.unit === "kg" || stats.unit === "kgs"
  const unitLabel = isKg ? "kg/wk" : "lbs/wk"

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGoal = localStorage.getItem("adaptdee_user_goal")
      const savedRate = localStorage.getItem("adaptdee_user_goal_rate")
      const timer = setTimeout(() => {
        if (savedGoal) {
          setSelectedGoal(savedGoal)
        }
        if (savedRate) {
          const r = parseFloat(savedRate)
          if (!isNaN(r)) {
            setSelectedRate(r)
            setRateInput(r.toString())
          }
        } else {
          const defaultRate = isKg ? 0.5 : 1.0
          setSelectedRate(defaultRate)
          setRateInput(defaultRate.toString())
        }
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isKg])

  const handleGoalChange = (goalKey, rateVal) => {
    setSelectedGoal(goalKey)
    const newRate = rateVal !== undefined ? rateVal : (isKg ? 0.5 : 1.0)
    setSelectedRate(newRate)
    setRateInput(newRate.toString())
    if (typeof window !== "undefined") {
      localStorage.setItem("adaptdee_user_goal", goalKey)
      localStorage.setItem("adaptdee_user_goal_rate", newRate.toString())
    }
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleRateChange = (rateVal) => {
    setSelectedRate(rateVal)
    if (typeof window !== "undefined") {
      localStorage.setItem("adaptdee_user_goal_rate", rateVal.toString())
    }
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const baseTdee = stats.tdee || 2000
  const kcalPerUnit = isKg ? 7700 : 3500
  const activeRateNum = isNaN(selectedRate) ? 0 : selectedRate
  const dailyCalorieDelta = Math.round((activeRateNum * kcalPerUnit) / 7)

  let targetCalories = baseTdee
  if (selectedGoal === "lose") targetCalories = baseTdee - dailyCalorieDelta
  if (selectedGoal === "gain") targetCalories = baseTdee + dailyCalorieDelta

  const loseRates = isKg ? [0.25, 0.5, 0.75, 1.0] : [0.5, 1.0, 1.5, 2.0]
  const gainRates = isKg ? [0.15, 0.25, 0.5] : [0.25, 0.5, 1.0]
  const activeRates = selectedGoal === "lose" ? loseRates : selectedGoal === "gain" ? gainRates : []

  const cards = [
    {
      title: "AVG WEIGHT",
      value: stats.avgWeight != null ? `${stats.avgWeight}` : "N/A",
      unit: stats.avgWeight != null ? stats.unit : "",
      subtext: "7-day rolling average",
    },
    {
      title: "WEEKLY CHANGE",
      value: stats.daysLogged > 0 ? `${stats.weeklyDelta > 0 ? `+${stats.weeklyDelta}` : stats.weeklyDelta}` : "0.0",
      unit: stats.unit,
      subtext: "vs last week",
      badge: stats.daysLogged > 0 ? (stats.weeklyDelta < 0 ? "Loss" : stats.weeklyDelta > 0 ? "Gain" : null) : null,
    },
    {
      title: "AVG CALORIES",
      value: stats.avgCalories != null ? `${stats.avgCalories.toLocaleString()}` : "N/A",
      unit: stats.avgCalories != null ? "kcal" : "",
      subtext: "7-day rolling average",
    },
    {
      title: "DATA POINTS",
      value: `${stats.daysLogged}`,
      unit: "days",
      subtext: "Keep logging daily",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-2 gap-2.5"
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:border-white/10 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">
              {card.title}
            </span>
            {card.badge ? (
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                {card.badge}
              </span>
            ) : null}
          </div>

          <div className="my-0.5">
            <span className="text-xl font-bold font-mono tracking-tight tabular-nums text-white">
              {card.value}
            </span>
            <span className="text-[10px] font-medium text-zinc-400 ml-1">
              {card.unit}
            </span>
          </div>

          <p className="text-[10px] text-white/50 mt-0.5">{card.subtext}</p>
        </div>
      ))}

      <div className="col-span-2 bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:border-white/10 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">
              TARGET NUTRITION GOAL
            </span>
            {savedSuccess && (
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                ✓ Saved
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-sm font-mono text-[#F97316] font-bold tabular-nums block">
              {targetCalories.toLocaleString()} <span className="text-[10px] text-zinc-400 font-normal">kcal/day</span>
            </span>
          </div>
        </div>

        {/* Goal Mode Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            type="button"
            onClick={() => handleGoalChange("lose", isKg ? 0.5 : 1.0)}
            className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center select-none ${
              selectedGoal === "lose"
                ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316] shadow-sm"
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            <div className="font-bold">Weight Loss</div>
          </button>

          <button
            type="button"
            onClick={() => handleGoalChange("maintain", 0)}
            className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center select-none ${
              selectedGoal === "maintain"
                ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316] shadow-sm"
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            <div className="font-bold">Maintain</div>
          </button>

          <button
            type="button"
            onClick={() => handleGoalChange("gain", isKg ? 0.25 : 0.5)}
            className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center select-none ${
              selectedGoal === "gain"
                ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316] shadow-sm"
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            <div className="font-bold">Weight Gain</div>
          </button>
        </div>

        {/* Weekly Weight Change Rate Selector with Preset Buttons & Custom Input */}
        {selectedGoal !== "maintain" && (
          <div className="bg-white/5 border border-white/5 rounded-xl p-3 mb-2 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Target Rate ({unitLabel})
              </span>
              <span className="text-[11px] font-mono text-white font-semibold tabular-nums">
                {selectedGoal === "lose" ? "-" : "+"}{activeRateNum} {unitLabel} ({selectedGoal === "lose" ? "-" : "+"}{dailyCalorieDelta} kcal/day)
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Presets */}
              <div className="grid grid-cols-4 gap-1.5 flex-1 w-full">
                {activeRates.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setRateInput(rate.toString())
                      handleRateChange(rate)
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer text-center select-none ${
                      selectedRate === rate
                        ? "bg-[#F97316] text-white shadow-sm"
                        : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {rate}
                  </button>
                ))}
              </div>

              {/* Custom Number Input */}
              <div className="relative flex items-center min-w-[110px] w-full sm:w-auto">
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="5.0"
                  placeholder="Custom"
                  value={rateInput}
                  onChange={(e) => {
                    const valStr = e.target.value
                    setRateInput(valStr)
                    const parsed = parseFloat(valStr)
                    if (!isNaN(parsed) && parsed > 0) {
                      handleRateChange(parsed)
                    }
                  }}
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:border-[#F97316] focus:outline-none text-right pr-11 tabular-nums"
                />
                <span className="absolute right-2 text-[10px] text-zinc-400 font-mono pointer-events-none uppercase">
                  {stats.unit || "lbs"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Explanation Text */}
        <p className="text-[10px] text-zinc-400 font-light">
          {selectedGoal === "lose" && `Deficit of ${dailyCalorieDelta.toLocaleString()} kcal/day targeted for -${activeRateNum} ${unitLabel}. Auto-adjusts as your adapted TDEE updates.`}
          {selectedGoal === "maintain" && `Exact maintenance target matching your adapted TDEE (${baseTdee.toLocaleString()} kcal/day). Auto-adjusts as your adapted TDEE updates.`}
          {selectedGoal === "gain" && `Surplus of ${dailyCalorieDelta.toLocaleString()} kcal/day targeted for +${activeRateNum} ${unitLabel}. Auto-adjusts as your adapted TDEE updates.`}
        </p>
      </div>
    </motion.div>
  )
}
