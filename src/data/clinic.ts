/**
 * Facts about the clinic that do not change with language. Anything a visitor
 * reads as a sentence belongs in `src/content/` instead.
 *
 * PLACEHOLDER: address, phone, email, org. no. and hours are stand-ins until
 * the clinic confirms them.
 */

/**
 * The clinic's general Medibook booking page. Treatments with their own
 * `bookingUrl` in `catalogue.ts` link there instead.
 *
 * TODO: replace with the clinic's Medibook link.
 */
export const BOOKING_URL = 'https://medibook.no/'

export const CLINIC = {
  name: 'Dr. M Klinikken',
  street: 'Bygdøy allé 12',
  city: '0262 Oslo',
  phone: '+47 22 00 00 00',
  phoneHref: 'tel:+4722000000',
  email: 'post@drmklinikken.no',
  instagram: 'https://instagram.com',
  orgNo: '000 000 000',
  /** Opens the address in the visitor's own maps app. */
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bygd%C3%B8y+all%C3%A9+12%2C+0262+Oslo',
  /** Google Maps embed for the contact page; loaded only after the visitor asks for it. */
  mapEmbedUrl: 'https://www.google.com/maps?q=Bygd%C3%B8y+all%C3%A9+12%2C+0262+Oslo&output=embed',
  /**
   * Opening hours by ISO weekday (1 = Monday), Oslo time. Days absent are
   * closed. The printed hours in `src/content/` must match.
   */
  opening: { 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 16] } as Record<
    number,
    readonly [open: number, close: number]
  >,
}

export const PATHS = {
  home: '/',
  treatments: '/treatments',
  about: '/about',
  contact: '/contact',
} as const

/** A link that opens one category on the treatments page. */
export function categoryLink(id: string): string {
  return `${PATHS.treatments}#${id}`
}
