"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Dumbbell, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/Button"

export default function BulkingCalculator() {
  const [unit, setUnit] = useState("lbs") // "lbs" | "kg"
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState(24)
  const [weight, setWeight] = useState(165)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(10)
  const [heightCm, setHeightCm] = useState(178)
  const [activity, setActivity] = useState(1.55) // Moderately active lifter
  const [experience, setExperience] = useState("intermediate") // "beginner" | "intermediate" | "advanced"
  const [surplusKcal, setSurplusKcal] = useState(250) // Default 250 kcal/day

  const isKg = unit === "kg"
  const weightUnit = isKg ? "kg" : "lbs"
  const weightLbs = isKg ? weight * 2.20462 : weight

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

  // Bulking target
  const targetCalories = maintenanceTDEE + surplusKcal

  // Rates of weight gain & muscle potential based on sports science (Helms / Aragon / McDonald)
  const weeklyGainWeight = isKg
    ? Math.round((surplusKcal * 7 / 7700) * 100) / 100
    : Math.round((surplusKcal * 7 / 3500) * 100) / 100

  const monthlyGainWeight = Math.round(weeklyGainWeight * 4.33 * 10) / 10

  // Evidence-based Hypertrophy Macros:
  // Protein: 0.9g / lb (optimal for muscle protein synthesis in a surplus)
  // Fats: ~25% of calories
  // Carbs: Remainder (fuels heavy resistance training, drives mTOR, replenishes intramuscular glycogen)
  const proteinGrams = Math.round(weightLbs * 0.9)
  const proteinKcal = proteinGrams * 4
  const fatKcal = Math.round(targetCalories * 0.25)
  const fatGrams = Math.round(fatKcal / 9)
  const carbKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal))
  const carbGrams = Math.round(carbKcal / 4)

  const proteinPct = Math.round((proteinKcal / targetCalories) * 100)
  const fatPct = Math.round((fatKcal / targetCalories) * 100)
  const carbPct = Math.round((carbKcal / targetCalories) * 100)

  const experienceTiers = [
    {
      id: "beginner",
      label: "Beginner (< 1 yr lifting)",
      surplus: 300,
      gainRate: isKg ? "0.8 - 1.2 kg / month" : "1.5 - 2.5 lbs / month",
      desc: "Fastest natural growth potential ('newbie gains'). Can handle a larger surplus.",
    },
    {
      id: "intermediate",
      label: "Intermediate (1–3 yrs lifting)",
      surplus: 200,
      gainRate: isKg ? "0.4 - 0.8 kg / month" : "1.0 - 1.5 lbs / month",
      desc: "Optimal lean mass accrual while keeping unwanted body fat gains to a minimum.",
    },
    {
      id: "advanced",
      label: "Advanced (4+ yrs lifting)",
      surplus: 125,
      gainRate: isKg ? "0.2 - 0.4 kg / month" : "0.5 - 0.75 lbs / month",
      desc: "Near genetic ceiling. Requires a tight micro-surplus to prevent spilling over into fat.",
    },
  ]

  const handleTierSelect = (tierId, defaultSurplus) => {
    setExperience(tierId)
    setSurplusKcal(defaultSurplus)
  }

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
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Surplus Size</label>
          <div className="relative">
            <input
              type="number"
              min="50"
              max="1000"
              step="25"
              value={surplusKcal}
              onChange={(e) => setSurplusKcal(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none pr-14"
            />
            <span className="absolute right-3 top-3 text-[10px] text-zinc-500 font-mono">kcal</span>
          </div>
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
          <option value="1.2">Sedentary — &lt; 5,000 steps/day · Desk job, no formal workouts</option>
          <option value="1.375">Lightly Active — 5,000–7,500 steps/day · Light lifting 1–3 days/wk</option>
          <option value="1.55">Moderately Active — 7,500–10,000 steps/day · Consistent lifting 3–5 days/wk</option>
          <option value="1.725">Very Active — 10,000–13,000 steps/day · Heavy hypertrophy training 6–7 days/wk</option>
          <option value="1.9">Extra Active — 13,000+ steps/day · Hard daily labor or competitive 2x/day athlete</option>
        </select>
      </div>

      {/* Training Experience Preset Cards */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Lifting Experience & Lean Surplus Tier
          </label>
          <span className="text-xs font-mono font-bold text-[#F97316]">
            +{surplusKcal} kcal / day surplus
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {experienceTiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => handleTierSelect(tier.id, tier.surplus)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                experience === tier.id
                  ? "bg-[#F97316]/15 border-[#F97316] shadow-sm"
                  : "bg-white/5 border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white font-mono">{tier.label}</span>
                <span className="text-[10px] font-mono text-[#F97316] font-bold">+{tier.surplus} kcal</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 block mb-1">Max rate: {tier.gainRate}</span>
              <p className="text-[11px] text-zinc-400 font-light font-sans">{tier.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Bulking Showcase */}
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
              Projected Gain Pace
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-black text-emerald-400 tabular-nums">
                +{monthlyGainWeight}
              </span>
              <span className="text-xs font-mono text-zinc-400">{weightUnit}/month</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono">~+{weeklyGainWeight} {weightUnit}/week</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block mb-1">
              Bulking Calorie Target
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-display font-black text-[#F97316] tabular-nums">
                {targetCalories.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Eat this daily for lean hypertrophy</span>
          </div>
        </div>

        {/* 3 Hypertrophy Macro Pillars */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold block">
            Hypertrophy Macronutrient Breakdown
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-red-500/20 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-red-400 font-bold uppercase">PROTEIN</span>
                <span className="text-[10px] font-mono text-zinc-500">{proteinPct}%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-bold text-white tabular-nums">{proteinGrams}</span>
                <span className="text-xs font-mono text-zinc-400">grams</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono block">Optimal muscle protein synthesis (0.9g/lb)</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-blue-500/20 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">CARBOHYDRATES</span>
                <span className="text-[10px] font-mono text-zinc-500">{carbPct}%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-bold text-white tabular-nums">{carbGrams}</span>
                <span className="text-xs font-mono text-zinc-400">grams</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono block">Max gym performance & glycogen stores</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-amber-500/20 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">FATS</span>
                <span className="text-[10px] font-mono text-zinc-500">{fatPct}%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-bold text-white tabular-nums">{fatGrams}</span>
                <span className="text-xs font-mono text-zinc-400">grams</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono block">Steroid hormone & joint health floor</span>
            </div>
          </div>

          {/* Macro Visual Bar */}
          <div className="w-full h-3 rounded-full bg-white/5 flex overflow-hidden mt-3">
            <div style={{ width: `${proteinPct}%` }} className="bg-red-500 h-full" title={`Protein: ${proteinPct}%`} />
            <div style={{ width: `${carbPct}%` }} className="bg-blue-500 h-full" title={`Carbs: ${carbPct}%`} />
            <div style={{ width: `${fatPct}%` }} className="bg-amber-500 h-full" title={`Fats: ${fatPct}%`} />
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 font-light text-center sm:text-left font-sans">
            Track your surplus adaptively to ensure weight gain is primarily lean contractile muscle, not excess fat.
          </p>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Lean Bulk on AdapTDEE</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
