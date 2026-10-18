import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const
const EASE_SOFT = [0.33, 1, 0.68, 1] as const

/** Shared by every scroll entrance: fire once, a little before fully in view. */
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const

interface RevealProps {
  children: ReactNode
  className?: string
  /** Gap between the arrival of each `Item` inside, in seconds. */
  stagger?: number
  /** Render as a different element, for lists. */
  as?: 'div' | 'ol' | 'ul'
}

/**
 * A section's choreography. It does not move itself; it starts its `Item`,
 * `Lines` and `Shutter` children in reading order the first time it scrolls
 * into view.
 */
export function Reveal({ children, className = '', stagger = 0.08, as = 'div' }: RevealProps) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  )
}

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

interface ItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'p' | 'h2' | 'h3'
}

/** One part of a section: rises 24px into place when its `Reveal` starts. */
export function Item({ children, className = '', as = 'div' }: ItemProps) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={rise}>
      {children}
    </Tag>
  )
}

const lineUp: Variants = {
  hidden: { y: '105%' },
  shown: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

interface LinesProps {
  /** Each entry is one authored line; headlines here never exceed two. */
  lines: string[]
  className?: string
  as?: 'h1' | 'h2'
  /** Animate on mount rather than on scroll, for headings in the first screen. */
  immediate?: boolean
  /** Seconds before the first line moves, when `immediate`. */
  delay?: number
}

/**
 * A headline whose lines slide up from behind their own baselines. The
 * padding and negative margin pair keeps descenders out of the mask.
 */
export function Lines({ lines, className = '', as = 'h2', immediate = false, delay = 0 }: LinesProps) {
  const Tag = m[as]
  const trigger = immediate
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: VIEWPORT }

  return (
    <Tag
      className={className}
      {...trigger}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: 0.11, delayChildren: delay } },
      }}
    >
      {lines.map((line) => (
        <span key={line} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <m.span className="block" variants={lineUp}>
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}

interface ShutterProps {
  children: ReactNode
  className?: string
  /** Open on mount (the hero) rather than when scrolled to. */
  immediate?: boolean
  /** The edge the picture opens from. */
  from?: 'bottom' | 'left'
}

const CLOSED = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
}

/**
 * The page's one loud move: a picture opens from an edge while the frame
 * inside settles from a slight zoom. With reduced motion it simply fades.
 */
export function Shutter({ children, className = '', immediate = false, from = 'bottom' }: ShutterProps) {
  const reduced = useReducedMotion()

  const frame: Variants = reduced
    ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.6 } } }
    : {
        hidden: { clipPath: CLOSED[from] },
        shown: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE_IN_OUT } },
      }
  const inner: Variants = reduced
    ? {}
    : {
        hidden: { scale: 1.12 },
        shown: { scale: 1, transition: { duration: 1.5, ease: EASE_SOFT } },
      }

  const trigger = immediate
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: VIEWPORT }

  return (
    <m.div className={`overflow-hidden ${className}`} variants={frame} {...trigger}>
      <m.div className="h-full w-full" variants={inner}>
        {children}
      </m.div>
    </m.div>
  )
}
