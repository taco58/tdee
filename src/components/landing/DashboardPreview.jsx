"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Activity, Sparkles } from "lucide-react"

const sampleData = [
  { week: "Wk 1", date: "Jan 05", tdee: 2450, formula: 2450, diff: 0 },
  { week: "Wk 2", date: "Jan 12", tdee: 2480, formula: 2440, diff: 40 },
  { week: "Wk 3", date: "Jan 19", tdee: 2520, formula: 2435, diff: 85 },
  { week: "Wk 4", date: "Jan 26", tdee: 2560, formula: 2420, diff: 140 },
  { week: "Wk 5", date: "Feb 02", tdee: 2610, formula: 2415, diff: 195 },
  { week: "Wk 6", date: "Feb 09", tdee: 2640, formula: 2405, diff: 235 },
  { week: "Wk 7", date: "Feb 16", tdee: 2665, formula: 2395, diff: 270 },
  { week: "Wk 8", date: "Feb 23", tdee: 2680, formula: 2390, diff: 290 },
]

const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const tdee = payload.find((p) => p.dataKey === "tdee")?.value
    const formula = payload.find((p) => p.dataKey === "formula")?.value
    const diff = tdee && formula ? tdee - formula : 0

    return (
      <div className="bg-[#0A0A0F] border border-white/15 p-3 rounded-xl shadow-2xl text-xs text-white min-w-[170px] font-sans">
        <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider pb-1 mb-1.5 border-b border-white/10">
          {label} Adaptation
        </p>
        <div className="space-y-1 font-mono text-[11px]">
          <div className="flex justify-between items-center text-[#F97316]">
            <span>Adapted TDEE:</span>
            <span className="font-bold">{tdee} kcal</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400">
            <span>Formula Base:</span>
            <span>{formula} kcal</span>
          </div>
          <div className="pt-1 border-t border-white/10 flex justify-between text-[10px]">
            <span className="text-zinc-500">True Variance:</span>
            <span className="text-emerald-400 font-semibold">+{diff} kcal</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 md:p-7 shadow-2xl text-left relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block">
            EXPENDITURE ADAPTATION MODEL
          </span>
          <h4 className="text-base font-display font-bold text-white tracking-tight mt-0.5">
            Real-Time Metabolic Burn
          </h4>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-medium">
          <span>LIVE TRACK</span>
        </div>
      </div>

      {/* Main Stat Banner */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
            Current Adapted TDEE
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-display font-black text-white tabular-nums">
              2,680
            </span>
            <span className="text-[11px] font-mono text-[#F97316] font-bold">kcal/day</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
            +290 kcal above formula
          </span>
        </div>

        <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
            Static Formula Baseline
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-display font-black text-zinc-400 tabular-nums">
              2,390
            </span>
            <span className="text-[11px] font-mono text-zinc-500">kcal/day</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
            Mifflin-St Jeor estimate
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-[#F97316] rounded-full inline-block" />
          <span className="text-zinc-300">Adapted TDEE Curve</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-b border-dashed border-zinc-500 inline-block" />
          <span className="text-zinc-500">Formula Baseline</span>
        </div>
      </div>

      <div className="h-44 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <XAxis
              dataKey="week"
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
            />
            <YAxis
              domain={[2300, 2750]}
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Line
              type="monotone"
              dataKey="formula"
              stroke="#71717a"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tdee"
              stroke="#F97316"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#F97316", stroke: "#0D0D12", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#F97316", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-white/10 mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Signal: 98% Algorithm Confidence</span>
        <span className="text-zinc-400">56 Daily Weigh-ins Analyzed</span>
      </div>
    </motion.div>
  )
}
