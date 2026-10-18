import { useEffect, useState } from 'react'
import { CLINIC } from '../data/clinic'

const DAY_NAMES = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const WEEKDAY: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }

/** The weekday and fractional hour right now in Oslo, wherever the visitor is. */
function osloNow(date: Date): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  return { day: WEEKDAY[get('weekday')], hour: Number(get('hour')) + Number(get('minute')) / 60 }
}

const clock = (hour: number) => `${String(hour).padStart(2, '0')}:00`

/** One plain sentence: open until when, or when it next opens. */
function openStatus(date = new Date()): string {
  const { day, hour } = osloNow(date)
  const today = CLINIC.opening[day]

  if (today && hour >= today[0] && hour < today[1]) {
    return `Open now, until ${clock(today[1])} today`
  }
  if (today && hour < today[0]) {
    return `Closed now, opens today at ${clock(today[0])}`
  }
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = ((day - 1 + ahead) % 7) + 1
    const hours = CLINIC.opening[next]
    if (hours) {
      const when = ahead === 1 ? 'tomorrow' : DAY_NAMES[next]
      return `Closed now, opens ${when} at ${clock(hours[0])}`
    }
  }
  return 'Closed now'
}

/**
 * Whether the clinic is open at this moment, in Oslo time, kept current while
 * the page stays open. The weekly hours are always printed beside it, so this
 * only adds to them.
 */
export function OpenStatus({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState(() => openStatus())

  useEffect(() => {
    const timer = window.setInterval(() => setStatus(openStatus()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <p className={className} aria-live="polite">
      {status}
    </p>
  )
}
