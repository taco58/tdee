"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "What is TDEE?",
      a: "TDEE stands for Total Daily Energy Expenditure. It represents the total number of calories your body burns in a 24-hour period, including your basal metabolism, daily movement (NEAT), exercise, and the energy used to digest food (TEF)."
    },
    {
      q: "How long does it take to calculate my Adaptive TDEE?",
      a: "The algorithm starts outputting an estimate immediately, but it adapts to your unique metabolism and becomes highly accurate after 7 to 14 days of consistent calorie and weight logging."
    },
    {
      q: "Why is Adaptive TDEE better than static calculators?",
      a: "Static calculators rely on generic formulas which only guess your energy needs. They fail to account for muscle mass, individual metabolic rate, and adaptation. Adaptive TDEE uses your real weight trends and food logging to calculate your exact caloric needs."
    },
    {
      q: "Do I need to weigh myself every single day?",
      a: "While daily weighing is recommended (since it provides more data points to smooth out water weight fluctuations), it is not strictly required. Weighing 3-4 times a week is sufficient for accurate adaptation."
    }
  ];

  return (
    <section id="faq" className="relative py-20 px-6 bg-[#242424]">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 mt-2 text-sm">
            Everything you need to know about adaptive calorie tracking
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card 
      onClick={() => setIsOpen(!isOpen)}
      className={`border transition-all duration-200 cursor-pointer ${
        isOpen ? 'bg-[#111111] border-orange-500/20 shadow-md' : 'bg-[#111111]/60 border-white/5 hover:border-white/10'
      }`}
    >
      <div className="p-5 flex items-center justify-between gap-4">
        <h3 className="text-base font-bold text-white leading-snug">
          {question}
        </h3>
        <ChevronDown 
          className={`w-4 h-4 text-white/40 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-orange-500' : ''
          }`} 
        />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 text-sm text-white/50 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
