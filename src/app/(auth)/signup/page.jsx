"use client"

import { jost } from "@/components/ui/Fonts"
import {SignupForm} from "@/components/SignUpForm"
import Image from "next/image"
import Link from "next/link"

export default function SignupPage() {
  return (
    <main
      className={`min-h-screen bg-[#242424] text-white selection:bg-orange-500/30 ${jost.className}`}
    >
      <div className="w-screen h-screen inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_top,transparent,black_10%,black_90%,transparent)]
      flex min-h-svh flex-col items-center justify-center gap-10 p-6 md:p-10">
        <Link href = "/">
            <button className="cursor-pointer flex width-20 height-10 items-center justify-center rounded-md overflow-hidden">
                <Image src="/logo.png" alt="Logo" width={200} height={100} className="object-contain" />
            </button>
        </Link>
        <div className="flex w-full max-w-sm flex-col">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}
