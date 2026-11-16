import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { PATHS } from '../data/clinic'
import { useLanguage } from '../i18n/language'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-[60svh] pb-section">
      <PageHeader title={t.notFound.title}>
        <p>{t.notFound.body}</p>
      </PageHeader>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-gutter">
        <Link to={PATHS.treatments} className="btn btn-primary px-7">
          {t.nav.treatments}
        </Link>
        <Link to={PATHS.home} className="link tap text-small font-medium">
          {t.notFound.home}
        </Link>
      </div>
    </div>
  )
}
