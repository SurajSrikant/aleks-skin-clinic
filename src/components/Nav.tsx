import { Link, useLocation } from 'react-router-dom'
import { BookingButton } from './BookingButton'
import { CLINIC, TREATMENTS_PATH } from '../data/clinic'
import { useScrolled } from '../hooks/useScrolled'

/** How the screen opens: on a dark full-bleed picture, on Home's light film,
    or on the plain page. The bare bar can sit over either picture. */
function heroTone(pathname: string): 'dark' | 'light' | null {
  if (pathname.startsWith('/treatments')) return 'dark'
  if (pathname === '/') return 'light'
  return null
}

/**
 * A plain bar: the name, two links, one action. Over a dark hero it is only
 * type; once scrolled, or over a pale screen, it takes a step of tone so it
 * separates from the page without a line or a shadow.
 */
export function Nav() {
  const { pathname } = useLocation()
  const scrolled = useScrolled(40)

  // Over the plain page the bar must be solid from the start, or cream-on-cream
  // type would be invisible until the first scroll.
  const tone = heroTone(pathname)
  const solid = scrolled || tone === null
  const onDark = !solid && tone === 'dark'

  const bar = solid ? 'bg-shell' : 'bg-transparent'
  const type = onDark ? 'text-cream' : 'text-ink'

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-(--ease-out) ${bar}`}
    >
      <div className="flex items-center justify-between gap-3 px-gutter py-4 sm:gap-6">
        <Link
          to="/"
          className={`tap font-display text-[clamp(17px,5.4vw,22px)] leading-none whitespace-nowrap transition-colors duration-500 ${type}`}
        >
          {CLINIC.name}
        </Link>

        <div className={`flex items-center gap-[clamp(12px,2.4vw,36px)] text-small whitespace-nowrap ${type}`}>
          <Link to={TREATMENTS_PATH} className="link tap transition-colors duration-500">
            Treatments
          </Link>
          <Link to="/contact" className="link tap transition-colors duration-500">
            Contact
          </Link>
          {/* Booking is reachable from every screen body, so the bar sheds this
              first when space runs out. */}
          <BookingButton
            variant={onDark ? 'paper' : 'primary'}
            className="hidden px-5 py-3 sm:inline-block"
          />
        </div>
      </div>
    </nav>
  )
}
