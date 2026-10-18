import type { ReactNode } from 'react'
import { BOOKING_URL } from '../data/clinic'

interface BookingButtonProps {
  /** Bark on pale ground by default; `paper` for photographs and the dark footer. */
  variant?: 'primary' | 'paper'
  /** Padding and any layout classes. */
  className?: string
  children?: ReactNode
}

/** The clinic books through an external system, so this always leaves the site. */
export function BookingButton({
  variant = 'primary',
  className = '',
  children = 'Book appointment',
}: BookingButtonProps) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${variant === 'paper' ? 'btn-paper' : 'btn-primary'} ${className}`}
    >
      {children}
    </a>
  )
}
