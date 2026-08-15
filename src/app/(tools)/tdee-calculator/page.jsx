import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import InstantTdeeCalculator from "@/components/calculators/InstantTdeeCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "TDEE Calculator – Calculate Your Total Daily Energy Expenditure",
  description:
    "Calculate your Total Daily Energy Expenditure (TDEE) and exact maintenance calories using the Mifflin-St Jeor and Katch-McArdle equations with empirical step-count activity multipliers.",
  keywords: [
    "TDEE calculator",
    "total daily energy expenditure",
    "calculate TDEE",
    "maintenance calorie calculator",
    "daily calorie expenditure calculator",
    "how many calories do i burn a day",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/tdee-calculator",
  },
  openGraph: {
    title: "TDEE Calculator – Calculate Your Total Daily Energy Expenditure",
    description:
      "Calculate your personal maintenance calories instantly based on your age, weight, height, and activity level.",
    url: "https://adaptdee.xyz/tdee-calculator",
    type: "website",
  },
}

export default function TdeeCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AdapTDEE - TDEE Calculator",
    "url": "https://adaptdee.xyz/tdee-calculator",
    "description": "Calculate your Total Daily Energy Expenditure and baseline maintenance calories instantly.",
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

      <section className="relative pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-10">
          <p className="eyebrow mb-3 text-[#F97316]">
            ENERGY EXPENDITURE ENGINE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            TDEE <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Calculate your Total Daily Energy Expenditure (TDEE)—the exact number of calories your body burns in a 24-hour period based on your metabolism and daily movement.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <InstantTdeeCalculator />
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              What Is <span className="text-[#F97316] italic font-normal">TDEE</span>?
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Total Daily Energy Expenditure (TDEE) represents the cumulative energy in calories that your body expends every day. Eating at your TDEE maintains your current bodyweight. Eating below creates a deficit for fat loss, while eating above creates a surplus for muscle hypertrophy.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-white">
              The 4 Components of Your Daily Energy Expenditure
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-1">
                  60% – 70% OF TDEE
                </span>
                <h4 className="text-base font-bold text-white mb-1 font-display">Basal Metabolic Rate (BMR)</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  The baseline energy required to power essential autonomic survival functions at complete rest: respiration, brain activity, cellular repair, and cardiovascular circulation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-1">
                  15% – 30% OF TDEE
                </span>
                <h4 className="text-base font-bold text-white mb-1 font-display">Non-Exercise Activity (NEAT)</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  All movement that is not deliberate exercise: daily walking steps, pacing, posture adjustments, household chores, and fidgeting.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-1">
                  5% – 15% OF TDEE
                </span>
                <h4 className="text-base font-bold text-white mb-1 font-display">Exercise Activity (EAT)</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Deliberate cardiovascular training, resistance training workouts, and structured sports sessions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-1">
                  8% – 12% OF TDEE
                </span>
                <h4 className="text-base font-bold text-white mb-1 font-display">Thermic Effect of Food (TEF)</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  The metabolic cost of breaking down, digesting, and absorbing macronutrients. Dietary protein requires the highest metabolic cost (~20-30% of its calories).
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Why Static Formulas Are Only a Starting Point
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Standard formulas like Mifflin-St Jeor provide a population average. However, your individual metabolism is dynamic: as your body weight changes, your NEAT shifts and metabolic adaptation occurs.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              To dial in your true expenditure without guessing, you can track your daily weight and calories over 2–4 weeks to compute your <strong className="text-white">Adaptive TDEE</strong>.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Track Your Real TDEE Free
                </Button>
              </Link>
              <Link href="/adaptive-tdee">
                <Button
                  size="md"
                  variant="outline"
                  className="rounded-full border-white/20 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Learn How Adaptive TDEE Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h3 className="font-display text-lg font-bold text-white">
              Next Steps & Target Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/calorie-deficit-calculator" className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 hover:border-[#F97316]/40 transition-colors block">
                <span className="text-xs font-bold text-white block mb-1">Calorie Deficit</span>
                <span className="text-[11px] text-zinc-400">Calculate fat loss calorie targets</span>
              </Link>
              <Link href="/bulking-calculator" className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 hover:border-[#F97316]/40 transition-colors block">
                <span className="text-xs font-bold text-white block mb-1">Bulking Calculator</span>
                <span className="text-[11px] text-zinc-400">Calculate lean muscle surplus</span>
              </Link>
              <Link href="/macro-calculator" className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 hover:border-[#F97316]/40 transition-colors block">
                <span className="text-xs font-bold text-white block mb-1">Macro Calculator</span>
                <span className="text-[11px] text-zinc-400">Split protein, carbs, and fats</span>
              </Link>
              <Link href="/bmr-calculator" className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 hover:border-[#F97316]/40 transition-colors block">
                <span className="text-xs font-bold text-white block mb-1">BMR Calculator</span>
                <span className="text-[11px] text-zinc-400">Compare BMR equations</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
