/**
 * The photography layer.
 *
 * Files under `public/media/` are derived from `media-src/` by
 * `npm run media` — see `scripts/build-media.mjs`. Every image exists as WebP
 * at each width in `WIDTHS`, plus one 960px JPEG for browsers without WebP.
 */

const WIDTHS = [480, 960, 1600] as const

/** Alt text describes the photograph; `Treatment.photo` is art direction, not alt. */
const ALT = {
  'body-device': "A practitioner treating a patient's leg with a handheld device",
  'skin-dewy': 'A close-up of skin with water droplets catching the light',
  'portrait-calm': 'A portrait of a woman with her eyes closed in soft daylight',
  'cream-swatch': 'A swatch of white treatment cream on a warm neutral surface',
  'peel-application': "Brushes applying a treatment mask along a patient's cheek",
  'clinic-interior': 'The clinic waiting area, with upholstered chairs beneath an arch',
  'consultation-hands': 'A clinician in a white coat dispensing product from a bottle',
  'portrait-glow': 'A portrait of a woman resting her hand against her cheek',
  microneedling: "A microneedling handpiece drawn across a patient's cheek",
  'injection-forehead': "A clinician injecting the brow area of a patient's forehead",
  'injection-lips': "A clinician injecting near a patient's mouth during a filler treatment",
  'body-aftercare': 'Dots of cream on a forearm resting against soft fabric',
} as const

export type MediaKey = keyof typeof ALT

export interface MediaSource {
  /** JPEG fallback for browsers that cannot decode WebP. */
  src: string
  /** WebP candidates across `WIDTHS`. */
  srcSet: string
  alt: string
}

export function media(key: MediaKey): MediaSource {
  return {
    src: `/media/${key}-960.jpg`,
    srcSet: WIDTHS.map((w) => `/media/${key}-${w}.webp ${w}w`).join(', '),
    alt: ALT[key],
  }
}

/**
 * A found photograph of the street the clinic stands on, not the clinic's own.
 * The source is only 1200px wide, so it carries its own widths rather than
 * going through `media()`. Cropped to drop the museum's caption bar and a
 * damaged plate corner; the licence is share-alike, so the crop is too.
 */
export const AVENUE = {
  src: '/media/avenue-chestnuts-960.jpg',
  srcSet: [480, 960, 1200].map((w) => `/media/avenue-chestnuts-${w}.webp ${w}w`).join(', '),
  alt: 'Bygdøy allé in the early twentieth century: horse carts on cobbles under the chestnut trees',
  credit: 'Bygdøy allé under the chestnuts. Photo: Johan Colbjørnsen Roshauw, Oslo Museum, CC BY-SA 4.0',
  creditUrl: 'https://digitaltmuseum.org/011014882239',
}

/** The same street today, also found rather than the clinic's own. */
export const AVENUE_TODAY = {
  src: '/media/avenue-today-960.jpg',
  srcSet: [480, 960, 1600].map((w) => `/media/avenue-today-${w}.webp ${w}w`).join(', '),
  alt: 'Bygdøy allé today at the corner of Niels Juels gate, with tall apartment buildings either side',
  credit: 'Bygdøy allé today. Photo: Helge Høifødt, Wikimedia Commons, CC BY-SA 4.0',
  creditUrl: 'https://commons.wikimedia.org/w/index.php?curid=72842367',
}

export const HERO_VIDEO = {
  /** Narrow viewports get the smaller rendition first; the browser picks one. */
  sources: [
    { src: '/media/hero-720.mp4', type: 'video/mp4', media: '(max-width: 900px)' },
    { src: '/media/hero-1080.mp4', type: 'video/mp4' },
  ],
  poster: '/media/hero-poster.jpg',
}

/**
 * Photography per treatment, chosen by what the image actually shows rather
 * than one-per-treatment — twelve photographs cover thirty treatments, so
 * related procedures deliberately share a frame.
 */
const TREATMENT_MEDIA: Record<string, MediaKey> = {
  // Face — lines
  'botox-forehead': 'injection-forehead',
  'botox-glabella': 'injection-forehead',
  'botox-eyes': 'injection-lips',
  // Face — volume and contour
  'filler-cheek': 'injection-lips',
  'filler-lips': 'injection-lips',
  'filler-jaw': 'portrait-glow',
  // Face — skin quality
  microneedling: 'microneedling',
  'chemical-peel': 'peel-application',
  // Skin
  'pigment-laser': 'peel-application',
  'skin-plan': 'cream-swatch',
  'acne-treatment': 'skin-dewy',
  'acne-marks': 'microneedling',
  // Body
  'body-microneedling': 'body-device',
  'stretch-marks': 'body-aftercare',
  hyperhidrosis: 'body-device',
  // Hair and scalp
  'hair-assessment': 'consultation-hands',
  'hair-injection': 'consultation-hands',
  // Injectables
  'botox-one': 'injection-forehead',
  'botox-three': 'injection-forehead',
  'filler-1ml': 'injection-lips',
  skinbooster: 'skin-dewy',
  // Hormones and metabolism
  'hormone-panel': 'consultation-hands',
  'menopause-skin': 'portrait-calm',
  // Sleep and vitality
  'longevity-consult': 'portrait-calm',
  'iv-vitamin': 'cream-swatch',
  // Dental and smile
  'smile-assessment': 'portrait-glow',
  whitening: 'portrait-glow',
  // Laser and skin quality
  'laser-resurfacing': 'microneedling',
  'laser-microneedling': 'microneedling',
  'laser-pigment-spots': 'peel-application',
  'laser-vessels': 'skin-dewy',
}

const CATEGORY_MEDIA: Record<string, MediaKey> = {
  face: 'portrait-glow',
  skin: 'skin-dewy',
  body: 'body-device',
  hair: 'consultation-hands',
  injectables: 'injection-lips',
  hormones: 'portrait-calm',
  vitality: 'portrait-calm',
  dental: 'portrait-glow',
  laser: 'microneedling',
}

/** Falls back to a calm portrait so a new treatment never renders imageless. */
export function treatmentMedia(id: string): MediaKey {
  return TREATMENT_MEDIA[id] ?? 'portrait-calm'
}

export function categoryMedia(id: string): MediaKey {
  return CATEGORY_MEDIA[id] ?? 'portrait-calm'
}
