"use client"

import React from "react"
import { motion } from "framer-motion"

const features = [
  {
    num: "01",
    title: "Metabolic Modelling",
    description:
      "Our math engine tracks weight change rates relative to calorie logs, building a personalized metabolic profile that updates dynamically.",
    delay: 0.1,
  },
  {
    num: "02",
    title: "Daily Logging Utility",
    description:
      "A distraction-free interface optimized for consistency. Track weight entries and calorie numbers in under 30 seconds daily.",
    delay: 0.2,
  },
  {
    num: "03",
    title: "Thermodynamic Targets",
    description:
      "Automatic weekly targets based on your calculated expenditure. Scale weight changes dictate target shifts so you never plateau.",
    delay: 0.3,
  }
]

export default function Features() {
  return (
    <section id="features" className="relative py-28 px-6 border-t border-white/5 z-10">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">
            THE DETAILS
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Your number, <span className="text-[#F97316] italic font-normal">refined</span> every week.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="p-6 bg-[#0D0D0D] border border-white/5 transition-colors flex flex-col h-full text-left rounded-2xl">
                <span className="text-xs font-mono font-semibold text-[#F97316] mb-4 tracking-widest">
                  {feature.num}
                </span>
                <h3 className="font-display text-base font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

