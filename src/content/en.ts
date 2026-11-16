import type { SiteContent } from './types'

/**
 * English. PLACEHOLDER copy throughout until the clinic supplies its own text.
 * Prescription medicines must not be named (no brand names such as Botox).
 */
export const en: SiteContent = {
  meta: {
    title: 'Dr. M Klinikken — Aesthetic treatments in Oslo',
    description:
      'Fillers, medical wrinkle treatments and skin treatments in Oslo. See prices and book online.',
  },

  nav: {
    home: 'Home',
    treatments: 'Treatments',
    about: 'About us',
    contact: 'Contact',
    book: 'Book appointment',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    skip: 'Skip to content',
  },

  common: {
    book: 'Book',
    bookTreatment: (name) => `Book ${name}`,
    from: 'From',
    minutes: (minutes) => `${minutes} min`,
    treatmentCount: (count) => `${count} ${count === 1 ? 'treatment' : 'treatments'}`,
    opensInNewTab: 'opens in a new tab',
  },

  home: {
    title: 'Natural results, with care',
    intro:
      'An aesthetic clinic in Oslo offering fillers, medical wrinkle treatments and skin treatments. Every treatment starts with an honest assessment of what suits you.',
    seeTreatments: 'See treatments and prices',
    treatmentsHeading: 'Treatments',
    treatmentsIntro: 'Choose a category to see treatments, prices and booking.',
  },

  treatmentsPage: {
    title: 'Treatments',
    intro: 'Tap a category to see its treatments. Prices include the treatment and a follow-up check.',
  },

  about: {
    title: 'About us',
    lead: 'Dr. M Klinikken is a small aesthetic clinic in Oslo, focused on natural results and honest advice.',
    body: [
      'We started the clinic to offer the kind of treatment we would want ourselves: unhurried, carefully assessed and never more than you need. Every treatment is carried out by authorised health personnel, and we always tell you honestly if we think a treatment is not right for you.',
    ],
    facts: [
      { value: '10+ yrs', label: 'Experience' },
      { value: '2', label: 'Practitioners' },
      { value: '1,000+', label: 'Happy clients' },
    ],
    seeTreatments: 'See treatments and prices',
    approachHeading: 'How we work',
    approach: [
      {
        title: 'Assessment first',
        body: 'First-time clients start with a consultation, so we can agree on a plan together.',
      },
      {
        title: 'Natural results',
        body: 'We would rather do a little less and build up than do too much at once.',
      },
      {
        title: 'Follow-up',
        body: 'We check in after your treatment and are available if you have questions.',
      },
    ],
  },

  contact: {
    title: 'Contact',
    address: 'Address',
    hours: 'Opening hours',
    phoneEmail: 'Phone and email',
    gettingHere: 'Getting here',
    travel: 'Tram 13 to Skovveien, a three-minute walk. Street parking nearby.',
    openMap: 'Open in maps',
    map: {
      title: 'Map showing the clinic',
      show: 'Show map',
      note: 'The map is loaded from Google Maps when you tap the button.',
    },
    bookingHeading: 'Booking',
    bookingBody:
      'Appointments are booked online. The form below is for general questions and is not suitable for medical information.',
    form: {
      heading: 'Send us a question',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sent: 'Thank you. We have your message and will reply within two working days.',
    },
  },

  hours: ['Monday–Thursday 10–18', 'Friday 10–16', 'Saturday–Sunday closed'],

  openStatus: {
    openUntil: (time) => `Open now, until ${time}`,
    opensToday: (time) => `Closed now, opens today at ${time}`,
    opensTomorrow: (time) => `Closed now, opens tomorrow at ${time}`,
    opensOn: (day, time) => `Closed now, opens ${day} at ${time}`,
    closed: 'Closed now',
    dayNames: ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  footer: { visit: 'Visit', contact: 'Contact', orgNo: 'Org. no.', privacy: 'Privacy' },

  notFound: {
    title: 'Page not found',
    body: 'The page may have moved. Our treatments and booking are a tap away.',
    home: 'Go to the home page',
  },

  categories: {
    consultation: {
      name: 'Consultation',
      intro: 'Required before your first medical wrinkle treatment.',
    },
    'lip-fillers': { name: 'Lip fillers', intro: 'Volume, shape and hydration for the lips.' },
    'facial-fillers': {
      name: 'Facial fillers',
      intro: 'Contour and balance for cheeks, chin, jawline and under the eyes.',
    },
    'wrinkle-treatments': {
      name: 'Wrinkle treatments',
      intro: 'Medical treatment to soften lines and expression wrinkles.',
    },
    'skin-treatments': {
      name: 'Skin treatments',
      intro: 'Microneedling, peels and skin boosters for texture and glow.',
    },
  },

  treatments: {
    consultation: {
      name: 'Consultation',
      description:
        'A conversation about what you want to achieve and an assessment of what suits you. Required before your first medical wrinkle treatment.',
    },
    'skin-analysis': {
      name: 'Skin analysis',
      description: 'A detailed look at your skin, with advice on treatments and skincare.',
    },
    'lips-05': {
      name: 'Lip filler 0.5 ml',
      description: 'Subtle volume and definition with a natural result.',
    },
    'lips-10': {
      name: 'Lip filler 1 ml',
      description: 'Noticeable volume and shape while keeping the result natural.',
    },
    'lips-hydration': {
      name: 'Lip hydration',
      description: 'Moisture and glow for dry lips, without adding volume.',
    },
    'lips-touch-up': {
      name: 'Lip filler touch-up',
      description: 'A small top-up to refresh or adjust an earlier treatment.',
    },
    'filler-cheeks': {
      name: 'Cheek filler',
      description: 'Lifts and adds volume to the cheeks for a more defined contour.',
    },
    'filler-chin': {
      name: 'Chin filler',
      description: 'Adds definition to the chin and balances the profile.',
    },
    'filler-jawline': {
      name: 'Jawline filler',
      description: 'Defines and sharpens the jawline.',
    },
    'filler-tear-trough': {
      name: 'Under-eye filler',
      description: 'Softens hollows and shadows under the eyes for a fresher look.',
    },
    'filler-nasolabial': {
      name: 'Nose-to-mouth lines',
      description: 'Smooths the lines running from the nose to the corners of the mouth.',
    },
    'filler-dissolve': {
      name: 'Filler dissolving',
      description: 'Safely dissolves unwanted or uneven filler from an earlier treatment.',
    },
    'wrinkles-1': {
      name: 'Wrinkle treatment, 1 area',
      description: 'Forehead, frown lines or crow’s feet. Choose one area.',
    },
    'wrinkles-2': {
      name: 'Wrinkle treatment, 2 areas',
      description: 'Any two of forehead, frown lines and crow’s feet.',
    },
    'wrinkles-3': {
      name: 'Wrinkle treatment, 3 areas',
      description: 'Forehead, frown lines and crow’s feet together.',
    },
    masseter: {
      name: 'Jaw tension (masseter)',
      description: 'Relieves teeth grinding and jaw tension, and can slim the jawline.',
    },
    sweating: {
      name: 'Excessive sweating',
      description: 'Reduces sweating in the underarms, hands or feet.',
    },
    microneedling: {
      name: 'Microneedling',
      description: 'Stimulates collagen to improve texture, fine lines, pores and scarring.',
    },
    'microneedling-peel': {
      name: 'Microneedling with peel',
      description: 'Microneedling combined with a chemical peel for deeper renewal.',
    },
    'chemical-peel': {
      name: 'Chemical peel',
      description: 'Evens out skin tone and texture. The type of peel is chosen for your skin.',
    },
    'skin-booster': {
      name: 'Skin booster',
      description: 'Deep hydration for firmer, more radiant skin.',
    },
  },
}
