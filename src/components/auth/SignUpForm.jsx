"use client";

import React, { useState, useActionState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { signup } from "@/lib/auth/actions"
import Link from "next/link"

export function SignupForm({ className, ...props }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [state, formAction, isPending] = useActionState(signup, null);

  const displayError = state?.error || error;

  const handleSubmit = (e) => {
    setError("");

    if (password.length < 8) {
      e.preventDefault();
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      setError("Passwords do not match.");
      return;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full font-light", className)} {...props}>
      <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 md:p-8 w-full text-left">
        
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-2">
            REGISTER
          </p>
          <h2 className="text-2xl font-light text-white leading-tight">
            Create your <span className="text-[#F97316] italic font-normal">account</span>.
          </h2>
          <p className="text-xs text-white/40 mt-1">
            Start tracking your true expenditure.
          </p>
        </div>

        {displayError && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
            {displayError}
          </div>
        )}

        <form action={formAction} onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#F97316] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label htmlFor="password" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
                  Password
                </label>
                <input 
                  id="password" 
                  name="password"
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="confirm-password" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
                  Confirm Password
                </label>
                <input 
                  id="confirm-password" 
                  name="confirm-password"
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <p className="text-[10px] text-white/30">
              Must be at least 8 characters long.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <Button type="submit" disabled={isPending} className="disabled:opacity-50 w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold shadow-none transition-colors">
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
              <p className="text-center text-xs text-white/40">
                Already have an account?{" "}
                <Link href="/login" className="text-[#F97316] hover:text-[#EA580C] font-normal transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      <p className="px-6 text-center text-[10px] text-white/35 leading-relaxed">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="hover:text-white transition-colors underline">
          Terms of Service
        </Link>
        {" "}
        and{" "}
        <Link href="/privacy" className="hover:text-white transition-colors underline">
          Privacy Policy
        </Link>.
      </p>
    </div>
  )
}

