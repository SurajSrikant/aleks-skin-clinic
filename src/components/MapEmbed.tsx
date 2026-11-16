import { useState } from 'react'
import { CLINIC } from '../data/clinic'
import { useLanguage } from '../i18n/language'

/**
 * A Google map of the clinic that loads only when the visitor asks for it.
 * Until then nothing is requested from Google (no cookies, no IP address
 * shared), so the page needs no consent banner for it.
 */
export function MapEmbed({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  const [shown, setShown] = useState(false)

  return (
    <div className={`relative bg-nude ${className}`}>
      {shown ? (
        <iframe
          src={CLINIC.mapEmbedUrl}
          title={t.contact.map.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
          <p className="font-display text-statement">
            {CLINIC.street}
            <br />
            {CLINIC.city}
          </p>
          <button type="button" onClick={() => setShown(true)} className="btn btn-primary px-7">
            {t.contact.map.show}
          </button>
          <p className="max-w-[36ch] text-small text-brown-soft">{t.contact.map.note}</p>
        </div>
      )}
    </div>
  )
}
