import { Link } from 'react-router-dom'
import { ImageSlot } from './ImageSlot'
import { Item, Reveal } from './Reveal'
import type { MediaKey } from '../data/media'

export interface PictureLink {
  id: string
  href: string
  image: MediaKey
  title: string
  text: string
}

/**
 * Up to three onward links as photographs at unequal sizes: the first wide,
 * the others tall and narrow, so the row never reads as matching cards.
 */
export function PictureRow({ items }: { items: PictureLink[] }) {
  return (
    <Reveal className="grid gap-x-6 gap-y-10 md:grid-cols-12" stagger={0.09}>
      {items.map((item, index) => (
        <Item key={item.id} className={index === 0 ? 'md:col-span-6' : 'md:col-span-3'}>
          <Link to={item.href} className="group block text-ink">
            <ImageSlot
              image={item.image}
              sizes="(max-width: 768px) 92vw, 45vw"
              className={index === 0 ? 'aspect-[4/3]' : 'aspect-[4/3] md:aspect-[3/4]'}
            />
            <h3 className="mt-4 mb-1 font-display text-statement">{item.title}</h3>
            <p className="text-body text-bark-deep">{item.text}</p>
          </Link>
        </Item>
      ))}
    </Reveal>
  )
}
