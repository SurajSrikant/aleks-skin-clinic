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
  /**
   * Which part of the photograph to keep when the slot crops it, as a CSS
   * `object-position`. Wide, short slots crop hard, so the subject often needs
   * pointing at explicitly.
   */
  objectPosition?: string
}

/**
 * A fixed-shape image slot. The aspect ratio and layout come from the call
 * site, so swapping a placeholder for a photograph reflows nothing.
 *
 * Inside an element marked `group`, the image eases up on hover.
 */
export function ImageSlot({
  image,
  className = '',
  sizes = '(max-width: 640px) 100vw, 33vw',
  priority = false,
  objectPosition,
}: ImageSlotProps) {
  return (
    <div className={`relative overflow-hidden bg-shell-deep ${className}`}>
      {image && (
        <picture>
          <source type="image/webp" srcSet={media(image).srcSet} sizes={sizes} />
          <img
            src={media(image).src}
            alt={media(image).alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={objectPosition ? { objectPosition } : undefined}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.03]"
          />
        </picture>
      )}
    </div>
  )
}
