import { createContext, useContext } from 'react'
import { en } from '../content/en'
import { nb } from '../content/nb'
import type { Lang, SiteContent } from '../content/types'

export type { Lang, SiteContent }

export const CONTENT: Record<Lang, SiteContent> = { nb, en }

/**
 * Translation is parked until the content is final. While it is, the NO / EN
 * switch is hidden and the site shows English only.
 *
 * TODO at launch: set LANGUAGE_SWITCH to true and DEFAULT_LANG to 'nb'.
 */
export const LANGUAGE_SWITCH = false

/** The language a first-time visitor sees; a visitor's own choice is remembered. */
export const DEFAULT_LANG: Lang = 'en'

/** Locale used for number and currency formatting. */
export const LOCALE: Record<Lang, string> = { nb: 'nb-NO', en: 'en-GB' }

export interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: SiteContent
}

export const LanguageContext = createContext<LanguageValue | null>(null)

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}

/** A price in NOK, written the way each language writes it: "2 900 kr" / "NOK 2,900". */
export function formatPrice(lang: Lang, price: number): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(price)
}
