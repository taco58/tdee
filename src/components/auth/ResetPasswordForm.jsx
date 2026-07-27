"use client"

import React, { useActionState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { updatePassword } from "@/lib/auth/actions"

export default function ResetPasswordForm({ className, ...props }) {
  const [state, formAction, isPending] = useActionState(updatePassword, null)

  return (
    <div className={cn("flex flex-col gap-6 w-full font-light", className)} {...props}>
      <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 md:p-8 w-full text-left shadow-2xl">
        
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-2">
            NEW PASSWORD
          </p>
          <h2 className="text-2xl font-light text-white leading-tight">
            Create new <span className="text-[#F97316] italic font-normal">password</span>.
          </h2>
          <p className="text-xs text-white/40 mt-1">
            Please enter your new password below.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-[9px] uppercase tracking-[0.15em] text-white/50 font-bold mb-2">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#F97316] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold shadow-none transition-colors disabled:opacity-50"
              >
                {isPending ? "Updating password..." : "Update Password"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
