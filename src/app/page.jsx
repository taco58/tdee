import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import HowItWorksSteps from "@/components/landing/HowItWorksSteps"
import SplitSections from "@/components/landing/SplitSections"
import StatCounters from "@/components/landing/StatCounters"
import Features from "@/components/landing/Features"
import Footer from "@/components/landing/Footer"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
export default function Home() {
  return (
    <main
      className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 overflow-x-hidden"
    >

      <Navbar />

      <Hero />

      <HowItWorksSteps />

      <SplitSections />

      <StatCounters />

      <Features />

      <section className="relative py-32 px-6 text-center bg-[#0A0A0F] border-t border-white/5">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <p className="eyebrow mb-4">
            READY?
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-8 tracking-tight">
            Ready to stop{" "}
            <span className="text-[#F97316] italic font-normal">guessing?</span>
          </h2>

          <Link href="/signup">
            <Button
              size="lg"
              className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-8 py-4 text-xs uppercase tracking-[0.15em] font-semibold shadow-none flex items-center gap-2"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
