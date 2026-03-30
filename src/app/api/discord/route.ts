import { NextResponse } from 'next/server'

interface WidgetMember {
  id: string
  username: string
  status: string
  avatar_url?: string
  game?: { name: string }
}

interface WidgetChannel {
  id: string
  name: string
  position: number
}

interface WidgetData {
  id: string
  name: string
  instant_invite: string | null
  channels: WidgetChannel[]
  members: WidgetMember[]
  presence_count: number
}

interface CachedData {
  data: {
    name: string
    online: number
    members: Array<{
      username: string
      status: string
      avatarUrl: string | null
      game: string | null
    }>
    channels: Array<{
      id: string
      name: string
      position: number
    }>
  }
  timestamp: number
}

let cachedData: CachedData | null = null
const CACHE_DURATION = 60 * 1000

export async function GET() {
  try {
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data)
    }

    const res = await fetch(
      'https://discord.com/api/guilds/1268606054720340029/widget.json',
      {
        next: { revalidate: 60 },
        headers: { 'User-Agent': 'BeetleNetwork/1.0' },
      }
    )

    if (!res.ok) throw new Error(`Discord API returned ${res.status}`)

    const data: WidgetData = await res.json()

    const processed = {
      name: data.name,
      online: data.presence_count,
      members: data.members.slice(0, 60).map((m: WidgetMember) => ({
        username: m.username,
        status: m.status,
        avatarUrl: m.avatar_url || null,
        game: m.game?.name || null,
      })),
      channels: data.channels
        .sort((a: WidgetChannel, b: WidgetChannel) => a.position - b.position)
        .map((c: WidgetChannel) => ({
          id: c.id,
          name: c.name,
          position: c.position,
        })),
    }

    cachedData = { data: processed, timestamp: Date.now() }
    return NextResponse.json(processed)
  } catch (error) {
    console.error('Discord API error:', error)
    return NextResponse.json({
      name: 'Beetle SMP',
      online: 0,
      members: [],
      channels: [
        { id: '1', name: 'General VC', position: 0 },
        { id: '2', name: 'Duo VC', position: 1 },
        { id: '3', name: 'Squad VC', position: 2 },
      ],
    })
  }
}
