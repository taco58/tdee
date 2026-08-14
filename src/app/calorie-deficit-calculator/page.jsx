import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import CalorieDeficitCalculator from "@/components/calculators/CalorieDeficitCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Calorie Deficit Calculator | Calculate Target Weight Loss Calories",
  description:
    "Calculate your exact daily calorie deficit, target intake budget, and projected fat loss milestone date based on your age, bodyweight, height, and activity level.",
  keywords: [
    "calorie deficit calculator",
    "weight loss calorie calculator",
    "calculate calorie deficit",
    "how many calories to lose weight",
    "tdee deficit calculator",
    "fat loss calorie calculator",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/calorie-deficit-calculator",
  },
  openGraph: {
    title: "Calorie Deficit Calculator | Precise Weight Loss Calorie Target",
    description:
      "Calculate your personal maintenance calories, daily deficit, and estimated fat loss completion date.",
    url: "https://adaptdee.xyz/calorie-deficit-calculator",
    type: "website",
  },
}

export default function CalorieDeficitCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a calorie deficit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A calorie deficit occurs when you consume fewer calories than your body expends over a given period. When in a deficit, your body mobilizes stored energy (primarily body fat) to meet its energetic demands, leading to weight reduction."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best calorie deficit percentage for fat loss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most individuals, a moderate 15% to 20% calorie deficit provides the ideal balance between sustainable fat loss (0.5 to 1.5 lbs per week) and muscle retention without triggering severe lethargy or excessive hunger."
        }
      },
      {
        "@type": "Question",
        "name": "Why do calorie deficit calculations stop working over time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As you lose weight, your body requires less energy to move and maintain itself. Additionally, adaptive thermogenesis (metabolic adaptation) and reductions in Non-Exercise Activity Thermogenesis (NEAT) lower your total expenditure. Tracking your weight and calorie trends adaptively ensures your deficit dynamically adjusts to prevent plateaus."
        }
      }
    ]
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Hero Section with Calculator */}
      <section className="relative pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-10">
          <p className="eyebrow mb-3 text-[#F97316]">
            SCIENTIFIC FAT LOSS TOOL
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            Calorie Deficit <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Calculate your personalized maintenance intake, daily calorie deficit target, and projected milestone date to reach your goal weight.
          </p>
        </div>

        <CalorieDeficitCalculator />
      </section>

      {/* Scientific Guide & Explanation */}
      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              The Science of a <span className="text-[#F97316] italic font-normal">Calorie Deficit</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Energy balance is governed by the first law of thermodynamics. When total energy expenditure exceeds total dietary intake, your body oxidizes stored adipose tissue and glycogen stores to supply the required energy deficit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                01 / BMR
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Basal Metabolic Rate</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                The baseline calories burned by vital organs (brain, liver, heart, lungs) at complete rest.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                02 / TDEE
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Total Daily Expenditure</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                BMR multiplied by physical activity, intentional exercise, and the thermic effect of food (TEF).
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                03 / DEFICIT
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Thermodynamic Gap</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Consuming 300 to 750 kcal below TDEE forces the body to burn ~0.5 to 1.5 lbs of fat per week.
              </p>
            </div>
          </div>

          {/* Avoiding Plateaus Callout */}
          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Why Static Deficit Calculators Cause Plateaus
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Standard online calculators give you a one-time number on Day 1. However, as your body mass drops, your BMR decreases and your spontaneous movement (NEAT) unconsciously declines. What was a 500-calorie deficit in Week 1 can become maintenance by Week 8.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <strong className="text-white">AdapTDEE solves this</strong> by continuously smoothing daily weigh-ins and calorie logs, updating your deficit in real time as your metabolism shifts.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Create Free Account & Track Adaptively
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
