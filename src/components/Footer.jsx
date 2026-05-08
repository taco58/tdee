"use client"

import React from "react"
import { Button } from "./ui/Button"

export default function Footer() {
  return (
    <footer className="bg-[#242424] py-10 px-6 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center font-bold text-white text-xs italic">
            A
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            Adaptive TDEE
          </span>
        </div>

        <div className="flex gap-8 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <p className="text-sm text-white/20">
          © 2026 Adaptive TDEE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
