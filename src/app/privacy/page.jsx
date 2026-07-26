import React from "react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/landing/Footer"

export const metadata = {
  title: "Privacy Policy | AdapTDEE",
  description: "Privacy Policy for AdapTDEE - How we collect, store, and protect your data.",
}

export default function PrivacyPage() {
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
            Data Protection
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400 font-light">
            Last updated: July 25, 2026
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-zinc-300 font-light border-t border-white/5 pt-10">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              1. Overview
            </h2>
            <p>
              Your privacy is paramount. This Privacy Policy outlines how AdapTDEE (“we”, “our”, or “us”) collects, uses, and safeguards your information when you use our application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              2. Information We Collect
            </h2>
            <p>We collect only the minimum data required to deliver personal TDEE calculations and dashboard analytics:</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">Account Credentials:</strong> Email address and encrypted authentication tokens.
              </li>
              <li>
                <strong className="text-zinc-200">Fitness Metrics:</strong> Daily body weight entries, daily calorie logs, age, height, gender, and activity multiplier.
              </li>
              <li>
                <strong className="text-zinc-200">Technical Logs:</strong> Basic browser information and session cookies strictly necessary for authentication.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              3. How We Use Your Data
            </h2>
            <p>We use your data solely for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Calculating your adaptive TDEE and weekly body mass trends.</li>
              <li>Rendering custom history calendars, stats, and weight progress charts.</li>
              <li>Managing secure account sessions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              4. Data Storage & Security
            </h2>
            <p>
              All user data is stored securely in PostgreSQL databases hosted via Supabase, protected by enterprise-grade encryption and Row Level Security (RLS). This ensures that your log data can only ever be accessed by your authenticated account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              5. Third-Party Sharing
            </h2>
            <p>
              We <strong className="text-white">never sell, rent, or trade</strong> your personal or health data to advertisers or data brokers. Third-party services are limited to essential infrastructure providers (such as Supabase for database hosting and authentication).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              6. Your Rights & Data Deletion
            </h2>
            <p>
              You have full control over your data. You may export, update, or permanently delete your log entries and profile information at any time. To request full account deletion, contact support.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              7. Contact Us
            </h2>
            <p>
              If you have any questions or privacy concerns, please contact our privacy team at{" "}
              <a
                href="mailto:privacy@adaptdee.com"
                className="text-[#F97316] underline hover:text-orange-400"
              >
                privacy@adaptdee.com
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
