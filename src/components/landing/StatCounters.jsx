"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function StatCounters() {
  const stats = [
    {
      num: "6 weeks",
      desc: "Until your TDEE is fully adapted to your body"
    },
    {
      num: "2 numbers",
      desc: "Weight and calories. That's all we need from you daily"
    },
    {
      num: "100%",
      desc: "Your data. Formula estimates gone after enough real data"
    }
  ];

  return (
    <section className="relative py-28 px-6 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#F97316] mb-4 tracking-tight">
                {stat.num}
              </div>
              <p className="text-sm md:text-[15px] text-white/50 leading-relaxed max-w-[220px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
