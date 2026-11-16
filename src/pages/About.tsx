import { Link } from 'react-router-dom'
import { BookingButton } from '../components/BookingButton'
import { ImageSlot } from '../components/ImageSlot'
import { PATHS } from '../data/clinic'
import { useLanguage } from '../i18n/language'

/**
 * One photograph beside the story: the title, a lead paragraph, the rest of
 * the text, three short facts and the actions. PLACEHOLDER text, figures and
 * photograph until the clinic sends its own.
 */
export function About() {
  const { t } = useLanguage()

  return (
    <>
      <section className="grid items-center gap-x-[clamp(32px,6vw,96px)] gap-y-10 px-gutter pt-[clamp(32px,5vw,80px)] pb-section lg:grid-cols-12">
        {/* Sample stock until the clinic's own photograph arrives, so it is
            treated as decorative rather than described as the clinic. */}
        <ImageSlot
          image="consultation-hands"
          alt=""
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="aspect-[4/3] lg:col-span-5 lg:aspect-[4/5]"
        />

        <div className="lg:col-span-7">
          <h1 className="font-display text-display">{t.about.title}</h1>
          <p className="mt-6 max-w-[44ch] font-display text-statement">{t.about.lead}</p>
          {t.about.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[60ch] text-body text-brown-soft">
              {paragraph}
            </p>
          ))}

          {/* PLACEHOLDER figures: the clinic must confirm every number. */}
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-x-6">
            {t.about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-small text-brown-soft">{fact.label}</dt>
                <dd className="font-display text-statement">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookingButton className="px-7" />
            <Link to={PATHS.treatments} className="link tap text-small font-medium">
              {t.about.seeTreatments}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-nude px-gutter py-section">
        <h2 className="mb-8 font-display text-heading">{t.about.approachHeading}</h2>
        <ul className="grid gap-x-8 gap-y-8 md:grid-cols-3">
          {t.about.approach.map((point) => (
            <li key={point.title}>
              <h3 className="font-display text-statement">{point.title}</h3>
              <p className="mt-2 max-w-[44ch] text-body">{point.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
