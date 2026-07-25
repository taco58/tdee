"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorksSteps() {
  const steps = [
    {
      num: "01",
      title: "Log Scale Weight",
      desc: "Step on the scale each morning. Water fluctuations are normal; our algorithm smooths them out."
    },
    {
      num: "02",
      title: "Log Daily Calories",
      desc: "Log what you eat. Consistent averages are far more valuable than perfect daily tracking."
    },
    {
      num: "03",
      title: "Get Your True TDEE",
      desc: "The feedback loop calculates your exact expenditure, updating your targets automatically."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-6 border-t border-white/5 z-10">
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-4">
          HOW IT WORKS
        </p>
        <h2 className="text-3xl md:text-5xl font-light text-white mb-16">
          Tracking that <span className="text-[#F97316] italic font-normal">actually</span> works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col border-t border-white/10 pt-8"
            >
              <div className="text-sm font-bold text-[#F97316] mb-3">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

