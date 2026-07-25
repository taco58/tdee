"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0F] py-20 px-6">
      {/* Background orange radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-[#F97316]/5 rounded-full blur-[50px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-tight text-white mb-8 leading-[1.1]">
            Finally know your <br />
            <span className="text-[#F97316] italic font-normal">real</span> calories.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="max-w-[480px] mx-auto text-sm md:text-base text-white/50 mb-10 leading-relaxed font-light">
            Adaptive TDEE runs a custom metabolic feedback loop using your daily scale weight and calorie intake.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link href="/signup">
            <Button size="lg" className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold shadow-none flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
