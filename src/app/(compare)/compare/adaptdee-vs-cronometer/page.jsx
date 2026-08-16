import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Info } from "lucide-react"

export const metadata = {
  title: "AdapTDEE vs Cronometer: Adaptive TDEE vs Wearable Energy Estimates | AdapTDEE",
  description:
    "Compare the energy expenditure calculation mechanisms of AdapTDEE and Cronometer. Learn how thermodynamic trend modeling replaces wearable calorie inaccuracies.",
  keywords: [
    "AdapTDEE vs Cronometer",
    "Cronometer TDEE calculation",
    "Cronometer energy expenditure",
    "wearable calorie accuracy Cronometer",
    "adaptive TDEE vs Cronometer",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/compare/adaptdee-vs-cronometer",
  },
  openGraph: {
    title: "AdapTDEE vs Cronometer: Adaptive TDEE vs Wearable Energy Estimates",
    description:
      "A comparison of the energy expenditure calculation methods in Cronometer and AdapTDEE.",
    url: "https://adaptdee.xyz/compare/adaptdee-vs-cronometer",
    type: "article",
  },
}

export default function AdaptdeeVsCronometerPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-12">
          <p className="eyebrow mb-3 text-[#F97316]">
            EXPENDITURE MECHANISMS
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            AdapTDEE vs <span className="text-[#F97316] italic font-normal">Cronometer</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Cronometer is the gold standard for micronutrient logging, while AdapTDEE solves metabolic adaptation. Here is how their energy expenditure mechanisms differ.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/signup">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Track Adaptively Free
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
              Thermodynamic Energy Solver vs. Micronutrient Database
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Cronometer is built for tracking vitamins, minerals, and detailed recipe ingredients. <strong className="text-white">AdapTDEE is not a food diary</strong>: it takes your total daily calorie intake and morning scale weight, applies exponential weight smoothing, and calculates your true metabolic expenditure over time.
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
                    <th className="py-4 px-6">Mechanism</th>
                    <th className="py-4 px-6 text-[#F97316] font-bold">AdapTDEE</th>
                    <th className="py-4 px-6 text-zinc-400">Cronometer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0D0D12]">
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Energy Expenditure Source</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Thermodynamic Weight Trend Delta</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">Static BMR + Wearable Active Sync</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Wearable Sync Error Risk</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Zero (Derives burn from real mass)</td>
                    <td className="py-4 px-6 text-amber-400 font-mono">Subject to wearable burn inaccuracies</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Metabolic Adaptation Recalibration</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Automatic weekly recalibration</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">Requires manual profile adjustments</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Scale Water Weight Filtering</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Exponential Moving Average (EMA)</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">Raw scale weigh-ins</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Daily Logging Friction</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">&lt; 5 seconds (2 numbers)</td>
                    <td className="py-4 px-6 text-zinc-400">10–15 minutes (Full micronutrient logs)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              Why Dynamic Trend Solving Beats Wearable Sync
            </h2>

            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 space-y-4 text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <p>
                Cronometer calculates total burn by adding Garmin, Apple Watch, or Fitbit exercise calories onto a static BMR formula.
              </p>
              <p>
                While wearable integration feels high-tech, optical heart rate sensors cannot accurately measure non-exercise physical activity (NEAT) or metabolic downregulation during a cut.
              </p>
              <p>
                <strong className="text-white">AdapTDEE bypasses wearable error:</strong> By applying the first law of thermodynamics to your smoothed scale weight, the algorithm measures your body&apos;s true net energy expenditure directly.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              The Ideal Pairing
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Log your micronutrients and vitamins in Cronometer, and enter your daily calorie sum into AdapTDEE to keep your calorie goals dynamically adjusted as your body changes.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Start Tracking Free
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
