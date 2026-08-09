"use client"

import React from "react"
import { motion } from "framer-motion"

const reviews = [
  {
    name: "Marcus Vance",
    role: "Natural Bodybuilder & Coach",
    tag: "Cut 18 lbs cleanly",
    review:
      "Online calculators told me my maintenance was 2,300 kcal. I was starving and stuck. This app's adaptive feedback algorithm revealed my actual TDEE was 2,750 kcal. Game changer for prep.",
    initials: "MV",
  },
  {
    name: "Elena Rostova",
    role: "Powerlifter",
    tag: "Broke 5-month plateau",
    review:
      "The water weight filtering is incredible. Normal daily fluctuations used to throw off my entire diet. The system dampens noise so I actually know when body mass is shifting versus holding water.",
    initials: "ER",
  },
  {
    name: "David Chen",
    role: "Software Engineer & Runner",
    tag: "Rebuilt maintenance baseline",
    review:
      "As a data nerd, I love the math rigor behind this. Seeing the smooth trend curve react dynamically to my mileage and food logs eliminated all guesswork from my lean bulk.",
    initials: "DC",
  },
  {
    name: "Sarah Jenkins",
    role: "CrossFit Athlete",
    tag: "Maintained lean mass",
    review:
      "I used to constantly under-eat because standard formulas undercount high activity. AdapTDEE adjusted to my training volume within 3 weeks. Essential tool.",
    initials: "SJ",
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-28 px-6 border-t border-white/5 bg-[#0A0A0F] z-10">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">REVIEWS & PROOF</p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Backed by <span className="text-[#F97316] italic font-normal">math</span>. Loved by real users.
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto font-light leading-relaxed">
            See how lifters, athletes, and data-driven trackers replaced generic online formulas with true adaptive metabolic feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-7 bg-[#0D0D12] border border-white/5 hover:border-[#F97316]/30 transition-all rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-semibold text-[#F97316]">
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{review.name}</h4>
                      <p className="text-[11px] text-white/40 font-light">{review.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#F97316] bg-[#F97316]/10 px-2.5 py-1 rounded border border-[#F97316]/20 font-mono">
                    VERIFIED USER
                  </span>
                </div>

                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mb-6 italic">
                  &quot;{review.review}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20 font-light">
                  {review.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
