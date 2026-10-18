/**
 * Derives the web-ready images in `public/media/` from the originals in
 * `media-src/`.
 *
 * The originals are 2.5–8K stills totalling ~30MB; none of that belongs in a
 * page load. Each one is emitted as WebP at three widths plus a single JPEG
 * fallback, and a manifest records the intrinsic size so the markup can reserve
 * the right box.
 *
 * Run with `npm run media` after adding or replacing anything in `media-src/`.
 * The output is committed, so a normal build never needs sharp.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC = 'media-src'
const OUT = 'public/media'
const WIDTHS = [480, 960, 1600]
/** Width of the lone JPEG kept for browsers without WebP. */
const FALLBACK_WIDTH = 960

/** Stable, readable slugs — the upstream filenames are photographer + hash. */
const SLUGS = {
  'farhad-ibrahimzade-szpFxaqS658-unsplash.jpg': 'body-device',
  'fleur-kaan-e7jpGYe7OtU-unsplash.jpg': 'skin-dewy',
  'fleur-kaan-w4Dj3MshHQ0-unsplash.jpg': 'portrait-calm',
  'kelsey-curtis-kD9qprR6HBI-unsplash.jpg': 'cream-swatch',
  'kimia-kazemi-Xxs9WvkUPLo-unsplash.jpg': 'peel-application',
  'kimia-kazemi-ixvrfJWCy3A-unsplash.jpg': 'clinic-interior',
  'nataliya-melnychuk-dFBhXJHKNeo-unsplash.jpg': 'consultation-hands',
  'oliver-johnson-yH0dth2yEQE-unsplash.jpg': 'portrait-glow',
  'patient-perfect-2LxO1Wef8wQ-unsplash.jpg': 'microneedling',
  'patient-perfect-SH4pZQtTdOs-unsplash.jpg': 'injection-forehead',
  'sum-sum-0I5csvv8RFA-unsplash.jpg': 'injection-lips',
  'xandro-vandewalle-CxmQXVqzyIE-unsplash.jpg': 'body-aftercare',
}

await fs.mkdir(OUT, { recursive: true })

const manifest = {}
let sourceBytes = 0
let outputBytes = 0

for (const [file, slug] of Object.entries(SLUGS)) {
  const from = path.join(SRC, file)
  sourceBytes += (await fs.stat(from)).size

  const image = sharp(from).rotate()
  const { width, height } = await image.metadata()

  for (const w of WIDTHS) {
    if (w > width) continue
    const to = path.join(OUT, `${slug}-${w}.webp`)
    await image.clone().resize(w).webp({ quality: 74 }).toFile(to)
    outputBytes += (await fs.stat(to)).size
  }

  const fallback = path.join(OUT, `${slug}-${FALLBACK_WIDTH}.jpg`)
  await image.clone().resize(FALLBACK_WIDTH).jpeg({ quality: 76, mozjpeg: true }).toFile(fallback)
  outputBytes += (await fs.stat(fallback)).size

  manifest[slug] = {
    widths: WIDTHS.filter((w) => w <= width),
    aspectRatio: Number((width / height).toFixed(4)),
  }
  console.log(`${slug.padEnd(20)} ${width}x${height}`)
}

await fs.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')

// ---- Hero video --------------------------------------------------------
// The source is 4K, which no hero background needs — decoding it is real work
// on a phone. Two H.264 renditions and a poster frame instead. Audio is
// dropped: the clip is silent decoration and muted autoplay is required.
const VIDEO_SRC = path.join(SRC, '4264881-uhd_3840_2160_30fps.mp4')
const ffmpeg = (await import('ffmpeg-static')).default
const { execFile } = await import('node:child_process')
const { promisify } = await import('node:util')
const run = promisify(execFile)

const encode = async (width, crf, out) => {
  await run(ffmpeg, [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-i', VIDEO_SRC,
    '-an',
    '-vf', `scale=${width}:-2`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    path.join(OUT, out),
  ])
  outputBytes += (await fs.stat(path.join(OUT, out))).size
}

await encode(1920, 28, 'hero-1080.mp4')
await encode(1280, 30, 'hero-720.mp4')

const posterTmp = path.join(OUT, '.poster.jpg')
await run(ffmpeg, [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-ss', '3', '-i', VIDEO_SRC, '-frames:v', '1',
  '-vf', 'scale=1600:-2', '-q:v', '3', posterTmp,
])
await sharp(posterTmp).resize(1600).webp({ quality: 74 }).toFile(path.join(OUT, 'hero-poster.webp'))
await sharp(posterTmp).resize(960).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(OUT, 'hero-poster.jpg'))
await fs.unlink(posterTmp)
sourceBytes += (await fs.stat(VIDEO_SRC)).size
console.log('hero video          1080p + 720p + poster')

const mb = (n) => (n / 1024 / 1024).toFixed(1) + 'MB'
console.log(`\nsources ${mb(sourceBytes)} -> derivatives ${mb(outputBytes)}`)
