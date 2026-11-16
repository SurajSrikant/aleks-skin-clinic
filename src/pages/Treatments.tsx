import { PageHeader } from '../components/PageHeader'
import { TreatmentAccordion } from '../components/TreatmentAccordion'
import { useLanguage } from '../i18n/language'

/** Every treatment on one page, grouped into categories that open in place. */
export function Treatments() {
  const { t } = useLanguage()

  return (
    <>
      <PageHeader title={t.treatmentsPage.title}>
        <p>{t.treatmentsPage.intro}</p>
      </PageHeader>

      <section className="px-gutter pb-section">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <TreatmentAccordion />
        </div>
      </section>
    </>
  )
}
