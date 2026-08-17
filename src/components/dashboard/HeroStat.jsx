"use client"

import React, { useState, useEffect, memo } from "react"
import { motion } from "framer-motion"
import { Calendar, Flag, Sparkles } from "lucide-react"

const HeroStat = memo(function HeroStat({ stats, goalInfo, onUpdateGoal }) {
  const isKg = stats?.unit === "kg" || stats?.unit === "kgs"
  const unitLabel = isKg ? "kg/wk" : "lbs/wk"
  const weightUnit = stats?.unit || (isKg ? "kg" : "lbs")

  const selectedGoal = goalInfo?.goalType || "maintain"
  const selectedRate = goalInfo?.goalRate || (isKg ? 0.5 : 1.0)
  const targetCalories = goalInfo?.targetCalories || stats?.tdee || 2000
  const dailyCalorieDelta = goalInfo?.dailyCalorieDelta || 0

  const isMaintain = selectedGoal === "maintain"
  const isLoss = selectedGoal === "lose"
  const isGain = selectedGoal === "gain"

  const [rateInput, setRateInput] = useState(selectedRate.toString())
  const [targetWeightInput, setTargetWeightInput] = useState(
    goalInfo?.targetWeight ? goalInfo.targetWeight.toString() : ""
  )
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    if (goalInfo?.goalRate != null) {
      setRateInput(goalInfo.goalRate.toString())
    }
  }, [goalInfo?.goalRate])

  useEffect(() => {
    setTargetWeightInput(
      goalInfo?.targetWeight != null && goalInfo?.targetWeight !== ""
        ? goalInfo.targetWeight.toString()
        : ""
    )
  }, [goalInfo?.targetWeight])

  const handleGoalChange = (goalKey, rateVal) => {
    const defaultRate = rateVal !== undefined ? rateVal : (isKg ? 0.5 : 1.0)
    setRateInput(defaultRate.toString())
    if (onUpdateGoal) {
      onUpdateGoal(goalKey, defaultRate, "")
    }
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleRateChange = (rateVal) => {
    if (onUpdateGoal) {
      onUpdateGoal(undefined, rateVal, undefined)
    }
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleTargetWeightChange = (valStr) => {
    setTargetWeightInput(valStr)
    const parsed = parseFloat(valStr)
    if (onUpdateGoal) {
      onUpdateGoal(undefined, undefined, !isNaN(parsed) && parsed > 0 ? parsed : "")
    }
  }

  const loseRates = isKg ? [0.25, 0.5, 0.75, 1.0] : [0.5, 1.0, 1.5, 2.0]
  const gainRates = isKg ? [0.15, 0.25, 0.5] : [0.25, 0.5, 1.0]
  const activeRates = isLoss ? loseRates : isGain ? gainRates : []

  const currentWeightNum = stats?.avgWeight || stats?.currentWeight

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden space-y-4"
    >
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Adapted TDEE Metric */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            YOUR ADAPTED TDEE
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            {stats?.confidence || 0}% confidence
          </span>
        </div>

        <div className="flex items-baseline gap-2 my-0.5">
          <span className="text-5xl md:text-[54px] font-display font-black text-white tracking-tight tabular-nums leading-none drop-shadow-sm">
            {(stats?.tdee || 2000).toLocaleString()}
          </span>
          <span className="text-sm font-medium font-mono text-zinc-400">
            kcal / day
          </span>
        </div>

        <p className="text-[11px] text-zinc-400 mt-1 font-sans">
          Based on <span className="text-zinc-200 font-semibold">{stats?.weeksOfData || 0} weeks</span> of metabolic data
        </p>
      </div>

      {/* Target Calorie Budget Spotlight */}
      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              DAILY TARGET BUDGET
            </span>
            {savedSuccess && (
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                ✓ Saved
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-mono font-bold text-[#F97316] tabular-nums">
              {targetCalories.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-400 font-mono">kcal/day</span>
          </div>
        </div>

        <div className="text-right">
          <span
            className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
              isLoss
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : isGain
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "bg-zinc-800 text-zinc-300 border border-white/5"
            }`}
          >
            {isLoss && `Cut (-${dailyCalorieDelta} kcal)`}
            {isGain && `Bulk (+${dailyCalorieDelta} kcal)`}
            {isMaintain && "Maintenance"}
          </span>
          {goalInfo?.projectedGoalDate && (
            <span className="block text-[10px] font-mono text-zinc-400 mt-1">
              Goal ETA: {goalInfo.projectedGoalDate}
            </span>
          )}
        </div>
      </div>

      {/* Goal Planner Mode Tabs */}
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleGoalChange("lose", isKg ? 0.5 : 1.0)}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center select-none ${
              isLoss
                ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316] shadow-sm font-bold"
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            Weight Loss
          </button>

          <button
            type="button"
            onClick={() => handleGoalChange("maintain", 0)}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center select-none ${
              isMaintain
                ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316] shadow-sm font-bold"
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            Maintain
          </button>

          <button
            type="button"
            onClick={() => handleGoalChange("gain", isKg ? 0.25 : 0.5)}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center select-none ${
              isGain
                ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316] shadow-sm font-bold"
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            Weight Gain
          </button>
        </div>

        {/* Rate Selectors & Custom Rate Input */}
        {!isMaintain && (
          <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Target Rate ({unitLabel})
              </span>
              <span className="text-[11px] font-mono text-white font-semibold tabular-nums">
                {isLoss ? "-" : "+"}{selectedRate} {unitLabel} ({isLoss ? "-" : "+"}{dailyCalorieDelta} kcal/day)
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
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

              <div className="relative flex items-center min-w-[100px] w-full sm:w-auto">
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="5.0"
                  value={rateInput}
                  onChange={(e) => {
                    const valStr = e.target.value
                    setRateInput(valStr)
                    const parsed = parseFloat(valStr)
                    if (!isNaN(parsed) && parsed > 0) {
                      handleRateChange(parsed)
                    }
                  }}
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-[#F97316] focus:outline-none text-right pr-11 tabular-nums"
                />
                <span className="absolute right-2 text-[10px] text-zinc-400 font-mono pointer-events-none uppercase">
                  {weightUnit}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Goal Weight & ETA */}
        {!isMaintain && (
          <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flag className="w-3 h-3 text-[#F97316]" /> Target Goal Weight
              </span>
              {currentWeightNum && (
                <span className="text-[10px] font-mono text-zinc-500">
                  Current: {currentWeightNum} {weightUnit}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={targetWeightInput}
                onChange={(e) => handleTargetWeightChange(e.target.value)}
                className="w-full bg-[#111115] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-[#F97316] focus:outline-none pr-12 tabular-nums"
              />
              <span className="absolute right-3 top-2 text-[10px] font-mono text-zinc-400 uppercase pointer-events-none">
                {weightUnit}
              </span>
            </div>

            {goalInfo?.weeksToGoal && goalInfo?.projectedGoalDate && (
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" /> Projected ETA:
                </span>
                <span className="text-emerald-400 font-bold">
                  ~{goalInfo.weeksToGoal} wks ({goalInfo.projectedGoalDate})
                </span>
              </div>
            )}
          </div>
        )}

        <p className="text-[10px] text-zinc-400 font-light">
          {isLoss && `Deficit of ${dailyCalorieDelta.toLocaleString()} kcal/day for -${selectedRate} ${unitLabel}. Dynamically recalculates as your TDEE shifts.`}
          {isMaintain && `Exact maintenance intake matching your adapted TDEE (${(stats?.tdee || 2000).toLocaleString()} kcal/day).`}
          {isGain && `Surplus of ${dailyCalorieDelta.toLocaleString()} kcal/day for +${selectedRate} ${unitLabel}. Dynamically recalculates as your TDEE shifts.`}
        </p>
      </div>
    </motion.div>
  )
})

export default HeroStat

