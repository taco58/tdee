"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card } from "./ui/Card"

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 px-6 overflow-hidden bg-[#242424]">
      {/* Full-width background glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[600px] bg-orange-600/5 blur-[50px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-center">
          {/* Decorative background elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-[320px] aspect-[9/19] bg-[#050505] rounded-[3rem] border-[10px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />

            {/* Mockup Dashboard Content */}
            <div className="h-full pt-10 pb-6 px-5 overflow-y-hidden hide-scrollbar bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">
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
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">
                  Predicted TDEE
                </p>
                <p className="text-3xl font-black text-white mb-4">
                  2,842{" "}
                  <span className="text-sm font-normal text-white/40 italic">
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
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">
                    Weight
                  </p>
                  <p className="text-lg font-bold text-white">
                    184.2 <span className="text-[10px] font-normal">lbs</span>
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-1">-0.8 lbs</p>
                </Card>
                <Card
                  variant="outline"
                  className="p-4 bg-white/[0.02] border-white/5"
                >
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">
                    Avg Intake
                  </p>
                  <p className="text-lg font-bold text-white">
                    2,450 <span className="text-[10px] font-normal">kcal</span>
                  </p>
                  <p className="text-[10px] text-green-400 mt-1">On Track!</p>
                </Card>
              </div>

              {/* Large Chart Area */}
              <Card
                variant="outline"
                className="p-5 bg-white/[0.02] border-white/5 mb-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <p className="text-xs font-bold text-white/80">
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
                      stroke="#ffab77"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 20 Q 10 15, 20 25 T 40 10 T 60 20 T 80 5 T 100 15 V 40 H 0 Z"
                      fill="url(#gradient)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </Card>

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
        </div>
      </div>
    </section>
  )
}
