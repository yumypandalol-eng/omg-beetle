'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function AboutSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  const infoItems = [
    { label: 'Age', value: '22' },
    { label: 'Discord', value: 'denial.xd' },
    { label: 'Focus', value: 'Coding' },
    { label: 'Style', value: 'CPvP' },
  ]

  return (
    <div className="relative min-h-screen" style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}>
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 block mb-3">The Person Behind</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">About the Owner</h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-start">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative mb-5">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image src="/logo.jpg" alt="Denial" width={208} height={208} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[208px] sm:max-w-[240px]">
              {infoItems.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-center"
                >
                  <span className="text-[9px] tracking-[0.15em] uppercase text-neutral-500 block mb-0.5">{item.label}</span>
                  <span className="text-xs font-medium text-white">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">
                Hey, I&apos;m Denial.
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-neutral-400 leading-relaxed" style={{ fontWeight: 300 }}>
                <p>
                  I recently made this server for my community. We listen to our community as much as we can. We support and believe true gaming should be done without having to pay.
                </p>
                <p>
                  I am 22 years old. I live somewhere on this planet. I know a few languages and I do coding. I take place in coding events near me. Sometimes they have cash prizes, sometimes they do not.
                </p>
                <p>
                  I am pretty chill and I have a good reputation. I made this server for fun and enjoyment, to improve my mental health and relieve my stress from life.
                </p>
                <p>
                  I do CPvP sometimes. If you want to be my friend, hit me up. My discord tag is denial.xd.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-500 block mb-3">Get in Touch</span>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="https://discord.com/users/denial.xd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-white/[0.05] text-sm text-neutral-400 text-center transition-colors duration-200 hover:border-white/[0.12] hover:text-white"
                  >
                    <span className="font-medium">denial.xd</span>
                    <span className="block text-[9px] text-neutral-500 mt-0.5 tracking-wider uppercase">Discord</span>
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText('beetlesmp.fun')}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-white/[0.04] text-sm text-neutral-400 text-center transition-colors duration-200 hover:border-white/[0.1] hover:text-white cursor-pointer"
                  >
                    <span className="font-medium">beetlesmp.fun</span>
                    <span className="block text-[9px] text-neutral-500 mt-0.5 tracking-wider uppercase">Server IP</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Server Owner', 'Developer', 'CPvP Player', 'Community Builder'].map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="px-3.5 py-1.5 rounded-lg border border-white/[0.05] text-[11px] font-medium text-neutral-400"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
