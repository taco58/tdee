"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import InstantTdeeCalculator from "./InstantTdeeCalculator"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0F] pt-32 pb-20 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-[#F97316]/5 rounded-full blur-[50px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-4">
            SMART METABOLIC FEEDBACK LOOP
          </p>
          <h1 className="text-4xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
            The Adaptive <br />
            <span className="text-[#F97316] italic font-normal">TDEE Calculator</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="max-w-[540px] mx-auto text-sm md:text-base text-white/50 mb-8 leading-relaxed font-light">
            Calculate your baseline maintenance calories instantly below, or track your real adaptive expenditure as your body changes.
          </p>
        </motion.div>

        {/* Instant Interactive TDEE Calculator for 1-Click Search Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full"
        >
          <InstantTdeeCalculator />
        </motion.div>
      </div>
    </section>
  )
}

