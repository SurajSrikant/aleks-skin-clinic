/**
 * The treatment catalogue: everything about a treatment that does not depend
 * on language. Names and descriptions live in `src/content/{nb,en}.ts`, keyed
 * by the ids below, so a price or duration is only ever changed in one place.
 *
 * PLACEHOLDER: the categories, treatments, prices and durations are stand-ins
 * until the clinic sends its own list.
 */

/** Categories in the order they are listed on the site. */
export const CATEGORY_IDS = [
  'consultation',
  'lip-fillers',
  'facial-fillers',
  'wrinkle-treatments',
  'skin-treatments',
] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export interface TreatmentData {
  id: string
  category: CategoryId
  /** Price in whole NOK. */
  price: number
  /** The price is a starting point, shown as "From …". */
  priceFrom?: boolean
  minutes: number
  /**
   * A Medibook link straight to this treatment, if Medibook offers one.
   * Without it the Book button opens the general booking page.
   */
  bookingUrl?: string
}

export const TREATMENTS = [
  // Consultation
  { id: 'consultation', category: 'consultation', price: 500, minutes: 30 },
  { id: 'skin-analysis', category: 'consultation', price: 300, minutes: 30 },

  // Lip fillers
  { id: 'lips-05', category: 'lip-fillers', price: 2900, minutes: 45 },
  { id: 'lips-10', category: 'lip-fillers', price: 3900, minutes: 45 },
  { id: 'lips-hydration', category: 'lip-fillers', price: 2500, minutes: 30 },
  { id: 'lips-touch-up', category: 'lip-fillers', price: 1900, minutes: 30 },

  // Facial fillers
  { id: 'filler-cheeks', category: 'facial-fillers', price: 4500, priceFrom: true, minutes: 45 },
  { id: 'filler-chin', category: 'facial-fillers', price: 3900, minutes: 45 },
  { id: 'filler-jawline', category: 'facial-fillers', price: 5400, priceFrom: true, minutes: 60 },
  { id: 'filler-tear-trough', category: 'facial-fillers', price: 4200, minutes: 45 },
  { id: 'filler-nasolabial', category: 'facial-fillers', price: 3900, minutes: 45 },
  { id: 'filler-dissolve', category: 'facial-fillers', price: 2000, priceFrom: true, minutes: 30 },

  // Wrinkle treatments
  { id: 'wrinkles-1', category: 'wrinkle-treatments', price: 2400, minutes: 30 },
  { id: 'wrinkles-2', category: 'wrinkle-treatments', price: 3400, minutes: 30 },
  { id: 'wrinkles-3', category: 'wrinkle-treatments', price: 4200, minutes: 45 },
  { id: 'masseter', category: 'wrinkle-treatments', price: 4000, minutes: 30 },
  { id: 'sweating', category: 'wrinkle-treatments', price: 5000, minutes: 45 },

  // Skin treatments
  { id: 'microneedling', category: 'skin-treatments', price: 2600, minutes: 60 },
  { id: 'microneedling-peel', category: 'skin-treatments', price: 3200, minutes: 75 },
  { id: 'chemical-peel', category: 'skin-treatments', price: 1900, priceFrom: true, minutes: 45 },
  { id: 'skin-booster', category: 'skin-treatments', price: 3200, minutes: 45 },
] as const satisfies readonly TreatmentData[]

export type TreatmentId = (typeof TREATMENTS)[number]['id']
export type Treatment = TreatmentData & { id: TreatmentId }

export function treatmentsIn(category: CategoryId): Treatment[] {
  return TREATMENTS.filter((treatment) => treatment.category === category)
}
