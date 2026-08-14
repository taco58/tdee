import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import BmrCalculator from "@/components/calculators/BmrCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "BMR Calculator | Basal Metabolic Rate (Mifflin-St Jeor & Katch-McArdle)",
  description:
    "Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas to determine minimum rest calorie burn.",
  keywords: [
    "bmr calculator",
    "basal metabolic rate calculator",
    "calculate bmr",
    "mifflin st jeor bmr calculator",
    "katch mcardle calculator",
    "bmr vs tdee",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/bmr-calculator",
  },
  openGraph: {
    title: "BMR Calculator | Calculate Basal Metabolic Rate",
    description:
      "Calculate your resting calorie burn across gold-standard scientific formulas.",
    url: "https://adaptdee.xyz/bmr-calculator",
    type: "website",
  },
}

export default function BmrCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AdapTDEE BMR Calculator",
    "url": "https://adaptdee.xyz/bmr-calculator",
    "description": "Calculate Basal Metabolic Rate using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle equations.",
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-10">
          <p className="eyebrow mb-3 text-[#F97316]">
            RESTING EXPENDITURE ENGINE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            BMR <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Calculate your Basal Metabolic Rate using scientific formulas and view your estimated total daily burn across all physical activity tiers.
          </p>
        </div>

        <BmrCalculator />
      </section>

      {/* Educational Guide */}
      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              The Components of <span className="text-[#F97316] italic font-normal">Human Energy Burn</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Your Basal Metabolic Rate accounts for roughly 60% to 75% of your total daily caloric expenditure. The remaining calories are burned through three distinct non-resting components:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                15% - 30% OF TDEE
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">NEAT (Movement)</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Non-Exercise Activity Thermogenesis: typing, pacing, fidgeting, posture, and daily step count. The most variable component.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                5% - 15% OF TDEE
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">EAT (Workouts)</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Exercise Activity Thermogenesis: deliberate cardiovascular conditioning, sports, weightlifting, and structured athletic drills.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                8% - 12% OF TDEE
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">TEF (Digestion)</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Thermic Effect of Food: the energy required to digest, break down, absorb, and store dietary protein, fats, and carbs.
              </p>
            </div>
          </div>

          {/* Callout */}
          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Why Guessing Activity Multipliers Fails
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Formulas ask you to pick an activity multiplier like 1.55 or 1.725. In reality, your energy expenditure changes from week to week based on recovery, sleep, step variance, and metabolic adaptation.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <strong className="text-white">AdapTDEE</strong> eliminates static multiplier guesswork by computing your true expenditure directly from your daily scale weight change rate and calorie intake.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Calculate Your True TDEE Free
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
