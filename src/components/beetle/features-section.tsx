'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const featureData = [
  {
    num: '01',
    tag: 'PERFORMANCE FIRST',
    title: 'Premium Hardware',
    description: 'Hosted on the best hardware available in the APAC region. Our servers are powered by enterprise grade components built for competitive gaming. Every millisecond counts.',
  },
  {
    num: '02',
    tag: 'BUILT TOGETHER',
    title: 'Active Community',
    description: 'A thriving community of competitive players. We listen to our players and continuously improve the server experience. Join a community that actually cares about its members.',
  },
  {
    num: '03',
    tag: 'DENIAL CUSTOM CODE',
    title: 'Enterprise Grade Anticheat',
    description: 'Hacking is banned. We run the most advanced anticheat available in the current competitive SMP market. Built from the ground up with custom code by our owner Denial, our anticheat blocks Xray, Vision, ESP, Auto Totem, Hitboxes, Reach, Kill Aura, Fly, Flight and other hacks that are notoriously hard to patch. We did it before anyone else. The best anticheat you will find is right here.',
  },
  {
    num: '04',
    tag: 'BUILT FOR SPEED',
    title: 'Modern Custom Plugins',
    description: 'We use modern and custom made plugins for the best performance and enhancements. Every plugin is optimized and tailored specifically for competitive SMP gameplay. No bloat, no lag, just smooth gameplay.',
  },
  {
    num: '05',
    tag: 'QUALITY OF LIFE',
    title: 'Essential Commands',
    description: 'Access commands like /home, /tpa, /rtp, /enderchest and many more features you will love when you join. We are always adding new commands based on community feedback.',
  },
  {
    num: '06',
    tag: 'FAIR GAMING',
    title: 'Anti Pay to Win',
    description: 'One of our core principles: we are an anti P2W SMP. We do not support pay to win in any form. True competitive gaming should be accessible to everyone regardless of their spending power. Everyone plays on equal ground.',
  },
]

function FeatureBlock({ feature, index }: { feature: typeof featureData[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="w-full"
    >
      <div className="flex items-stretch">
        {/* Left: Number + Tag */}
        <div className="hidden sm:flex flex-col items-center justify-center w-28 lg:w-36 flex-shrink-0 pr-6 lg:pr-10">
          <span className="font-display text-5xl lg:text-6xl font-bold text-white/[0.07] leading-none select-none">
            {feature.num}
          </span>
        </div>

        {/* Mobile number */}
        <div className="sm:hidden flex items-center pr-4">
          <span className="font-display text-3xl font-bold text-white/[0.07] mr-3 select-none">
            {feature.num}
          </span>
        </div>

        {/* Right: Card */}
        <div className="flex-1 rounded-xl border border-white/[0.05] p-6 sm:p-8 transition-colors duration-300 hover:border-white/[0.1]">
          {/* Tag */}
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 block mb-4">
            {feature.tag}
          </span>

          {/* Title */}
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-3 leading-tight">
            {feature.title}
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-white/[0.08] mb-4" />

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-lg" style={{ fontWeight: 300 }}>
            {feature.description}
          </p>
        </div>
      </div>

      {/* Divider between features */}
      {index < featureData.length - 1 && (
        <div className="mt-10 sm:mt-14 ml-28 lg:ml-36 h-px bg-white/[0.04]" />
      )}
    </motion.div>
  )
}

export default function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 block mb-3">
            What We Offer
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            Features
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md" style={{ fontWeight: 300 }}>
            Everything you need for the ultimate competitive experience.
          </p>
        </motion.div>
      </div>

      {/* Feature list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:gap-14">
          {featureData.map((feature, i) => (
            <FeatureBlock key={feature.num} feature={feature} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.p
          className="text-neutral-400 text-sm mb-5"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Join today to discover more about the server.
        </motion.p>
        <motion.button
          onClick={() => navigator.clipboard.writeText('beetlesmp.com')}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-200 hover:border-white/[0.12] cursor-pointer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="font-tech text-sm font-medium text-white tracking-wider">beetlesmp.com</span>
          <span className="text-[10px] font-medium tracking-wider uppercase text-neutral-500">Copy to Join</span>
        </motion.button>
      </div>
    </div>
  )
}
