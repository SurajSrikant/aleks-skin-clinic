import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import type { Faq } from '../data/types'

interface FaqListProps {
  items: Faq[]
}

/** Single-open accordion; clicking the open question closes it. */
export function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="flex max-w-[64ch] flex-col gap-1">
      {items.map(([question, answer], index) => {
        const open = index === openIndex
        return (
          <div
            key={question}
            className={`px-5 transition-colors duration-300 ${open ? 'bg-shell' : 'bg-transparent hover:bg-shell/60'}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
              className="flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left text-body text-ink"
            >
              {question}
              <span
                aria-hidden
                className={`text-statement leading-none text-bark transition-transform duration-300 ease-(--ease-out) ${open ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  id={`faq-panel-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[56ch] pb-6 text-body text-ink">{answer}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
