"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, TrendingUp, Info, Activity, Dumbbell, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/Button"

export default function ReverseDietCalculator() {
  const [unit, setUnit] = useState("lbs") // "lbs" | "kg"
  const [currentWeight, setCurrentWeight] = useState(165)
  const [endingCalories, setEndingCalories] = useState(1600)
  const [targetMaintenance, setTargetMaintenance] = useState(2350)
  const [strategy, setStrategy] = useState("moderate") // "conservative" | "moderate" | "accelerated"
  const [includeInitialJump, setIncludeInitialJump] = useState(true)

  const isKg = unit === "kg"
  const weightUnit = isKg ? "kg" : "lbs"
  const weightLbs = isKg ? currentWeight * 2.20462 : currentWeight

  // Evidence-based strategy parameters
  // Conservative: +50 kcal/wk (ideal for physique competitors & photoshoot lean athletes)
  // Moderate: +100 kcal/wk (recommended gold standard for sustainable metabolic recovery)
  // Accelerated: +175 kcal/wk (fast hormonal & fatigue recovery)
  const strategyConfig = {
    conservative: {
      label: "Conservative",
      rateKcal: 50,
      initialJumpKcal: includeInitialJump ? 100 : 0,
      desc: "Slowest approach. Minimizes scale fluctuations; best for lean athletes.",
    },
    moderate: {
      label: "Moderate (Recommended)",
      rateKcal: 100,
      initialJumpKcal: includeInitialJump ? 150 : 0,
      desc: "Optimal balance. Restores training energy & NEAT with minimal fat gain.",
    },
    accelerated: {
      label: "Accelerated Recovery",
      rateKcal: 175,
      initialJumpKcal: includeInitialJump ? 250 : 0,
      desc: "Fast relief from extreme hunger, hormonal suppression, & diet fatigue.",
    },
  }

  const activeConfig = strategyConfig[strategy]
  const startingWeek1Calories = endingCalories + activeConfig.initialJumpKcal
  const totalCalorieGap = Math.max(0, targetMaintenance - startingWeek1Calories)
  const weeksToMaintenance = Math.max(1, Math.ceil(totalCalorieGap / activeConfig.rateKcal) + (activeConfig.initialJumpKcal > 0 ? 1 : 0))

  // Evidence-based Macro Blueprint:
  // Protein: Fixed at 0.9g/lb (evidence-based muscle retention floor)
  // Fat Floor: Set to 22% of total intake or 0.35g/lb (hormone health)
  // Carbs: Absorb the vast majority of weekly surplus increases to stimulate thyroid (T3 conversion), replenish glycogen, and drive NEAT.
  const proteinGrams = Math.round(weightLbs * 0.9)
  const proteinKcal = proteinGrams * 4

  // Generate week-by-week timeline
  const schedule = []
  let runningCalories = endingCalories

  // Initial jump in Week 1 if enabled
  if (activeConfig.initialJumpKcal > 0) {
    runningCalories += activeConfig.initialJumpKcal
    const fatGrams = Math.round((runningCalories * 0.23) / 9)
    const carbGrams = Math.max(0, Math.round((runningCalories - proteinKcal - fatGrams * 9) / 4))
    schedule.push({
      week: "Week 1",
      calories: runningCalories,
      increase: `+${activeConfig.initialJumpKcal} kcal (Initial Recovery Jump)`,
      protein: proteinGrams,
      fats: fatGrams,
      carbs: carbGrams,
    })
  }

  // Subsequent weekly ramps
  let currentWk = schedule.length + 1
  while (runningCalories < targetMaintenance && currentWk <= 16) {
    runningCalories = Math.min(targetMaintenance, runningCalories + activeConfig.rateKcal)
    const fatGrams = Math.round((runningCalories * 0.24) / 9)
    const carbGrams = Math.max(0, Math.round((runningCalories - proteinKcal - fatGrams * 9) / 4))
    schedule.push({
      week: `Week ${currentWk}`,
      calories: runningCalories,
      increase: `+${activeConfig.rateKcal} kcal`,
      protein: proteinGrams,
      fats: fatGrams,
      carbs: carbGrams,
    })
    currentWk++
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0D0D12] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Top Unit Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
            EVIDENCE-BASED METABOLIC RESTORATION
          </span>
          <span className="text-[11px] text-zinc-400 font-light">
            Scientific weekly ramp to restore TDEE, glycogen, and leptin after dieting
          </span>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => {
              if (isKg) {
                setUnit("lbs")
                setCurrentWeight(Math.round(currentWeight * 2.20462))
              }
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
              !isKg ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            LBS
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isKg) {
                setUnit("kg")
                setCurrentWeight(Math.round(currentWeight / 2.20462))
              }
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
              isKg ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            KG
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Current Body Weight ({weightUnit})
          </label>
          <input
            type="number"
            min="30"
            max="400"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Ending Cut Calories (Lowest Intake)
          </label>
          <div className="relative">
            <input
              type="number"
              min="800"
              max="4500"
              step="50"
              value={endingCalories}
              onChange={(e) => setEndingCalories(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none pr-14"
            />
            <span className="absolute right-3 top-3 text-[10px] text-zinc-500 font-mono">kcal</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Target Maintenance TDEE
          </label>
          <div className="relative">
            <input
              type="number"
              min="1000"
              max="5000"
              step="50"
              value={targetMaintenance}
              onChange={(e) => setTargetMaintenance(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-[#111115] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F97316] focus:outline-none pr-14"
            />
            <span className="absolute right-3 top-3 text-[10px] text-zinc-500 font-mono">kcal</span>
          </div>
        </div>
      </div>

      {/* Strategy Selector */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
            Reverse Dieting Strategy
          </label>
          <span className="text-xs font-mono font-bold text-[#F97316]">
            +{activeConfig.rateKcal} kcal / week
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(strategyConfig).map(([key, config]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStrategy(key)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                strategy === key
                  ? "bg-[#F97316]/15 border-[#F97316] shadow-sm"
                  : "bg-white/5 border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white font-mono">{config.label}</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light font-sans">{config.desc}</p>
            </button>
          ))}
        </div>

        {/* Initial Jump Option */}
        <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeInitialJump}
            onChange={(e) => setIncludeInitialJump(e.target.checked)}
            className="w-4 h-4 rounded bg-[#111115] border-white/20 text-[#F97316] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#F97316]"
          />
          <span className="text-xs text-zinc-300 font-sans">
            Include immediate Week 1 recovery bump (+{strategy === "conservative" ? 100 : strategy === "moderate" ? 150 : 250} kcal) to relieve acute deficit fatigue
          </span>
        </label>
      </div>

      {/* Results Spotlight */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0A0A0F] border border-[#F97316]/30 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
              Week 1 Starting Intake
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-black text-amber-400 tabular-nums">
                {startingWeek1Calories.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">
              +{startingWeek1Calories - endingCalories} kcal from deepest cut
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
              Estimated Reverse Duration
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-black text-white tabular-nums">
                ~{weeksToMaintenance}
              </span>
              <span className="text-xs font-mono text-zinc-400">weeks</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">
              To reach {targetMaintenance.toLocaleString()} kcal maintenance
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block mb-1">
              Macro Allocation Strategy
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-display font-bold text-white">
                {proteinGrams}g Protein
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              Surplus added mostly via Carbs (+glycogen & NEAT)
            </span>
          </div>
        </div>

        {/* Step-by-Step Table with Macros */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold block">
              Week-by-Week Calorie & Macro Ramp Schedule
            </span>
            <span className="text-[10px] font-mono text-zinc-500">P / F / C breakdown</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {schedule.map((step) => (
              <div
                key={step.week}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#F97316] w-16">{step.week}</span>
                  <span className="text-xs font-mono text-zinc-300">{step.increase}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-2 text-[11px] font-mono text-zinc-400">
                    <span className="text-red-400/90">{step.protein}P</span>
                    <span className="text-amber-400/90">{step.fats}F</span>
                    <span className="text-blue-400/90">{step.carbs}C</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-white tabular-nums min-w-[90px] text-right">
                    {step.calories.toLocaleString()} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Note Callout */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
            <Info className="w-4 h-4 shrink-0" />
            <span>Understanding the Initial Water / Glycogen Refill</span>
          </div>
          <p className="text-xs text-zinc-400 font-light font-sans leading-relaxed">
            During Weeks 1–2 of reverse dieting, your scale weight will usually rise by <strong>2 to 4 lbs (1 to 2 kg)</strong>. This is <em>intramuscular glycogen and water retention</em> (each gram of restored glycogen binds ~3g of water), NOT adipose body fat. As food increases, your Non-Exercise Activity (NEAT) and training strength will rapidly accelerate.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 font-light text-center sm:text-left font-sans">
            Track your rising metabolic baseline dynamically without guessing weekly adjustments.
          </p>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Metabolic Recovery on AdapTDEE</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
