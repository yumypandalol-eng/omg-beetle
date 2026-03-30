'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

interface DiscordMember {
  username: string
  status: string
  avatarUrl: string | null
  game: string | null
}

interface DiscordChannel {
  id: string
  name: string
  position: number
}

interface DiscordData {
  name: string
  online: number
  members: DiscordMember[]
  channels: DiscordChannel[]
}

const statusColors: Record<string, string> = {
  online: '#23a559',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
}

function MemberAvatar({ member, index }: { member: DiscordMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="relative group"
      title={member.game ? `${member.username} - ${member.game}` : member.username}
    >
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-white/[0.06] border border-white/[0.06]">
        {member.avatarUrl ? (
          <img
            src={member.avatarUrl}
            alt={member.username}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-500 font-medium">
            {member.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span
        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
        style={{
          backgroundColor: statusColors[member.status] || statusColors.offline,
          borderColor: '#111',
        }}
      />
    </motion.div>
  )
}

export default function DiscordSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const [discordData, setDiscordData] = useState<DiscordData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    async function fetchDiscord() {
      try {
        const res = await fetch('/api/discord')
        if (!res.ok) throw new Error()
        setDiscordData(await res.json())
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchDiscord()
    const interval = setInterval(fetchDiscord, 60000)
    return () => clearInterval(interval)
  }, [])

  const onlineMembers = discordData?.members.filter(m => m.status === 'online' || m.status === 'idle' || m.status === 'dnd') || []

  return (
    <div className="relative min-h-screen" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500 block mb-3">Community Hub</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">Discord</h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md" style={{ fontWeight: 300 }}>
            Join our community. Stay updated and connect with other players.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          {/* Main Server Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.05] overflow-hidden bg-[#161616]"
          >
            {/* Banner */}
            <div className="relative h-32 sm:h-40 overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 30%, #16213e 60%, #131313 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(88, 101, 242, 0.08) 0%, transparent 60%)' }} />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(88, 101, 242, 0.05) 0%, transparent 50%)' }} />
            </div>

            {/* Server Info - overlaps banner */}
            <div className="relative px-5 sm:px-6">
              <div className="-mt-10 sm:-mt-12 mb-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#161616] p-[3px]">
                  <div className="w-full h-full rounded-[13px] overflow-hidden">
                    <Image src="/logo.jpg" alt="Beetle SMP" width={80} height={80} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-lg sm:text-xl font-bold text-white">{discordData?.name || 'Beetle SMP'}</h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2" className="mt-0.5">
                      <path d="M13.5 2c-5.621 0-10.211 4.443-10.497 10h-3.003l5 5.917L10 12h-2.947c.268-4.442 3.946-8 8.447-8 4.687 0 8.5 3.813 8.5 8.5S18.187 21 13.5 21c-2.272 0-4.337-.896-5.864-2.353l-1.447 1.49C8.061 21.871 10.636 23 13.5 23c5.799 0 10.5-4.701 10.5-10.5S19.299 2 13.5 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-neutral-400" style={{ fontWeight: 300 }}>Minecraft Community Server</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#23a559' }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#23a559' }} />
                  {loading ? (
                    <span className="inline-block w-6 h-3 rounded animate-pulse" style={{ background: 'rgba(34, 197, 94, 0.15)' }} />
                  ) : (
                    `${discordData?.online ?? 0} Online`
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-lg sm:text-xl font-bold text-white block leading-tight">
                    {loading ? <span className="inline-block w-8 h-5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} /> : discordData?.online ?? 0}
                  </span>
                  <span className="text-[10px] text-neutral-400 tracking-wide uppercase block mt-1">Online</span>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-lg sm:text-xl font-bold text-white block leading-tight">
                    {loading ? <span className="inline-block w-8 h-5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} /> : onlineMembers.length}
                  </span>
                  <span className="text-[10px] text-neutral-400 tracking-wide uppercase block mt-1">Shown</span>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-lg sm:text-xl font-bold text-white block leading-tight">
                    {loading ? <span className="inline-block w-8 h-5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} /> : discordData?.channels.length ?? 0}
                  </span>
                  <span className="text-[10px] text-neutral-400 tracking-wide uppercase block mt-1">Channels</span>
                </div>
              </div>

              {/* Online Members Grid */}
              <div className="mb-5">
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-neutral-500 mb-2.5 block">Online Members</span>
                {loading ? (
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    ))}
                  </div>
                ) : onlineMembers.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {onlineMembers.slice(0, 40).map((member, i) => (
                      <MemberAvatar key={member.username + i} member={member} index={i} />
                    ))}
                    {discordData && discordData.online > onlineMembers.length && (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] text-neutral-500 font-medium">
                        +{discordData.online - onlineMembers.length}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500" style={{ fontWeight: 300 }}>No members visible</p>
                )}
              </div>

              {/* Channels */}
              <div className="mb-5">
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-neutral-500 mb-2 block">Voice Channels</span>
                <div className="space-y-0.5">
                  {(discordData?.channels.length ? discordData.channels : [
                    { id: '1', name: 'General VC', position: 0 },
                    { id: '2', name: 'Duo VC', position: 1 },
                    { id: '3', name: 'Squad VC', position: 2 },
                  ]).map((channel) => (
                    <div key={channel.id} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md hover:bg-white/[0.03] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-600 shrink-0">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" x2="12" y1="19" y2="22" />
                      </svg>
                      <span className="text-sm text-neutral-400 truncate">{channel.name}</span>
                      <span className="text-[10px] text-neutral-600 ml-auto shrink-0">VC</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join Button */}
              <a
                href="https://discord.gg/H58XRmBZwq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-medium text-sm text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: '#5865F2' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Server
              </a>
            </div>
          </motion.div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]"
            >
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-500 block mb-3">Server Status</span>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400" style={{ fontWeight: 300 }}>Server Status</span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#23a559' }}>Operational</span>
                </div>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400" style={{ fontWeight: 300 }}>Online Now</span>
                  <span className="text-sm font-semibold text-white">
                    {loading ? '---' : error ? '---' : discordData?.online ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400" style={{ fontWeight: 300 }}>Voice Channels</span>
                  <span className="text-sm font-semibold text-white">
                    {loading ? '---' : discordData?.channels.length ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400" style={{ fontWeight: 300 }}>Avg. Response</span>
                  <span className="text-sm font-semibold text-white">&lt; 5 min</span>
                </div>
              </div>
            </motion.div>

            {/* Now Playing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]"
            >
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-500 block mb-3">Now Playing</span>
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-6 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
                  ))}
                </div>
              ) : onlineMembers.filter(m => m.game).length > 0 ? (
                <div className="space-y-2 max-h-36 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  {onlineMembers
                    .filter(m => m.game)
                    .slice(0, 8)
                    .map((member, i) => (
                      <div key={member.username + i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-white/[0.06] shrink-0">
                          {member.avatarUrl ? (
                            <img src={member.avatarUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-neutral-600">
                              {member.username.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-neutral-400 truncate flex-1" style={{ fontWeight: 300 }}>{member.username}</span>
                        <span className="text-[10px] text-neutral-600 shrink-0 truncate max-w-[100px]">{member.game}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500" style={{ fontWeight: 300 }}>Nobody is playing right now</p>
              )}
            </motion.div>

            {/* Why Join */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]"
            >
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-500 block mb-3">Why Join</span>
              <ul className="space-y-2.5">
                {['Server updates and announcements', 'Community events and giveaways', 'Report bugs and suggest features', 'Chat with staff and players', 'Get support instantly'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-400" style={{ fontWeight: 300 }}>
                    <span className="w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Invite Link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] text-center"
            >
              <p className="text-[10px] text-neutral-500 mb-1.5" style={{ fontWeight: 300 }}>discord.gg/H58XRmBZwq</p>
              <a
                href="https://discord.gg/H58XRmBZwq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Open in Browser
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
