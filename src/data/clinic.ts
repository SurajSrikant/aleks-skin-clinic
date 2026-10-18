import { CATEGORIES } from './categories'
import type { Category, Faq, Group, Quote, StackRow, Treatment, TrustPoint } from './types'

export { CATEGORIES }
export type { Category, Faq, Group, Treatment }

/** Where appointments are actually booked. */
export const BOOKING_URL = 'https://timma.no/'

export const CLINIC = {
  name: 'Dr. M Klinikken',
  street: 'Bygdøy allé 12',
  city: '0262 Oslo',
  phone: '+47 22 00 00 00',
  phoneHref: 'tel:+4722000000',
  email: 'post@drmklinikken.no',
  instagram: 'https://instagram.com',
  orgNo: 'Org. no. 000 000 000',
  hours: ['Mon–Thu 10–18', 'Fri 10–16', 'Sat–Sun closed'],
  /**
   * The same hours, machine-readable: ISO weekday (1 = Monday) to opening and
   * closing hour, Oslo time. Days absent are closed. Keep in step with `hours`.
   */
  opening: { 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 16] } as Record<
    number,
    readonly [open: number, close: number]
  >,
  travel: 'Tram 13 to Skovveien, a three-minute walk. Street parking on the block.',
}

/**
 * The home page accordion. It reframes six of the categories in editorial
 * language rather than reusing their catalogue names.
 */
export const STACK: StackRow[] = [
  { catId: 'skin', name: 'Skin & regeneration' },
  { catId: 'injectables', name: 'Injections & balance' },
  { catId: 'laser', name: 'Laser & skin quality' },
  { catId: 'body', name: 'Body & contour' },
  { catId: 'hair', name: 'Hair & growth' },
  { catId: 'dental', name: 'Dental & smile' },
]

/** Fallback long-form copy for treatments that carry only a summary. */
export const GENERIC: {
  what: string
  suits: string
  expect: string[]
  aftercare: string
  faq: Faq[]
} = {
  what: 'The treatment is carried out by a doctor or nurse following a clinical assessment. We use established methods and dose carefully, aiming for a change that is noticeable to you and barely visible to others.',
  suits:
    'We review your health, medication and previous treatments in the consultation, and will say so if we believe the treatment is not right for you at this time.',
  expect: [
    'A consultation and a plan, with no obligation.',
    'The treatment is carried out in the clinic, usually without anaesthetic or with a topical cream.',
    'We arrange a review when there is a clinical reason for it.',
  ],
  aftercare:
    'You will be given written aftercare advice. As a rule we advise avoiding exercise, sun and strong skincare products for the first day.',
  faq: [
    [
      'Do I need a consultation first?',
      'Yes, for a first visit. It lets us assess whether the treatment is right and what is realistic.',
    ],
    [
      'Can I go back to work afterwards?',
      'Usually yes. Slight redness or swelling can occur in the first day.',
    ],
    [
      'How many treatments will I need?',
      'It depends on the starting point. We say what we believe is necessary, and no more.',
    ],
  ],
}

export const QUOTES: Quote[] = [
  {
    text: 'I was advised to begin with less than I had planned. That was reassuring.',
    meta: 'Filler, cheeks · patient since 2023',
  },
  {
    text: 'A calm place, clear information, and nobody trying to sell me anything.',
    meta: 'Muscle relaxant, forehead',
  },
  {
    text: 'After six months on a plan my skin is more even. Not dramatic, but noticeable.',
    meta: 'Skincare plan and microneedling',
  },
]

export const TRUST: TrustPoint[] = [
  { title: 'Medical oversight', body: 'Every plan follows a clinical examination by a doctor.' },
  {
    title: 'Tailored plans',
    body: 'We would rather recommend fewer measures over time than many at once.',
  },
  {
    title: 'Discretion',
    body: 'A separate entrance, few appointments a day, and no crowded waiting room.',
  },
  { title: 'Established methods', body: 'We use products and techniques with documented experience.' },
]

/**
 * Treatment ids featured in the home page band, in order. The band gives its
 * panels unequal widths (5 : 2 : 3 : 2), so it holds exactly four.
 */
export const SIGNATURE_IDS = ['microneedling', 'filler-lips', 'botox-forehead', 'skinbooster']

/** The index of every field of practice. */
export const TREATMENTS_PATH = '/treatments'

export interface TreatmentLocation {
  treatment: Treatment
  category: Category
  group: Group
}

/** Treatment ids are unique across the catalogue, so one flat index is enough. */
const TREATMENT_INDEX = new Map<string, TreatmentLocation>(
  CATEGORIES.flatMap((category) =>
    category.groups.flatMap((group) =>
      group.items.map(
        (treatment) => [treatment.id, { treatment, category, group }] as const,
      ),
    ),
  ),
)

/** Resolve a treatment id to the treatment and the category/group holding it. */
export function findTreatment(id: string | undefined): TreatmentLocation | null {
  return (id && TREATMENT_INDEX.get(id)) || null
}

export function findCategory(id: string | undefined): Category | null {
  return CATEGORIES.find((category) => category.id === id) ?? null
}

/** Every treatment in a category, flattened in group order. */
export function categoryTreatments(category: Category): Treatment[] {
  return category.groups.flatMap((group) => group.items)
}

/** Canonical URL for a treatment, nested under the category that owns it. */
export function treatmentPath(id: string): string {
  const found = findTreatment(id)
  return found ? `/treatments/${found.category.id}/${id}` : '/treatments'
}

export function categoryPath(id: string): string {
  return `/treatments/${id}`
}

/**
 * Up to three treatments to show under a treatment: others in the same group
 * first, then the rest of the category in order.
 */
export function relatedTreatments({ treatment, category, group }: TreatmentLocation): Treatment[] {
  const siblings = group.items.filter((item) => item.id !== treatment.id)
  const others = categoryTreatments(category).filter(
    (item) => item.id !== treatment.id && !siblings.includes(item),
  )
  return [...siblings, ...others].slice(0, 3)
}

/** The next three fields after this one, wrapping round the list. */
export function otherCategories(category: Category): Category[] {
  const at = CATEGORIES.indexOf(category)
  return [1, 2, 3].map((step) => CATEGORIES[(at + step) % CATEGORIES.length])
}
