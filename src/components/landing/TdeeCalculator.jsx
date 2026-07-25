"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Activity, Flame, Target } from 'lucide-react';
import Link from 'next/link';

export default function TdeeCalculator() {
  const [gender, setGender] = useState('male');
  const [unit, setUnit] = useState('imperial');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(165);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [heightCm, setHeightCm] = useState(175);
  const [activity, setActivity] = useState(1.375);

  const [tdee, setTdee] = useState(2400);
  const [bmr, setBmr] = useState(1700);

  const activityLevels = [
    { value: 1.2, label: 'Sedentary', desc: 'Desk job, little to no exercise' },
    { value: 1.375, label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { value: 1.55, label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { value: 1.725, label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { value: 1.9, label: 'Extra Active', desc: 'Physical job or elite athlete' }
  ];

  useEffect(() => {
    let wKg = unit === 'imperial' ? weight * 0.45359237 : weight;
    let hCm = heightCm;
    if (unit === 'imperial') {
      const totalInches = heightFt * 12 + heightIn;
      hCm = totalInches * 2.54;
    }

    if (wKg <= 0 || hCm <= 0 || age <= 0) return;

    let bmrVal = 0;
    if (gender === 'male') {
      bmrVal = 10 * wKg + 6.25 * hCm - 5 * age + 5;
    } else {
      bmrVal = 10 * wKg + 6.25 * hCm - 5 * age - 161;
    }

    const tdeeVal = bmrVal * activity;

    setBmr(Math.round(bmrVal));
    setTdee(Math.round(tdeeVal));
  }, [gender, unit, age, weight, heightFt, heightIn, heightCm, activity]);

  return (
    <section id="calculator" className="relative py-20 px-6 bg-[#242424]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Estimate Your Daily Maintenance Calories
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm">
            Calculate your static starting numbers. Adaptive TDEE will customize these automatically based on your real weight trends and calorie intake once you start logging.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Card className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6 bg-[#111111] border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Gender</label>
                  <div className="grid grid-cols-2 bg-white/5 p-1 rounded-full border border-white/5">
                    <button
                      onClick={() => setGender('male')}
                      className={`py-2 px-3 rounded-full text-xs font-bold transition-all ${
                        gender === 'male' ? 'bg-orange-600 text-white shadow-md' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`py-2 px-3 rounded-full text-xs font-bold transition-all ${
                        gender === 'female' ? 'bg-orange-600 text-white shadow-md' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Units</label>
                  <div className="grid grid-cols-2 bg-white/5 p-1 rounded-full border border-white/5">
                    <button
                      onClick={() => {
                        setUnit('imperial');
                        setWeight(Math.round(weight * 2.20462));
                      }}
                      className={`py-2 px-3 rounded-full text-xs font-bold transition-all ${
                        unit === 'imperial' ? 'bg-orange-600 text-white shadow-md' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Imperial
                    </button>
                    <button
                      onClick={() => {
                        setUnit('metric');
                        setWeight(Math.round(weight / 2.20462));
                      }}
                      className={`py-2 px-3 rounded-full text-xs font-bold transition-all ${
                        unit === 'metric' ? 'bg-orange-600 text-white shadow-md' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Metric
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Age (Years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">
                    Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Height</label>
                {unit === 'imperial' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white font-bold focus:border-orange-500 focus:outline-none transition-colors text-sm"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">FT</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white font-bold focus:border-orange-500 focus:outline-none transition-colors text-sm"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">IN</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white font-bold focus:border-orange-500 focus:outline-none transition-colors text-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">CM</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Activity Level</label>
                <div className="flex flex-col gap-2">
                  {activityLevels.map((lvl) => (
                    <button
                      key={lvl.value}
                      onClick={() => setActivity(lvl.value)}
                      className={`text-left p-3 rounded-xl border transition-all flex justify-between items-center ${
                        activity === lvl.value
                          ? 'bg-orange-600/10 border-orange-500/30 text-white'
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-white/80'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold">{lvl.label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{lvl.desc}</p>
                      </div>
                      <span className="text-xs font-bold text-orange-500">x{lvl.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="p-8 bg-[#111111] border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="p-3 bg-orange-600/10 rounded-full border border-orange-500/20 text-orange-500 mb-6">
                <Flame className="w-8 h-8" />
              </div>

              <p className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Estimated TDEE</p>
              <h3 className="text-5xl font-black text-white mb-2 tracking-tight flex items-baseline justify-center">
                {tdee}
                <span className="text-lg font-normal text-white/40 ml-2">kcal/day</span>
              </h3>
              <p className="text-xs text-white/50 max-w-xs mb-8">
                Your estimated Daily Maintenance calories based on standard metabolic formulas.
              </p>

              <div className="w-full pt-4 border-t border-white/5 flex justify-between items-center text-sm px-4">
                <span className="text-white/40 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> BMR (Basal Metabolic Rate)
                </span>
                <span className="font-bold text-white">{bmr} kcal</span>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-[#111111] border-white/5 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Weight Loss</p>
                  <p className="text-2xl font-black text-white">{tdee - 500} <span className="text-xs font-normal text-white/45">kcal</span></p>
                </div>
                <p className="text-[10px] text-white/30 mt-3 italic">-500 kcal deficit</p>
              </Card>

              <Card className="p-4 bg-[#111111] border-white/5 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Maintenance</p>
                  <p className="text-2xl font-black text-white">{tdee} <span className="text-xs font-normal text-white/45">kcal</span></p>
                </div>
                <p className="text-[10px] text-white/30 mt-3 italic">Maintain weight</p>
              </Card>

              <Card className="p-4 bg-[#111111] border-white/5 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Muscle Gain</p>
                  <p className="text-2xl font-black text-white">{tdee + 300} <span className="text-xs font-normal text-white/45">kcal</span></p>
                </div>
                <p className="text-[10px] text-white/30 mt-3 italic">+300 kcal surplus</p>
              </Card>
            </div>

            <Card className="p-5 bg-[#111111]/70 border-white/5 flex items-start gap-4">
              <div className="p-2 bg-orange-600/10 rounded-lg text-orange-500 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">The Adaptive Advantage</h4>
                <p className="text-xs text-white/55 leading-relaxed">
                  These static numbers can be inaccurate due to your personal muscle ratio, metabolism, and adaptive thermogenesis. Adaptive TDEE syncs your body weight changes vs. exact intake to pinpoint your true metabolism.
                </p>
                <Link href="/signup">
                  <button className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors mt-3 inline-flex items-center gap-1 cursor-pointer">
                    Start Adaptive Tracking Now &rarr;
                  </button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

