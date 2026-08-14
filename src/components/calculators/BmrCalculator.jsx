"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/Button"

export default function BmrCalculator() {
  const [unit, setUnit] = useState("lbs")
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState(26)
  const [weight, setWeight] = useState(175)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(10)
  const [heightCm, setHeightCm] = useState(178)
  const [bodyFat, setBodyFat] = useState("")

  const isKg = unit === "kg"
  const weightUnit = isKg ? "kg" : "lbs"

  const totalHeightCm = isKg
    ? heightCm
    : Math.round((heightFt * 12 + heightIn) * 2.54)

  const weightInKg = isKg ? weight : weight * 0.453592

  // 1. Mifflin-St Jeor
  const genderBonus = gender === "female" ? -161 : 5
  const mifflinBmr = Math.round(10 * weightInKg + 6.25 * totalHeightCm - 5 * age + genderBonus)

  // 2. Harris-Benedict (Revised 1984)
  const harrisBmr = gender === "female"
    ? Math.round(447.593 + (9.247 * weightInKg) + (3.098 * totalHeightCm) - (4.330 * age))
    : Math.round(88.362 + (13.397 * weightInKg) + (4.799 * totalHeightCm) - (5.677 * age))

  // 3. Katch-McArdle (if body fat provided)
  const parsedBf = parseFloat(bodyFat)
  const hasBodyFat = !isNaN(parsedBf) && parsedBf > 3 && parsedBf < 60
  const leanMassKg = hasBodyFat ? weightInKg * (1 - parsedBf / 100) : 0
  const katchBmr = hasBodyFat ? Math.round(370 + 21.6 * leanMassKg) : null

  const activities = [
    { label: "Sedentary", mult: 1.2, desc: "< 5,000 steps/day · Desk job, little to no formal workouts" },
    { label: "Lightly Active", mult: 1.375, desc: "5,000–7,500 steps/day · Light exercise 1–3 days/wk" },
    { label: "Moderately Active", mult: 1.55, desc: "7,500–10,000 steps/day · Moderate training 3–5 days/wk" },
    { label: "Very Active", mult: 1.725, desc: "10,000–13,000 steps/day · Hard training 6–7 days/wk" },
    { label: "Extra Active", mult: 1.9, desc: "13,000+ steps/day · Heavy daily labor or competitive 2x/day training" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0D0D12] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Gender & Unit Switcher */}
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

      {/* Input Fields */}
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
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Body Fat % (Optional)</label>
          <input
            type="number"
            min="4"
            max="60"
            placeholder="e.g. 15"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
          />
        </div>
      </div>

      {/* Main Results Showcase */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0A0A0F] border border-[#F97316]/30 shadow-2xl space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block mb-1">
            ESTIMATED BASAL METABOLIC RATE (BMR)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-display font-black text-white tabular-nums">
              {(katchBmr || mifflinBmr).toLocaleString()}
            </span>
            <span className="text-xs font-mono text-zinc-400 font-bold">kcal / day</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light font-sans">
            The minimum energy required for vital organ survival at complete rest.
          </p>
        </div>

        {/* Formula Comparison Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-[#F97316]/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-bold block mb-1">
              Mifflin-St Jeor (Standard)
            </span>
            <span className="text-2xl font-display font-bold text-white tabular-nums">{mifflinBmr.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">Gold standard baseline</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-1">
              Harris-Benedict
            </span>
            <span className="text-2xl font-display font-bold text-white tabular-nums">{harrisBmr.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">Classic formula</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-1">
              Katch-McArdle
            </span>
            <span className="text-2xl font-display font-bold text-white tabular-nums">
              {katchBmr ? `${katchBmr.toLocaleString()}` : "Enter Body Fat %"}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">Lean mass adjusted</span>
          </div>
        </div>

        {/* Activity Multiplier Breakdown */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold block">
            Estimated TDEE by Activity & Step Count (BMR × Multiplier)
          </span>

          <div className="space-y-2">
            {activities.map((act) => {
              const bmrBase = katchBmr || mifflinBmr
              const calculatedTdee = Math.round(bmrBase * act.mult)
              return (
                <div
                  key={act.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors gap-2"
                >
                  <div>
                    <span className="text-xs font-bold text-white font-mono">{act.label} (×{act.mult})</span>
                    <p className="text-[11px] text-zinc-400 font-light font-sans">{act.desc}</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-[#F97316] tabular-nums">
                    {calculatedTdee.toLocaleString()} kcal/day
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 font-light text-center sm:text-left font-sans">
            Stop guessing activity multipliers. Measure your true expenditure directly from weight trends.
          </p>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Adaptive TDEE</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
