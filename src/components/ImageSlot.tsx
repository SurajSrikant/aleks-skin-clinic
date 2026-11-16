import { media } from '../data/media'
import type { MediaKey } from '../data/media'

interface ImageSlotProps {
  /** Photograph to show. Without it a flat field of tone holds the space. */
  image?: MediaKey
  /** Aspect ratio and any layout classes. */
  className?: string
  /** Rendered width hint for srcset selection. */
  sizes?: string
  /** Set for above-the-fold images so they are not lazily loaded. */
  priority?: boolean
  /** Alt text; omit to use the photograph's own description. */
  alt?: string
}

/**
 * A fixed-shape image slot. The aspect ratio comes from the call site, so
 * swapping a placeholder for the clinic's own photograph reflows nothing.
 */
export function ImageSlot({
  image,
  className = '',
  sizes = '(max-width: 640px) 100vw, 33vw',
  priority = false,
  alt,
}: ImageSlotProps) {
  return (
    <div className={`relative overflow-hidden bg-nude ${className}`}>
      {image && (
        <picture>
          <source type="image/webp" srcSet={media(image).srcSet} sizes={sizes} />
          <img
            src={media(image).src}
            alt={alt ?? media(image).alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      )}
    </div>
  )
}
