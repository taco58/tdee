"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default function InstantTdeeCalculator() {
  const [units, setUnits] = useState("lbs") 
  const [gender, setGender] = useState("male") 
  const [age, setAge] = useState("25")
  const [weight, setWeight] = useState("170")
  const [heightCm, setHeightCm] = useState("175")
  const [activity, setActivity] = useState("1.375")

  const parsedWeight = parseFloat(weight) || 0
  const parsedHeight = parseFloat(heightCm) || 0
  const parsedAge = parseInt(age, 10) || 0
  const activityMult = parseFloat(activity) || 1.375

  const weightKg = units === "lbs" ? parsedWeight * 0.453592 : parsedWeight
  const genderBonus = gender === "male" ? 5 : -161

  const bmr = parsedWeight > 0 && parsedHeight > 0 && parsedAge > 0
    ? Math.round(10 * weightKg + 6.25 * parsedHeight - 5 * parsedAge + genderBonus)
    : 0

  const calculatedTdee = bmr > 0 ? Math.round(bmr * activityMult) : 0
  const weightLossCalories = calculatedTdee > 0 ? Math.round(calculatedTdee - 500) : 0
  const muscleGainCalories = calculatedTdee > 0 ? Math.round(calculatedTdee + 250) : 0

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 font-sans text-left my-8">
      
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
            Instant TDEE Calculator
          </h3>
          <p className="text-[11px] text-zinc-400">
            Calculate baseline maintenance calories instantly
          </p>
        </div>

        <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setUnits("lbs")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              units === "lbs" ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            LBS
          </button>
          <button
            onClick={() => setUnits("kg")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              units === "kg" ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            KG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        
        <div>
          <label className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 block mb-1">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F97316] focus:outline-none cursor-pointer"
          >
            <option value="male" className="bg-[#0D0D0D]">Male</option>
            <option value="female" className="bg-[#0D0D0D]">Female</option>
          </select>
        </div>

        <div>
          <label className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 block mb-1">
            Age (yrs)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F97316] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 block mb-1">
            Weight ({units})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F97316] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 block mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F97316] focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 block mb-1">
          Activity Level
        </label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F97316] focus:outline-none cursor-pointer"
        >
          <option value="1.0" className="bg-[#0D0D0D]">Sickly / Bedridden — Minimal movement, illness recovery, or bed rest</option>
          <option value="1.2" className="bg-[#0D0D0D]">Sedentary — &lt; 5,000 steps/day · Desk job, no formal exercise</option>
          <option value="1.375" className="bg-[#0D0D0D]">Lightly Active — 5,000–7,500 steps/day · Light exercise 1–3 days/wk</option>
          <option value="1.55" className="bg-[#0D0D0D]">Moderately Active — 7,500–10,000 steps/day · Moderate exercise 3–5 days/wk</option>
          <option value="1.725" className="bg-[#0D0D0D]">Very Active — 10,000–14,000 steps/day · Hard training 6–7 days/wk</option>
          <option value="1.9" className="bg-[#0D0D0D]">Extra Active — 14,000+ steps/day · Physical job or 2x/day athlete training</option>
        </select>
      </div>

      {calculatedTdee > 0 && (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            
            {/* Maintenance */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono block text-center">
                Maintenance TDEE
              </span>
              <p className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
                {calculatedTdee.toLocaleString()} <span className="text-xs text-zinc-400 font-normal font-sans">kcal</span>
              </p>
            </div>

            {/* Fat Loss */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono block text-center">
                Fat Loss (-1 lb/wk)
              </span>
              <p className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
                {weightLossCalories.toLocaleString()} <span className="text-xs text-zinc-400 font-normal font-sans">kcal</span>
              </p>
            </div>

            {/* Muscle Gain */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-sky-400 font-mono block text-center">
                Muscle Lean Bulk
              </span>
              <p className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
                {muscleGainCalories.toLocaleString()} <span className="text-xs text-zinc-400 font-normal font-sans">kcal</span>
              </p>
            </div>

          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30">
        <p className="text-xs text-zinc-300 leading-relaxed">
          <strong className="text-white">Static formulas are only a rough starting guess!</strong> Real human metabolism adapts continuously. Log daily scale weight & intake to track your real adaptive TDEE.
        </p>

        <Link href="/signup" className="shrink-0 w-full md:w-auto">
          <Button className="w-full md:w-auto rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-none flex items-center justify-center gap-1.5 whitespace-nowrap">
            Track Free
          </Button>
        </Link>
      </div>

    </div>
  )
}
