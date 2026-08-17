import React from "react"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans pb-24 md:pb-12 select-none animate-pulse">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#F97316]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <div className="h-4 w-24 bg-white/10 rounded" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-20 bg-white/5 rounded-full border border-white/5" />
            <div className="h-8 w-24 bg-white/5 rounded-full border border-white/5" />
            <div className="h-9 w-9 rounded-full bg-white/10 border border-white/10" />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[480px] mx-auto px-4 pt-6 md:max-w-[1200px] md:px-8 md:pt-8">
        <div className="flex flex-col gap-6 md:grid lg:grid-cols-[1fr_380px] lg:gap-6 lg:items-start">
          
          <div className="space-y-6 order-2 md:order-1 md:pb-12">
            
            <div className="bg-[#0D0D12] border border-white/5 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="space-y-1.5">
                  <div className="h-3 w-28 bg-white/10 rounded" />
                  <div className="h-5 w-40 bg-white/10 rounded-md" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-12 bg-white/5 rounded-lg" />
                  <div className="h-7 w-12 bg-white/5 rounded-lg" />
                </div>
              </div>
              <div className="h-[260px] sm:h-[300px] w-full bg-white/[0.02] rounded-2xl flex items-end p-4 gap-2">
                <div className="h-1/3 flex-1 bg-white/5 rounded-t" />
                <div className="h-1/2 flex-1 bg-white/5 rounded-t" />
                <div className="h-2/5 flex-1 bg-white/5 rounded-t" />
                <div className="h-3/5 flex-1 bg-white/5 rounded-t" />
                <div className="h-4/6 flex-1 bg-white/5 rounded-t" />
                <div className="h-1/2 flex-1 bg-white/5 rounded-t" />
                <div className="h-3/4 flex-1 bg-white/5 rounded-t" />
              </div>
            </div>

            <div className="bg-[#0D0D12] border border-white/5 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="space-y-1.5">
                  <div className="h-3 w-32 bg-white/10 rounded" />
                  <div className="h-5 w-44 bg-white/10 rounded-md" />
                </div>
                <div className="h-6 w-24 bg-white/5 rounded-full" />
              </div>
              <div className="h-[260px] sm:h-[300px] w-full bg-white/[0.02] rounded-2xl flex items-end p-4 gap-3">
                <div className="h-2/5 flex-1 bg-[#F97316]/10 rounded-t" />
                <div className="h-1/2 flex-1 bg-[#F97316]/10 rounded-t" />
                <div className="h-3/5 flex-1 bg-[#F97316]/10 rounded-t" />
                <div className="h-4/6 flex-1 bg-[#F97316]/10 rounded-t" />
                <div className="h-3/5 flex-1 bg-[#F97316]/10 rounded-t" />
                <div className="h-4/5 flex-1 bg-[#F97316]/10 rounded-t" />
              </div>
            </div>

            <div className="bg-[#0D0D12] border border-white/5 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-6 w-20 bg-white/5 rounded-full" />
              </div>
              <div className="grid grid-cols-7 gap-2 pt-2">
                {[...Array(7)].map((_, i) => (
                  <div key={`head-${i}`} className="h-4 bg-white/5 rounded mx-auto w-6" />
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, i) => (
                  <div key={`cell-${i}`} className="h-10 sm:h-12 bg-white/[0.02] rounded-xl border border-white/5" />
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-6 order-1 md:order-2 md:sticky md:top-24 md:h-fit mb-6 md:mb-0">
            
            <div className="bg-[#0D0D12] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="h-3 w-28 bg-white/10 rounded" />
                <div className="h-5 w-24 bg-white/5 rounded-full" />
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/5">
                <div className="h-8 bg-white/10 rounded-xl" />
                <div className="h-8 bg-white/5 rounded-xl" />
                <div className="h-8 bg-white/5 rounded-xl" />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="h-12 w-36 bg-white/15 rounded-lg" />
                  <div className="h-4 w-16 bg-white/10 rounded" />
                </div>
                <div className="h-3 w-48 bg-white/5 rounded" />
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="h-3 w-32 bg-white/10 rounded" />
                <div className="h-10 bg-white/5 rounded-xl" />
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-[#F97316]/20 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]/50" />
                <div className="h-4 w-32 bg-white/10 rounded" />
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-white/10 rounded" />
                  <div className="h-11 bg-white/5 rounded-xl border border-white/10" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                  <div className="h-11 bg-white/5 rounded-xl border border-white/10" />
                </div>
                <div className="h-11 bg-[#F97316]/20 rounded-full mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="h-2.5 w-16 bg-white/10 rounded" />
                <div className="h-6 w-20 bg-white/15 rounded" />
                <div className="h-2 w-24 bg-white/5 rounded" />
              </div>
              <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="h-2.5 w-16 bg-white/10 rounded" />
                <div className="h-6 w-20 bg-white/15 rounded" />
                <div className="h-2 w-24 bg-white/5 rounded" />
              </div>
              <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="h-2.5 w-16 bg-white/10 rounded" />
                <div className="h-6 w-20 bg-white/15 rounded" />
                <div className="h-2 w-24 bg-white/5 rounded" />
              </div>
              <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="h-2.5 w-16 bg-white/10 rounded" />
                <div className="h-6 w-20 bg-white/15 rounded" />
                <div className="h-2 w-24 bg-white/5 rounded" />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
