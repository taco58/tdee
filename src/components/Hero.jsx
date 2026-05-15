"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import DashboardPreview from "./DashboardPreview"
import { cn } from "@/lib/utils"
import { TrendingUp, Activity, Calendar, Target } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="h-150 absolute pointer-events-none inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_top,transparent,black_40%,black_90%,transparent)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Stop Guessing Your <br />
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 italic font-black`}
            >
              Calories.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
            Adaptive TDEE uses your real bodyweight trends and calorie intake to
            calculate your true maintenance, automatically. No more generic
            calculators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href = "/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 mx-autooverflow-hidden"
          >
            {/* Phone Screen Mockup Content */}
            <DashboardPreview />
          </motion.div>

          {/* Floating Cards */}
          <FloatingCard
            icon={<Activity className="w-5 h-5 text-blue-400" />}
            label="Estimated TDEE"
            value="2,842 kcal"
            trend="+12"
            className="top-10 -left-4 md:-left-20"
            delay={0.4}
          />
          <FloatingCard
            icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
            label="Weight Trend"
            value="184.2 lbs"
            trend="-0.8"
            className="top-40 -right-4 md:-right-20"
            delay={0.6}
          />
          <FloatingCard
            icon={<Calendar className="w-5 h-5 text-purple-400" />}
            label="Weekly Average"
            value="2,450 kcal"
            className="bottom-20 -left-8 md:-left-32"
            delay={0.8}
          />
          <FloatingCard
            icon={<Target className="w-5 h-5 text-orange-400" />}
            label="Calorie Target"
            value="2,342 kcal"
            className="bottom-40 -right-12 md:-right-32"
            delay={1.0}
          />
        </div>
      </div>
    </section>
  )
}

function FloatingCard({ icon, label, value, trend, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn("absolute hidden sm:block z-20", className)}
    >
      <Card variant="glass" className="p-4 min-w-[180px] border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/5 rounded-lg border border-white/5">
            {icon}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
              {label}
            </p>
            <p className="text-lg font-bold text-white">{value}</p>
          </div>
        </div>
        {trend && (
          <div
            className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block",
              trend.startsWith("+")
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-400",
            )}
          >
            {trend} this week
          </div>
        )}
      </Card>
    </motion.div>
  )
}
