import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import ReverseDietCalculator from "@/components/calculators/ReverseDietCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Evidence-Based Reverse Dieting Calculator | Restore Metabolism Post-Cut",
  description:
    "Calculate your scientific reverse dieting schedule with weekly macro and calorie targets to safely restore metabolic rate, replenish glycogen, and prevent rapid fat regain.",
  keywords: [
    "reverse dieting calculator",
    "reverse diet calculator",
    "how to reverse diet",
    "metabolic adaptation recovery",
    "post cut calorie calculator",
    "reverse diet schedule",
    "reverse diet macros",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/reverse-diet-calculator",
  },
  openGraph: {
    title: "Reverse Dieting Calculator | Restore Maintenance Calories",
    description:
      "Calculate your evidence-based weekly calorie and macro increase schedule to restore metabolic rate without fat gain.",
    url: "https://adaptdee.xyz/reverse-diet-calculator",
    type: "website",
  },
}

export default function ReverseDietCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AdapTDEE Reverse Dieting Calculator",
    "url": "https://adaptdee.xyz/reverse-diet-calculator",
    "description": "Calculate scientific weekly caloric and macronutrient ramp schedule to restore metabolic rate after dieting.",
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
            SCIENTIFIC RECOVERY PROTOCOL
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            Reverse Dieting <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Calculate your evidence-based weekly caloric and macronutrient ramp schedule to restore metabolic expenditure, hormone signaling, and gym performance after dieting.
          </p>
        </div>

        <ReverseDietCalculator />
      </section>

      {/* Educational Guide */}
      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              The Physiology of <span className="text-[#F97316] italic font-normal">Metabolic Adaptation</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              When dieting, your body reduces energy output through <em>adaptive thermogenesis</em>. Understanding what happens internally makes reverse dieting intuitive:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                HORMONES
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Leptin & T3 Suppression</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Circulating leptin and active triiodothyronine (T3) drop significantly during a cut, lowering resting metabolic rate and triggering intense biological hunger.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                BEHAVIORAL DOWNTURN
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Unconscious NEAT Drop</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Spontaneous physical movements (fidgeting, walking pace, posture) decline by up to 500 kcal/day to defend against caloric depletion.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                THE REBOUND RISK
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Post-Diet Hyperplasia</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Returning immediately to pre-diet calories while your expenditure is suppressed causes rapid fat regain (fat overshoot). Reverse dieting bridges this gap safely.
              </p>
            </div>
          </div>

          {/* Callout */}
          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Watch Your True TDEE Climb Week Over Week
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              As you incrementally add carbohydrates and calories, your body temperature, daily step expenditure, and training performance will rebound.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <strong className="text-white">AdapTDEE</strong> models your expenditure daily, showing you exactly how much your metabolism has expanded so you can eat more food with confidence.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Start Tracking Your Reverse Diet Free
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
