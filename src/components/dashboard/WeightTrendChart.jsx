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
} from "recharts"

// Custom High-Contrast Tooltip
const CustomWeightTooltip = ({ active, payload, label, weightUnit = "lbs" }) => {
  if (active && payload && payload.length) {
    const rawVal = payload.find((p) => p.dataKey === "weight")?.value
    const avgVal = payload.find((p) => p.dataKey === "rollingAvg")?.value
    const diff = rawVal && avgVal ? (rawVal - avgVal).toFixed(1) : null

    return (
      <div className="bg-[#0D0D0D] border border-white/10 p-3.5 rounded-xl shadow-2xl text-xs text-white min-w-[170px]">
        <p className="font-bold text-zinc-300 border-b border-white/10 pb-1.5 mb-2">
          {label}
        </p>
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400" /> Daily Weight:
            </span>
            <span className="font-bold text-white">{rawVal} {weightUnit}</span>
          </div>
          <div className="flex justify-between items-center text-[#F97316]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> 7-Day Trend:
            </span>
            <span className="font-bold">{avgVal} {weightUnit}</span>
          </div>
          {diff !== null && (
            <div className="pt-1.5 border-t border-white/10 flex justify-between text-[11px] text-white/50 font-sans">
              <span>Fluctuation:&nbsp;</span>
              <span className="text-white-400 font-medium">
                {diff > 0 ? `+${diff}` : diff} {weightUnit} vs avg
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export default function WeightTrendChart({ weightData, weightUnit = "lbs" }) {
  // Calculate min and max for nicely padded Y-axis
  const weights = weightData.map((d) => d.weight).filter(Boolean)
  const minWeight = Math.floor(Math.min(...weights, 148)) - 1
  const maxWeight = Math.ceil(Math.max(...weights, 155)) + 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl"
    >
      {/* Header with Title & Legend */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Weight Trend
          </h3>
          <p className="text-[11px] text-zinc-500">6 weeks · daily logs vs rolling average ({weightUnit})</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[2px] bg-zinc-500 rounded-full" style={{ borderTop: '1px dashed #71717a' }} />
            <span>Daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] bg-orange-500 rounded-full" />
            <span className="text-zinc-300 font-semibold">Trend</span>
          </div>
        </div>
      </div>

      {weightData.length >= 7 ? (
        <div className="h-[200px] md:h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weightData}
              margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
            >
              {/* Horizontal Subtle Gridlines for Clear Value Estimation */}
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
                interval={6}
              />

              <YAxis
                domain={[minWeight, maxWeight]}
                width={50}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94A3B8", fontSize: 9, dx: -6 }}
                unit={` ${weightUnit}`}
              />

              <Tooltip content={<CustomWeightTooltip weightUnit={weightUnit} />} />

              {/* Line 1: Daily Raw Weight Logs with Dots */}
              <Line
                type="monotone"
                dataKey="weight"
                name="Daily Weight"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={{ fill: "#94A3B8", r: 2.5, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: "#FFFFFF",
                  stroke: "#F97316",
                  strokeWidth: 2,
                }}
              />

              {/* Line 2: 7-Day Smooth Rolling Average */}
              <Line
                type="monotone"
                dataKey="rollingAvg"
                name="7-Day Trend"
                stroke="#F97316"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#F97316",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[200px] md:h-[260px] flex items-center justify-center text-zinc-400 italic text-xs text-center border border-dashed border-white/10 rounded-xl">
          Log at least 7 days to see your trend curve
        </div>
      )}
    </motion.div>
  )
}
