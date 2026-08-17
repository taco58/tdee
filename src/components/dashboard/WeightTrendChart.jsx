"use client"

import React, { useState, memo } from "react"
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

const CustomWeightTooltip = ({
  active,
  payload,
  label,
  weightUnit = "lbs",
  targetWeight = null,
}) => {
  if (active && payload && payload.length) {
    const rawVal = payload.find((p) => p.dataKey === "weight")?.value
    const avgVal = payload.find((p) => p.dataKey === "rollingAvg")?.value
    const diff = rawVal && avgVal ? (rawVal - avgVal).toFixed(1) : null
    const distToGoal = targetWeight && avgVal ? (avgVal - targetWeight).toFixed(1) : null

    return (
      <div className="bg-[#0D0D0D] border border-white/10 p-3.5 rounded-xl shadow-2xl text-xs text-white min-w-[170px]">
        <p className="font-bold text-zinc-300 border-b border-white/10 pb-1.5 mb-2">
          {label}
        </p>
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400" /> Daily
              Weight:
            </span>
            <span className="font-bold text-white">
              {rawVal} {weightUnit}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#F97316]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> 7-Day
              Trend:
            </span>
            <span className="font-bold">
              {avgVal} {weightUnit}
            </span>
          </div>
          {targetWeight && (
            <div className="flex justify-between items-center text-emerald-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Goal:
              </span>
              <span className="font-bold">
                {targetWeight} {weightUnit}
              </span>
            </div>
          )}
          {diff !== null && (
            <div className="pt-1.5 border-t border-white/10 flex justify-between text-[11px] text-white/50 font-sans">
              <span>Fluctuation:&nbsp;</span>
              <span className="text-white-400 font-medium">
                {diff > 0 ? `+${diff}` : diff} {weightUnit} vs avg
              </span>
            </div>
          )}
          {distToGoal !== null && (
            <div className="pt-1 flex justify-between text-[11px] text-emerald-400/80 font-sans">
              <span>Dist to Goal:&nbsp;</span>
              <span className="font-medium">
                {Math.abs(parseFloat(distToGoal))} {weightUnit} {parseFloat(distToGoal) > 0 ? "to lose" : "to gain"}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

const RANGE_OPTIONS = [
  { id: "week", label: "Week", days: 7 },
  { id: "month", label: "Month", days: 30 },
  { id: "year", label: "Year", days: 365 },
  { id: "all", label: "All", days: null },
]

const WeightTrendChart = memo(function WeightTrendChart({ weightData, weightUnit = "lbs", targetWeight = null }) {
  const [selectedRange, setSelectedRange] = useState("month")

  const selectedDays = RANGE_OPTIONS.find((r) => r.id === selectedRange)?.days
  const filteredData = selectedDays
    ? weightData.slice(-selectedDays)
    : weightData

  const allWeights = filteredData
    .flatMap((d) => [d.weight, d.rollingAvg, targetWeight])
    .filter((w) => typeof w === "number" && !isNaN(w) && w > 0)

  const minWeight = allWeights.length
    ? Math.floor(Math.min(...allWeights) - 1)
    : "dataMin - 1"
  const maxWeight = allWeights.length
    ? Math.ceil(Math.max(...allWeights) + 1)
    : "dataMax + 1"

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Weight Trend
          </h3>
          <p className="text-[11px] text-zinc-500">
            Daily logs vs rolling average ({weightUnit})
          </p>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-[2px] bg-zinc-500 rounded-full"
              style={{ borderTop: "1px dashed #71717a" }}
            />
            <span>Daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] bg-orange-500 rounded-full" />
            <span className="text-zinc-300 font-semibold">Trend</span>
          </div>
          {targetWeight && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-[2px] bg-emerald-400 rounded-full" />
              <span className="text-emerald-400 font-semibold">Goal</span>
            </div>
          )}
        </div>
      </div>

      {weightData.length >= 7 ? (
        <div className="space-y-4">
          <div className="h-[200px] md:h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
              >
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
                  interval="preserveEnd"
                />

                <YAxis
                  domain={[minWeight, maxWeight]}
                  width={60}
                  tickLine={false}
                  axisLine={false}
                  tick={({ x, y, payload }) => (
                    <text x={x} y={y} dy={3} fill="#94A3B8" fontSize={9} textAnchor="end">
                      {payload.value} {weightUnit}
                    </text>
                  )}
                />

                <Tooltip
                  content={
                    <CustomWeightTooltip
                      weightUnit={weightUnit}
                      targetWeight={targetWeight}
                    />
                  }
                />

                {targetWeight && (
                  <ReferenceLine
                    y={targetWeight}
                    stroke="#10B981"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `Goal ${targetWeight} ${weightUnit}`,
                      fill: "#10B981",
                      fontSize: 10,
                      position: "insideBottomRight",
                    }}
                  />
                )}

                <Line
                  type="monotone"
                  dataKey="weight"
                  name="Daily Weight"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={filteredData.length <= 30 ? { fill: "#94A3B8", r: 2.5, strokeWidth: 0 } : false}
                  activeDot={{
                    r: 5,
                    fill: "#FFFFFF",
                    stroke: "#F97316",
                    strokeWidth: 2,
                  }}
                />

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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-semibold hidden sm:inline">
              Time Horizon
            </span>
            <div className="w-full sm:w-auto flex justify-center">
              <div className="w-full max-w-xs sm:max-w-none flex items-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-1 gap-1 shadow-lg shadow-black/20">
                {RANGE_OPTIONS.map((r) => {
                  const isSelected = selectedRange === r.id
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRange(r.id)}
                      className="relative flex-1 sm:flex-initial px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer select-none rounded-xl text-center"
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeGlassTab"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-orange-500/25 border border-orange-500/50 backdrop-blur-md shadow-lg shadow-orange-500/25"
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors ${
                          isSelected
                            ? "text-white font-bold drop-shadow-sm"
                            : "text-zinc-400 hover:text-white/90"
                        }`}
                      >
                        {r.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 h-[200px] md:h-[260px] flex items-center justify-center text-zinc-400 italic text-xs text-center border border-dashed border-white/10 rounded-xl">
          Log at least 7 days to see your trend curve
        </div>
      )}
    </motion.div>
  )
})

export default WeightTrendChart
