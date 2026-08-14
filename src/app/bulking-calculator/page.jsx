import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import BulkingCalculator from "@/components/calculators/BulkingCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Bulking Calculator | Calculate Lean Muscle Gain Calories & Macros",
  description:
    "Calculate your exact lean bulking calorie surplus, optimal macronutrient split, and monthly weight gain targets to maximize muscle hypertrophy while minimizing fat gain.",
  keywords: [
    "bulking calculator",
    "lean bulk calculator",
    "muscle gain calorie calculator",
    "calorie surplus calculator",
    "bulking macros calculator",
    "how many calories to bulk",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/bulking-calculator",
  },
  openGraph: {
    title: "Bulking Calculator | Lean Muscle Gain Calorie & Macro Target",
    description:
      "Calculate your personal calorie surplus and macro breakdown for optimal natural muscle hypertrophy.",
    url: "https://adaptdee.xyz/bulking-calculator",
    type: "website",
  },
}

export default function BulkingCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AdapTDEE Bulking & Hypertrophy Calculator",
    "url": "https://adaptdee.xyz/bulking-calculator",
    "description": "Calculate lean muscle gain calorie surplus, optimal macronutrient split, and monthly hypertrophy targets.",
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
            HYPERTROPHY CALORIE ENGINE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            Bulking <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Calculate your personalized calorie surplus and macronutrient targets to maximize lean contractile muscle gains while keeping unwanted fat gain to a minimum.
          </p>
        </div>

        <BulkingCalculator />
      </section>

      {/* Educational Hypertrophy Guide */}
      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              The Science of <span className="text-[#F97316] italic font-normal">Lean Muscle Hypertrophy</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Building muscle is an energetically expensive biological process requiring three non-negotiable inputs: progressive mechanical tension, adequate amino acid availability (protein), and an energy surplus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                ENERGY SURPLUS
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">+100 to +300 kcal</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                A tight surplus provides the raw ATP energy required to synthesize new skeletal muscle proteins without overflowing into adipose tissue.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                GLYCOGEN FUEL
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Carb-Dense Hypertrophy</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                High carbohydrate intake keeps intramuscular glycogen saturated, elevates cellular hydration, and drives the mTOR anabolic signaling pathway.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                AMINO ACIDS
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">0.8 - 1.0g Protein/lb</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Supplies the necessary leucine and essential amino acids (EAAs) to maintain positive net protein balance 24 hours a day.
              </p>
            </div>
          </div>

          {/* Callout */}
          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Why Static Bulking Calculators Fail
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              As you gain weight and eat more food, your Non-Exercise Activity (NEAT), thermic effect of food (TEF), and work capacity all increase. A 250-calorie surplus in Month 1 can quietly become maintenance by Month 3, stalling your gains.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <strong className="text-white">AdapTDEE</strong> calculates your rising expenditure dynamically from your weight logs, ensuring your surplus stays dialed in for continuous muscle growth.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Start Tracking Your Lean Bulk Free
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
