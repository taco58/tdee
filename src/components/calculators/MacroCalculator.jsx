"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/Button"

export default function MacroCalculator() {
  const [unit, setUnit] = useState("lbs")
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState(26)
  const [weight, setWeight] = useState(175)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(10)
  const [heightCm, setHeightCm] = useState(178)
  const [activity, setActivity] = useState(1.375)
  const [goal, setGoal] = useState("lose") // "lose" | "maintain" | "gain"
  const [dietStyle, setDietStyle] = useState("high_protein") // "high_protein" | "balanced" | "low_carb"

  const isKg = unit === "kg"
  const weightUnit = isKg ? "kg" : "lbs"

  const totalHeightCm = isKg
    ? heightCm
    : Math.round((heightFt * 12 + heightIn) * 2.54)

  const weightInKg = isKg ? weight : weight * 0.453592
  const weightInLbs = isKg ? weight * 2.20462 : weight

  // Mifflin-St Jeor
  const genderBonus = gender === "female" ? -161 : 5
  const bmr = Math.round(10 * weightInKg + 6.25 * totalHeightCm - 5 * age + genderBonus)
  const maintenanceTDEE = Math.round(bmr * activity)

  // Calorie target based on goal
  let targetCalories = maintenanceTDEE
  if (goal === "lose") targetCalories = Math.max(1200, Math.round(maintenanceTDEE * 0.8)) // 20% deficit
  if (goal === "gain") targetCalories = Math.round(maintenanceTDEE * 1.1) // 10% surplus

  // Macro distribution
  let proteinGrams = 0
  let fatGrams = 0
  let carbGrams = 0

  if (dietStyle === "high_protein") {
    proteinGrams = Math.round(weightInLbs * 1.0)
    const fatCalories = targetCalories * 0.25
    fatGrams = Math.round(fatCalories / 9)
    const carbCalories = Math.max(0, targetCalories - (proteinGrams * 4 + fatCalories))
    carbGrams = Math.round(carbCalories / 4)
  } else if (dietStyle === "balanced") {
    proteinGrams = Math.round(weightInLbs * 0.8)
    const fatCalories = targetCalories * 0.30
    fatGrams = Math.round(fatCalories / 9)
    const carbCalories = Math.max(0, targetCalories - (proteinGrams * 4 + fatCalories))
    carbGrams = Math.round(carbCalories / 4)
  } else if (dietStyle === "low_carb") {
    proteinGrams = Math.round(weightInLbs * 1.0)
    const fatCalories = targetCalories * 0.40
    fatGrams = Math.round(fatCalories / 9)
    const carbCalories = Math.max(0, targetCalories - (proteinGrams * 4 + fatCalories))
    carbGrams = Math.round(carbCalories / 4)
  }

  const totalCalculatedCalories = proteinGrams * 4 + fatGrams * 9 + carbGrams * 4
  const proteinPct = Math.round(((proteinGrams * 4) / totalCalculatedCalories) * 100)
  const fatPct = Math.round(((fatGrams * 9) / totalCalculatedCalories) * 100)
  const carbPct = Math.round(((carbGrams * 4) / totalCalculatedCalories) * 100)

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0D0D12] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Top Options */}
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

      {/* Input Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Weight ({weightUnit})</label>
          <input
            type="number"
            min="30"
            max="400"
            value={weight}
            onChange={(e) => setWeight(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
          />
        </div>

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

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-sans focus:border-[#F97316] focus:outline-none cursor-pointer"
          >
            <option value="lose">Fat Loss (-20%)</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Lean Bulk (+10%)</option>
          </select>
        </div>
      </div>

      {/* Activity & Diet Style with step count quantification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Activity Level & Daily Step Count
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white font-sans focus:border-[#F97316] focus:outline-none cursor-pointer"
          >
            <option value="1.2">Sedentary — &lt; 5,000 steps/day · Desk job, no formal workouts</option>
            <option value="1.375">Lightly Active — 5,000–7,500 steps/day · Light exercise 1–3 days/wk</option>
            <option value="1.55">Moderately Active — 7,500–10,000 steps/day · Moderate training 3–5 days/wk</option>
            <option value="1.725">Very Active — 10,000–13,000 steps/day · Hard training 6–7 days/wk</option>
            <option value="1.9">Extra Active — 13,000+ steps/day · Heavy physical labor or 2x/day athlete</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Dietary Preference</label>
          <select
            value={dietStyle}
            onChange={(e) => setDietStyle(e.target.value)}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white font-sans focus:border-[#F97316] focus:outline-none cursor-pointer"
          >
            <option value="high_protein">High Protein (Optimal for lifting & fat loss)</option>
            <option value="balanced">Balanced (Moderate protein & fats)</option>
            <option value="low_carb">Low Carb (Higher healthy fats)</option>
          </select>
        </div>
      </div>

      {/* Calculated Macro Cards */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0A0A0F] border border-[#F97316]/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block mb-1">
              DAILY CALORIE TARGET
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-display font-black text-white tabular-nums">
                {targetCalories.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400 font-bold">kcal / day</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              Maintenance: {maintenanceTDEE.toLocaleString()} kcal
            </span>
          </div>
        </div>

        {/* 3 Macro Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Protein */}
          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-red-500/20 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">PROTEIN</span>
              <span className="text-[10px] font-mono text-zinc-500">{proteinPct}%</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-display font-bold text-white tabular-nums">{proteinGrams}</span>
              <span className="text-xs font-mono text-zinc-400">grams</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono block">{proteinGrams * 4} kcal (4 kcal/g)</span>
          </div>

          {/* Fats */}
          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-amber-500/20 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">FATS</span>
              <span className="text-[10px] font-mono text-zinc-500">{fatPct}%</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-display font-bold text-white tabular-nums">{fatGrams}</span>
              <span className="text-xs font-mono text-zinc-400">grams</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono block">{fatGrams * 9} kcal (9 kcal/g)</span>
          </div>

          {/* Carbs */}
          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-blue-500/20 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">CARBS</span>
              <span className="text-[10px] font-mono text-zinc-500">{carbPct}%</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-display font-bold text-white tabular-nums">{carbGrams}</span>
              <span className="text-xs font-mono text-zinc-400">grams</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono block">{carbGrams * 4} kcal (4 kcal/g)</span>
          </div>
        </div>

        {/* Visual Macro Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="w-full h-3 rounded-full bg-white/5 flex overflow-hidden">
            <div style={{ width: `${proteinPct}%` }} className="bg-red-500 h-full" title={`Protein: ${proteinPct}%`} />
            <div style={{ width: `${fatPct}%` }} className="bg-amber-500 h-full" title={`Fats: ${fatPct}%`} />
            <div style={{ width: `${carbPct}%` }} className="bg-blue-500 h-full" title={`Carbs: ${carbPct}%`} />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span className="text-red-400">Protein: {proteinGrams}g</span>
            <span className="text-amber-400">Fats: {fatGrams}g</span>
            <span className="text-blue-400">Carbs: {carbGrams}g</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 font-light text-center sm:text-left font-sans">
            Track daily macros against your true expenditure without arbitrary plateaus.
          </p>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Macros Adaptively</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
