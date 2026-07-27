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
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-white/40 mb-4">Nav</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign up</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Log in</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-white/40 mb-4">Info</h4>
            <p className="text-xs text-white/35">
              Free to use. No credit card required.
            </p>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>2026 AdapTDEE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

