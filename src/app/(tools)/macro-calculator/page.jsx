import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import MacroCalculator from "@/components/calculators/MacroCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Macro Calculator | Calculate Protein, Carbs, & Fats for Your Goals",
  description:
    "Calculate your exact daily macronutrient targets (protein, carbohydrates, and dietary fats) based on your TDEE, bodyweight, and fitness goals (Cut, Maintain, Bulk).",
  keywords: [
    "macro calculator",
    "macronutrient calculator",
    "protein calculator",
    "calculate macros for weight loss",
    "tdee macro calculator",
    "macro split calculator",
    "cutting macros calculator",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/macro-calculator",
  },
  openGraph: {
    title: "Macro Calculator | Daily Protein, Fat, & Carb Targets",
    description:
      "Calculate your personal macronutrient breakdown for fat loss, muscle building, or maintenance.",
    url: "https://adaptdee.xyz/macro-calculator",
    type: "website",
  },
}

export default function MacroCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AdapTDEE Macro Calculator",
    "url": "https://adaptdee.xyz/macro-calculator",
    "description": "Calculate daily protein, carbohydrate, and fat targets based on TDEE, bodyweight, and fitness goals.",
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
            NUTRITION TARGET ENGINE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            Macro <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Calculate your optimal daily protein, fat, and carbohydrate grams tailored to your total energy expenditure and body composition goals.
          </p>
        </div>

        <MacroCalculator />
      </section>

      {/* Educational Guide */}
      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              Understanding <span className="text-[#F97316] italic font-normal">Macronutrients</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Every calorie you consume comes from three core macronutrients: Protein, Dietary Fats, and Carbohydrates. Structuring these correctly dictates whether weight changes come from fat loss or muscle breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold block mb-2">
                4 KCAL / GRAM
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Protein (Essential)</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Repairs muscle tissue, maximizes muscle protein synthesis (MPS), and has the highest thermic effect of food (20-30% TEF).
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                9 KCAL / GRAM
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Fats (Essential)</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Critical for hormone production (testosterone, estrogen), fat-soluble vitamin absorption (A, D, E, K), and brain health.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold block mb-2">
                4 KCAL / GRAM
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Carbs (Performance)</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                The primary fuel source for central nervous system function, anaerobic resistance training, and intramuscular glycogen.
              </p>
            </div>
          </div>

          {/* Callout */}
          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Pairing Macro Targets with Adaptive TDEE
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Tracking macros is only effective if your total daily calorie ceiling is accurate. If an online formula overestimates your TDEE by 300 calories, you will fail to lose fat even when hitting your macros perfectly.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <strong className="text-white">AdapTDEE</strong> calculates your true metabolic expenditure directly from physics by analyzing daily weight trends and calorie logs.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Start Tracking on AdapTDEE
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
