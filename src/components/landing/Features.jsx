"use client"

import React from "react"
import { motion } from "framer-motion"

const features = [
  {
    tag: "01 / MODELLING",
    title: "Dual-Filter Metabolic Engine",
    description:
      "Exponential moving average algorithms dampen daily water, sodium, and glycogen fluctuations to reveal your true underlying expenditure.",
    delay: 0.05,
  },
  {
    tag: "02 / TARGETS",
    title: "Dynamic Goal Planning & ETA",
    description:
      "Set your desired rate of weight loss, gain, or maintenance. Calorie budgets and target milestone dates adjust continuously as your TDEE shifts.",
    delay: 0.1,
  },
  {
    tag: "03 / BASELINE",
    title: "Weight-Adjusted Formula Curve",
    description:
      "Unlike static 1-time calculators, our baseline dynamically recalculates with your rolling weight to accurately measure metabolic adaptation.",
    delay: 0.15,
  },
  {
    tag: "04 / DATA",
    title: "1-Click CSV Import & Export",
    description:
      "Seamlessly migrate your history from MyFitnessPal, MacroFactor, Cronometer, or Excel spreadsheets with zero data lock-in.",
    delay: 0.2,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-28 px-6 border-t border-white/5 z-10 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="eyebrow mb-3 text-[#F97316]">
            PRECISION BY DESIGN
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Engineered for <span className="text-[#F97316] italic font-normal">consistency</span>.
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto font-light leading-relaxed">
            Every feature is focused on giving you an accurate, noise-free metabolic feedback loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="p-6 bg-[#0D0D12] border border-white/5 hover:border-white/15 transition-all flex flex-col h-full text-left rounded-2xl shadow-lg">
                <span className="text-[10px] font-mono font-semibold text-[#F97316] tracking-widest uppercase mb-4">
                  {feature.tag}
                </span>
                <h3 className="font-display text-base font-bold text-white mb-2.5 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light font-sans">
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

