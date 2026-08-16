import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Info, X, Check } from "lucide-react"

export const metadata = {
  title: "AdapTDEE vs MyFitnessPal: Adaptive TDEE vs Static Formula Calories | AdapTDEE",
  description:
    "Compare the TDEE calculation mechanisms of AdapTDEE and MyFitnessPal. Learn why static formulas with exercise calorie add-backs lead to plateaus and how adaptive modeling solves it.",
  keywords: [
    "AdapTDEE vs MyFitnessPal",
    "MyFitnessPal TDEE mechanism",
    "why MyFitnessPal calories are wrong",
    "eating back exercise calories",
    "adaptive TDEE vs static formula",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/compare/adaptdee-vs-myfitnesspal",
  },
  openGraph: {
    title: "AdapTDEE vs MyFitnessPal: Adaptive TDEE vs Static Calories",
    description:
      "A deep dive into why static calorie formulas fail and how adaptive expenditure works.",
    url: "https://adaptdee.xyz/compare/adaptdee-vs-myfitnesspal",
    type: "article",
  },
}

export default function AdaptdeeVsMyFitnessPalPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-12">
          <p className="eyebrow mb-3 text-[#F97316]">
            EXPENDITURE MECHANISMS
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            AdapTDEE vs <span className="text-[#F97316] italic font-normal">MyFitnessPal</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Why do millions of dieters hit weight loss plateaus on MyFitnessPal? It comes down to a fundamental flaw in how energy expenditure is calculated.
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
              AdapTDEE is a Metabolic Engine, Not a Food Diary
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              MyFitnessPal is designed for looking up foods in a large database. However, its energy expenditure calculations are static. <strong className="text-white">AdapTDEE does not replace your food diary</strong>: you can continue using MyFitnessPal to log meals, and enter your total daily calories into AdapTDEE each night to calculate your true, dynamic expenditure.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              TDEE Mechanism Breakdown
            </h2>

            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full text-left text-xs font-light">
                <thead className="bg-[#0A0A0F] text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6">Mechanism</th>
                    <th className="py-4 px-6 text-[#F97316] font-bold">AdapTDEE</th>
                    <th className="py-4 px-6 text-zinc-400">MyFitnessPal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0D0D12]">
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">TDEE Calculation Method</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Dynamic Thermodynamic Balance</td>
                    <td className="py-4 px-6 text-red-400 font-mono">Static 1990 Formula (Day 1)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Exercise Calorie Handling</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Inherently captured in weight trends</td>
                    <td className="py-4 px-6 text-red-400 font-mono">&quot;Adds back&quot; watch estimates (overestimated)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Metabolic Adaptation Response</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Lowers target automatically as NEAT drops</td>
                    <td className="py-4 px-6 text-red-400 font-mono">Ignored (Keeps target static)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Scale Weight Interpretation</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Smoothed Trend (EMA filter)</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">Raw daily scale weight only</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-white">Psychological Framing</td>
                    <td className="py-4 px-6 text-emerald-400 font-mono">Adherence-neutral data</td>
                    <td className="py-4 px-6 text-red-400 font-mono">Red negative numbers (Goal failure)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              The &quot;Eating Back Exercise Calories&quot; Flaw
            </h2>

            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 space-y-4 text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <p>
                MyFitnessPal calculates a static calorie goal, and then connects to smartwatches to &quot;add back&quot; workout calories.
              </p>
              <p>
                <strong>Why this breaks fat loss:</strong> Clinical studies show smartwatches overestimate workout expenditure by 25% to 60%. If your watch claims a 600-calorie workout burn that was actually 350 calories, eating back 600 calories erases your entire daily deficit.
              </p>
              <p>
                <strong className="text-white">The AdapTDEE Solution:</strong> We never add back arbitrary watch calories. Instead, your actual rate of mass change over 2–3 weeks directly reveals your total energy burn—automatically accounting for workouts, daily steps, and metabolic slowdown without guesswork.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Upgrade Your Tracking Intelligence
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Pair your food logging with AdapTDEE to ensure your calorie goals adapt to your real metabolism.
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
