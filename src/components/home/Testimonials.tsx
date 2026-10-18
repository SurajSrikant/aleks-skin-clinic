import { useState } from 'react'
import { QUOTES } from '../../data/clinic'

const arrowClass =
  'btn btn-primary h-12 w-12'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const quote = QUOTES[index]

  const step = (delta: number) =>
    setIndex((current) => (current + delta + QUOTES.length) % QUOTES.length)

  return (
    <div className="relative mx-auto max-w-[820px] text-center">
      <h2 className="mb-10 font-display text-heading">Patient experiences</h2>

      <figure aria-live="polite">
        <blockquote className="mb-8 font-display text-statement text-pretty">
          “{quote.text}”
        </blockquote>
        <figcaption className="mb-10 text-small text-bark-deep">
          {quote.meta}
        </figcaption>
      </figure>

      <div className="flex justify-center gap-[18px]">
        <button type="button" onClick={() => step(-1)} aria-label="Previous experience" className={arrowClass}>
          ←
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next experience" className={arrowClass}>
          →
        </button>
      </div>
    </div>
  )
}
