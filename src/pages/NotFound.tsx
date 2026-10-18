import { Link } from 'react-router-dom'
import { Lines } from '../components/Reveal'
import { TREATMENTS_PATH } from '../data/clinic'

export function NotFound() {
  return (
    <div className="min-h-[80svh] px-gutter pt-[clamp(128px,15vw,200px)] pb-section-sm">
      <Lines
        as="h1"
        immediate
        delay={0.2}
        lines={['That page is', 'no longer here']}
        className="mb-8 font-display text-display"
      />
      <p className="mb-10 max-w-[46ch] text-body">
        The treatment or page you were looking for may have been renamed. The full list is always
        under treatments.
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link to={TREATMENTS_PATH} className="btn btn-primary px-7 py-4">
          All treatments
        </Link>
        <Link to="/contact" className="link tap text-small font-medium text-bark-deep">
          Contact us
        </Link>
      </div>
    </div>
  )
}
