"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] py-20 px-6 md:px-12 border-t border-white/5 font-light">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 text-left">
          
          <div className="md:col-span-5">
            <Link href="/" className="cursor-pointer flex items-center mb-4 select-none">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={36} 
                height={36} 
                style={{ width: "auto", height: "auto" }}
                className="rounded-full object-cover shrink-0"
              />
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-sm mb-6">
              Thermodynamic metabolic modeling that adapts to your changing biology. Simple tracking with direct calculations.
            </p>
            {/* <div className="flex gap-4 text-xs uppercase tracking-wider text-white/30 font-medium">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div> */}
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/70 mb-4">Calculators</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li><Link href="/tdee-calculator" className="hover:text-white transition-colors">TDEE Calculator</Link></li>
              <li><Link href="/adaptive-tdee" className="hover:text-white transition-colors">Adaptive TDEE</Link></li>
              <li><Link href="/calorie-deficit-calculator" className="hover:text-white transition-colors">Calorie Deficit Calculator</Link></li>
              <li><Link href="/bulking-calculator" className="hover:text-white transition-colors">Bulking Calculator</Link></li>
              <li><Link href="/macro-calculator" className="hover:text-white transition-colors">Macro Calculator</Link></li>
              <li><Link href="/bmr-calculator" className="hover:text-white transition-colors">BMR Calculator</Link></li>
              <li><Link href="/reverse-diet-calculator" className="hover:text-white transition-colors">Reverse Diet Calculator</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/70 mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign up</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Log in</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-[#F97316]/70 mb-4">Platform</h4>
            <p className="text-xs text-white/35 leading-relaxed">
              100% Free to use. No subscription paywalls.
            </p>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p className="font-mono text-[11px]">© 2026 AdapTDEE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

