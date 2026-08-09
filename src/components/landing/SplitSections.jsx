"use client";

import React from 'react';
import { motion } from 'framer-motion';
import DashboardPreview from './DashboardPreview';
import { Button } from '../ui/Button';
import Link from 'next/link';
import DotField from './DotField';

export default function SplitSections() {
  return (
    <div id="science" className="relative z-10 overflow-hidden bg-[#0A0A0F]">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          bulgeStrength={70}
          glowRadius={200}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={400}
          cursorForce={0.15}
          bulgeOnly
          gradientFrom="rgba(249, 115, 22, 0.45)"
          gradientTo="rgba(234, 88, 12, 0.2)"
          glowColor="#F97316"
        />
      </div>

      {/* Section 1: Adaptive Model Overview */}
      <section className="relative z-10 py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="eyebrow mb-4">
              ADAPTIVE METABOLIC ENGINE
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
              Beyond simple <span className="text-[#F97316] italic font-normal">calculators</span>.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-8 max-w-md">
              Basic online tools rely on static 1990s estimates. Our multi-variable feedback system continuously aligns your target intake with actual bodyweight trends.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 max-w-md">
              <div>
                <span className="text-[#F97316] text-xs font-semibold block mb-1">Signal Noise Filtering</span>
                <span className="text-white/40 text-[11px] font-light leading-snug block">Eliminates water weight anomalies</span>
              </div>
              <div>
                <span className="text-[#F97316] text-xs font-semibold block mb-1">Continuous Recalibration</span>
                <span className="text-white/40 text-[11px] font-light leading-snug block">Auto-adjusts as metabolism shifts</span>
              </div>
            </div>
          </motion.div>

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

      {/* Section 2: Clean Engine Architecture Card */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center order-2 md:order-1"
          >
            <div className="w-full max-w-lg bg-[#0D0D12] border border-white/10 p-7 rounded-2xl flex flex-col select-none shadow-2xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="eyebrow text-[#F97316]">
                  ADAPTIVE ENGINE SPEC
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  ACTIVE
                </span>
              </div>

              {/* Module 1: Noise Filter */}
              <div className="mb-4 bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white mb-0.5">Signal Noise & Water Weight Filter</h4>
                  <p className="text-[11px] text-white/40 font-light">Dampens daily sodium & fluid fluctuations</p>
                </div>
                <span className="text-[10px] font-mono text-[#F97316] bg-[#F97316]/10 px-2.5 py-1 rounded border border-[#F97316]/20">
                  SMOOTHED
                </span>
              </div>

              {/* Module 2: Rate of Change Differential */}
              <div className="mb-4 bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white mb-0.5">Energy Balance Differential</h4>
                  <p className="text-[11px] text-white/40 font-light">Calculates true scale mass velocity</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  REAL-TIME
                </span>
              </div>

              {/* Module 3: Confidence & Calibration */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white mb-0.5">Dynamic Confidence Matrix</h4>
                  <p className="text-[11px] text-white/40 font-light">Auto-weights data density & logging history</p>
                </div>
                <span className="text-[10px] font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  PRECISION
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-light">
                <span>Multi-variable feedback loop</span>
                <span className="text-[#F97316]">Dynamic calibration</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-left order-1 md:order-2"
          >
            <p className="eyebrow mb-4">
              EMPIRICAL PRECISION
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
              Science, <span className="text-[#F97316] italic font-normal">not</span> estimation.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-8 max-w-md">
              Static equations miss real-world metabolic adaptation and activity shifts. By continuously solving your body's energy balance over a rolling window, our system adapts directly to you.
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
