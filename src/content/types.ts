import type { CategoryId, TreatmentId } from '../data/catalogue'

export type Lang = 'nb' | 'en'

/**
 * Every word on the site, for one language. Both `nb.ts` and `en.ts` must
 * satisfy this type, so a missing translation fails the build rather than
 * showing up blank.
 */
export interface SiteContent {
  meta: { title: string; description: string }

  nav: {
    home: string
    treatments: string
    about: string
    contact: string
    book: string
    menu: string
    close: string
    /** Accessible name for the language switch, in this language. */
    language: string
    skip: string
  }

  common: {
    /** Visible label on every Book button. */
    book: string
    /** Accessible name for a treatment's Book button. */
    bookTreatment: (name: string) => string
    from: string
    minutes: (minutes: number) => string
    treatmentCount: (count: number) => string
    opensInNewTab: string
  }

  home: {
    title: string
    intro: string
    seeTreatments: string
    treatmentsHeading: string
    treatmentsIntro: string
  }

  treatmentsPage: {
    title: string
    intro: string
  }

  about: {
    title: string
    /** The first paragraph, set larger. */
    lead: string
    body: string[]
    /** Three short facts under the text, e.g. years in practice. */
    facts: { value: string; label: string }[]
    seeTreatments: string
    approachHeading: string
    approach: { title: string; body: string }[]
  }

  contact: {
    title: string
    address: string
    hours: string
    phoneEmail: string
    gettingHere: string
    travel: string
    openMap: string
    map: { title: string; show: string; note: string }
    bookingHeading: string
    bookingBody: string
    form: {
      heading: string
      name: string
      email: string
      message: string
      send: string
      sent: string
    }
  }

  /** Printed opening hours, one line each. Must match `CLINIC.opening`. */
  hours: string[]

  openStatus: {
    openUntil: (time: string) => string
    opensToday: (time: string) => string
    opensTomorrow: (time: string) => string
    opensOn: (day: string, time: string) => string
    closed: string
    /** ISO weekdays, index 1 = Monday. Index 0 is unused. */
    dayNames: string[]
  }

  footer: { visit: string; contact: string; orgNo: string; privacy: string }

  notFound: { title: string; body: string; home: string }

  categories: Record<CategoryId, { name: string; intro: string }>
  treatments: Record<TreatmentId, { name: string; description: string }>
}
