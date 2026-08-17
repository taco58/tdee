import React from "react"
import { redirect } from "next/navigation"
import { getDashboardInitialData } from "@/lib/tdee"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  let logs = []
  let profile = null
  let adaptiveStats = {}

  try {
    const data = await getDashboardInitialData()
    logs = data.logs
    profile = data.profile
    adaptiveStats = data.adaptiveStats
  } catch (err) {
    console.log("Dashboard data fetch note:", err?.message)
  }

  if (!profile) {
    redirect("/info-form")
  }

  return (
    <DashboardClient
      initialLogs={logs}
      initialProfile={profile}
      initialAdaptiveStats={adaptiveStats}
    />
  )
}

