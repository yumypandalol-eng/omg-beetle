'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

type Page = 'home' | 'features' | 'hardware' | 'discord' | 'about'

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'discord', label: 'Discord' },
  { id: 'about', label: 'About' },
]

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(12, 12, 12, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/[0.05]">
                <Image src="/logo.jpg" alt="Beetle Network" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-semibold text-sm tracking-tight text-white">
                Beetle<span className="text-neutral-500">Network</span>
              </span>
            </button>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-page={item.id}
                  onClick={() => handleNav(item.id)}
                  className="relative px-3.5 py-1.5 text-sm transition-colors duration-200 cursor-pointer"
                  style={{ color: currentPage === item.id ? '#f0f0f0' : '#6b6b6b' }}
                >
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-white/[0.05]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-4 h-px bg-neutral-400" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-4 h-px bg-neutral-400" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block w-4 h-px bg-neutral-400" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden flex items-center justify-center"
            style={{ background: 'rgba(12, 12, 12, 0.95)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex flex-col items-center gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  data-page={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(item.id)}
                  className="w-56 py-3 text-lg font-display font-medium rounded-xl transition-colors duration-200 cursor-pointer"
                  style={{
                    color: currentPage === item.id ? '#fff' : '#6b6b6b',
                    background: currentPage === item.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className="group relative flex items-center justify-end cursor-pointer"
            aria-label={item.label}
          >
            <span className="mr-2.5 text-[9px] font-medium tracking-wider uppercase text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: currentPage === item.id ? 6 : 3,
                height: currentPage === item.id ? 6 : 3,
                background: currentPage === item.id ? '#f0f0f0' : '#333333',
              }}
            />
          </button>
        ))}
      </div>
    </>
  )
}
