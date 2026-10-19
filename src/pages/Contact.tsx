import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { BookingButton } from '../components/BookingButton'
import { ImageSlot } from '../components/ImageSlot'
import { OpenStatus } from '../components/OpenStatus'
import { Item, Lines, Reveal, Shutter } from '../components/Reveal'
import { CLINIC } from '../data/clinic'

const labelClass = 'flex flex-col gap-1 text-small text-bark-deep'
const fieldClass =
  'border-0 border-b border-sand bg-transparent py-3 font-body text-body text-ink outline-none transition-colors duration-200 focus:border-bark-deep'

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Item>
      <h2 className="mb-2 font-display text-statement">{label}</h2>
      <div className="text-body">{children}</div>
    </Item>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)

  // TODO: point this at the clinic's enquiry endpoint. Until then the form
  // validates and acknowledges locally without transmitting anything.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="px-gutter pt-[clamp(128px,15vw,200px)] pb-section-sm">
        <Lines
          as="h1"
          immediate
          delay={0.2}
          lines={['Contact', 'and visiting']}
          className="mb-[clamp(48px,7vw,96px)] font-display text-display"
        />
        <BookingButton className="-mt-6 mb-12 px-7 py-4 sm:hidden" />

        <div className="grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <Shutter className="lg:col-span-5">
            <ImageSlot
              image="clinic-interior"
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="aspect-[4/5]"
            />
          </Shutter>

          <Reveal className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <Detail label="Address">
              {CLINIC.street}
              <br />
              {CLINIC.city}
            </Detail>
            <Detail label="Opening hours">
              <OpenStatus className="mb-1 text-bark-deep" />
              {CLINIC.hours.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </Detail>
            <Detail label="Telephone and email">
              <a href={CLINIC.phoneHref} className="link tap [--tap:4px]">
                {CLINIC.phone}
              </a>
              <br />
              <a href={`mailto:${CLINIC.email}`} className="link tap [--tap:4px]">
                {CLINIC.email}
              </a>
            </Detail>
            <Detail label="Getting here">{CLINIC.travel}</Detail>
          </Reveal>
        </div>
      </section>

      {/* The street outside, then and now: a pair at different sizes. */}
      {/* <section className="grid items-end gap-x-6 gap-y-10 px-gutter lg:grid-cols-12">
        <figure className="lg:col-span-8">
          <Shutter from="left" className="aspect-[3/2] w-full">
            <picture className="media-archive block h-full w-full">
              <source
                type="image/webp"
                srcSet={AVENUE.srcSet}
                sizes="(max-width: 1024px) 92vw, 64vw"
              />
              <img
                src={AVENUE.src}
                alt={AVENUE.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </picture>
          </Shutter>
          <figcaption className="mt-4 text-small text-bark-deep">
            <a href={AVENUE.creditUrl} target="_blank" rel="noopener noreferrer" className="link">
              {AVENUE.credit}
            </a>
          </figcaption>
        </figure>

        <figure className="w-[70%] justify-self-end lg:col-span-4 lg:w-full">
          <Shutter className="aspect-[3/4] w-full">
            <picture className="media-quiet block h-full w-full">
              <source
                type="image/webp"
                srcSet={AVENUE_TODAY.srcSet}
                sizes="(max-width: 1024px) 64vw, 30vw"
              />
              <img
                src={AVENUE_TODAY.src}
                alt={AVENUE_TODAY.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[52%_50%]"
              />
            </picture>
          </Shutter>
          <figcaption className="mt-4 text-small text-bark-deep">
            <a
              href={AVENUE_TODAY.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {AVENUE_TODAY.credit}
            </a>
          </figcaption>
        </figure>
      </section> */}

      <section className="px-gutter pb-section-sm">
        <div className="grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <Reveal className="bg-blush lg:col-span-5">
            <Item>
              <ImageSlot
                image="consultation-hands"
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="aspect-[16/10]"
              />
            </Item>
            <div className="p-[clamp(24px,3vw,40px)]">
              <Item as="h2" className="mb-3 font-display text-heading">
                Booking
              </Item>
              <Item as="p" className="mb-7 max-w-[44ch] text-body">
                Appointments are booked through our booking system. The form is for general
                questions and is not suitable for medical information.
              </Item>
              <Item>
                <BookingButton className="px-7 py-4" />
              </Item>
            </div>
          </Reveal>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7"
          >
            <h2 className="font-display text-statement">Send a question</h2>
            <label className={labelClass}>
              Name
              <input type="text" name="name" required autoComplete="name" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Email
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              Message
              <textarea name="message" rows={4} required className={`${fieldClass} resize-y`} />
            </label>

            <button type="submit" className="btn btn-primary mt-2 self-start px-7 py-4">
              Send message
            </button>

            <p aria-live="polite" className="min-h-[1.6em] text-body">
              {sent && 'Thank you. We have your message and will reply within two working days.'}
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
