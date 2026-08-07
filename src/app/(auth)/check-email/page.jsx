import Image from "next/image"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function CheckEmailPage() {
  const cookieStore = await cookies()
  const signupProgress = cookieStore.get("signup_progress")

  if (!signupProgress) {
    redirect("/signup")
  }

  return (
    <main
      className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-6"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none"
      />
      <div className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10 text-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            className="rounded-full object-cover shrink-0 filter brightness-110"
          />
        </Link>

        <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-8 w-full">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F97316] mb-2">
            REGISTRATION
          </p>
          <h2 className="text-2xl font-light text-white mb-4 leading-tight">
            Check your{" "}
            <span className="text-[#F97316] italic font-normal">inbox</span>.
          </h2>
          <p className="text-sm text-white/50 leading-relaxed font-light mb-6">
            We have sent a verification link to your email address. Please click
            the link to confirm your account and log in.
          </p>

          <div className="border-t border-white/5 pt-6">
            <Link
              href="/login"
              className="text-xs uppercase tracking-[0.1em] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
            >
              Back to Login &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

