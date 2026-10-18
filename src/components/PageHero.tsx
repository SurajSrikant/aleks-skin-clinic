import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BookingButton } from './BookingButton'
import { ImageSlot } from './ImageSlot'
import { Lines, Shutter } from './Reveal'
import type { MediaKey } from '../data/media'

interface PageHeroProps {
  image: MediaKey
  /** The title, already broken into its (at most two) lines. */
  lines: string[]
  /** Where the quiet link above the title leads, and what it says. */
  back?: { to: string; label: string }
  /** Anything that sits under the title: a summary, the price. */
  children?: ReactNode
}

/**
 * The inner pages open the way the home page does, smaller: one photograph
 * full-bleed, the title along its bottom edge.
 */
export function PageHero({ image, lines, back, children }: PageHeroProps) {
  return (
    <header className="relative flex min-h-[min(76svh,720px)] items-end overflow-hidden bg-ink">
      <Shutter immediate className="absolute inset-0">
        <div className="media-tone h-full w-full">
          <ImageSlot image={image} sizes="100vw" priority className="h-full w-full" />
        </div>
      </Shutter>

      {/* The way back sits under the bar, where a breadcrumb belongs. */}
      {back && (
        <Link
          to={back.to}
          className="link absolute top-[72px] left-gutter py-3 z-10 text-small text-cream"
        >
          ← {back.label}
        </Link>
      )}

      <div className="relative w-full px-gutter pt-32 pb-[clamp(32px,5vw,64px)]">
        <Lines
          as="h1"
          immediate
          delay={0.45}
          lines={lines}
          className="font-display text-display text-cream"
        />
        {children}
        {/* The bar drops its booking action on a phone; the first screen keeps one. */}
        <BookingButton variant="paper" className="mt-6 px-7 py-4 sm:hidden" />
      </div>
    </header>
  )
}
