import React from 'react';

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

export default function HowItWorksSteps() {
  return (
    <section id="how-it-works" className="relative py-28 px-6 border-t border-white/5 z-10">
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        <p className="eyebrow mb-4">
          HOW IT WORKS
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-16 tracking-tight">
          Tracking that <span className="text-[#F97316] italic font-normal">actually</span> works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative flex flex-col border-t border-white/10 pt-8 animate-in-view"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-xs font-mono font-semibold text-[#F97316] mb-3 tracking-widest">
                {step.num}
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

