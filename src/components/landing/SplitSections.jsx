"use client";

import React from 'react';
import { motion } from 'framer-motion';
import DashboardPreview from './DashboardPreview';
import { Button } from '../ui/Button';
import Link from 'next/link';

export default function SplitSections() {
  return (
    <div id="science" className="bg-[#0A0A0F]">
      {/* Split A: Text Left, Visual Right */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-4">
              THE ALGORITHM
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight">
              The algorithm <span className="text-[#F97316] italic font-normal">behind</span> the number.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-8 max-w-md">
              Most calorie trackers guess your metabolism based on equations from the 1990s. Adaptive TDEE uses direct feedback, calculating your exact daily energy output by measuring bodyweight change rates relative to logged calorie intake.
            </p>
            <a href="#how-it-works" className="text-xs uppercase tracking-[0.15em] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors">
              Learn how it works &rarr;
            </a>
          </motion.div>

          {/* Right Visual Column (Phone Mockup) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </section>

      {/* Split B: Visual Left, Text Right */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Visual Column (Formula Box) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center order-2 md:order-1"
          >
            <div className="w-full max-w-md bg-[#0D0D0D] border border-white/5 p-8 flex flex-col justify-center items-center text-center font-mono select-none">
              <span className="text-[11px] text-white/30 uppercase tracking-[0.15em] mb-4">Metabolic Balance Equation</span>
              <div className="text-base md:text-lg text-white font-light tracking-wide px-4 py-6 border border-white/10 w-full rounded">
                TDEE = avg_cal − <span className="text-[#F97316]">(Δwt × 3500 / 7)</span>
              </div>
              <span className="text-[10px] text-white/30 mt-4 leading-relaxed max-w-[280px]">
                Thermodynamics in action: your expenditure is equal to intake minus the energy stored or lost as tissue.
              </span>
            </div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-left order-1 md:order-2"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-4">
              YOUR RESULTS
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight">
              Science, <span className="text-[#F97316] italic font-normal">not</span> guesswork.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-8 max-w-md">
              Online calculators are off by up to 500 kcal daily. By monitoring trends over a multi-day window, our system bypasses water retention errors, providing a precise roadmap tailored to your specific metabolic changes.
            </p>
            <Link href="/signup">
              <Button className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-6 py-3 text-xs uppercase tracking-[0.1em] font-semibold shadow-none">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
