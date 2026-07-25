"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { LogOut, User, ChevronDown } from "lucide-react"
import { logout } from "@/lib/auth/actions"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardHeader({ profile }) {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const userName = profile?.name || profile?.firstName || "Account"
  const firstInitial = userName[0]?.toUpperCase() || "A"
  const userUnits = profile?.units || "lbs"
  const userAge = profile?.age
  const userHeight = profile?.height_cm
  const userGender = profile?.sex

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b border-white/5 ${
        scrolled
          ? "bg-[#0A0A0F]/95 backdrop-blur-md shadow-2xl"
          : "bg-[#0A0A0F]/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group select-none">
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full object-cover shrink-0 filter brightness-110"
          />
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer select-none"
          >
            <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] flex items-center justify-center text-[10px] font-bold uppercase">
              {firstInitial}
            </div>
            <span className="text-xs font-semibold text-white tracking-wide">{userName}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 font-sans"
              >
                <div className="px-3 py-2.5 mb-1 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white leading-none">{userName}</p>
                    <p className="text-[10px] text-zinc-400 mt-1 uppercase font-mono tracking-wider">
                      Units: <span className="text-[#F97316] font-semibold">{userUnits}</span><br/>
                      Age: <span className="text-[#F97316] font-semibold">{userAge || "N/A"}</span><br/>
                      Height: <span className="text-[#F97316] font-semibold">{userHeight || "N/A"}</span><br/>
                      Gender: <span className="text-[#F97316] font-semibold">{userGender || "N/A"}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href="/info-form"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors group cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#F97316] transition-transform group-hover:scale-110" />
                  <span>Edit Profile</span>
                </Link>

                <div className="h-px bg-white/5 my-1" />

                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    logout()
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors group cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 text-red-400 transition-transform group-hover:scale-110" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

