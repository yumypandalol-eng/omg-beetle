'use client'

import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.05] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md overflow-hidden border border-white/[0.06]">
                <Image src="/logo.jpg" alt="Beetle Network" width={28} height={28} className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-semibold text-sm text-white tracking-tight">
                Beetle<span className="text-neutral-500">Network</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed" style={{ fontWeight: 300 }}>
              Leading upcoming Asian competitive Minecraft SMP.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-600 block mb-3">Navigate</span>
            <ul className="space-y-1.5">
              {['Home', 'Features', 'Hardware', 'Discord', 'About'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const btn = document.querySelector(`[data-page="${item.toLowerCase()}"]`) as HTMLElement
                      btn?.click()
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-xs text-neutral-500 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-600 block mb-3">Server</span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => navigator.clipboard.writeText('beetlesmp.fun')}
                  className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer font-tech tracking-wider"
                >
                  beetlesmp.fun
                </button>
              </li>
              <li className="text-xs text-neutral-500">Java Edition</li>
              <li className="text-xs text-neutral-500">APAC Region</li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-600 block mb-3">Community</span>
            <ul className="space-y-1.5">
              <li>
                <a href="https://discord.gg/H58XRmBZwq" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition-colors">
                  Discord Server
                </a>
              </li>
              <li className="text-xs text-neutral-500">denial.xd</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] text-neutral-600">{currentYear} Beetle Network. All rights reserved.</span>
          <span className="text-[10px] text-neutral-600">Not affiliated with Mojang Studios or Microsoft.</span>
        </div>
      </div>
    </footer>
  )
}
