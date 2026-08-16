"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] py-16 sm:py-20 px-6 md:px-12 border-t border-white/5 font-light">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16 text-left">
          
          <div className="lg:max-w-xs shrink-0">
            <Link href="/" className="cursor-pointer inline-flex items-center mb-4 select-none">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={36} 
                height={36} 
                style={{ width: "auto", height: "auto" }}
                className="rounded-full object-cover shrink-0"
              />
            </Link>
            <p className="text-sm text-white/45 leading-relaxed">
              Thermodynamic metabolic modeling that adapts to your changing biology. Simple tracking with direct calculations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 flex-1 justify-between">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/80 mb-4">Calculators</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white/60">
                <li><Link href="/tdee-calculator" className="hover:text-white transition-colors">TDEE Calculator</Link></li>
                <li><Link href="/adaptive-tdee" className="hover:text-white transition-colors">Adaptive TDEE</Link></li>
                <li><Link href="/calorie-deficit-calculator" className="hover:text-white transition-colors">Calorie Deficit</Link></li>
                <li><Link href="/bulking-calculator" className="hover:text-white transition-colors">Bulking Calculator</Link></li>
                <li><Link href="/macro-calculator" className="hover:text-white transition-colors">Macro Calculator</Link></li>
                <li><Link href="/bmr-calculator" className="hover:text-white transition-colors">BMR Calculator</Link></li>
                <li><Link href="/reverse-diet-calculator" className="hover:text-white transition-colors">Reverse Diet</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/80 mb-4">Guides & Science</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white/60">
                <li><Link href="/science" className="hover:text-white transition-colors">The Science</Link></li>
                <li><Link href="/tdee-vs-bmr" className="hover:text-white transition-colors">TDEE vs BMR</Link></li>
                <li><Link href="/how-to-calculate-tdee" className="hover:text-white transition-colors">How to Calculate</Link></li>
                <li><Link href="/how-accurate-is-tdee" className="hover:text-white transition-colors">Accuracy Analysis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/80 mb-4">Comparisons</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white/60">
                <li><Link href="/compare/adaptdee-vs-macrofactor" className="hover:text-white transition-colors">vs MacroFactor</Link></li>
                <li><Link href="/compare/adaptdee-vs-myfitnesspal" className="hover:text-white transition-colors">vs MyFitnessPal</Link></li>
                <li><Link href="/compare/adaptdee-vs-cronometer" className="hover:text-white transition-colors">vs Cronometer</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/80 mb-4">Platform</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white/60">
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log in</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="h-px bg-white/5 w-full mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p className="font-mono text-[11px]">© 2026 AdapTDEE. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

