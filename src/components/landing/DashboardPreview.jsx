"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card } from "../ui/Card"

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-10 w-full max-w-[320px] aspect-[9/19] bg-[#050505] rounded-[3rem] border-[10px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden text-left font-light"
    >
      {/* Phone Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />

      {/* Mockup Dashboard Content */}
      <div className="h-full pt-10 pb-6 px-5 overflow-y-hidden hide-scrollbar bg-[#0a0a0a] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-medium text-white tracking-tight">
              Analytics
            </h3>
            <div className="w-8 h-8 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-orange-500" />
            </div>
          </div>

          {/* TDEE Card */}
          <Card
            variant="outline"
            className="p-5 bg-white/[0.02] border-white/5 mb-6"
          >
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">
              Predicted TDEE
            </p>
            <p className="text-3xl font-light text-white mb-4">
              2,842{" "}
              <span className="text-xs font-normal text-white/40 italic">
                kcal
              </span>
            </p>

            {/* Mini Chart Mockup */}
            <div className="flex items-end gap-1 h-16 w-full mt-2">
              {[40, 60, 45, 70, 55, 85, 65, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-orange-600/20 rounded-t-sm relative group overflow-hidden"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-orange-500 rounded-t-sm" />
                </div>
              ))}
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card
              variant="outline"
              className="p-4 bg-white/[0.02] border-white/5"
            >
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">
                Weight
              </p>
              <p className="text-lg font-medium text-white">
                184.2 <span className="text-xs font-normal text-white/40">lbs</span>
              </p>
              <p className="text-[10px] text-emerald-400 mt-1 font-medium">-0.8 lbs</p>
            </Card>
            <Card
              variant="outline"
              className="p-4 bg-white/[0.02] border-white/5"
            >
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">
                Avg Intake
              </p>
              <p className="text-lg font-medium text-white">
                2,450 <span className="text-xs font-normal text-white/40">kcal</span>
              </p>
              <p className="text-[10px] text-[#F97316] mt-1 font-medium">On Track!</p>
            </Card>
          </div>

          {/* Large Chart Area */}
          <Card
            variant="outline"
            className="p-5 bg-white/[0.02] border-white/5 mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs font-semibold text-white/80">
                Weight Trend
              </p>
              <p className="text-[10px] text-white/40">Last 30 days</p>
            </div>
            <div className="relative h-32 w-full flex items-center justify-center">
              {/* SVG Wave Line Mockup */}
              <svg
                viewBox="0 0 100 40"
                className="w-full h-full overflow-visible"
              >
                <path
                  d="M0 20 Q 10 15, 20 25 T 40 10 T 60 20 T 80 5 T 100 15"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 20 Q 10 15, 20 25 T 40 10 T 60 20 T 80 5 T 100 15 V 40 H 0 Z"
                  fill="url(#gradient)"
                  opacity="0.05"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </Card>
        </div>

        {/* Bottom Nav Mockup */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={
                i === 1
                  ? "w-8 h-8 rounded-lg bg-orange-600/20"
                  : "w-8 h-8 rounded-lg bg-white/5"
              }
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
