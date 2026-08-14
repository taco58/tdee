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

const CustomTdeeTooltip = ({ active, payload, label, formulaEstimate }) => {
  if (active && payload && payload.length) {
    const tdeeVal = payload.find((p) => p.dataKey === "tdee")?.value
    const formulaVal = payload.find((p) => p.dataKey === "formula")?.value ?? formulaEstimate
    const diff = tdeeVal && formulaVal ? tdeeVal - formulaVal : 0

    return (
      <div className="bg-[#0D0D0D] border border-white/10 p-3.5 rounded-xl shadow-2xl text-xs text-white min-w-[190px]">
        <p className="font-bold text-zinc-300 border-b border-white/10 pb-1.5 mb-2 font-mono">
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
              <span className="w-2 h-2 rounded-full bg-zinc-400" /> Formula Baseline:
            </span>
            <span>{formulaVal} kcal</span>
          </div>
          <div className="pt-1.5 border-t border-white/10 flex justify-between text-[11px] font-sans">
            <span className="text-zinc-400">Metabolic Adaptation:</span>
            <span className={diff >= 0 ? "text-[#F97316] font-semibold" : "text-emerald-400 font-semibold"}>
              {diff >= 0 ? `+${diff}` : diff} kcal
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const RANGE_OPTIONS = [
  { id: "4w", label: "4W", weeks: 4 },
  { id: "8w", label: "8W", weeks: 8 },
  { id: "12w", label: "12W", weeks: 12 },
  { id: "all", label: "All", weeks: null },
]

export default function TdeeTrendChart({ tdeeData = [], formulaEstimate = 2050, weeksOfData = 0 }) {
  const [selectedRange, setSelectedRange] = React.useState("all")

  const selectedWeeks = RANGE_OPTIONS.find((r) => r.id === selectedRange)?.weeks
  const filteredData = selectedWeeks ? tdeeData.slice(-selectedWeeks) : tdeeData

  const tdeeValues = filteredData
    .map((d) => d.tdee)
    .filter((v) => typeof v === "number" && !isNaN(v) && v > 0)
  const formulaValues = filteredData
    .map((d) => d.formula)
    .filter((v) => typeof v === "number" && !isNaN(v) && v > 0)

  const allValues = [...tdeeValues, ...formulaValues, formulaEstimate].filter((v) => typeof v === "number" && !isNaN(v) && v > 0)

  const minY = allValues.length
    ? Math.floor((Math.min(...allValues) - 50) / 50) * 50
    : 1800
  const maxY = allValues.length
    ? Math.ceil((Math.max(...allValues) + 50) / 50) * 50
    : 2300

  const hasEnoughData = weeksOfData >= 1 && tdeeData.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            TDEE Adaptation
          </h3>
          <p className="text-[11px] text-zinc-500">Weekly adapted expenditure vs weight-adjusted formula</p>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[2px] bg-zinc-400 rounded-full" style={{ borderTop: '1px dashed #71717a' }} />
            <span>Formula (Weight-Adjusted)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] bg-orange-500 rounded-full" />
            <span className="text-zinc-300 font-semibold">Adapted</span>
          </div>
        </div>
      </div>

      {hasEnoughData ? (
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
                  minTickGap={10}
                />

                <YAxis
                  domain={[minY, maxY]}
                  width={70}
                  tickLine={false}
                  axisLine={false}
                  tick={({ x, y, payload }) => (
                    <text x={x} y={y} dy={3} fill="#94A3B8" fontSize={9} textAnchor="end">
                      {payload.value} kcal
                    </text>
                  )}
                />

                <Tooltip
                  content={<CustomTdeeTooltip formulaEstimate={formulaEstimate} />}
                />

                <Line
                  type="monotone"
                  dataKey="formula"
                  name="Formula Baseline"
                  stroke="rgba(255,255,255,0.35)"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="tdee"
                  name="Adapted TDEE"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={
                    filteredData.length <= 30
                      ? {
                          fill: "#F97316",
                          stroke: "#FFFFFF",
                          strokeWidth: 2,
                          r: 4,
                        }
                      : false
                  }
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-semibold hidden sm:inline">
              Adaptation Window
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
                          layoutId="activeTdeeGlassTab"
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
        <div className="h-[180px] md:h-[220px] flex items-center justify-center text-zinc-400 italic text-xs text-center border border-dashed border-white/10 rounded-xl px-4">
          Log at least 7 days of data to unlock TDEE adaptation history
        </div>
      )}
    </motion.div>
  )
}

