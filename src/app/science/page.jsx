import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "The Science & Methodology Behind AdapTDEE | AdapTDEE",
  description:
    "Explore the scientific research, mathematical equations, exponential moving average smoothing, and energy balance thermodynamics that power AdapTDEE.",
  keywords: [
    "adaptive TDEE algorithm",
    "TDEE science",
    "metabolic rate calculations",
    "weight trend exponential smoothing formula",
    "energy balance equation",
    "AdapTDEE methodology",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/science",
  },
  openGraph: {
    title: "The Science & Methodology Behind AdapTDEE",
    description:
      "A transparent look into the mathematics, energy balance models, and algorithms powering AdapTDEE.",
    url: "https://adaptdee.xyz/science",
    type: "article",
  },
}

export default function ScienceMethodologyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Science and Mathematical Methodology of AdapTDEE",
    "description": "Scientific documentation of the thermodynamic algorithms and exponential smoothing formulas used in AdapTDEE.",
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
    "mainEntityOfPage": "https://adaptdee.xyz/science",
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
            MATHEMATICAL METHODOLOGY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            The Science Behind <br className="hidden sm:inline" />
            <span className="text-[#F97316] italic font-normal">AdapTDEE</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            We believe in total transparency. Here is the mathematical framework, thermodynamic equations, and smoothing models that power AdapTDEE.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/signup">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Track Your Metabolism Free
              </Button>
            </Link>
            <Link href="/tdee-calculator">
              <Button
                size="md"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                TDEE Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              1. The First Law of Thermodynamics
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Human energy expenditure obeys conservation of energy: the energy entering the system (dietary calories consumed) must equal the energy expended plus the rate of change in internal stored energy (body fat and lean mass):
            </p>

            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 font-mono text-xs md:text-sm text-zinc-300 space-y-2">
              <div className="text-[#F97316] font-bold">Fundamental Energy Balance Equation:</div>
              <div>Change in Stored Energy = Energy Intake - Total Energy Expenditure (TDEE)</div>
              <div className="pt-2 text-zinc-400 text-xs">
                Rearranging for TDEE: TDEE = Average Calorie Intake - (Weight Trend Change × Tissue Energy Density)
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Where tissue energy density is standardized to <strong>3,500 kcal per pound (~7,700 kcal per kg)</strong> of human adipose and lean tissue mixture (Hall KD et al., 2011).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              2. Signal Noise Reduction (Weight Trend Smoothing)
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Daily scale measurements represent acute water retention, glycogen storage, sodium balance, and gut volume. To isolate the true tissue change signal from daily noise, AdapTDEE applies an <strong>Exponential Moving Average (EMA)</strong>:
            </p>

            <div className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 font-mono text-xs md:text-sm text-zinc-300 space-y-2">
              <div className="text-[#F97316] font-bold">Trend Smoothing Formula:</div>
              <div>Weight_trend(t) = α × Weight_raw(t) + (1 - α) × Weight_trend(t-1)</div>
              <div className="pt-2 text-zinc-400 text-xs">
                Where Weight_trend(t) is the smoothed trend weight for day t, Weight_raw(t) is the raw morning weigh-in, and α = 0.10 is the smoothing coefficient chosen to balance responsiveness with noise dampening.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              3. Handling Missing Logging Days
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Life happens and users occasionally miss weigh-ins or calorie logs. The algorithm does not penalize missing data or drop abruptly to zero. Missing days are linearly interpolated across the rolling window, dynamically adjusting the algorithm's confidence rating until data density returns.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Experience the Algorithm in Action
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              AdapTDEE runs these calculations automatically in the background every day—giving you objective, mathematical clarity on your metabolism without spreadsheets.
            </p>

            <div className="pt-2">
              <Link href="/signup">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Start Tracking Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-400 font-mono space-y-1">
            <span className="text-zinc-400 font-semibold block mb-1 uppercase tracking-wider">Academic Citations:</span>
            <p>1. Hall KD, et al. <em>Quantification of the effect of energy imbalance on bodyweight.</em> The Lancet. 2011;378(9793):826-837.</p>
            <p>2. Mifflin MD, St Jeor ST, et al. <em>A new predictive equation for resting energy expenditure in healthy individuals.</em> Am J Clin Nutr. 1990;51(2):241-247.</p>
            <p>3. Trexler ET, Smith-Ryan AE, Norton LE. <em>Metabolic adaptation to weight loss: implications for the athlete.</em> J Int Soc Sports Nutr. 2014;11(1):7.</p>
            <p>4. Levine JA. <em>Non-exercise activity thermogenesis (NEAT).</em> Best Pract Res Clin Endocrinol Metab. 2002;16(4):679-702.</p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
