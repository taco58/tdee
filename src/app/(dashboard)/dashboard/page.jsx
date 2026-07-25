import React from "react"
import { getLogsData, getProfileData, calculateAdaptiveTDEE } from "@/lib/tdee"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  let logs = []
  let profile = null

  try {
    logs = await getLogsData()
    profile = await getProfileData()
  } catch (err) {
    console.log("Dashboard data fetch note:", err?.message)
  }

  const adaptiveStats = await calculateAdaptiveTDEE(logs, profile)

  return (
    <DashboardClient
      initialLogs={logs}
      initialProfile={profile}
      initialAdaptiveStats={adaptiveStats}
    />
  )
}

