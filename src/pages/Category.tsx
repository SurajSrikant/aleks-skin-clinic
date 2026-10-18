import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { PictureRow } from '../components/PictureRow'
import { PreviewFrame } from '../components/PreviewFrame'
import { Item, Reveal } from '../components/Reveal'
import { NotFound } from './NotFound'
import {
  TREATMENTS_PATH,
  categoryPath,
  categoryTreatments,
  findCategory,
  otherCategories,
  treatmentPath,
} from '../data/clinic'
import { categoryMedia, treatmentMedia } from '../data/media'

export function Category() {
  const { categoryId } = useParams()
  const category = findCategory(categoryId)
  // Index into the category's flattened treatments of the photograph shown.
  const [shown, setShown] = useState(0)

  if (!category) return <NotFound />

  const treatments = categoryTreatments(category)
  const images = treatments.map((treatment) => treatmentMedia(treatment.id))

  return (
    <>
      <PageHero
        image={categoryMedia(category.id)}
        lines={[category.name]}
        back={{ to: TREATMENTS_PATH, label: 'All treatments' }}
      />

      <section className="px-gutter py-section-sm">
        <Reveal className="mb-shelf grid lg:grid-cols-12 lg:gap-x-6">
          <Item as="p" className="max-w-[56ch] text-body lg:col-span-6 lg:col-start-6">
            {category.intro}
          </Item>
        </Reveal>

        <div className="grid items-start gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          {/* Concern index. Plain anchors so each concern is linkable; the
              fixed bar is cleared with scroll-margin rather than script. */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-4">
            <PreviewFrame images={images} shown={shown} className="hidden aspect-[4/5] lg:block" />
            <nav aria-label="Concerns" className="flex flex-wrap gap-x-6 gap-y-2">
              {category.groups.map((group) => (
                <a key={group.id} href={`#${group.id}`} className="link tap text-small text-bark-deep">
                  {group.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-shelf lg:col-span-7 lg:col-start-6">
            {category.groups.map((group) => (
              <div key={group.id}>
                {/* Anchor target sits outside Reveal: the reveal transform
                    would otherwise shift the landing point by its travel,
                    dropping the heading behind the fixed nav. */}
                <span id={group.id} aria-hidden className="block scroll-mt-[120px]" />
                <Reveal stagger={0.06}>
                  <Item as="h2" className="mb-2 font-display text-statement">
                    {group.name}
                  </Item>
                  <Item as="p" className="mb-6 max-w-[52ch] text-body text-bark-deep">
                    {group.note}
                  </Item>

                  <ul className="flex flex-col gap-1">
                    {group.items.map((treatment) => (
                      <Item as="li" key={treatment.id}>
                        <Link
                          to={treatmentPath(treatment.id)}
                          onPointerEnter={() => setShown(treatments.indexOf(treatment))}
                          onFocus={() => setShown(treatments.indexOf(treatment))}
                          className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-[clamp(16px,2vw,24px)] py-5 text-ink transition-colors duration-300 hover:bg-shell"
                        >
                          <span className="flex-[1_1_260px] transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-1">
                            <span className="mb-1 block font-display text-statement">
                              {treatment.name}
                            </span>
                            <span className="block max-w-[48ch] text-body text-bark-deep">
                              {treatment.summary}
                            </span>
                          </span>
                          <span className="text-small whitespace-nowrap text-bark-deep">
                            From {treatment.priceFrom} · {treatment.duration}
                          </span>
                        </Link>
                      </Item>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-shell px-gutter py-section-sm">
        <h2 className="mb-[clamp(28px,4vw,48px)] font-display text-heading">Other fields</h2>
        <PictureRow
          items={otherCategories(category).map((other) => ({
            id: other.id,
            href: categoryPath(other.id),
            image: categoryMedia(other.id),
            title: other.name,
            text: other.intro.split('. ')[0] + '.',
          }))}
        />
      </section>
    </>
  )
}
