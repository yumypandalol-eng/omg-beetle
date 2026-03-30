'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'sonner'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HomeSection() {
  const [copied, setCopied] = useState(false)

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText('beetlesmp.fun')
      setCopied(true)
      toast.success('IP copied', { description: 'beetlesmp.fun', duration: 2000 })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] mb-2"
          >
            Beetle
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            custom={0.15}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8"
            style={{ color: '#6b6b6b' }}
          >
            Network
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed mb-8"
            style={{ fontWeight: 300 }}
          >
            Leading upcoming Asian competitive Minecraft SMP
          </motion.p>

          {/* IP */}
          <motion.div variants={fadeUp} custom={0.25} className="mb-14">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-600">
                Server Address
              </span>
              <button
                onClick={copyIP}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-200 hover:border-white/[0.12] cursor-pointer"
              >
                <span className="font-tech text-sm font-medium text-white tracking-wider">
                  beetlesmp.com
                </span>
                <span
                  className="text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-md transition-colors duration-200"
                  style={{
                    color: copied ? '#10b981' : '#6b6b6b',
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl"
          >
            {[
              { label: 'Uptime', value: '99.99%', sub: 'Enterprise' },
              { label: 'Region', value: 'APAC', sub: 'Singapore' },
              { label: 'Players', value: 'Growing', sub: 'Join us' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 sm:p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]"
              >
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-500 block mb-1.5">
                  {item.label}
                </span>
                <span className="font-display text-xl sm:text-2xl font-semibold text-white block">
                  {item.value}
                </span>
                <span className="text-[10px] text-neutral-500">{item.sub}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={0.4} className="flex flex-col sm:flex-row gap-3 mt-10">
            <button
              onClick={copyIP}
              className="px-8 py-3 rounded-lg font-display font-medium text-sm text-white border border-white/[0.08] bg-white/[0.03] transition-colors duration-200 hover:border-white/[0.15] cursor-pointer"
            >
              Play Now
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('[data-page="discord"]') as HTMLElement
                el?.click()
              }}
              className="px-8 py-3 rounded-lg font-display font-medium text-sm text-neutral-400 transition-colors duration-200 hover:text-white cursor-pointer"
            >
              Join Discord
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
