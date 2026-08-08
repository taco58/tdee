"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardInfoModal({ isOpen, onClose }) {
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      setDontShowAgain(localStorage.getItem("adaptdee_dismiss_guide") === "true")
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => {
    if (typeof window !== "undefined") {
      if (dontShowAgain) {
        localStorage.setItem("adaptdee_dismiss_guide", "true")
      } else {
        localStorage.removeItem("adaptdee_dismiss_guide")
      }
    }
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto text-left hide-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div>
              <span className="eyebrow block mb-1">USER GUIDE</span>
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                How Adaptive TDEE Works
              </h2>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs font-mono"
            >
              ✕
            </button>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-sm text-zinc-300 font-light leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <span className="text-xs font-mono font-semibold text-[#F97316] uppercase tracking-widest block mb-2">
                01 · The Science
              </span>
              <h3 className="font-display text-base font-bold text-white mb-2">
                Dynamic Energy Balance Modeling
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Static TDEE formulas (like Mifflin-St Jeor) use population averages that miss your unique metabolic rate. AdapTDEE calculates your expenditure directly from physics: comparing your rate of scale weight change against your logged calorie intake over time.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <span className="text-xs font-mono font-semibold text-[#F97316] uppercase tracking-widest block mb-2">
                02 · Best Practices
              </span>
              <h3 className="font-display text-base font-bold text-white mb-2">
                Logging for Maximum Precision
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-mono font-bold">•</span>
                  <span><strong>Morning Scale Weight:</strong> Step on the scale after waking up and using the restroom, before eating or drinking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-mono font-bold">•</span>
                  <span><strong>Average Intake Over Perfection:</strong> Log as accurately as possible. Consistent weekly averages matter far more than single-day calorie precision.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] font-mono font-bold">•</span>
                  <span><strong>Ignore Daily Spikes:</strong> Sodium, carbs, and hydration cause temporary scale fluctuations. Our exponential smoothing algorithm filters out water weight noise.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <span className="text-xs font-mono font-semibold text-[#F97316] uppercase tracking-widest block mb-2">
                03 · Adaptation Timeline
              </span>
              <h3 className="font-display text-base font-bold text-white mb-2">
                Model Confidence Progress
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">Weeks 1–2</span>
                  <p className="text-xs text-white font-semibold mb-1">Formula Baseline</p>
                  <p className="text-[11px] text-zinc-400">Initial estimate based on your height, weight, age & activity level.</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] block mb-1">Weeks 3–4</span>
                  <p className="text-xs text-white font-semibold mb-1">Model Convergence</p>
                  <p className="text-[11px] text-zinc-400">Algorithm weights actual bodyweight changes over formula estimates.</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">Weeks 6+</span>
                  <p className="text-xs text-white font-semibold mb-1">100% Adaptive TDEE</p>
                  <p className="text-[11px] text-zinc-400">Fully tailored to your metabolic rate, updating automatically every week.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="flex items-center gap-2.5 text-xs text-zinc-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => {
                  const checked = e.target.checked
                  setDontShowAgain(checked)
                  if (typeof window !== "undefined") {
                    if (checked) {
                      localStorage.setItem("adaptdee_dismiss_guide", "true")
                    } else {
                      localStorage.removeItem("adaptdee_dismiss_guide")
                    }
                  }
                }}
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#F97316] focus:ring-0 accent-[#F97316] cursor-pointer"
              />
              <span>Don&apos;t show this automatically on login</span>
            </label>

            <button
              onClick={handleClose}
              className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Got it
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
