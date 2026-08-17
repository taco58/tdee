import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return { supabaseResponse, userClaims: null }
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet, headers) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
            Object.entries(headers).forEach(([key, value]) =>
              supabaseResponse.headers.set(key, value)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id
    let hasProfile = false

    const path = request.nextUrl.pathname
    const needsProfileCheck =
      path.startsWith("/dashboard") ||
      path.startsWith("/info-form") ||
      path.startsWith("/login") ||
      path.startsWith("/signup")

    if (userId && needsProfileCheck) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle()

      if (profile) {
        hasProfile = true
      }
    }

    return {
      supabaseResponse,
      userClaims: user ? { sub: user.id } : null,
      hasProfile,
    }
  } catch (error) {
    console.error("Supabase Proxy Session Error:", error)
    return {
      supabaseResponse,
      userClaims: null,
      hasProfile: false,
    }
  }
}