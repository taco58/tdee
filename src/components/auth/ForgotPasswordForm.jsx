"use client"

import React, { useActionState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { resetPassword } from "@/lib/auth/actions"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordForm({ className, ...props }) {
  const [state, formAction, isPending] = useActionState(resetPassword, null)

  return (
    <div className={cn("flex flex-col gap-6 w-full font-light", className)} {...props}>
      <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 md:p-8 w-full text-left shadow-2xl">
        
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-2">
            RECOVERY
          </p>
          <h2 className="text-2xl font-light text-white leading-tight">
            Reset your <span className="text-[#F97316] italic font-normal">password</span>.
          </h2>
          <p className="text-xs text-white/40 mt-1">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
            {state.error}
          </div>
        )}

        {state?.success ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-3 text-xs text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-emerald-200">Reset link sent!</p>
                <p className="text-emerald-400/80 leading-relaxed">
                  We sent a password recovery link to your email address. Please check your inbox.
                </p>
              </div>
            </div>

            <Link href="/login">
              <Button className="w-full rounded-full bg-white/10 hover:bg-white/20 text-white border-transparent py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold shadow-none transition-colors">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form action={formAction}>
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

              <div className="flex flex-col gap-3 mt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold shadow-none transition-colors disabled:opacity-50"
                >
                  {isPending ? "Sending link..." : "Send Reset Link"}
                </Button>

                <Link
                  href="/login"
                  className="flex items-center justify-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors mt-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to login</span>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
