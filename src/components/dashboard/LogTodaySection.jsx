"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, X, Sparkles } from "lucide-react"

export default function LogTodaySection({
  isLoggedToday,
  setIsLoggedToday,
  logPanelOpen,
  setLogPanelOpen,
  inputWeight,
  setInputWeight,
  inputCalories,
  setInputCalories,
  onSaveTodayLog,
  weightUnit = "lbs",
  targetCalories = null,
}) {
  const displayUnit = weightUnit.toUpperCase()
  const parsedInputCalories = inputCalories !== "" ? parseInt(inputCalories, 10) : NaN
  const hasValidCalories = !isNaN(parsedInputCalories) && parsedInputCalories >= 0

  return (
    <>
      <div className="hidden md:block">
        {!isLoggedToday ? (
          <div className="bg-[#0D0D0D] border border-[#F97316]/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                Log Today&apos;s Entry
              </p>
            </div>
            <form onSubmit={onSaveTodayLog} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1 font-mono">
                  WEIGHT ({displayUnit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold text-lg focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-mono">
                    CALORIES (KCAL)
                  </label>
                  {targetCalories && (
                    <span className="text-[10px] font-mono text-zinc-500">
                      Budget: {targetCalories.toLocaleString()}
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  min="0"
                  value={inputCalories}
                  onChange={(e) => setInputCalories(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold text-lg focus:border-[#F97316] focus:outline-none transition-colors"
                />
                {targetCalories && hasValidCalories && (
                  <div className="flex items-center justify-between text-[10px] font-mono mt-1 text-zinc-400">
                    <span>Target: {targetCalories.toLocaleString()} kcal</span>
                    <span
                      className={
                        parsedInputCalories > targetCalories
                          ? "text-amber-400 font-semibold"
                          : "text-emerald-400 font-semibold"
                      }
                    >
                      {parsedInputCalories <= targetCalories
                        ? `${(targetCalories - parsedInputCalories).toLocaleString()} kcal remaining`
                        : `+${(parsedInputCalories - targetCalories).toLocaleString()} kcal over budget`}
                    </span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 font-semibold text-xs uppercase tracking-widest shadow-lg shadow-[#F97316]/20 transition-all cursor-pointer"
              >
                Save Today&apos;s Entry
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white">
                  Logged for Today
                </span>
              </div>
              <button
                onClick={() => setIsLoggedToday(false)}
                className="text-xs text-[#F97316] hover:underline font-semibold cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              {inputWeight ? `${inputWeight} ${weightUnit}` : null}
              {inputWeight && inputCalories ? " · " : null}
              {inputCalories ? `${inputCalories} kcal` : null}
              {!inputWeight && !inputCalories ? "Entry saved" : " logged"}
            </p>
            {targetCalories && hasValidCalories && (
              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500">Budget vs Intake:</span>
                <span
                  className={
                    parsedInputCalories > targetCalories
                      ? "text-amber-400 font-medium"
                      : "text-emerald-400 font-medium"
                  }
                >
                  {parsedInputCalories <= targetCalories
                    ? `${(targetCalories - parsedInputCalories).toLocaleString()} kcal remaining`
                    : `+${(parsedInputCalories - targetCalories).toLocaleString()} kcal over`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:hidden">
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[440px] w-[90%] pointer-events-auto">
          {!isLoggedToday ? (
            <button
              onClick={() => setLogPanelOpen(true)}
              className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] shadow-[0_0_25px_rgba(249,115,22,0.5)] px-6 py-3.5 flex items-center justify-between text-white font-bold text-sm cursor-pointer active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span>Log today&apos;s entry</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setLogPanelOpen(true)}
              className="w-full rounded-full bg-[#0D0D0D]/95 border border-white/10 backdrop-blur-md px-6 py-3 flex items-center justify-between text-zinc-300 text-sm cursor-pointer shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">Logged today · tap to edit</span>
              </div>
              <span className="text-xs text-[#F97316] font-bold">Edit</span>
            </button>
          )}
        </div>

        <AnimatePresence>
          {logPanelOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLogPanelOpen(false)}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-white/10 rounded-t-3xl p-6 z-50 max-w-lg mx-auto shadow-2xl"
              >
                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      Log Today
                    </h3>
                    <p className="text-xs text-zinc-400">Today</p>
                  </div>
                  <button
                    onClick={() => setLogPanelOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={onSaveTodayLog} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1 font-mono">
                      WEIGHT ({displayUnit})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={inputWeight}
                      onChange={(e) => setInputWeight(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-white text-2xl font-bold focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-mono">
                        CALORIES (KCAL)
                      </label>
                      {targetCalories && (
                        <span className="text-[10px] font-mono text-zinc-500">
                          Budget: {targetCalories.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={inputCalories}
                      onChange={(e) => setInputCalories(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-white text-2xl font-bold focus:border-orange-500 focus:outline-none transition-colors"
                    />
                    {targetCalories && hasValidCalories && (
                      <div className="flex items-center justify-between text-[11px] font-mono mt-1.5 text-zinc-400">
                        <span>Target: {targetCalories.toLocaleString()} kcal</span>
                        <span
                          className={
                            parsedInputCalories > targetCalories
                              ? "text-amber-400 font-semibold"
                              : "text-emerald-400 font-semibold"
                          }
                        >
                          {parsedInputCalories <= targetCalories
                            ? `${(targetCalories - parsedInputCalories).toLocaleString()} kcal remaining`
                            : `+${(parsedInputCalories - targetCalories).toLocaleString()} kcal over budget`}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white py-4 font-bold text-base mt-4 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
                  >
                    Save Entry
                  </button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
