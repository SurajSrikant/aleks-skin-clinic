import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookingButton } from '../components/BookingButton'
import { PageHero } from '../components/PageHero'
import { PreviewFrame } from '../components/PreviewFrame'
import { Item, Lines, Reveal } from '../components/Reveal'
import { CATEGORIES, categoryPath, categoryTreatments } from '../data/clinic'
import { categoryMedia } from '../data/media'

const IMAGES = CATEGORIES.map((category) => categoryMedia(category.id))

/** The index of every field of practice — the landing point for "Treatments". */
export function Treatments() {
  const [shown, setShown] = useState(0)

  return (
    <>
      <PageHero image="peel-application" lines={['Treatments']} />

      <section className="px-gutter py-section-sm">
        <Reveal className="mb-shelf grid lg:grid-cols-12 lg:gap-x-6">
          <Item as="p" className="font-display text-statement lg:col-span-6 lg:col-start-7">
            Grouped by the field they belong to, not by product name. Unsure where to begin? Start
            with Face or Skin.
          </Item>
        </Reveal>

        <div className="grid items-start lg:grid-cols-12 lg:gap-x-6">
          <PreviewFrame
            images={IMAGES}
            shown={shown}
            className="hidden aspect-[4/5] lg:sticky lg:top-28 lg:col-span-4 lg:block"
          />

          <Reveal as="ul" className="flex flex-col gap-1 lg:col-span-8" stagger={0.06}>
            {CATEGORIES.map((category, index) => (
              <Item as="li" key={category.id}>
                <Link
                  to={categoryPath(category.id)}
                  onPointerEnter={() => setShown(index)}
                  onFocus={() => setShown(index)}
                  className="group grid gap-x-6 gap-y-2 px-[clamp(16px,2vw,28px)] py-[clamp(20px,2.4vw,32px)] text-ink transition-colors duration-300 hover:bg-shell sm:grid-cols-8 sm:items-baseline"
                >
                  <span className="font-display text-statement sm:col-span-3">{category.name}</span>
                  <span className="text-body sm:col-span-5">
                    {category.intro}
                    <span className="mt-2 block text-small text-bark-deep transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-1">
                      {categoryTreatments(category).length} treatments →
                    </span>
                  </span>
                </Link>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-blush px-gutter py-section-sm">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <Lines
            lines={['Not sure', 'which applies?']}
            className="font-display text-heading lg:col-span-6"
          />
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <Item as="p" className="mb-8 max-w-[46ch] text-body">
              A first consultation covers your skin, your history and what you want, and ends with
              a plan you can consider calmly. Nothing is decided in the room.
            </Item>
            <Item>
              <BookingButton className="px-7 py-4" />
            </Item>
          </Reveal>
        </div>
      </section>
    </>
  )
}
