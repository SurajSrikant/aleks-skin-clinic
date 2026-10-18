import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Link } from 'react-router-dom'
import { PreviewFrame } from '../PreviewFrame'
import { Item, Reveal } from '../Reveal'
import {
  STACK,
  categoryPath,
  categoryTreatments,
  findCategory,
  treatmentPath,
} from '../../data/clinic'
import { categoryMedia } from '../../data/media'

/** Rows resolved once — STACK is static, so this never needs recomputing. */
const ROWS = STACK.map((row) => {
  const category = findCategory(row.catId)
  if (!category) throw new Error(`Unknown category in STACK: ${row.catId}`)
  return {
    id: row.catId,
    name: row.name,
    category: category.name,
    intro: category.intro,
    href: categoryPath(category.id),
    image: categoryMedia(category.id),
    treatments: categoryTreatments(category).slice(0, 5),
  }
})

const IMAGES = ROWS.map((row) => row.image)

/**
 * The fields of practice: a list pushed to the right, with one photograph to
 * its left that follows whichever field is open. One row is always open;
 * pointing at another opens it, so the section reads as a single moving object
 * rather than six independent toggles.
 */
export function FieldStack() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  // A row the visitor has explicitly collapsed. Needed because closing one
  // shrinks it, and the resulting layout shift makes the browser re-evaluate
  // hover — which fires pointerenter again and would immediately reopen the
  // row the visitor just dismissed. Cleared as soon as the pointer leaves.
  const [dismissed, setDismissed] = useState<number | null>(null)
  // The picture keeps showing the last field opened while every row is shut.
  const [shown, setShown] = useState(0)

  const open = (index: number) => {
    setActiveIndex(index)
    setShown(index)
  }

  return (
    <div className="grid items-start gap-y-12 lg:grid-cols-12 lg:gap-x-6">
      <PreviewFrame
        images={IMAGES}
        shown={shown}
        sizes="30vw"
        className="hidden aspect-[4/5] lg:sticky lg:top-28 lg:col-span-4 lg:block"
      />

      <Reveal className="flex flex-col gap-1 lg:col-span-7 lg:col-start-6" stagger={0.07}>
        {ROWS.map((row, index) => {
          const isOpen = index === activeIndex

          // Pointing at a row opens it. Guarded on pointerType because touch
          // fires enter immediately before click — without that a tap would
          // open and then instantly re-close.
          const hoverOpen = (event: React.PointerEvent) => {
            if (event.pointerType === 'mouse' && dismissed !== index) open(index)
          }
          const hoverLeave = () => setDismissed((current) => (current === index ? null : current))

          const toggle = () => {
            if (isOpen) setActiveIndex(null)
            else open(index)
            setDismissed(isOpen ? index : null)
          }

          // Keyboard focus reveals the row; a mouse click does not match
          // :focus-visible, so this never races the toggle above.
          const focusOpen = (event: React.FocusEvent<HTMLButtonElement>) => {
            if (event.target.matches(':focus-visible')) open(index)
          }

          return (
            <Item key={row.id}>
              <div
                onPointerEnter={hoverOpen}
                onPointerLeave={hoverLeave}
                className={`px-[clamp(16px,2vw,28px)] transition-colors duration-500 ease-(--ease-out) ${
                  isOpen ? 'bg-shell' : 'bg-transparent'
                }`}
              >
                <button
                  type="button"
                  onClick={toggle}
                  onFocus={focusOpen}
                  aria-expanded={isOpen}
                  aria-controls={`field-panel-${row.id}`}
                  className="flex w-full cursor-pointer items-baseline justify-between gap-6 py-[clamp(16px,1.8vw,24px)] text-left"
                >
                  <span
                    className={`font-display text-statement transition-colors duration-500 ${
                      isOpen ? 'text-ink' : 'text-bark'
                    }`}
                  >
                    {row.name}
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className={`size-5 shrink-0 self-center stroke-ink transition-transform duration-500 ease-(--ease-out) ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <path d="M10 2v16M2 10h16" strokeWidth="1.6" fill="none" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`field-panel-${row.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-20">
                        <p className="mb-6 max-w-[54ch] text-body text-ink">
                          {row.intro}{' '}
                          <Link
                            to={row.href}
                            className="link font-medium whitespace-nowrap text-bark-deep"
                          >
                            All {row.category.toLowerCase()} treatments →
                          </Link>
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {row.treatments.map((treatment) => (
                            <li key={treatment.id}>
                              <Link
                                to={treatmentPath(treatment.id)}
                                className="block bg-cream px-4 py-2 text-small text-ink transition-colors duration-200 hover:bg-blush"
                              >
                                {treatment.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </Item>
          )
        })}
      </Reveal>
    </div>
  )
}
