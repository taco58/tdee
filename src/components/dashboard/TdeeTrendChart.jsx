"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

// Custom High-Contrast Tooltip
const CustomTdeeTooltip = ({ active, payload, label, formulaEstimate }) => {
  if (active && payload && payload.length) {
    const tdeeVal = payload[0]?.value
    const diff = tdeeVal ? tdeeVal - formulaEstimate : 0

    return (
      <div className="bg-[#0D0D0D] border border-white/10 p-3.5 rounded-xl shadow-2xl text-xs text-white min-w-[180px]">
        <p className="font-bold text-zinc-300 border-b border-white/10 pb-1.5 mb-2">
          {label} Summary
        </p>
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-[#F97316]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Adapted TDEE:
            </span>
            <span className="font-bold">{tdeeVal} kcal</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400" /> Static Formula:
            </span>
            <span>{formulaEstimate} kcal</span>
          </div>
          <div className="pt-1.5 border-t border-white/10 flex justify-between text-[11px] text-white/50 font-sans">
            <span>Metabolic Variance:</span>
            <span className={diff >= 0 ? "text-[#F97316] font-medium" : "text-emerald-400 font-medium"}>
              {diff >= 0 ? `+${diff}` : diff} kcal
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function TdeeTrendChart({ tdeeData, formulaEstimate = 2050, weeksOfData = 4 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl"
    >
      {/* Header with Title & Legend */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            TDEE Adaptation
          </h3>
          <p className="text-[11px] text-zinc-500">Weekly adapted expenditure vs formula</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[2px] bg-zinc-500 rounded-full" style={{ borderTop: '1px dashed #71717a' }} />
            <span>Formula</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] bg-orange-500 rounded-full" />
            <span className="text-zinc-300 font-semibold">Adapted</span>
          </div>
        </div>
      </div>

      {weeksOfData >= 2 ? (
        <div className="h-[180px] md:h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={tdeeData}
              margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
            >
              {/* Subtle Horizontal Gridlines */}
              <CartesianGrid
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tick={{ fill: "#94A3B8", fontSize: 9, dy: 8 }}
              />

              <YAxis
                domain={[2000, 2200]}
                width={60}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94A3B8", fontSize: 9, dx: -6 }}
                unit=" kcal"
              />

              <Tooltip
                content={<CustomTdeeTooltip formulaEstimate={formulaEstimate} />}
              />

              {/* Formula Reference Line */}
              <ReferenceLine
                y={formulaEstimate}
                stroke="rgba(255,255,255,0.3)"
                strokeDasharray="4 4"
                label={{
                  value: `Formula Baseline (${formulaEstimate} kcal)`,
                  fill: "rgba(255,255,255,0.5)",
                  fontSize: 10,
                  position: "top",
                }}
              />

              {/* TDEE Line with Visible Nodes */}
              <Line
                type="monotone"
                dataKey="tdee"
                name="Adapted TDEE"
                stroke="#F97316"
                strokeWidth={3}
                dot={{
                  fill: "#F97316",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  r: 7,
                  fill: "#F97316",
                  stroke: "#FFFFFF",
                  strokeWidth: 2.5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[180px] md:h-[220px] flex items-center justify-center text-zinc-400 italic text-xs text-center border border-dashed border-white/10 rounded-xl">
          Log at least 2 weeks of data to unlock TDEE adaptation history
        </div>
      )}
    </motion.div>
  )
}
