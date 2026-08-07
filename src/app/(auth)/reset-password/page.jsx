import ResetPasswordForm from "@/components/auth/ResetPasswordForm"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Reset Password | AdapTDEE",
  description: "Set a new password for your AdapTDEE account.",
}

export default async function ResetPasswordPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main
      className="min-h-screen bg-[#0A0A0F] text-white selection:bg-orange-500/30 flex items-center justify-center p-6 md:p-10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10">
        <Link href="/">
          <button className="cursor-pointer flex items-center justify-center rounded-full hover:opacity-85 transition-opacity">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              className="rounded-full object-cover shrink-0 filter brightness-110"
            />
          </button>
        </Link>

        <div className="w-full">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  )
}
