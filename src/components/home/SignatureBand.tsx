import { m } from 'motion/react'
import { Link } from 'react-router-dom'
import { ImageSlot } from '../ImageSlot'
import { SIGNATURE_IDS, findTreatment, treatmentPath } from '../../data/clinic'
import { treatmentMedia } from '../../data/media'

const SIGNATURE = SIGNATURE_IDS.map((id) => {
  const found = findTreatment(id)
  if (!found) throw new Error(`Unknown signature treatment: ${id}`)
  return { ...found.treatment, href: treatmentPath(id) }
})

/**
 * Deliberately unequal widths, so the band reads as one folded view rather
 * than a row of matching cards. On a phone the same four become a 2×2 block
 * whose rows split 56/44 and 44/56.
 */
const GROW = ['lg:grow-[5]', 'lg:grow-[2]', 'lg:grow-[3]', 'lg:grow-[2]'] as const
const PHONE_SPAN = ['col-span-14', 'col-span-11', 'col-span-11', 'col-span-14'] as const

/**
 * The treatments patients ask for by name, as one band of photographs, each
 * named beneath. Pointing at a panel widens it while the others give way; the panels
 * open from the bottom one after another as the band arrives.
 */
export function SignatureBand() {
  return (
    <m.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09 } } }}
      className="grid h-[96svh] grid-cols-25 grid-rows-2 gap-2 lg:flex lg:h-[74svh] lg:min-h-[540px]"
    >
      {SIGNATURE.map((treatment, index) => (
        <m.div
          key={treatment.id}
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
            shown: {
              clipPath: 'inset(0% 0% 0% 0%)',
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
            },
          }}
          className={`${PHONE_SPAN[index]} ${GROW[index]} min-w-0 basis-0 transition-[flex-grow] duration-500 ease-(--ease-in-out) lg:hover:grow-[6]`}
        >
          <Link to={treatment.href} className="group flex h-full flex-col text-ink">
            <div className="media-quiet relative min-h-0 flex-1">
              <div className="absolute inset-0">
                <ImageSlot
                  image={treatmentMedia(treatment.id)}
                  sizes="(max-width: 1024px) 64vw, 42vw"
                  className="h-full w-full"
                />
              </div>
            </div>
            <span className="flex min-h-[88px] flex-col gap-1 pt-3 pb-1 lg:min-h-[128px]">
              <span className="font-display text-body leading-[1.15] lg:text-statement">
                {treatment.name}
              </span>
              <span className="text-small whitespace-nowrap text-bark-deep">
                From {treatment.priceFrom}
              </span>
            </span>
          </Link>
        </m.div>
      ))}
    </m.div>
  )
}
