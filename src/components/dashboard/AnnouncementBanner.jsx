"use client"

import React, { useState, useEffect } from "react"
import { Sparkles, X } from "lucide-react"

export default function AnnouncementBanner({ id = "csv_excel_v1", title, message, messageSm }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem(`adaptdee_dismiss_banner_${id}`) === "true"
      if (!dismissed) {
        const timer = setTimeout(() => setVisible(true), 0)
        return () => clearTimeout(timer)
      }
    }
  }, [id])

  if (!visible) return null

  const handleDismiss = () => {
    setVisible(false)
    if (typeof window !== "undefined") {
      localStorage.setItem(`adaptdee_dismiss_banner_${id}`, "true")
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#F97316]/20 via-[#F97316]/10 to-transparent border-b border-[#F97316]/20 py-2.5 px-4 z-30 relative">
      <div className="font-mono max-w-[1200px] mx-auto flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">{title}:</span>
          <span className="text-zinc-300 font-light hidden sm:inline">{message}</span>
          <span className="text-zinc-300 font-light inline sm:hidden">{messageSm}</span>
        </div>

        <button
          onClick={handleDismiss}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono shrink-0"
        >
          <span>Dismiss</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
