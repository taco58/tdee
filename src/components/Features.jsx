"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card } from "./ui/Card"
import { Zap, BarChart3, Brain } from "lucide-react"

const features = [
  {
    title: "Adaptive TDEE Tracking",
    description:
      "Your maintenance calories update automatically based on your actual bodyweight progress and intake history.",
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
    delay: 0.1,
  },
  {
    title: "Fast Daily Logging",
    description:
      "Log weight and calories in seconds with a mobile-first interface designed for consistency.",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    delay: 0.2,
  },
  {
    title: "Smart Recommendations",
    description:
      "Receive updated calorie targets that adjust using real data instead of static, inaccurate formulas.",
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    delay: 0.3,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden">
      <div
        className="absolute pointer-events-none inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto py-15 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
            Powerful Adaptive Intelligence
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Traditional calculators use static formulas. We use your own data to
            build a personalized metabolic model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-[#0a0a0a] hover:bg-[#111111] hover:border-orange-500 transition-colors border-white/5 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
