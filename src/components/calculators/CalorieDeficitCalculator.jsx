"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/Button"

export default function CalorieDeficitCalculator() {
  const [unit, setUnit] = useState("lbs") // "lbs" | "kg"
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState(26)
  const [weight, setWeight] = useState(175)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(10)
  const [heightCm, setHeightCm] = useState(178)
  const [activity, setActivity] = useState(1.375) // Lightly active
  const [lossRate, setLossRate] = useState(1.0) // 1.0 lb/wk or 0.5 kg/wk
  const [targetWeight, setTargetWeight] = useState(160)

  const isKg = unit === "kg"
  const weightUnit = isKg ? "kg" : "lbs"
  const rateUnit = isKg ? "kg/week" : "lbs/week"

  // Height conversion to cm
  const totalHeightCm = isKg
    ? heightCm
    : Math.round((heightFt * 12 + heightIn) * 2.54)

  // Weight conversion to kg
  const weightInKg = isKg ? weight : weight * 0.453592

  // Mifflin-St Jeor BMR
  const genderBonus = gender === "female" ? -161 : 5
  const bmr = Math.round(10 * weightInKg + 6.25 * totalHeightCm - 5 * age + genderBonus)
  const maintenanceTDEE = Math.round(bmr * activity)

  // Calorie deficit calculation directly from rate of fat loss
  // 1 lb fat ≈ 3,500 kcal -> 500 kcal/day for 1 lb/wk
  // 1 kg fat ≈ 7,700 kcal -> 1,100 kcal/day for 1 kg/wk
  const dailyDeficitKcal = Math.round(lossRate * (isKg ? 1100 : 500))
  const targetCalories = Math.max(gender === "female" ? 1200 : 1500, maintenanceTDEE - dailyDeficitKcal)
  const actualDeficitKcal = maintenanceTDEE - targetCalories

  // Effective weekly loss rate based on actual deficit
  const actualWeeklyLoss = isKg
    ? Math.round((actualDeficitKcal / 1100) * 10) / 10
    : Math.round((actualDeficitKcal / 500) * 10) / 10

  const totalWeightToLose = Math.max(0, isKg ? weight - targetWeight : weight - targetWeight)
  const weeksToTarget = actualWeeklyLoss > 0 ? Math.round(totalWeightToLose / actualWeeklyLoss) : 0
  const etaDate = new Date()
  etaDate.setDate(etaDate.getDate() + weeksToTarget * 7)
  const formattedEta = etaDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  const ratePresets = isKg
    ? [
        { label: "0.25 kg/wk", rate: 0.25, desc: "-275 kcal/day (Gentle & easy to sustain)" },
        { label: "0.50 kg/wk", rate: 0.50, desc: "-550 kcal/day (Recommended balanced cut)" },
        { label: "0.75 kg/wk", rate: 0.75, desc: "-825 kcal/day (Moderate athletic cut)" },
        { label: "1.00 kg/wk", rate: 1.00, desc: "-1100 kcal/day (Aggressive fat loss)" },
      ]
    : [
        { label: "0.5 lb/wk", rate: 0.5, desc: "-250 kcal/day (Gentle & easy to sustain)" },
        { label: "1.0 lb/wk", rate: 1.0, desc: "-500 kcal/day (Recommended standard cut)" },
        { label: "1.5 lbs/wk", rate: 1.5, desc: "-750 kcal/day (Moderate athletic cut)" },
        { label: "2.0 lbs/wk", rate: 2.0, desc: "-1000 kcal/day (Aggressive fat loss)" },
      ]

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0D0D12] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Unit & Gender Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              gender === "male"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              gender === "female"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Female
          </button>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => {
              if (isKg) {
                setUnit("lbs")
                setWeight(Math.round(weight * 2.20462))
                setTargetWeight(Math.round(targetWeight * 2.20462))
                setLossRate(1.0)
              }
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
              !isKg ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            US (LBS / FT)
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isKg) {
                setUnit("kg")
                setWeight(Math.round(weight / 2.20462))
                setTargetWeight(Math.round(targetWeight / 2.20462))
                setLossRate(0.5)
              }
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
              isKg ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            METRIC (KG / CM)
          </button>
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Age */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Age</label>
          <input
            type="number"
            min="15"
            max="100"
            value={age}
            onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
          />
        </div>

        {/* Current Weight */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Current Weight ({weightUnit})</label>
          <input
            type="number"
            min="30"
            max="400"
            value={weight}
            onChange={(e) => setWeight(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
          />
        </div>

        {/* Height */}
        {!isKg ? (
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Height</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="3"
                max="7"
                placeholder="ft"
                value={heightFt}
                onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)}
                className="w-full bg-[#111115] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none text-center"
              />
              <input
                type="number"
                min="0"
                max="11"
                placeholder="in"
                value={heightIn}
                onChange={(e) => setHeightIn(parseInt(e.target.value) || 0)}
                className="w-full bg-[#111115] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none text-center"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Height (cm)</label>
            <input
              type="number"
              min="100"
              max="240"
              value={heightCm}
              onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
              className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
            />
          </div>
        )}

        {/* Goal Target Weight */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Goal Weight ({weightUnit})</label>
          <input
            type="number"
            min="30"
            max="400"
            value={targetWeight}
            onChange={(e) => setTargetWeight(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
          />
        </div>
      </div>

      {/* Activity Level Selector with Step Counts */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Activity Level & Daily Step Count
          </label>
          <span className="text-xs font-mono text-zinc-500">Multiplier: ×{activity}</span>
        </div>
        <select
          value={activity}
          onChange={(e) => setActivity(parseFloat(e.target.value))}
          className="w-full bg-[#111115] border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white font-sans focus:border-[#F97316] focus:outline-none cursor-pointer"
        >
          <option value="1.2">Sedentary — &lt; 5,000 steps/day · Desk job, little to no formal workouts</option>
          <option value="1.375">Lightly Active — 5,000–7,500 steps/day · Light exercise 1–3 days/week</option>
          <option value="1.55">Moderately Active — 7,500–10,000 steps/day · Moderate training 3–5 days/week</option>
          <option value="1.725">Very Active — 10,000–13,000 steps/day · Hard training/lifting 6–7 days/week</option>
          <option value="1.9">Extra Active — 13,000+ steps/day · Heavy physical labor or competitive 2x/day training</option>
        </select>
      </div>

      {/* Rate of Fat Loss Selector */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Desired Rate of Fat Loss
          </label>
          <span className="text-xs font-mono font-bold text-[#F97316]">
            -{lossRate} {rateUnit} (-{dailyDeficitKcal} kcal/day)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {ratePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setLossRate(preset.rate)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                lossRate === preset.rate
                  ? "bg-[#F97316]/15 border-[#F97316] shadow-sm"
                  : "bg-white/5 border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white font-mono">{preset.label}</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light font-sans">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Results Spotlight */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0A0A0F] border border-[#F97316]/30 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
              Maintenance TDEE
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-black text-white tabular-nums">
                {maintenanceTDEE.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">BMR: {bmr.toLocaleString()} kcal</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
              Required Daily Deficit
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-black text-amber-400 tabular-nums">
                -{actualDeficitKcal.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-amber-400/80 font-mono">Pace: -{lossRate} {rateUnit}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block mb-1">
              Your Daily Calorie Target
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-display font-black text-[#F97316] tabular-nums">
                {targetCalories.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Eat this daily to hit your pace</span>
          </div>
        </div>

        {/* Milestone Timeline & CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
              Estimated Goal Milestone ({totalWeightToLose} {weightUnit} total fat loss)
            </span>
            {totalWeightToLose > 0 ? (
              <p className="text-sm font-mono text-emerald-400 font-bold flex items-center justify-center md:justify-start gap-1.5">
                <Calendar className="w-4 h-4" /> ~{weeksToTarget} weeks ({formattedEta})
              </p>
            ) : (
              <p className="text-sm font-mono text-emerald-400 font-semibold">You are at or below your goal weight!</p>
            )}
            <p className="text-xs text-zinc-500 font-light max-w-md font-sans">
              As you lose weight, your true expenditure slows down. Use AdapTDEE to dynamically adjust your targets and avoid plateaus.
            </p>
          </div>

          <Link href="/signup" className="w-full md:w-auto">
            <Button
              size="lg"
              className="w-full md:w-auto rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-4 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Deficit Adaptively</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
