import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "How Accurate Are TDEE Calculators & Fitness Watches? | AdapTDEE",
  description:
    "Discover the scientific accuracy of online TDEE formulas, why fitness watches can be off by 40-60%, and how to measure your true metabolic burn with thermodynamic trend tracking.",
  keywords: [
    "how accurate is TDEE calculator",
    "are TDEE calculators accurate",
    "apple watch calorie burn accuracy",
    "why is my TDEE calculator wrong",
    "measuring real energy expenditure",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/how-accurate-is-tdee",
  },
  openGraph: {
    title: "How Accurate Are TDEE Calculators & Fitness Watches?",
    description:
      "A deep dive into the accuracy of BMR formulas, wearable fitness trackers, and dynamic trend modeling.",
    url: "https://adaptdee.xyz/how-accurate-is-tdee",
    type: "article",
  },
}

export default function HowAccurateIsTdeePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Accurate Are TDEE Calculators & Fitness Watches?",
    "description": "Scientific analysis of energy expenditure estimation accuracy across formulas, wearables, and adaptive modeling.",
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
    "mainEntityOfPage": "https://adaptdee.xyz/how-accurate-is-tdee",
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
            EXPENDITURE RESEARCH
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            How Accurate Are <br className="hidden sm:inline" />
            <span className="text-[#F97316] italic font-normal">TDEE Calculators & Watches?</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Online calculators are population averages and fitness watches can overestimate workout burns by up to 60%. Here is how accurate each method really is.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/adaptive-tdee">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Learn How Adaptive TDEE Works
              </Button>
            </Link>
            <Link href="/tdee-calculator">
              <Button
                size="md"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Calculate Baseline
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              Ranking Energy Estimation <span className="text-[#F97316] italic font-normal">Accuracy</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Different methods of measuring calorie burn carry vastly different margins of error:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                MARGIN OF ERROR: ±10% TO 15%
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Static Formula Calculators</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Formulas like Mifflin-St Jeor work well as a population baseline, but fail to account for individual non-exercise movement (NEAT) variations and metabolic adaptation during diets.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold block mb-2">
                MARGIN OF ERROR: ±25% TO 60%
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Wearable Fitness Trackers</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Clinical studies (Stanford University) show that commercial smartwatches and fitness bands are notoriously inaccurate at measuring active energy expenditure, frequently overestimating workout burn.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-emerald-500/30 bg-emerald-500/[0.02] rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
                MARGIN OF ERROR: &lt; 3% TO 5%
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Thermodynamic Weight Tracking</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                By comparing what you eat against your smoothed weight trend over 14–21 days, the first law of thermodynamics directly reveals your true real-world metabolic expenditure.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              The Bottom Line
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Use a static TDEE calculator to set your target on <strong>Day 1</strong>. After 2–3 weeks of logging, transition to an adaptive tracker to let your real weight trends guide your calorie adjustments.
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
