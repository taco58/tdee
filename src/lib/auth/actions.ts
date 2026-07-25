'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {error: error.message}
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return {error: error.message}
  }

  // const cookieStore = await cookies();
  // cookieStore.set("signup_progress", "true", {
  //   maxAge: 5,
  //   path: "/",
  //   httpOnly: true,
  //   secure: true,
  // })

  revalidatePath('/', 'layout')
  redirect('/info-form')
}

export async function logout() {
  const supabase = await createClient()
  // Check if a user's logged in
  const { data: claimsData } = await supabase.auth.getClaims()
  if (claimsData?.claims) {
    await supabase.auth.signOut()
  }
  revalidatePath('/', 'layout')
  redirect('/')
}