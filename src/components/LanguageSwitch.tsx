import { useLanguage } from '../i18n/language'
import type { Lang } from '../i18n/language'

const OPTIONS: { lang: Lang; label: string; name: string }[] = [
  { lang: 'nb', label: 'NO', name: 'Norsk' },
  { lang: 'en', label: 'EN', name: 'English' },
]

/** Two short buttons, NO and EN. The current language is marked as pressed. */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t.nav.language} className={`flex text-small ${className}`}>
      {OPTIONS.map((option) => {
        const active = option.lang === lang
        return (
          <button
            key={option.lang}
            type="button"
            lang={option.lang}
            aria-label={option.name}
            aria-pressed={active}
            onClick={() => setLang(option.lang)}
            className={`min-h-11 min-w-11 cursor-pointer px-2 ${
              active ? 'font-medium text-brown underline underline-offset-4' : 'text-brown-soft'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
