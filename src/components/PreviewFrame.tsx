import { ImageSlot } from './ImageSlot'
import type { MediaKey } from '../data/media'

interface PreviewFrameProps {
  /** Every photograph the frame can show, in list order. Repeats are fine. */
  images: MediaKey[]
  /** Index into `images` of the one to show. */
  shown: number
  sizes?: string
  className?: string
}

/**
 * One fixed frame beside a list, showing the photograph of whichever row is
 * pointed at. Each distinct photograph is stacked once and cross-faded, so a
 * list whose rows share pictures loads each only once.
 */
export function PreviewFrame({ images, shown, sizes = '30vw', className = '' }: PreviewFrameProps) {
  const distinct = [...new Set(images)]
  const current = images[shown]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {distinct.map((image) => (
        <div
          key={image}
          className={`absolute inset-0 transition-[opacity,scale] duration-700 ease-(--ease-soft) ${
            image === current ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
          }`}
        >
          <ImageSlot image={image} sizes={sizes} className="h-full w-full" />
        </div>
      ))}
    </div>
  )
}
