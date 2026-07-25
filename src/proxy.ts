import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

export async function proxyHandler(request: NextRequest) {
  try {
    const { supabaseResponse, userClaims, hasProfile } = await updateSession(request)

    const authenticated = !!userClaims?.sub
    const path = request.nextUrl.pathname

    const isAuthPage = path.startsWith("/login") || path.startsWith("/signup")
    const isDashboardPage = path.startsWith("/dashboard")
    const isInfoFormPage = path.startsWith("/info-form")

    if (!authenticated && (isDashboardPage || isInfoFormPage)) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (authenticated) {
      if (!hasProfile && isDashboardPage) {
        return NextResponse.redirect(new URL("/info-form", request.url))
      }

      if (isAuthPage) {
        const destination = hasProfile ? "/dashboard" : "/info-form"
        return NextResponse.redirect(new URL(destination, request.url))
      }
    }

    return supabaseResponse || NextResponse.next()
  } catch (err) {
    console.error("Proxy execution error:", err)
    return NextResponse.next()
  }
}

export default proxyHandler
export { proxyHandler as proxy, proxyHandler as middleware }

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
