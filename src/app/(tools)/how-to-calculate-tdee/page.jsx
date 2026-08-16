import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "How to Calculate TDEE Step-by-Step | AdapTDEE",
  description:
    "Learn how to calculate your Total Daily Energy Expenditure (TDEE) manually using the Mifflin-St Jeor equation, activity multipliers, and actual weight trend logging.",
  keywords: [
    "how to calculate TDEE",
    "TDEE formula",
    "calculate maintenance calories manually",
    "Mifflin St Jeor formula step by step",
    "TDEE calculation guide",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/how-to-calculate-tdee",
  },
  openGraph: {
    title: "How to Calculate TDEE Step-by-Step",
    description:
      "A complete guide to calculating your maintenance calories manually and adaptively.",
    url: "https://adaptdee.xyz/how-to-calculate-tdee",
    type: "article",
  },
}

export default function HowToCalculateTdeePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Calculate TDEE Step-by-Step",
    "description": "Step-by-step mathematical guide to calculating Total Daily Energy Expenditure.",
    "author": {
      "@type": "Organization",
      "name": "AdapTDEE",
      "url": "https://adaptdee.xyz",
    },
    "publisher": {
      "@type": "Organization",
      "name": "AdapTDEE",
      "url": "https://adaptdee.xyz",
    },
    "mainEntityOfPage": "https://adaptdee.xyz/how-to-calculate-tdee",
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
            CALCULATION GUIDE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            How to Calculate <br className="hidden sm:inline" />
            <span className="text-[#F97316] italic font-normal">Your TDEE Step-by-Step</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Follow this manual guide to calculate your baseline energy expenditure, or use our automated adaptive engine to calculate your true burn from real daily logs.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/tdee-calculator">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Instant TDEE Calculator
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="md"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Track Adaptively Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              Step 1: Calculate Your Basal Metabolic Rate (BMR)
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              The clinical gold standard for population estimates is the <strong>Mifflin-St Jeor Equation</strong>:
            </p>

            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 font-mono text-xs md:text-sm text-zinc-300 space-y-3">
              <div>
                <span className="text-[#F97316] font-bold">For Men:</span><br />
                BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-[#F97316] font-bold">For Women:</span><br />
                BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              Step 2: Apply Your Physical Activity Multiplier (PAL)
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Multiply your BMR from Step 1 by your physical activity level. To eliminate guesswork, use your empirical average daily step count:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#F97316] font-bold font-mono text-xs block mb-1">Sedentary: BMR × 1.2</span>
                <p className="text-xs text-zinc-400">&lt; 5,000 steps/day. Desk job, little to no structured workouts.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#F97316] font-bold font-mono text-xs block mb-1">Lightly Active: BMR × 1.375</span>
                <p className="text-xs text-zinc-400">5,000–7,500 steps/day. Light exercise 1–3 days/week.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#F97316] font-bold font-mono text-xs block mb-1">Moderately Active: BMR × 1.55</span>
                <p className="text-xs text-zinc-400">7,500–10,000 steps/day. Moderate exercise 3–5 days/week.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#F97316] font-bold font-mono text-xs block mb-1">Very Active: BMR × 1.725</span>
                <p className="text-xs text-zinc-400">10,000–13,000 steps/day. Hard exercise 6–7 days/week.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              Step 3: An Example Calculation
            </h2>
            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 space-y-3 text-xs md:text-sm text-zinc-300 font-light">
              <p><strong>Profile:</strong> 30-year-old male, 80 kg (176 lbs), 180 cm tall, moderately active (8,000 steps/day).</p>
              <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
                <li>BMR = (10 × 80) + (6.25 × 180) - (5 × 30) + 5 = 800 + 1,125 - 150 + 5 = <strong>1,780 kcal</strong></li>
                <li>TDEE = 1,780 × 1.55 = <strong>2,759 kcal/day</strong></li>
              </ul>
              <p className="pt-2 text-zinc-400 text-xs font-sans">
                Eating 2,759 calories a day will maintain this individual&apos;s bodyweight. To lose 1 lb of fat per week, he would eat ~2,259 kcal/day (a 500 kcal deficit).
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Why Track Adaptively Instead of Manually?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Formula calculations give you an estimate for Day 1. But as you lose or gain weight, your true expenditure changes. AdapTDEE uses your actual weight logs to recalculate your real TDEE dynamically every single week.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Start Tracking Your Real TDEE
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
