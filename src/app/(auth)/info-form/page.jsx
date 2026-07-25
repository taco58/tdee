"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { dmSans } from "@/components/ui/Fonts"
import ProfileSetupForm from "@/components/auth/ProfileSetupForm"
import { saveProfile } from "@/lib/profile-actions"
import Image from "next/image"
import Link from "next/link"

export default function InfoFormPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSuccess = async (data) => {
    setError("")

    const result = await saveProfile(data)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(
        result.error || "An error occurred while saving your profile data.",
      )
    }
  }

  return (
    <main
      className={`min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 flex items-center justify-center p-6 md:p-10 ${dmSans.className}`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-xl flex flex-col items-center gap-8 relative z-10">

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-medium text-left">
            {error}
          </div>
        )}

        <Link href="/">
          <button className="cursor-pointer flex items-center justify-center rounded-full hover:opacity-85 transition-opacity">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full object-cover shrink-0 filter brightness-110"
            />
          </button>
        </Link>

        <ProfileSetupForm onSubmitSuccess={handleSuccess} />
      </div>
    </main>
  )
}

