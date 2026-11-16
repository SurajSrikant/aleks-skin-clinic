import type { ReactNode } from 'react'
import { OpenStatus } from './OpenStatus'
import { CLINIC } from '../data/clinic'
import { useLanguage } from '../i18n/language'

type Level = 'h2' | 'h3'

function Detail({ label, level: Heading, children }: { label: string; level: Level; children: ReactNode }) {
  return (
    <div>
      <Heading className="mb-2 font-display text-statement">{label}</Heading>
      <div className="text-body">{children}</div>
    </div>
  )
}

/** Address, hours, phone and email, and how to get here. Shared by Home and Contact. */
export function VisitDetails({ level = 'h3', className = '' }: { level?: Level; className?: string }) {
  const { t } = useLanguage()

  return (
    <div className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${className}`}>
      <Detail level={level} label={t.contact.address}>
        <p>
          {CLINIC.street}
          <br />
          {CLINIC.city}
        </p>
        <a
          href={CLINIC.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link tap mt-2 inline-block text-small"
        >
          {t.contact.openMap}
        </a>
      </Detail>

      <Detail level={level} label={t.contact.hours}>
        <OpenStatus className="mb-1 font-medium" />
        <p>
          {t.hours.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </Detail>

      <Detail level={level} label={t.contact.phoneEmail}>
        <a href={CLINIC.phoneHref} className="link tap inline-block [--tap:4px]">
          {CLINIC.phone}
        </a>
        <br />
        <a href={`mailto:${CLINIC.email}`} className="link tap inline-block [--tap:4px]">
          {CLINIC.email}
        </a>
      </Detail>

      <Detail level={level} label={t.contact.gettingHere}>
        <p>{t.contact.travel}</p>
      </Detail>
    </div>
  )
}
