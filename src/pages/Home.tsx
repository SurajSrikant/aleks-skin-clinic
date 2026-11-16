import { Link } from 'react-router-dom'
import { BookingButton } from '../components/BookingButton'
import { ImageSlot } from '../components/ImageSlot'
import { CATEGORY_IDS, treatmentsIn } from '../data/catalogue'
import { PATHS, categoryLink } from '../data/clinic'
import { useLanguage } from '../i18n/language'

export function Home() {
  const { t } = useLanguage()

  return (
    <>
      {/* ---- Introduction -------------------------------------------------- */}
      <section className="grid items-center gap-x-12 gap-y-10 px-gutter pt-[clamp(40px,6vw,96px)] pb-section lg:grid-cols-2">
        <div>
          <h1 className="font-display text-display">{t.home.title}</h1>
          <p className="mt-6 max-w-[48ch] text-body">{t.home.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookingButton className="px-7" />
            <Link to={PATHS.treatments} className="link tap text-small font-medium">
              {t.home.seeTreatments}
            </Link>
          </div>
        </div>

        {/* PLACEHOLDER stock photograph until the clinic sends its own, so it is
            treated as decorative rather than described as the clinic. */}
        <ImageSlot
          image="clinic-interior"
          alt=""
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-[4/3] lg:aspect-[5/4]"
        />
      </section>

      {/* ---- Treatment categories ------------------------------------------ */}
      <section className="bg-nude px-gutter py-section">
        <h2 className="font-display text-heading">{t.home.treatmentsHeading}</h2>
        <p className="mt-3 max-w-[52ch] text-body">{t.home.treatmentsIntro}</p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_IDS.map((id) => (
            <li key={id}>
              <Link
                to={categoryLink(id)}
                className="flex h-full flex-col bg-ivory p-6 transition-colors duration-150 hover:bg-ivory/70"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-statement">{t.categories[id].name}</span>
                  <span aria-hidden>→</span>
                </span>
                <span className="mt-2 text-small text-brown-soft">{t.categories[id].intro}</span>
                <span className="mt-auto pt-4 text-small font-medium">
                  {t.common.treatmentCount(treatmentsIn(id).length)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
