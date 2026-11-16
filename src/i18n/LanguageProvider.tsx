import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CONTENT, DEFAULT_LANG, LANGUAGE_SWITCH, LanguageContext } from './language'
import type { Lang } from './language'

const STORAGE_KEY = 'lang'

function storedLang(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'nb' || value === 'en' ? value : null
  } catch {
    return null
  }
}

/**
 * Holds the visitor's language. The choice is remembered in this browser, and
 * the document's `lang`, title and description follow it.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (LANGUAGE_SWITCH && storedLang()) || DEFAULT_LANG)
  const t = CONTENT[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Storage blocked: the choice simply lasts for this visit.
    }
  }, [lang, t])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
