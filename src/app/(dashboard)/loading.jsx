import React from "react"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans pb-24 md:pb-12 animate-pulse">
      <div className="h-16 border-b border-white/5 bg-[#0A0A0F] px-4 md:px-8 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-white/5" />
        <div className="w-28 h-8 rounded-full bg-white/5" />
      </div>

      <main className="max-w-[480px] mx-auto px-4 pt-6 md:max-w-[1200px] md:px-8 md:pt-8">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_380px] md:gap-6 md:items-start">
          
          <div className="space-y-6 order-2 md:order-1">
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 h-[320px] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-white/5 rounded-md" />
                <div className="h-3 w-24 bg-white/5 rounded-md" />
              </div>
              <div className="h-48 w-full bg-white/[0.03] rounded-xl" />
            </div>

            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 h-[320px] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="h-4 w-36 bg-white/5 rounded-md" />
                <div className="h-3 w-20 bg-white/5 rounded-md" />
              </div>
              <div className="h-48 w-full bg-white/[0.03] rounded-xl" />
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 h-[180px] flex flex-col justify-between">
              <div className="h-3 w-28 bg-white/5 rounded-md" />
              <div className="h-10 w-44 bg-white/10 rounded-lg" />
              <div className="h-3 w-36 bg-white/5 rounded-md" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 h-[90px] flex flex-col justify-between">
                  <div className="h-2.5 w-16 bg-white/5 rounded-md" />
                  <div className="h-6 w-20 bg-white/10 rounded-md" />
                  <div className="h-2 w-24 bg-white/5 rounded-md" />
                </div>
              ))}
            </div>

            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 h-[200px] flex flex-col justify-between">
              <div className="h-4 w-32 bg-white/5 rounded-md" />
              <div className="h-10 w-full bg-white/[0.03] rounded-xl" />
              <div className="h-10 w-full bg-white/10 rounded-full" />
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

