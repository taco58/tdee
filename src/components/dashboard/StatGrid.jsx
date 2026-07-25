"use client"

import React from "react"
import { motion } from "framer-motion"
import { Scale, TrendingDown, Flame, Database } from "lucide-react"

export default function StatGrid({ stats }) {
  const cards = [
    {
      title: "AVG WEIGHT",
      value: stats.avgWeight != null ? `${stats.avgWeight}` : "N/A",
      unit: stats.avgWeight != null ? "lb" : "",
      subtext: "7-day rolling average",
    },
    {
      title: "WEEKLY CHANGE",
      value: stats.daysLogged > 0 ? `${stats.weeklyDelta > 0 ? `+${stats.weeklyDelta}` : stats.weeklyDelta}` : "0.0",
      unit: "lb",
      subtext: "vs last week",
      icon: TrendingDown,
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
      {cards.map((card, idx) => {
        const IconComponent = card.icon
        return (
          <div
            key={idx}
            className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:border-white/10 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">
                {card.title}
              </span>
              {card.badge ? (
                <span
                  className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                    card.badge === "text-zinc-400"
                  }`}
                >
                  {card.badge}
                </span>
              ) : null}
            </div>

            <div className="my-0.5">
              <span className="text-xl font-bold tracking-tight tabular-nums text-white">
                {card.value}
              </span>
              <span className="text-[10px] font-medium text-zinc-400 ml-1">
                {card.unit}
              </span>
            </div>

            <p className="text-[10px] text-white/50 mt-0.5">{card.subtext}</p>
          </div>
        )
      })}
    </motion.div>
  )
}
