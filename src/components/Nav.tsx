import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BookingButton } from './BookingButton'
import { LanguageSwitch } from './LanguageSwitch'
import { CLINIC, PATHS } from '../data/clinic'
import { LANGUAGE_SWITCH, useLanguage } from '../i18n/language'

/** Text wordmark until the clinic's logo files arrive. */
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <Link
      to={PATHS.home}
      onClick={onClick}
      className="font-display text-[clamp(18px,4.8vw,22px)] leading-none whitespace-nowrap"
    >
      {CLINIC.name}
    </Link>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-5 stroke-current" fill="none" strokeWidth="1.6">
      {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M2 5h16M2 10h16M2 15h16" />}
    </svg>
  )
}

/**
 * A plain bar that stays at the top: the name, the menu and the booking
 * action. From `lg` every link fits on the bar; below that the links fold into
 * a menu panel, but Book stays on the bar.
 */
export function Nav() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const links = [
    { to: PATHS.home, label: t.nav.home },
    { to: PATHS.treatments, label: t.nav.treatments },
    { to: PATHS.about, label: t.nav.about },
    { to: PATHS.contact, label: t.nav.contact },
  ]

  // While the menu covers the page: hold the page still, and let Escape close it.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header data-ui className="sticky top-0 z-50 border-b border-nude-deep bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-brown focus:px-4 focus:py-2 focus:text-ivory"
      >
        {t.nav.skip}
      </a>

      <nav className="flex h-nav items-center justify-between gap-3 px-gutter">
        <Logo onClick={close} />

        <div className="flex items-center gap-2 lg:gap-8">
          <ul className="hidden items-center gap-7 text-small lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) => `tap ${isActive ? 'font-medium underline underline-offset-8' : 'link [text-decoration-color:transparent]'}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {LANGUAGE_SWITCH && <LanguageSwitch className="hidden lg:flex" />}

          {/* Book stays on the bar at every width; on a phone it shortens to "Book". */}
          <BookingButton className="px-4 sm:px-5" ariaLabel={t.nav.book}>
            <span className="sm:hidden">{t.common.book}</span>
            <span className="hidden sm:inline">{t.nav.book}</span>
          </BookingButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-2 flex min-h-11 cursor-pointer items-center gap-2 px-2 text-small lg:hidden"
          >
            <span className="hidden min-[400px]:inline">{open ? t.nav.close : t.nav.menu}</span>
            <span className="sr-only min-[400px]:hidden">{open ? t.nav.close : t.nav.menu}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="site-menu"
          className="fixed inset-x-0 top-nav bottom-0 overflow-y-auto bg-ivory px-gutter pt-4 pb-10 lg:hidden"
        >
          <ul>
            {links.map((link) => (
              <li key={link.to} data-ui className="border-b border-nude-deep">
                <NavLink
                  to={link.to}
                  end
                  onClick={close}
                  className={({ isActive }) =>
                    `flex min-h-14 items-center font-display text-statement ${isActive ? 'underline underline-offset-8' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {LANGUAGE_SWITCH && <LanguageSwitch className="mt-6 -ml-2" />}
        </div>
      )}
    </header>
  )
}
