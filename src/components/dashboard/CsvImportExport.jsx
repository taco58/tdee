"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { importBatchLogEntries } from "@/lib/profile-actions"
import { FileSpreadsheet, Download, Upload, X } from "lucide-react"

export default function CsvImportExportModal({ isOpen, onClose, logs = [], weightUnit = "lbs" }) {
  const router = useRouter()
  const fileInputRef = useRef(null)

  const [isImporting, setIsImporting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  if (!isOpen) return null

  // 1. Export Logs to CSV
  const handleExportCsv = () => {
    if (!logs || logs.length === 0) {
      alert("No log entries available to export.")
      return
    }

    const headers = ["Date", "Weight", "Calories", "Unit"]
    const rows = logs.map((l) => [
      l.date || "",
      l.weight != null ? l.weight : "",
      l.calories != null ? l.calories : "",
      l.unit || weightUnit,
    ])

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `tdee_logs_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 2. Parse & Import CSV
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setStatusMessage("Parsing CSV file...")

    try {
      const text = await file.text()
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

      if (lines.length <= 1) {
        setStatusMessage("Error: CSV file is empty or missing headers.")
        setIsImporting(false)
        return
      }

      const headers = lines[0].toLowerCase().split(",").map((h) => h.trim().replace(/['"]/g, ""))
      const dateIdx = headers.findIndex((h) => h.includes("date"))
      const weightIdx = headers.findIndex((h) => h.includes("weight") || h.includes("wt"))
      const calIdx = headers.findIndex((h) => h.includes("cal") || h.includes("energy"))
      const unitIdx = headers.findIndex((h) => h.includes("unit"))

      if (dateIdx === -1) {
        setStatusMessage("Error: Could not find 'Date' column in CSV.")
        setIsImporting(false)
        return
      }

      const parsedEntries = []

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map((c) => c.trim().replace(/['"]/g, ""))
        const dateRaw = cols[dateIdx]
        if (!dateRaw) continue

        let dateFormatted = ""
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) {
          dateFormatted = dateRaw
        } else {
          const dateObj = new Date(dateRaw)
          if (isNaN(dateObj.getTime())) continue
          const year = dateObj.getFullYear()
          const month = String(dateObj.getMonth() + 1).padStart(2, "0")
          const day = String(dateObj.getDate()).padStart(2, "0")
          dateFormatted = `${year}-${month}-${day}`
        }

        const weightVal = weightIdx !== -1 && cols[weightIdx] ? parseFloat(cols[weightIdx]) : null
        const calVal = calIdx !== -1 && cols[calIdx] ? parseInt(cols[calIdx], 10) : null
        const unitVal = unitIdx !== -1 && cols[unitIdx] ? cols[unitIdx] : weightUnit

        if (weightVal !== null || calVal !== null) {
          parsedEntries.push({
            date: dateFormatted,
            weight: !isNaN(weightVal) ? weightVal : null,
            calories: !isNaN(calVal) ? calVal : null,
            unit: unitVal,
          })
        }
      }

      if (parsedEntries.length === 0) {
        setStatusMessage("Error: No valid weight or calorie rows found.")
        setIsImporting(false)
        return
      }

      setStatusMessage(`Importing ${parsedEntries.length} entries to database...`)
      const res = await importBatchLogEntries(parsedEntries)

      if (res?.success) {
        setStatusMessage(`Successfully imported ${res.count} log entries!`)
        setTimeout(() => {
          setStatusMessage(null)
          router.refresh()
          onClose()
        }, 1500)
      } else {
        setStatusMessage(`Import failed: ${res?.error || "Unknown error"}`)
      }
    } catch (err) {
      console.error("CSV Import Error:", err)
      setStatusMessage("Failed to process CSV file.")
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 text-left"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316]">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <span className="eyebrow block text-[10px]">DATA MANAGEMENT</span>
                <h3 className="font-display text-lg font-bold text-white tracking-tight">
                  CSV Backup & Import
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            Export a full CSV backup of your historical weight and calorie logs, or import history from MyFitnessPal, MacroFactor, or custom spreadsheets.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer group"
            >
              <Download className="w-5 h-5 text-zinc-400 group-hover:text-white transition-transform group-hover:scale-110" />
              <span className="text-xs font-semibold">Export CSV</span>
            </button>

            <button
              type="button"
              disabled={isImporting}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-[#F97316]/30 bg-[#F97316]/10 hover:bg-[#F97316]/20 text-[#F97316] transition-all cursor-pointer group disabled:opacity-50"
            >
              <Upload className="w-5 h-5 text-[#F97316] transition-transform group-hover:scale-110" />
              <span className="text-xs font-semibold">{isImporting ? "Importing..." : "Import CSV"}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {statusMessage && (
            <p className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-center">
              {statusMessage}
            </p>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
