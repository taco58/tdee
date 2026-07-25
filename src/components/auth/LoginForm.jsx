"use client"

import React, { useActionState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { login } from "@/lib/auth/actions"

export default function LoginForm({ className, ...props }) {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className={cn("flex flex-col gap-6 w-full font-light", className)} {...props}>
      <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 md:p-8 w-full text-left">
        
        {/* Eyebrow & Editorial Title */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-2">
            LOGIN
          </p>
          <h2 className="text-2xl font-light text-white leading-tight">
            Welcome <span className="text-[#F97316] italic font-normal">back</span>.
          </h2>
          <p className="text-xs text-white/40 mt-1">
            Access your custom metabolic feedback loop.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <div className="flex flex-col gap-5">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] text-[#F97316] hover:text-[#EA580C] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input 
                id="password" 
                name="password"
                type="password" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:border-[#F97316] focus:outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-3 mt-2">
              <Button type="submit" disabled={isPending} className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold shadow-none transition-colors disabled:opacity-50">
                {isPending ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-xs text-white/40">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-[#F97316] hover:text-[#EA580C] font-normal transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Sub Footer Agreement */}
      <p className="px-6 text-center text-[10px] text-white/35 leading-relaxed">
        By clicking continue, you agree to our{" "}
        <a href="#" className="hover:text-white transition-colors underline">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="hover:text-white transition-colors underline">Privacy Policy</a>.
      </p>
    </div>
  )
}
