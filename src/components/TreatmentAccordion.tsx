import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BookingButton } from './BookingButton'
import { CATEGORY_IDS, treatmentsIn } from '../data/catalogue'
import type { CategoryId, Treatment } from '../data/catalogue'
import { formatPrice, useLanguage } from '../i18n/language'

function isCategory(value: string): value is CategoryId {
  return (CATEGORY_IDS as readonly string[]).includes(value)
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      strokeWidth="1.8"
      className={`size-5 shrink-0 stroke-current ${open ? 'rotate-180' : ''}`}
    >
      <path d="M4 7.5l6 6 6-6" />
    </svg>
  )
}

/** One bookable row: name and price, the description, then duration and Book. */
function TreatmentRow({ treatment }: { treatment: Treatment }) {
  const { lang, t } = useLanguage()
  const text = t.treatments[treatment.id]
  const price = formatPrice(lang, treatment.price)

  return (
    <li data-ui className="border-t border-nude-deep py-5 first:border-t-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">{text.name}</h3>
        <p className="shrink-0 font-medium whitespace-nowrap">
          {treatment.priceFrom && `${t.common.from} `}
          {price}
        </p>
      </div>
      <p className="mt-1 max-w-[60ch] text-small text-brown-soft">{text.description}</p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-small text-brown-soft">{t.common.minutes(treatment.minutes)}</p>
        <BookingButton
          href={treatment.bookingUrl}
          ariaLabel={t.common.bookTreatment(text.name)}
          className="px-6"
        >
          {t.common.book}
        </BookingButton>
      </div>
    </li>
  )
}

/**
 * Every treatment, grouped by category. Tapping a category opens it in place;
 * several can be open at once. A link to `/treatments#<category>` arrives with
 * that category already open.
 */
export function TreatmentAccordion() {
  const { t } = useLanguage()
  const { hash } = useLocation()
  const target = decodeURIComponent(hash.slice(1))

  const [open, setOpen] = useState<Set<CategoryId>>(
    () => new Set(isCategory(target) ? [target] : []),
  )

  // A category link while already on the page: open that category too.
  const [seenTarget, setSeenTarget] = useState(target)
  if (target !== seenTarget) {
    setSeenTarget(target)
    if (isCategory(target)) setOpen((current) => new Set(current).add(target))
  }

  // Bring the linked category into view once it is open.
  useEffect(() => {
    if (isCategory(target)) document.getElementById(target)?.scrollIntoView({ block: 'start' })
  }, [target])

  const toggle = (id: CategoryId) =>
    setOpen((current) => {
      const next = new Set(current)
      if (!next.delete(id)) next.add(id)
      return next
    })

  return (
    <ul data-ui className="border-b border-nude-deep">
      {CATEGORY_IDS.map((id) => {
        const isOpen = open.has(id)
        const category = t.categories[id]
        const treatments = treatmentsIn(id)

        return (
          <li key={id} id={id} data-ui className="border-t border-nude-deep">
            <h2>
              <button
                type="button"
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${id}`}
                className="flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-6 py-4 text-left"
              >
                <span>
                  <span className="block font-display text-statement">{category.name}</span>
                  <span className="mt-0.5 block text-small text-brown-soft">
                    {t.common.treatmentCount(treatments.length)}
                  </span>
                </span>
                <Chevron open={isOpen} />
              </button>
            </h2>

            <div id={`panel-${id}`} hidden={!isOpen} className="pb-6">
              <p className="mb-2 max-w-[60ch] text-body">{category.intro}</p>
              <ul>
                {treatments.map((treatment) => (
                  <TreatmentRow key={treatment.id} treatment={treatment} />
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
