import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BookingButton } from '../components/BookingButton'
import { ImageSlot } from '../components/ImageSlot'
import { OpenStatus } from '../components/OpenStatus'
import { Item, Lines, Reveal, Shutter } from '../components/Reveal'
import { FieldStack } from '../components/home/FieldStack'
import { SignatureBand } from '../components/home/SignatureBand'
import { CLINIC } from '../data/clinic'
import { AVENUE, HERO_VIDEO } from '../data/media'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/**
 * The first screen is the clinic itself, full-bleed, opening like a shutter.
 * The title sits along the bottom edge; as the page scrolls on, the footage
 * drifts closer and the title lifts away.
 */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <header ref={ref} className="relative h-svh min-h-[560px] overflow-hidden bg-ink">
      <Shutter immediate className="absolute inset-0">
        <m.div style={{ scale }} className="media-quiet h-full w-full">
          {/* Decorative loop: muted and silent, so autoplay is permitted. The
              poster carries the frame until enough video has buffered, and
              reduced-motion visitors keep the poster instead of the loop. */}
          {reduced ? (
            <img
              src={HERO_VIDEO.poster}
              alt=""
              className="h-full w-full object-cover object-[30%_50%] sm:object-center"
            />
          ) : (
            <video
              className="h-full w-full object-cover object-[30%_50%] sm:object-center"
              poster={HERO_VIDEO.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              tabIndex={-1}
            >
              {HERO_VIDEO.sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} media={source.media} />
              ))}
            </video>
          )}
        </m.div>
      </Shutter>

      {/* The film stays light, as the room is; the title sits on a cut of the
          page's own ground rather than on a darkened picture. */}
      <m.div
        style={{ y: lift }}
        className="absolute bottom-0 left-0 w-full bg-cream px-gutter pt-[clamp(28px,3.5vw,48px)] pb-[clamp(28px,3.5vw,48px)] lg:w-[min(78%,1120px)]"
      >
        <Lines
          as="h1"
          immediate
          delay={0.55}
          lines={['Quiet results,', 'medically assessed.']}
          className="font-display text-display text-ink"
        />
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.0, ease: EASE_OUT } }}
          className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
        >
          <p className="max-w-[44ch] text-body text-ink">
            Skin and aesthetic medicine in Oslo, planned with a doctor from the first consultation.
          </p>
          <BookingButton className="shrink-0 self-start px-7 py-4 sm:self-auto" />
        </m.div>
      </m.div>
    </header>
  )
}

export function Home() {
  return (
    <>
      <Hero />

      {/* ---- Approach: one photograph on the left, the argument beside it,
              the room's promise closing the column at the photograph's foot -- */}
      <section className="px-gutter py-section">
        <Reveal className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <Item className="lg:col-span-5">
            <Shutter>
              <ImageSlot
                image="portrait-calm"
                sizes="(max-width: 1024px) 92vw, 38vw"
                className="aspect-[4/5]"
              />
            </Shutter>
          </Item>

          <div className="flex flex-col lg:col-span-7 lg:col-start-6 lg:pl-[clamp(0px,3vw,48px)]">
            <Item as="p" className="font-display text-statement text-ink">
              Every plan begins with a doctor&rsquo;s examination. We would rather
              recommend fewer treatments over time than many at once.
            </Item>
            <Item as="p" className="mt-8 max-w-[52ch] text-body text-ink">
              Face, skin and body age at their own pace, so we look at them together and set out a
              plan you can consider calmly at home. Nothing is decided in the room.
            </Item>
            <Item
              as="p"
              className="mt-10 max-w-[40ch] bg-shell p-[clamp(20px,2.4vw,32px)] text-body text-bark-deep lg:mt-auto"
            >
              A separate entrance, a handful of appointments a day, and no crowded waiting room.
            </Item>
          </div>
        </Reveal>
      </section>

      {/* ---- Fields of practice ------------------------------------------- */}
      <section className="px-gutter pb-section">
        <Lines
          lines={['Aesthetics meets', 'longevity']}
          className="mb-[clamp(48px,7vw,96px)] font-display text-heading text-ink"
        />
        <FieldStack />
      </section>

      {/* ---- Signature treatments ------------------------------------------ */}
      <section className="bg-blush pt-section-sm pb-[clamp(28px,3vw,40px)]">
        <div className="px-gutter lg:grid lg:grid-cols-12 lg:gap-x-6">
          <Lines
            lines={['What patients', 'come to us for']}
            className="mb-[clamp(32px,4.5vw,64px)] font-display text-heading text-ink lg:col-span-8"
          />
        </div>
        <div className="px-gutter">
          <SignatureBand />
        </div>
        <p className="mt-5 px-gutter text-small text-bark-deep">
          Prices are starting points. The consultation sets the plan, and the price with it.
        </p>
      </section>

      {/* ---- Closing: the street outside, the consultation, the hours ------ */}
      <section className="relative lg:h-[90svh] lg:min-h-[640px]">
        <div className="relative h-[70svh] overflow-hidden lg:absolute lg:inset-0 lg:h-full">
          <picture className="media-archive absolute inset-0">
            <source type="image/webp" srcSet={AVENUE.srcSet} sizes="100vw" />
            <img
              src={AVENUE.src}
              alt={AVENUE.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[30%_60%]"
            />
          </picture>
          <a
            href={AVENUE.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link absolute bottom-4 left-gutter max-w-[46ch] text-small text-cream/75"
          >
            {AVENUE.credit}
          </a>
        </div>

        {/* The page closes as it opened: the title on a cut of the page's own
            ground, this time in the opposite corner of the picture. */}
        <Reveal className="relative bg-cream px-gutter py-14 lg:absolute lg:right-0 lg:bottom-0 lg:w-[min(46%,680px)] lg:p-[clamp(32px,3.5vw,56px)]">
          <Lines
            lines={['Start with', 'a consultation']}
            className="mb-6 font-display text-heading text-ink"
          />
          <Item as="p" className="mb-8 max-w-[44ch] text-body text-ink">
            We review your skin, your history and what you want, and set out a plan. You will find
            us at {CLINIC.street}, under the chestnuts, three minutes from tram 13.
          </Item>
          <Item className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookingButton className="px-7 py-4" />
            <OpenStatus className="text-small text-bark-deep" />
          </Item>
        </Reveal>
      </section>
    </>
  )
}
