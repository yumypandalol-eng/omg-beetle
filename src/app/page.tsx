'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/beetle/navigation'
import HomeSection from '@/components/beetle/home-section'
import FeaturesSection from '@/components/beetle/features-section'
import HardwareSection from '@/components/beetle/hardware-section'
import DiscordSection from '@/components/beetle/discord-section'
import AboutSection from '@/components/beetle/about-section'
import Footer from '@/components/beetle/footer'
import MouseGlow from '@/components/beetle/mouse-glow'

type Page = 'home' | 'features' | 'hardware' | 'discord' | 'about'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeSection />
      case 'features': return <FeaturesSection />
      case 'hardware': return <HardwareSection />
      case 'discord': return <DiscordSection />
      case 'about': return <AboutSection />
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: '#0c0c0c' }}>
      {/* z.ai-style gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Top center orb */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.025) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        {/* Top left orb */}
        <div
          className="absolute left-0 top-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.015) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        {/* Bottom right orb */}
        <div
          className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        {/* Center subtle orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.012) 0%, transparent 60%)', filter: 'blur(60px)' }}
        />
      </div>
      <MouseGlow />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  )
}
