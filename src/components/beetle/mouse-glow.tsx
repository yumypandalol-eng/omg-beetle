'use client'

import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let rafId: number
    let active = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!active) {
        active = true
        el.classList.add('active')
      }
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.setProperty('--mouse-x', `${e.clientX}px`)
        el.style.setProperty('--mouse-y', `${e.clientY}px`)
      })
    }

    const handleMouseLeave = () => {
      el.classList.remove('active')
      active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={glowRef} className="mouse-glow" aria-hidden="true" />
}
