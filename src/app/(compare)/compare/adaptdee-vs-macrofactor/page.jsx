import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Info, Check, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "AdapTDEE vs MacroFactor: Adaptive TDEE Algorithm Comparison | AdapTDEE",
  description:
    "Compare the adaptive TDEE algorithms of AdapTDEE and MacroFactor. Explore exponential weight smoothing, adherence-neutral thermodynamics, and expenditure recalibration.",
  keywords: [
    "AdapTDEE vs MacroFactor",
    "MacroFactor algorithm comparison",
    "adaptive TDEE algorithm",
    "MacroFactor free alternative",
    "how does MacroFactor calculate TDEE",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/compare/adaptdee-vs-macrofactor",
  },
  openGraph: {
    title: "AdapTDEE vs MacroFactor: Adaptive TDEE Algorithm Comparison",
    description:
      "A deep dive into the metabolic expenditure mechanisms of AdapTDEE and MacroFactor.",
    url: "https://adaptdee.xyz/compare/adaptdee-vs-macrofactor",
    type: "article",
  },
}

export default function AdaptdeeVsMacroFactorPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-12">
          <p className="eyebrow mb-3 text-[#F97316]">
            ALGORITHM COMPARISON
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            AdapTDEE vs <span className="text-[#F97316] italic font-normal">MacroFactor</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Both apps belong to the new generation of adherence-neutral, adaptive metabolic trackers. Here is how their underlying TDEE mechanisms compare.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/signup">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Track Your Adaptive TDEE Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="p-6 md:p-8 rounded-3xl bg-[#0A0A0F] border border-[#F97316]/30 bg-[#F97316]/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-[#F97316] font-mono text-xs uppercase tracking-wider font-semibold">
              <Info className="w-4 h-4 shrink-0" />
              <span>Tool Distinction</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold font-display text-white">
              Metabolic Expenditure Engine vs. Full Food Database App
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              MacroFactor is an all-in-one food tracking app with a built-in barcode scanner and proprietary expenditure algorithm. <strong className="text-white">AdapTDEE is a dedicated metabolic expenditure calculator</strong>: you can log your food in any free app or estimate your calories, and spend 5 seconds entering your total daily calories and morning weight to let our thermodynamic engine calculate your true expenditure.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              TDEE Mechanism Comparison
            </h2>

            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full text-left text-xs font-light">
                <thead className="bg-[#0A0A0F] text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6">TDEE Mechanism</th>
                    <th className="py-4 px-6 text-[#F97316] font-bold">AdapTDEE</th>
                    <th className="py-4 px-6 text-zinc-400">MacroFactor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0D0D12]">
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Core Math Model</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Thermodynamic Mass Delta (Energy In vs Out)</td>
                    <td className="py-4 px-6 text-zinc-300 font-mono">Energy Balance Algorithm</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Water Weight Smoothing</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Exponential Moving Average (EMA)</td>
                    <td className="py-4 px-6 text-zinc-300 font-mono">Proprietary Trend Weight</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Adherence Neutrality</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">100% Adherence-Neutral</td>
                    <td className="py-4 px-6 text-zinc-300 font-mono">100% Adherence-Neutral</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Algorithm Transparency</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Fully Published &amp; Cited</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">Closed Proprietary IP</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Wearable Step / Burn Dependency</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">None (Eliminates watch error)</td>
                    <td className="py-4 px-6 text-zinc-300 font-mono">None (Calculates burn from mass)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Annual Cost</td>
                    <td className="py-4 px-6 text-emerald-400 font-bold font-mono">100% Free ($0)</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">$71.99/year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              How the Mathematical Mechanism Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/5 space-y-3">
                <h3 className="text-base font-bold font-display text-white">1. Adherence-Neutral Solving</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Traditional apps assume you ate your target and penalize you when you overeat. Both AdapTDEE and MacroFactor use adherence-neutral math: your expenditure is calculated strictly from what you <em>actually consumed</em> vs. how your weight trend moved, removing guilt and shame from tracking.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/5 space-y-3">
                <h3 className="text-base font-bold font-display text-white">2. Filtering Scale Noise</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  A high-sodium meal or intense workout causes 2–4 lbs of acute fluid retention. The algorithm filters daily noise using exponential smoothing, isolating true fat/muscle changes from transient water weight spikes.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Get MacroFactor-Grade Metabolic Modeling for Free
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              If you want the scientific power of adaptive expenditure calculations without a $71.99/year subscription or manual food database friction, AdapTDEE provides the exact same mathematical clarity.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
