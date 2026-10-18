import { Link } from 'react-router-dom'
import { OpenStatus } from './OpenStatus'
import { CATEGORIES, CLINIC, TREATMENTS_PATH, categoryPath } from '../data/clinic'

const softLink = 'link tap text-cream/70 [--tap:8px] hover:text-cream'

/**
 * The name, fitted edge to edge. SVG text with a fixed viewBox scales with its
 * container, so it can never wrap or overflow at any width.
 */
function Wordmark({ text, viewBox, className = '' }: { text: string; viewBox: string; className?: string }) {
  const [, , width, height] = viewBox.split(' ').map(Number)
  return (
    <svg viewBox={viewBox} className={`block w-full ${className}`} aria-hidden>
      <text
        x="0"
        y={height * 0.8}
        textLength={width}
        lengthAdjust="spacing"
        className="fill-cream font-display"
        style={{ fontSize: height }}
      >
        {text}
      </text>
    </svg>
  )
}

/**
 * The close of every page: ink ground, four plain columns, then the name across
 * the full width.
 */
export function Footer() {
  return (
    <footer className="bg-ink px-gutter pt-[clamp(80px,10vw,128px)] pb-6 text-small text-cream">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="mb-3">Visit</p>
          <p className="text-cream/70">
            {CLINIC.street}, {CLINIC.city}
          </p>
          <OpenStatus className="mt-3 text-sand" />
          <p className="mt-3 text-cream/70">
            {CLINIC.hours.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-5">
          <p className="mb-3">
            <Link to={TREATMENTS_PATH} className="link tap [--tap:8px]">
              Treatments
            </Link>
          </p>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 sm:gap-y-1.5">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link to={categoryPath(category.id)} className={softLink}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 lg:col-start-10">
          <p className="mb-3">Contact</p>
          <ul className="flex flex-col gap-3 sm:gap-1.5">
            <li>
              <a href={CLINIC.phoneHref} className={softLink}>
                {CLINIC.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CLINIC.email}`} className={softLink}>
                {CLINIC.email}
              </a>
            </li>
            <li>
              <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className={softLink}>
                Instagram
              </a>
            </li>
            <li>
              <Link to="/contact" className={softLink}>
                Getting here
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-[clamp(72px,10vw,144px)]" />

      <div>
        <Wordmark text={CLINIC.name} viewBox="0 0 1000 152" className="hidden sm:block" />
        {/* On a phone the name stacks; both lines share one size, fitted to "Klinikken". */}
        <svg viewBox="0 0 1000 440" className="block w-full sm:hidden" aria-hidden>
          <g className="fill-cream font-display" style={{ fontSize: 214 }}>
            <text x="0" y="172">
              Dr. M
            </text>
            <text x="0" y="400" textLength={1000} lengthAdjust="spacing">
              Klinikken
            </text>
          </g>
        </svg>
        <p className="mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 text-cream/60">
          <span>© 2026 {CLINIC.name}</span>
          <span>{CLINIC.orgNo} · Privacy</span>
        </p>
      </div>
    </footer>
  )
}
