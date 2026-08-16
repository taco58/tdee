import React from "react"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Check } from "lucide-react"

export const metadata = {
  title: "TDEE vs BMR: What's the Difference? | AdapTDEE",
  description:
    "Understand the key differences between Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), how they are calculated, and which number to use for weight loss or muscle gain.",
  keywords: [
    "TDEE vs BMR",
    "difference between BMR and TDEE",
    "BMR vs TDEE calculator",
    "basal metabolic rate vs total daily energy expenditure",
    "should I eat my BMR or TDEE to lose weight",
  ],
  alternates: {
    canonical: "https://adaptdee.xyz/tdee-vs-bmr",
  },
  openGraph: {
    title: "TDEE vs BMR: What's the Difference?",
    description:
      "Learn the core differences between BMR and TDEE and how to set your calories correctly.",
    url: "https://adaptdee.xyz/tdee-vs-bmr",
    type: "article",
  },
}

export default function TdeeVsBmrPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "TDEE vs BMR: What's the Difference?",
    "description": "A comprehensive guide breaking down the differences between Basal Metabolic Rate and Total Daily Energy Expenditure.",
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
    "mainEntityOfPage": "https://adaptdee.xyz/tdee-vs-bmr",
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
            METABOLIC EDUCATION
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            TDEE vs BMR: <br className="hidden sm:inline" />
            <span className="text-[#F97316] italic font-normal">What&apos;s the Difference?</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Many dieters confuse BMR with TDEE. Eating at your BMR can cause severe fatigue, while eating at your TDEE maintains your weight. Here is the exact science behind both metrics.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/tdee-calculator">
              <Button
                size="md"
                className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer px-6"
              >
                Calculate Your TDEE
              </Button>
            </Link>
            <Link href="/bmr-calculator">
              <Button
                size="md"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Calculate Your BMR
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-[#0A0A0F] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-semibold block">
                AT REST
              </span>
              <h2 className="text-xl font-bold font-display text-white">Basal Metabolic Rate (BMR)</h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                The baseline calories your body requires to stay alive at absolute rest in a thermoneutral environment. It fuels involuntary biological functions like cellular respiration, brain activity, protein synthesis, and heart contraction.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-300">
                <span className="text-[#F97316] font-bold">Rule of Thumb:</span> Accounts for ~60–70% of total daily calories.
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#0A0A0F] border border-[#F97316]/30 bg-[#F97316]/[0.02] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block">
                TOTAL BURN
              </span>
              <h2 className="text-xl font-bold font-display text-white">Total Daily Energy Expenditure (TDEE)</h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                The total number of calories you burn across an entire 24-hour day. It equals your BMR plus all physical movement, daily steps, deliberate exercise, and the energy required to digest food.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-300">
                <span className="text-emerald-400 font-bold">Rule of Thumb:</span> TDEE = BMR + NEAT + EAT + TEF.
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight">
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full text-left text-xs font-light">
                <thead className="bg-[#0A0A0F] text-zinc-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Basal Metabolic Rate (BMR)</th>
                    <th className="py-3 px-4">Total Energy Expenditure (TDEE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0D0D12]">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Definition</td>
                    <td className="py-3 px-4 text-zinc-400">Calories burned at complete rest</td>
                    <td className="py-3 px-4 text-zinc-300">Total calories burned in 24 hours</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Includes Movement?</td>
                    <td className="py-3 px-4 text-red-400 font-mono">No (Zero movement)</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">Yes (Steps, workouts, fidgeting)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Includes Digestion?</td>
                    <td className="py-3 px-4 text-red-400 font-mono">No</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">Yes (Thermic effect of food)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Use for Fat Loss Target?</td>
                    <td className="py-3 px-4 text-zinc-400">Never cut directly from BMR</td>
                    <td className="py-3 px-4 text-[#F97316] font-medium">Subtract 300–500 kcal from TDEE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Common Mistake: Eating Below Your BMR
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              A frequent mistake dieters make is setting their daily calorie intake to match their BMR. For example, if your BMR is 1,600 kcal and your TDEE is 2,400 kcal, eating 1,200 kcal creates an extreme 1,200 kcal deficit. This triggers severe lethargy, muscle loss, and rapid metabolic adaptation.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Instead, calculate your <strong className="text-white">TDEE</strong> and create a moderate 15–20% deficit from your total expenditure.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/calorie-deficit-calculator">
                <Button
                  size="md"
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Calculate Safe Calorie Deficit
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
