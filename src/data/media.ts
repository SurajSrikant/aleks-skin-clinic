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

