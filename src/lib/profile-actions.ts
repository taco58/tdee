"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveProfile(profileData: any) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      name: profileData.firstName,
      units: profileData.weightUnit,
      age: parseInt(profileData.age, 10),
      sex: profileData.gender,
      height_cm: parseFloat(profileData.heightCm),
      activity: profileData.activityLevel,
      init_weight: parseFloat(profileData.init_weight || profileData.startWeight || profileData.weight),
    })
    .select()

  if (error) {
    console.error("DB Error:", error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function createLogEntry(logData: any) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const { data, error } = await supabase
    .from("logs")
    .upsert(
      {
        user_id: user.id,
        date: logData.date,
        weight: logData.weight ? parseFloat(logData.weight) : null,
        calories: logData.calories ? parseInt(logData.calories, 10) : null,
      },
      { onConflict: "user_id,date" }
    )
    .select()

  if (error) {
    console.error("DB Error:", error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
