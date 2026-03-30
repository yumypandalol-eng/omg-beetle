'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const specs = [
  { category: 'PROCESSOR', name: 'AMD Ryzen 9 9950X', detail: '16 Cores / 32 Threads', description: 'Top tier processor for heavy compute loads. Handles hundreds of concurrent player operations.' },
  { category: 'MEMORY', name: '32GB DDR5 RAM', detail: 'High Frequency', description: 'Ultra fast DDR5 memory ensuring zero bottlenecks during peak hours.' },
  { category: 'STORAGE', name: 'NVMe RAID System', detail: 'Enterprise SSDs', description: 'Lightning fast read/write with RAID redundancy for data protection.' },
  { category: 'NETWORK', name: '10Gbps Uplink', detail: 'Enterprise Connectivity', description: 'Massive bandwidth ensuring zero network bottlenecks.' },
  { category: 'LOCATION', name: 'Singapore, APAC', detail: 'Optimized Routing', description: 'Strategically positioned for the lowest ping across all APAC countries.' },
  { category: 'PROTECTION', name: 'Layer 7+2 DDoS Shield', detail: 'Enterprise Grade', description: 'Comprehensive DDoS mitigation covering application and network layers.' },
]

function SpecCard({ spec, index }: { spec: typeof specs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] transition-colors duration-200 hover:border-white/[0.1]"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-tech text-[9px] tracking-[0.2em] uppercase text-neutral-500">{spec.category}</span>
        <span className="font-tech text-[9px] tracking-wider text-neutral-600">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="font-tech text-sm sm:text-base font-medium text-white mb-0.5 tracking-tight">{spec.name}</h3>
      <span className="font-tech text-[11px] text-neutral-500 tracking-wider block mb-2.5">{spec.detail}</span>
      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed" style={{ fontWeight: 300 }}>{spec.description}</p>
    </motion.div>
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numericTarget = parseFloat(target.replace('%', ''))
    const isSpecial = target.includes('/') || target.includes('-')
    if (isSpecial) {
      let idx = 0
      const interval = setInterval(() => {
        idx++
        setDisplay(target.slice(0, idx))
        if (idx >= target.length) clearInterval(interval)
      }, 100)
      return () => clearInterval(interval)
    }
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      if (target.includes('.')) setDisplay((numericTarget * eased).toFixed(2))
      else setDisplay(Math.floor(numericTarget * eased).toString())
      if (p < 1) requestAnimationFrame(tick)
      else setDisplay(target.replace('%', ''))
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return <span ref={ref} className="font-tech font-bold text-2xl sm:text-3xl text-white">{display}{suffix}</span>
}

export default function HardwareSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <div className="relative min-h-screen" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-3">Infrastructure</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">Hardware</h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed" style={{ fontWeight: 300 }}>
            Fast server hosted in Singapore, APAC region for the best ping across all APAC countries.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { value: '99.99', suffix: '%', label: 'Uptime' },
            { value: '10', suffix: 'Gbps', label: 'Speed' },
            { value: '32', suffix: 'GB', label: 'DDR5 RAM' },
            { value: '24/7', suffix: '', label: 'Monitoring' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 sm:p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 block mt-1.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {specs.map((spec, i) => (
            <SpecCard key={spec.category} spec={spec} index={i} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 block mb-3">Network Architecture</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Built for Scale</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            Every millisecond counts in competitive play. Our infrastructure is engineered for the lowest latency.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-0">
            {['Player', 'DDoS Shield', 'Firewall', 'Game Server'].map((node, i) => (
              <div key={node} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-3 sm:px-4 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  <span className="text-[10px] sm:text-xs font-medium tracking-wider text-neutral-400 whitespace-nowrap">{node}</span>
                </motion.div>
                {i < 3 && <div className="px-1.5 sm:px-3"><div className="w-4 sm:w-6 h-px bg-white/[0.08]" /></div>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
