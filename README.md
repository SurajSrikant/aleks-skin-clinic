# Dr. M Klinikken

Website for a skin and aesthetic medicine clinic in Oslo, built from the
`Dr M Klinikken.dc.html` Claude Design source.

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
| `/` | Home |
| `/treatments` | Treatments index — every field of practice |
| `/treatments/:categoryId` | Category, treatments grouped by concern |
| `/treatments/:categoryId/:treatmentId` | Treatment detail |
| `/contact` | Contact and visiting |
| anything else | Not found |

The design was a single-page state machine (`page`/`catId`/`trId` in component
state). It is routed here instead, so treatments are linkable and the back
button works. `treatmentPath()` in `src/data/clinic.ts` derives the canonical
nested URL from a treatment id — always build links with it rather than
assembling paths by hand.

The design had no treatments index: its "Treatments" action jumped straight to
the Face category and the "All treatments" breadcrumb went to the home page.
`/treatments` is a real page here, and every "Treatments" entry point
(`TREATMENTS_PATH`) lands on it.

## Layout

```
src/
  data/        catalogue, clinic details, lookup helpers
  hooks/       scroll, parallax, in-view, reduced-motion
  components/  chrome and shared pieces; home/ holds the home page sections
  pages/       one file per screen
  index.css    theme tokens and custom utilities
```

### Content

`src/data/categories.ts` is the treatment catalogue. Long-form fields
(`what`, `suits`, `expect`, `aftercare`, `faq`) are optional — anything omitted
falls back to `GENERIC` in `clinic.ts`, so a new treatment needs only an id,
name, summary, price, duration and photo note. Treatment ids must stay unique
across the catalogue; they are indexed flat and appear in URLs.

Clinic details (address, hours, phone, booking URL) live in `CLINIC` and
`BOOKING_URL` in `src/data/clinic.ts`.

### Styling

Design tokens are declared in the `@theme` block of `src/index.css`, so the
palette (`bg-clay`, `text-mocha`), fluid type (`text-hero`) and rhythm
(`px-gutter`, `py-section`) are ordinary Tailwind utilities.

Custom utilities in the same file cover the patterns the design repeats:

- `btn` with `btn-primary` / `btn-ghost` — the two CTA treatments
- `grid-fit-<n>` — `repeat(auto-fit, minmax(min(100%, <n>px), 1fr))`, the
  responsive grid used throughout; pair with `col-span-2` for the 1:2
  sidebar-and-content split
- `stripes` — the placeholder ticking, driven by `--stripe-a/-b/-w/-angle`
- `hero-glow`, `veil-*`, `bloom-*` — the layered decorative gradients
- `eyebrow`, `label-xs`, `caption` — recurring type treatments

### The signature rail

`SignatureRail` drifts continuously at 22px/s rather than stepping between
slides, so it reads as ambient movement instead of a slideshow. The treatment
list is rendered twice and the scroll is rewound by exactly one repeat unit once
it passes that point — invisible, because the content there is identical, and it
avoids any rewind at the end. The clones are `aria-hidden` and untabbable.

The repeat unit is measured (`clone.offsetLeft - first.offsetLeft`) rather than
taken as half the scroll width, which would be ~60px out because the rail's
horizontal padding is not part of the repeat. The drift position is accumulated
in a variable rather than read back from `scrollLeft` each frame: Chrome rounds
that getter, so a sub-pixel per-frame increment would be discarded on every read
and the rail would never move.

It holds still on pointer-over, keyboard focus inside it, `prefers-reduced-motion`,
a backgrounded tab, while scrolled out of view, and for three seconds after any
manual scroll. Under reduced motion the clones are not rendered at all and
scroll-snap is restored — snapping and continuous drift fight each other, so
snap points are only declared when the rail is standing still.

The scrollbar is hidden with the `scrollbar-none` utility; the rail is still a
real scroll container, so wheel, touch, drag and keyboard all work unchanged.
Two details keep that true:

- The drift adopts any scroll position it did not set itself, rather than
  dragging it back — otherwise focus scrolling, assistive tech or a drag would
  be fought by the next animation frame.
- Focusing a card calls `scrollIntoView({ inline: 'nearest' })`. Chrome only
  auto-scrolls a focused element that is *entirely* out of view, so without this
  a card poking past the edge stays clipped when tabbed to.

To return it to a static rail, delete the effect and the clone pass; the markup
underneath is unchanged.

### Imagery

`ImageSlot` renders a photograph when given an `image` key and falls back to the
striped placeholder (with the design's art-direction `caption`) when not. Aspect
ratio, radius and layout come from the call site either way, so swapping one for
the other reflows nothing. Inside an element marked `group`, it eases up on hover.

**The current photography is sample material.** `src/data/media.ts` maps each
treatment and category to an image, and holds the alt text. Twelve photographs
cover thirty treatments, so related procedures deliberately share a frame — the
map is the single place to change that once real photography exists.

Originals live in `media-src/` and are **not** served. `npm run media`
(`scripts/build-media.mjs`) derives everything in `public/media/`: WebP at 480 /
960 / 1600 plus one 960px JPEG fallback, and the hero video as 1080p and 720p
H.264 with a poster frame. That takes the 34MB of 4K sources down to ~3.7MB. The
output is committed, so an ordinary build never needs sharp or ffmpeg. Re-run it
after changing anything in `media-src/`.

Heroes composite three layers over the media: `media-tone` (a warm, dimming
filter — the sample footage is cold and clinical against a warm palette),
`scrim-left` (deepens the edge the copy sits against) and the per-page `veil-*`
gradient. The veils are noticeably stronger than the design's, which were tuned
for a dark striped placeholder rather than real photography.

The home hero plays a muted, looping, `playsInline` video; under
`prefers-reduced-motion` it renders the poster still instead.

## Notes on deviations from the design source

These were bugs or gaps in the design file, fixed deliberately:

- **Nav over pale screens.** The bar was transparent with cream text until the
  first scroll, so it was invisible on `/contact`. It now starts solid on any
  screen without a dark hero (`hasDarkHero` in `Nav.tsx`).
- **Anchor jumps.** Concern anchors on the category page sit on a marker
  outside the reveal wrapper; inside it, the reveal's 24px transform shifted the
  landing point and dropped the heading behind the fixed nav.
- **Route scroll.** `ScrollToTop` scrolls with `behavior: 'instant'`. `'auto'`
  defers to `html { scroll-behavior: smooth }` and left new pages mid-scroll.
- **No treatments index.** The design's "Treatments" action jumped straight to
  the Face category, and the "All treatments" breadcrumb went to the home page.
  `/treatments` is a real page now, and every entry point lands on it.
- **Signature rail gutter.** Mandatory scroll-snap consumed the rail's left
  padding on load; `scroll-px-gutter` restores it.
- **Mobile nav.** The design had no small-screen treatment and its bar
  overflowed. The booking CTA is hidden below `sm` — every screen body carries
  one — so the two navigation links survive.
- **Hover states.** The design drove hovers by mutating inline styles from JS;
  they are CSS `hover:` variants here. Its global `a:hover` rule never applied,
  since inline colours outranked it, so links that were meant to respond now do.

## Known gaps

- **The contact form does not submit.** It validates and acknowledges locally;
  `handleSubmit` in `src/pages/Contact.tsx` needs a real endpoint. The design's
  handler only called `preventDefault`.
- **Booking** points at `https://timma.no/` — the placeholder from the design.
- **Copy is English throughout**, matching the source, though the clinic is
  Norwegian.
- **Deep links need a server rewrite.** Any host serving `dist/` must fall back
  to `index.html` so `/treatments/face` resolves on a cold load.
