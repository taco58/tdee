"use client"

import React from "react"
import { motion } from "framer-motion"
import { Flame, Zap } from "lucide-react"

export default function HeroStat({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Overline */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            YOUR ADAPTED TDEE
          </span>
        </div>
      </div>

      {/* Main number */}
      <div className="flex items-baseline gap-2 my-1">
        <span className="text-5xl md:text-[56px] font-display font-black text-white tracking-tight tabular-nums leading-none drop-shadow-sm">
          {stats.tdee.toLocaleString()}
        </span>
        <span className="text-sm font-medium font-mono text-zinc-400">
          kcal / day
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-[11px] text-zinc-400 mt-2 font-sans">
        Based on <span className="text-zinc-200 font-semibold">{stats.weeksOfData} weeks</span> of metabolic data
      </p>

      {/* Confidence indicator
      <div className="mt-4 pt-3 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] font-semibold mb-1.5">
          <span className="text-zinc-500 uppercase tracking-wider">Confidence</span>
          <span className="text-orange-400 tabular-nums">{stats.confidence}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-1000"
            style={{ width: `${stats.confidence}%` }}
          />
        </div> */}
      {/* </div> */}
    </motion.div>
  )
}
