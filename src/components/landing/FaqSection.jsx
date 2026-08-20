"use client"

import React, { useState } from "react"

const faqs = [
  {
    q: "How long does it take for my Adapted TDEE to become accurate?",
    a: "Our engine provides an initial baseline starting on day 1 based on the Mifflin-St Jeor formula. As you log daily weights and caloric intake, the dual Exponential Moving Average (EMA) progressively weights your real metabolic expenditure. By weeks 2 to 3, the engine has filtered out water-weight anomalies and reaches high statistical confidence.",
  },
  {
    q: "What happens if I miss a day or forget to log?",
    a: "Don't worry! Our gap-filling algorithm smoothly bridges isolated missing days without breaking your trend or corrupting your metabolic curve. When you weigh in or log calories again the next day, the model seamlessly recalculates your expenditure.",
  },
  {
    q: "Can I import my past data from MyFitnessPal, MacroFactor, or Excel spreadsheets?",
    a: "Yes. AdapTDEE includes a full 1-click CSV Import & Export utility. You can export your historical weight and calorie logs from popular tracking apps or spreadsheets, upload the CSV in your profile menu, and immediately unlock your adapted TDEE from day one.",
  },
  {
    q: "Why is my true TDEE different from standard online calculators?",
    a: "Standard online calculators use static population averages that cannot account for your unique Non-Exercise Activity Thermogenesis (NEAT), individual metabolic adaptation during deficits, body composition variations, or training volume. AdapTDEE measures what your body actually burns based on real-world thermodynamic outcomes.",
  },
  {
    q: "How does the Dynamic Goal Planner work?",
    a: "When you select Weight Loss, Maintenance, or Weight Gain and choose your target pace (e.g. 1.0 lb/week), the planner automatically computes your required daily calorie delta (deficit or surplus). Because your TDEE updates dynamically as your body changes, your target nutrition budget automatically recalculates to keep you on schedule and prevent plateaus.",
  },
  {
    q: "Is AdapTDEE completely free to use?",
    a: "Yes, AdapTDEE is 100% free with no subscription paywalls, no locked charts, and no ads. You have full access to continuous adaptive calculations, historical analytics, goal planning, and CSV data export.",
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="relative py-28 px-6 border-t border-white/5 bg-[#0D0D12]">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="eyebrow mb-3 text-[#F97316]">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Everything you need to <span className="text-[#F97316] italic font-normal">know</span>.
          </h2>
          <p className="text-sm text-white/50 max-w-md mx-auto font-light leading-relaxed">
            Answers to common questions about adaptive metabolic modeling and tracking.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-[#0A0A0F] overflow-hidden transition-colors hover:border-white/10"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left cursor-pointer select-none gap-4"
                >
                  <span className="text-sm md:text-base font-semibold text-white font-sans">
                    {faq.q}
                  </span>
                  <span className="text-sm font-mono text-[#F97316] font-bold shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-xs md:text-sm text-zinc-400 font-light font-sans leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
