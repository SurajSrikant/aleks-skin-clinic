import { m } from 'motion/react'
import { useParams } from 'react-router-dom'
import { BookingButton } from '../components/BookingButton'
import { FaqList } from '../components/FaqList'
import { ImageSlot } from '../components/ImageSlot'
import { PageHero } from '../components/PageHero'
import { PictureRow } from '../components/PictureRow'
import { Item, Reveal } from '../components/Reveal'
import { NotFound } from './NotFound'
import {
  GENERIC,
  categoryPath,
  findTreatment,
  relatedTreatments,
  treatmentPath,
} from '../data/clinic'
import { treatmentMedia } from '../data/media'

const headingClass = 'mb-5 font-display text-statement'

export function Treatment() {
  const { treatmentId } = useParams()
  const found = findTreatment(treatmentId)

  if (!found) return <NotFound />

  const { treatment, category } = found
  const expect = treatment.expect ?? GENERIC.expect
  const related = relatedTreatments(found)

  return (
    <>
      <PageHero
        image={treatmentMedia(treatment.id)}
        lines={[treatment.name]}
        back={{ to: categoryPath(category.id), label: category.name }}
      >
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.85,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="mt-6 grid gap-4 lg:grid-cols-12 lg:gap-x-6"
        >
          <p className="max-w-[46ch] text-body text-cream lg:col-span-6">{treatment.summary}</p>
          <p className="text-small text-sand lg:col-span-3 lg:col-start-10 lg:self-end lg:text-right">
            From {treatment.priceFrom} · {treatment.duration}
          </p>
        </m.div>
      </PageHero>

      <section className="px-gutter py-section-sm">
        <div className="grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-[clamp(48px,6vw,80px)] lg:col-span-7">
            <Reveal>
              <Item as="h2" className={headingClass}>
                What it is
              </Item>
              <Item as="p" className="max-w-[60ch] text-body">
                {treatment.what ?? GENERIC.what}
              </Item>
            </Reveal>

            <Reveal>
              <Item as="h2" className={headingClass}>
                Who it suits
              </Item>
              <Item as="p" className="max-w-[60ch] text-body">
                {treatment.suits ?? GENERIC.suits}
              </Item>
            </Reveal>

            <Reveal>
              <Item as="h2" className={headingClass}>
                What to expect
              </Item>
              <ol className="flex max-w-[60ch] list-decimal flex-col gap-3 pl-6 text-body marker:font-display marker:text-bark">
                {expect.map((step) => (
                  <Item as="li" key={step} className="pl-2">
                    {step}
                  </Item>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <Item as="h2" className={headingClass}>
                Aftercare
              </Item>
              <Item as="p" className="max-w-[60ch] text-body">
                {treatment.aftercare ?? GENERIC.aftercare}
              </Item>
            </Reveal>

            <Reveal>
              <Item as="h2" className={headingClass}>
                Frequently asked
              </Item>
              <Item>
                {/* Keyed so the open question resets when moving between treatments. */}
                <FaqList key={treatment.id} items={treatment.faq ?? GENERIC.faq} />
              </Item>
            </Reveal>
          </div>

          <aside className="bg-blush lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9">
            <ImageSlot
              image="clinic-interior"
              sizes="(max-width: 1024px) 92vw, 30vw"
              objectPosition="center 70%"
              className="aspect-[16/10]"
            />
            <div className="p-[clamp(24px,3vw,40px)]">
              <h2 className="mb-3 font-display text-statement">Booking</h2>
              <p className="mb-7 text-body">
                Appointments are made in our booking system. First visits always begin with a
                consultation.
              </p>
              <BookingButton className="block px-6 py-4 text-center" />
            </div>
          </aside>
        </div>
      </section>

      {/* <section className="bg-shell px-gutter py-section-sm">
        <h2 className="mb-[clamp(28px,4vw,48px)] font-display text-heading">Related</h2>
        <PictureRow
          items={related.map((item) => ({
            id: item.id,
            href: treatmentPath(item.id),
            image: treatmentMedia(item.id),
            title: item.name,
            text: item.summary,
          }))}
        />
      </section> */}
    </>
  )
}
// 