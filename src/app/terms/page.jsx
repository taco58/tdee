import React from "react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/landing/Footer"

export const metadata = {
  title: "Terms of Service | AdapTDEE",
  description: "Terms of Service and Usage Agreement for AdapTDEE.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#F97316]/30 font-sans flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-white/5 py-4 px-6 md:px-12 backdrop-blur-md bg-black/40 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="AdapTDEE Logo"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </Link>

          <Link
            href="/"
            className="text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#F97316] font-semibold">
            Legal Agreement
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-400 font-light">
            Last updated: July 25, 2026
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-zinc-300 font-light border-t border-white/5 pt-10">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using AdapTDEE (“the Service”), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you may not access or use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              2. Medical & Fitness Disclaimer
            </h2>
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-200 text-xs leading-relaxed">
              <strong className="block mb-1 text-orange-400 font-semibold uppercase tracking-wider">
                Important Disclaimer
              </strong>
              AdapTDEE provides estimated Total Daily Energy Expenditure (TDEE) calculations and mathematical weight trends for informational purposes only. The Service does not provide medical, clinical, or nutritional advice. Always consult a qualified physician or healthcare professional before beginning any diet, caloric deficit, or exercise program.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              3. User Accounts & Security
            </h2>
            <p>
              When creating an account, you agree to provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              4. User Data & Logging
            </h2>
            <p>
              You retain ownership of all weight logs, calorie entries, and profile metrics you input into AdapTDEE. You grant us a non-exclusive license to process and store this data solely to calculate your adaptive TDEE trends and display your dashboard.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              5. Acceptable Use
            </h2>
            <p>
              You agree not to misuse the Service, attempt to disrupt server operations, reverse-engineer calculation engines, or use automated systems to scrape data without authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              6. Limitation of Liability
            </h2>
            <p>
              AdapTDEE and its creators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, the Service or reliance on any calculations provided.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              7. Changes
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of the Service after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              8. Contact Us
            </h2>
            <p>
              If you have any questions regarding these Terms of Service, please contact us at{" "}
              <a
                href="mailto:support@adaptdee.com"
                className="text-[#F97316] underline hover:text-orange-400"
              >
                support@adaptdee.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
