import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import HowItWorksSteps from "@/components/landing/HowItWorksSteps"
import SplitSections from "@/components/landing/SplitSections"
import Features from "@/components/landing/Features"
import ComparisonTable from "@/components/landing/ComparisonTable"
import FaqSection from "@/components/landing/FaqSection"
import Testimonials from "@/components/landing/Testimonials"
import Footer from "@/components/landing/Footer"

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

      <FaqSection />

      <Testimonials />

      <Footer />
    </main>
  )
}
