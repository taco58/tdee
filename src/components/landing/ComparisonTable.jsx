"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export default function ComparisonTable() {
  const rows = [
    {
      feature: "Continuous Metabolic Adaptation (EMA)",
      generic: false,
      excel: "Manual edits",
      adaptdee: "Automated real-time engine",
    },
    {
      feature: "Dynamic Weight-Adjusted Formula Baseline",
      generic: false,
      excel: false,
      adaptdee: "Weekly dynamic recalibration",
    },
    {
      feature: "Target Caloric Budget & Deficit Planner",
      generic: false,
      excel: "Static formulas",
      adaptdee: "Custom paces with live ETA",
    },
    {
      feature: "Noise & Water Weight Fluctuations Dampened",
      generic: false,
      excel: "Basic averages",
      adaptdee: "Dual-filter EMA smoothing",
    },
    {
      feature: "Mobile Quick Logging (< 10 seconds)",
      generic: false,
      excel: "Clunky on phones",
      adaptdee: "1-Click fast daily log",
    },
    {
      feature: "1-Click CSV Import / Export",
      generic: false,
      excel: "Manual copy/paste",
      adaptdee: "Full spreadsheet portability",
    },
    {
      feature: "Pricing & Paywalls",
      generic: "Free (Ad-heavy)",
      excel: "Free (Labor intensive)",
      adaptdee: "100% Free & No Ads",
    },
  ]

  return (
    <section id="comparison" className="relative py-28 px-6 border-t border-white/5 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="eyebrow mb-3 text-[#F97316]">
            WHY ADAPTDEE
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Stop relying on <span className="text-[#F97316] italic font-normal">static math</span>.
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto font-light leading-relaxed">
            Why athletes and macro-trackers switch from outdated calculators and fragile Reddit spreadsheets to AdapTDEE.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0D0D12]/90 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold w-2/5">
                  Capability
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold text-center w-1/5">
                  Static Web Calculators
                </th>
                <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold text-center w-1/5">
                  Reddit Excel Sheets
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#F97316] font-bold text-center w-1/5 bg-[#F97316]/5 border-x border-[#F97316]/20">
                  AdapTDEE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-sans">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-medium text-white/90 font-sans">
                    {row.feature}
                  </td>
                  
                  {/* Generic */}
                  <td className="py-4 px-4 text-center text-zinc-400">
                    {row.generic === false ? (
                      <div className="flex justify-center">
                        <X className="w-4 h-4 text-red-500/70" />
                      </div>
                    ) : (
                      <span className="font-mono text-[11px] text-zinc-500">{row.generic}</span>
                    )}
                  </td>

                  {/* Excel */}
                  <td className="py-4 px-4 text-center text-zinc-400">
                    {row.excel === false ? (
                      <div className="flex justify-center">
                        <X className="w-4 h-4 text-red-500/70" />
                      </div>
                    ) : (
                      <span className="font-mono text-[11px] text-zinc-500">{row.excel}</span>
                    )}
                  </td>

                  {/* Adaptdee */}
                  <td className="py-4 px-6 text-center font-bold text-[#F97316] bg-[#F97316]/5 border-x border-[#F97316]/20">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-400">
                      <Check className="w-4 h-4 text-[#F97316]" />
                      <span className="text-white text-xs font-mono">{row.adaptdee}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
