import { Link } from 'react-router-dom'
import { BookingButton } from './BookingButton'
import { CLINIC, PATHS } from '../data/clinic'
import { useLanguage } from '../i18n/language'

const soft = 'link tap [--tap:8px] text-ivory/80 hover:text-ivory'

/** Dark brown close to every page: address and hours, contact, and booking. */
export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-brown px-gutter pt-section pb-8 text-small text-ivory">
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-3 font-display text-statement">{CLINIC.name}</p>
          <BookingButton variant="light" />
        </div>

        <div>
          <p className="mb-3 font-medium">{t.footer.visit}</p>
          <p className="text-ivory/80">
            <a href={CLINIC.mapUrl} target="_blank" rel="noopener noreferrer" className={soft}>
              {CLINIC.street}, {CLINIC.city}
            </a>
          </p>
          <p className="mt-3 text-ivory/80">
            {t.hours.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>

        <div>
          <p className="mb-3 font-medium">{t.footer.contact}</p>
          <ul className="flex flex-col gap-3 sm:gap-1.5">
            <li>
              <a href={CLINIC.phoneHref} className={soft}>
                {CLINIC.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CLINIC.email}`} className={soft}>
                {CLINIC.email}
              </a>
            </li>
            <li>
              <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className={soft}>
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <ul className="flex flex-col gap-3 sm:gap-1.5">
          <li>
            <Link to={PATHS.treatments} className={soft}>
              {t.nav.treatments}
            </Link>
          </li>
          <li>
            <Link to={PATHS.about} className={soft}>
              {t.nav.about}
            </Link>
          </li>
          <li>
            <Link to={PATHS.contact} className={soft}>
              {t.nav.contact}
            </Link>
          </li>
        </ul>
      </div>

      <p className="mt-section flex flex-wrap justify-between gap-x-6 gap-y-1 text-ivory/70">
        <span>
          © {new Date().getFullYear()} {CLINIC.name}
        </span>
        {/* TODO: link the privacy policy once the clinic provides one. */}
        <span>
          {t.footer.orgNo} {CLINIC.orgNo} · {t.footer.privacy}
        </span>
      </p>
    </footer>
  )
}
