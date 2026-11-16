# Dr. M Klinikken

Website for an aesthetic clinic in Oslo. Booking happens in Medibook; this
site lists the treatments and links every Book button there.

Vite · React 19 · TypeScript · Tailwind v4 · React Router 7

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle to dist/
npm run lint
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Home: introduction, treatment categories, contact and location |
| `/treatments` | Every treatment, in categories that expand in place |
| `/treatments#<category>` | Same page, with that category open |
| `/about` | About the clinic and team |
| `/contact` | Contact details, booking and a question form |
| `/treatments/*` | Old category and treatment URLs, redirected to `/treatments` |

Any host serving `dist/` must fall back to `index.html` for these paths.

## Language

**Translation is parked until the content is final.** For now the site shows
English only and the NO / EN switch is hidden. At launch, in
`src/i18n/language.ts`, set `LANGUAGE_SWITCH = true` and `DEFAULT_LANG = 'nb'`,
and change `lang`, the title and the description in `index.html` back to
Norwegian. Visitors' language choice is then remembered in their browser.

- `src/content/nb.ts` and `src/content/en.ts` hold every word on the site.
  Both must satisfy `SiteContent` in `src/content/types.ts`, so a missing
  translation fails the build.
- `src/i18n/` holds the language context (`useLanguage()` returns `t`, the
  current language's content) and price formatting.
- `DEFAULT_LANG` in `src/i18n/language.ts` sets the default.

## Content

- **Treatments**: `src/data/catalogue.ts` holds what does not change with
  language: category, price (whole NOK), whether it is a "from" price,
  duration, and an optional `bookingUrl`. Names and descriptions live in the
  content files, keyed by the same id.
- **Clinic details**: address, phone, hours and the Medibook link are in
  `src/data/clinic.ts`.
- **Wording**: prescription medicines must not be named on the site (no brand
  names such as Botox). Use "medisinsk rynkebehandling" / "wrinkle treatment".

## Booking

`BOOKING_URL` in `src/data/clinic.ts` is the clinic's general Medibook page.
A treatment with its own `bookingUrl` in the catalogue links there instead.
Booking always opens in a new tab.

## Styling

Tokens are in the `@theme` block of `src/index.css`: ivory `#F7F3ED`
(background), nude `#E8D9CB` (sections), brown `#382B27` (text and buttons),
plus `nude-deep` for dividers and `brown-soft` for secondary text. There is no
motion library and no scroll animation, by the client's request.

## Placeholders still to replace

- Treatment list, prices, durations and descriptions
- All copy, in both languages (About team, introductions)
- Address, phone, email, org. no., opening hours, Instagram
- `BOOKING_URL` (currently `https://medibook.no/`)
- Logo (the bar shows a text wordmark) and favicon
- Photography: the home photo is sample stock, the team portraits are empty
- Privacy policy link in the footer
- The contact form does not submit anywhere yet (`handleSubmit` in
  `src/pages/Contact.tsx`)
