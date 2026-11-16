import type { ReactNode } from 'react'
import { BOOKING_URL } from '../data/clinic'
import { useLanguage } from '../i18n/language'

interface BookingButtonProps {
  /** A Medibook link for one treatment; defaults to the general booking page. */
  href?: string
  /** `light` for the dark footer. */
  variant?: 'primary' | 'light'
  /** Accessible name when the visible label is too short to stand alone, e.g. "Book". */
  ariaLabel?: string
  className?: string
  children?: ReactNode
}

/** Booking happens in Medibook, so this always leaves the site, in a new tab. */
export function BookingButton({
  href = BOOKING_URL,
  variant = 'primary',
  ariaLabel,
  className = '',
  children,
}: BookingButtonProps) {
  const { t } = useLanguage()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ? `${ariaLabel} (${t.common.opensInNewTab})` : undefined}
      className={`btn ${variant === 'light' ? 'btn-light' : 'btn-primary'} ${className}`}
    >
      {children ?? t.nav.book}
      {!ariaLabel && <span className="sr-only"> ({t.common.opensInNewTab})</span>}
    </a>
  )
}
