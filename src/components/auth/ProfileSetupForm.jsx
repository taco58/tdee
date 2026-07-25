"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"

export default function ProfileSetupForm({ onSubmitSuccess }) {
  const [firstName, setFirstName] = useState("")
  const [weight, setWeight] = useState("")
  const [weightUnit, setWeightUnit] = useState("lbs")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("female")
  const [activityLevel, setActivityLevel] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    if (!firstName || !weight || !height || !age) {
      setMessage("Please fill in all baseline fields.")
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        firstName,
        weight: parseFloat(weight),
        weightUnit,
        heightCm: parseFloat(height),
        age: parseInt(age, 10),
        gender,
        activityLevel,
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setMessage("Profile saved successfully!")
      if (onSubmitSuccess) {
        onSubmitSuccess(payload)
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 md:p-8 font-light text-left relative z-10">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-2">
          BASELINE METRICS
        </p>
        <h2 className="text-2xl font-light text-white leading-tight">
          Configure your <span className="text-[#F97316] italic font-normal">profile</span>.
        </h2>
        <p className="text-xs text-white/40 mt-1">
          Set up your baseline metrics for energy calculations.
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-3 rounded-xl text-xs font-medium border ${
          message.includes("successfully") 
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Alex"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#F97316] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
              Age (Years)
            </label>
            <input
              id="age"
              type="number"
              placeholder="28"
              required
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#F97316] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
          <div className="flex flex-col">
            <label htmlFor="weight" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
              Current Weight
            </label>
            <input
              id="weight"
              type="number"
              step="0.1"
              placeholder={weightUnit === "lbs" ? "165.0" : "75.0"}
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#F97316] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
              Weight Units
            </span>
            <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-full w-full relative">
              <button
                type="button"
                onClick={() => setWeightUnit("lbs")}
                className="flex-1 text-center py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full relative transition-colors duration-200"
                style={{ color: weightUnit === "lbs" ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {weightUnit === "lbs" && (
                  <motion.div
                    layoutId="weightUnitHighlight"
                    className="absolute inset-0 bg-[#F97316] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Pounds (lbs)</span>
              </button>
              <button
                type="button"
                onClick={() => setWeightUnit("kg")}
                className="flex-1 text-center py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full relative transition-colors duration-200"
                style={{ color: weightUnit === "kg" ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {weightUnit === "kg" && (
                  <motion.div
                    layoutId="weightUnitHighlight"
                    className="absolute inset-0 bg-[#F97316] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Kilograms (kg)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
          <div className="flex flex-col">
            <label htmlFor="height" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
              Height (Centimeters - cm)
            </label>
            <input
              id="height"
              type="number"
              step="0.1"
              placeholder="178.0"
              required
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#F97316] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
              Biological Gender
            </span>
            <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-full w-full relative">
              {["female", "male"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className="flex-1 text-center py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full relative transition-colors duration-200"
                  style={{ color: gender === g ? "#fff" : "rgba(255,255,255,0.4)" }}
                >
                  {gender === g && (
                    <motion.div
                      layoutId="genderHighlight"
                      className="absolute inset-0 bg-[#F97316] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{g}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="activityLevel" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
            Weekly Activity Level
          </label>
          <select
            id="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full bg-[#111115] border border-white/10 rounded-full px-4 py-2.5 text-xs md:text-sm text-white focus:border-[#F97316] focus:outline-none transition-colors appearance-none cursor-pointer text-left"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: `right 1rem center`,
              backgroundSize: `1.25em 1.25em`,
              backgroundRepeat: `no-repeat`,
            }}
          >
            <option value={1.2}>Sedentary — &lt; 5,000 steps/day · Desk job, no formal exercise</option>
            <option value={1.375}>Lightly Active — 5,000–7,500 steps/day · Light exercise 1–3 days/wk</option>
            <option value={1.55}>Moderately Active — 7,500–10,000 steps/day · Moderate exercise 3–5 days/wk</option>
            <option value={1.725}>Very Active — 10,000–14,000 steps/day · Hard training 6–7 days/wk</option>
            <option value={1.9}>Extra Active — 14,000+ steps/day · Physical job or 2x/day athlete training</option>
          </select>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent py-3 text-[10px] uppercase tracking-[0.15em] font-bold shadow-none transition-colors mt-2"
        >
          {isSubmitting ? "Saving Parameters..." : "Save and Continue"}
        </Button>
      </form>
    </div>
  )
}

