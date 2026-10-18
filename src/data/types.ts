/** A frequently-asked question and its answer. */
export type Faq = [question: string, answer: string]

/**
 * A single bookable treatment. Only the richest entries carry the long-form
 * fields; anything omitted falls back to `GENERIC` when the detail page renders.
 */
export interface Treatment {
  id: string
  name: string
  summary: string
  priceFrom: string
  duration: string
  /** Art-direction note for the image slot, shown on the placeholder. */
  photo: string
  what?: string
  suits?: string
  expect?: string[]
  aftercare?: string
  faq?: Faq[]
}

/** Treatments grouped by the concern they address. */
export interface Group {
  id: string
  name: string
  note: string
  items: Treatment[]
}

/** A top-level field of treatment, e.g. Face or Hair and scalp. */
export interface Category {
  id: string
  name: string
  short: string
  groups: Group[]
  /**
   * Describes the category wherever it is introduced: the category page, the
   * treatments index rows, and the home page accordion panels.
   */
  intro: string
}

/** One row of the home page's accordion of fields. */
export interface StackRow {
  catId: string
  name: string
}

export interface Quote {
  text: string
  meta: string
}

export interface TrustPoint {
  title: string
  body: string
}
