import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import HowItWorksSteps from "@/components/landing/HowItWorksSteps"
import SplitSections from "@/components/landing/SplitSections"
import Features from "@/components/landing/Features"
import ComparisonTable from "@/components/landing/ComparisonTable"
import StatCounters from "@/components/landing/StatCounters"
import FaqSection from "@/components/landing/FaqSection"
import Testimonials from "@/components/landing/Testimonials"
import Footer from "@/components/landing/Footer"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://adaptdee.xyz/#organization",
        "name": "AdapTDEE",
        "url": "https://adaptdee.xyz",
        "logo": "https://adaptdee.xyz/logo.png",
        "description": "Adaptive thermodynamic metabolic modeling and TDEE expenditure calculator.",
      },
      {
        "@type": "WebApplication",
        "@id": "https://adaptdee.xyz/#webapp",
        "name": "AdapTDEE - Adaptive TDEE Calculator & Metabolic Tracker",
        "url": "https://adaptdee.xyz",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "description": "Dynamic TDEE calculator and weight tracker that continuously adapts to metabolic adaptation and bodyweight trends.",
        "isAccessibleForFree": true,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <Hero />

      <HowItWorksSteps />

      <SplitSections />

      <Features />

      <ComparisonTable />

      {/* <StatCounters /> */}

      <FaqSection />

      <Testimonials />

      {/* <section className="relative py-32 px-6 text-center bg-[#0A0A0F] border-t border-white/5">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <p className="eyebrow mb-4">READY?</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-8 tracking-tight">
            Ready to stop{" "}
            <span className="text-[#F97316] italic font-normal">guessing?</span>
          </h2>

          <Link href="/signup">
            <Button
              size="lg"
              className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-8 py-4 text-xs uppercase tracking-[0.15em] font-semibold shadow-none flex items-center gap-2 cursor-pointer"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section> */}

      <Footer />
    </main>
  )
}
