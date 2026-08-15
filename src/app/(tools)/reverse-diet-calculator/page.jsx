import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import ReverseDietCalculator from "@/components/calculators/ReverseDietCalculator"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Reverse Diet Calculator – Plan Your Calorie Increase After a Diet",
  description:
    "Calculate your weekly calorie and macronutrient targets when transitioning from a calorie deficit back to maintenance calories while managing weight fluctuations.",
  keywords: [
    "reverse diet calculator",
    "reverse dieting calculator",
    "post cut calorie calculator",
    "transition to maintenance calories",
    "reverse diet macros",
    "plan calorie increase",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/reverse-diet-calculator",
  },
  openGraph: {
    title: "Reverse Diet Calculator – Plan Your Calorie Increase",
    description:
      "Calculate your weekly calorie and macro increase schedule to transition smoothly back to maintenance.",
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
    "description": "Calculate weekly caloric and macronutrient targets when transitioning from a deficit to maintenance.",
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
            POST-DIET CALORIE PLANNING
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            Reverse Diet <span className="text-[#F97316] italic font-normal">Calculator</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Plan your step-by-step calorie and macronutrient increase when ending a fat loss phase, making the transition back to maintenance predictable and controlled.
          </p>
        </div>

        <ReverseDietCalculator />
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-4xl font-light text-white tracking-tight">
              Understanding the Transition to <span className="text-[#F97316] italic font-normal">Maintenance</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              When dieting for extended periods, total energy expenditure drops due to reduced body mass, lower food thermogenesis (TEF), and unconscious decreases in daily movement (NEAT). A structured calorie ramp helps manage this transition:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                SCALE WEIGHT DYNAMICS
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Glycogen & Water</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Increasing carbohydrate intake restores depleted muscle glycogen. Each gram of glycogen binds approximately 3g of water, which causes an expected 2–4 lb scale jump that represents intracellular hydration rather than body fat.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                ENERGY EXPENDITURE
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">NEAT Recovery</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                As energy availability rises, spontaneous physical activity (steps, movement velocity, and workout volume) typically increases, causing total daily expenditure to rise alongside food intake.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0F] border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-semibold block mb-2">
                APPETITE MANAGEMENT
              </span>
              <h3 className="text-base font-bold text-white mb-2 font-display">Controlled Transition</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Stepping calories up methodically provides a clear nutritional structure after a cut, helping dieters avoid post-diet binge eating episodes while establishing a new sustainable maintenance baseline.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Track Your Expenditure Response in Real Time
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              As you increase food intake, your actual daily energy burn will shift. Instead of following a static weekly schedule blindly, <strong className="text-white">AdapTDEE</strong> calculates your true rising expenditure curve from your daily logs.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Track Your Reverse Diet Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-400 font-mono space-y-1">
            <span className="text-zinc-400 font-semibold block mb-1 uppercase tracking-wider">Research References:</span>
            <p>1. Trexler ET, Smith-Ryan AE, Norton LE. <em>Metabolic adaptation to weight loss: implications for the athlete.</em> J Int Soc Sports Nutr. 2014;11(1):7.</p>
            <p>2. Hall KD, et al. <em>Quantification of the effect of energy imbalance on bodyweight.</em> Lancet. 2011;378(9793):826-837.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
