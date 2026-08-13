"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getProfile() {
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
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function saveProfile(profileData: any) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  const rawActivity = parseFloat(profileData.activityLevel)
  const activityVal = (!isNaN(rawActivity) && rawActivity > 0) ? rawActivity : 1.2

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      name: profileData.firstName,
      units: profileData.weightUnit,
      age: parseInt(profileData.age, 10),
      sex: profileData.gender,
      height_cm: parseFloat(profileData.heightCm),
      activity: activityVal,
      init_weight: parseFloat(profileData.init_weight || profileData.startWeight || profileData.weight),
    })
    .select()

  if (error) {
    console.error("DB Error:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard")
  revalidatePath("/info-form")
  revalidatePath("/", "layout")

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

  const rawWeight = logData.weight != null ? parseFloat(logData.weight) : null
  const rawCalories = logData.calories != null ? parseInt(logData.calories, 10) : null

  const weight = rawWeight !== null && !isNaN(rawWeight) && rawWeight > 0 ? rawWeight : null
  const calories = rawCalories !== null && !isNaN(rawCalories) && rawCalories >= 0 ? rawCalories : null

  if (weight === null && calories === null) {
    const { error: deleteError } = await supabase
      .from("logs")
      .delete()
      .eq("user_id", user.id)
      .eq("date", logData.date)

    if (deleteError) {
      return { success: false, error: deleteError.message }
    }
    revalidatePath("/dashboard")
    return { success: true, deleted: true }
  }

  const { data, error } = await supabase
    .from("logs")
    .upsert(
      {
        user_id: user.id,
        date: logData.date,
        weight: weight,
        calories: calories,
        unit: logData.unit || "lbs",
      },
      { onConflict: "user_id,date" }
    )
    .select()

  if (error) {
    console.error("DB Error:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true, data }
}

export async function importBatchLogEntries(entries: Array<{ date: string; weight?: number | null; calories?: number | null; unit?: string }>) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  if (!entries || entries.length === 0) {
    return { success: false, error: "No entries provided" }
  }

  const rowsToUpsert = entries
    .filter((e) => e.date && (e.weight != null || e.calories != null))
    .map((e) => {
      const parsedWeight = e.weight != null && !isNaN(parseFloat(e.weight.toString())) ? parseFloat(e.weight.toString()) : null
      const parsedCalories = e.calories != null && !isNaN(parseInt(e.calories.toString(), 10)) ? parseInt(e.calories.toString(), 10) : null
      return {
        user_id: user.id,
        date: e.date,
        weight: parsedWeight !== null && parsedWeight > 0 ? parsedWeight : null,
        calories: parsedCalories !== null && parsedCalories >= 0 ? parsedCalories : null,
        unit: e.unit || "lbs",
      }
    })
    .filter((r) => r.weight !== null || r.calories !== null)

  if (rowsToUpsert.length === 0) {
    return { success: false, error: "No valid entries found to import" }
  }

  const { data, error } = await supabase
    .from("logs")
    .upsert(rowsToUpsert, { onConflict: "user_id,date" })
    .select()

  if (error) {
    console.error("Batch DB Import Error:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true, count: rowsToUpsert.length, data }
}
