import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import DashboardPreview from "@/components/landing/DashboardPreview"

export const metadata = {
  title: "Adaptive TDEE Calculator: Calculate Your Real Maintenance Calories",
  description:
    "Learn what Adaptive TDEE is and how to calculate your true daily energy expenditure from real weight trends and calorie logs instead of generic textbook formulas.",
  keywords: [
    "adaptive TDEE calculator",
    "adaptive TDEE",
    "what is adaptive TDEE",
    "dynamic expenditure calculator",
    "calculate TDEE from weight and calories",
    "metabolic adaptation tracker",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/adaptive-tdee",
  },
  openGraph: {
    title: "Adaptive TDEE Calculator: Calculate Your Real Maintenance Calories",
    description:
      "Calculate your personal energy expenditure dynamically from actual daily logs.",
    url: "https://adaptdee.xyz/adaptive-tdee",
    type: "website",
  },
}

export default function AdaptiveTdeePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AdapTDEE - Adaptive TDEE Guide & Calculator",
    "url": "https://adaptdee.xyz/adaptive-tdee",
    "description": "Evidence-based guide and dynamic tracker for Adaptive Total Daily Energy Expenditure.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />

      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-12">
          <p className="eyebrow mb-3 text-[#F97316]">
            METABOLIC ADAPTATION ENGINE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            What Is <span className="text-[#F97316] italic font-normal">Adaptive TDEE</span>?
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Standard calculators guess your energy expenditure once from an equation. Adaptive TDEE calculates your real-world metabolism continuously based on what you actually eat and weigh over time.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/signup">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Start Tracking Free
              </Button>
            </Link>
            <Link href="/tdee-calculator">
              <Button
                size="md"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Instant TDEE Calculator
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-xl mx-auto flex justify-center">
          <DashboardPreview />
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              Static Formulas vs. <span className="text-[#F97316] italic font-normal">Adaptive Expenditure</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              When you use a generic online calculator, it runs the Mifflin-St Jeor equation: a static formula created in 1990 by testing a sample population. While it provides a useful initial estimate, it suffers from three critical real-world flaws:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                LIMITATION 1
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Individual Variance</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Two people of the exact same age, weight, and height can have resting energy expenditures that differ by up to 300–500 kcal/day due to non-exercise movement (NEAT) and muscle mass.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                LIMITATION 2
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Metabolic Adaptation</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                During a calorie deficit, your body slows down unconscious movement and optimizes mitochondrial efficiency, lowering your actual daily burn beyond what weight loss alone predicts.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                LIMITATION 3
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Activity Guesswork</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Selecting between "Moderately Active" and "Very Active" is an arbitrary 300+ calorie guess. Wearables and watches often overestimate workout burns by 40% or more.
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/5">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              How Does the Math Work?
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Adaptive TDEE uses the first law of thermodynamics: energy cannot be created or destroyed. Over a multi-week rolling window:
            </p>

            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 font-mono text-xs md:text-sm text-zinc-300 space-y-2">
              <div className="text-[#F97316] font-bold">Energy Balance Equation:</div>
              <div>Energy Expenditure (TDEE) = Average Calorie Intake - (Weight Trend Delta × Energy Density of Tissue)</div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <p>
                <strong className="text-white">1. Weight Trend Smoothing:</strong> Daily scale weight fluctuates due to sodium, hydration, and gut contents. AdapTDEE filters this noise using exponential smoothing to measure true fat loss or gain.
              </p>
              <p>
                <strong className="text-white">2. Rate of Mass Change:</strong> If you consume an average of 2,400 kcal/day and your smoothed trend drops by 1.0 lb over 7 days (~3,500 kcal deficit), your true TDEE was: <code className="text-white font-mono">2,400 + (3,500 / 7) = 2,900 kcal/day</code>.
              </p>
              <p>
                <strong className="text-white">3. Continuous Recalibration:</strong> As you continue logging, your expenditure curve adjusts week over week to prevent weight loss plateaus or unintended fat overshoots during bulks.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              How Much Data Do You Need?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Most users see reliable adaptive expenditure estimates within <strong className="text-white">14 to 21 days</strong> of consistent daily weight and calorie logging. If you miss a day, the algorithm smoothly handles gaps without corrupting your trend.
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
