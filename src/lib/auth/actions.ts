'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '@/lib/supabase/server'

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

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

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/confirm?next=/info-form`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  const cookieStore = await cookies()
  cookieStore.set('signup_progress', 'true', {
    maxAge: 600,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  if (data?.user && !data?.session) {
    revalidatePath('/', 'layout')
    redirect('/check-email')
  }

  revalidatePath('/', 'layout')
  redirect('/info-form')
}

export async function logout() {
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  if (claimsData?.claims) {
    await supabase.auth.signOut()
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}