import { useState } from 'react'
import type { FormEvent } from 'react'
import { BookingButton } from '../components/BookingButton'
import { MapEmbed } from '../components/MapEmbed'
import { PageHeader } from '../components/PageHeader'
import { VisitDetails } from '../components/VisitDetails'
import { useLanguage } from '../i18n/language'

const labelClass = 'flex flex-col gap-1 text-small font-medium'
const fieldClass =
  'border border-nude-deep bg-ivory px-3 py-3 font-body text-body font-normal text-brown outline-none focus:border-brown'

export function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  // TODO: point this at the clinic's enquiry endpoint. Until then the form
  // validates and acknowledges locally without transmitting anything.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHeader title={t.contact.title} />

      <section className="grid gap-x-12 gap-y-10 px-gutter pb-section lg:grid-cols-2">
        <VisitDetails level="h2" className="content-start" />
        <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:min-h-[420px]" />
      </section>

      <section className="grid items-start gap-x-12 gap-y-12 bg-nude px-gutter py-section lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-heading">{t.contact.bookingHeading}</h2>
          <p className="mt-3 max-w-[44ch] text-body">{t.contact.bookingBody}</p>
          <BookingButton className="mt-8 px-7" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
          <h2 className="font-display text-statement">{t.contact.form.heading}</h2>
          <label className={labelClass}>
            {t.contact.form.name}
            <input type="text" name="name" required autoComplete="name" className={fieldClass} />
          </label>
          <label className={labelClass}>
            {t.contact.form.email}
            <input type="email" name="email" required autoComplete="email" className={fieldClass} />
          </label>
          <label className={labelClass}>
            {t.contact.form.message}
            <textarea name="message" rows={4} required className={`${fieldClass} resize-y`} />
          </label>

          <button type="submit" className="btn btn-primary self-start px-7">
            {t.contact.form.send}
          </button>

          <p aria-live="polite" className="min-h-[1.6em] text-body">
            {sent && t.contact.form.sent}
          </p>
        </form>
      </section>
    </>
  )
}
