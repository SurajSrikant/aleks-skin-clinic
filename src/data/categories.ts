import type { Category } from './types'

/**
 * The full treatment catalogue. Long-form fields (`what`, `suits`, `expect`,
 * `aftercare`, `faq`) are optional — anything omitted falls back to `GENERIC`
 * when the treatment detail page renders.
 */
export const CATEGORIES: Category[] = [
  {
    id: 'face',
    name: 'Face',
    short: 'Face',
    groups: [
      {
        id: 'lines',
        name: 'Lines',
        note: 'Treatments that soften lines caused by muscle movement over time.',
        items: [
          {
            id: 'botox-forehead',
            name: 'Muscle relaxant, forehead',
            summary: 'Softens horizontal forehead lines and lifts the brow slightly.',
            priceFrom: 'NOK 2,900',
            duration: '30 min',
            photo: 'close-up, forehead in side light',
            what: 'A muscle-relaxing medicine is placed in small doses in the forehead muscle. Movement is reduced, and the lines become less marked as the skin gets to rest. We dose carefully so the face keeps its natural expression.',
            suits:
              'Suitable if you see forehead lines at rest as well and want a restrained change. The treatment is not carried out during pregnancy, breastfeeding or with certain neuromuscular conditions.',
            expect: [
              'Consultation covering health, previous treatments and what you want.',
              'The injections themselves take around ten minutes. Most describe it as brief pinpricks, with no need for anaesthetic.',
              'The effect appears gradually over three to fourteen days. A two-week review is included.',
            ],
            aftercare:
              'Avoid exercise, alcohol and firm pressure on the area for the rest of the day. Keep your head upright for the first four hours. Slight redness or small bumps usually settle within an hour.',
            faq: [
              [
                'How long does it last?',
                'Usually three to five months. Duration is individual and can change over time.',
              ],
              [
                'Will my face feel stiff?',
                'We dose for movement. The aim is a forehead that still expresses, with less marked lines.',
              ],
              ['Does it hurt?', 'Most feel brief pinpricks. Anaesthetic is rarely needed.'],
              ['When can I train again?', 'The next day.'],
            ],
          },
          {
            id: 'botox-glabella',
            name: 'Muscle relaxant, between the brows',
            summary: 'Reduces the vertical line that gives a strained expression.',
            priceFrom: 'NOK 2,900',
            duration: '30 min',
            photo: 'close-up, eye area',
          },
          {
            id: 'botox-eyes',
            name: 'Muscle relaxant, smile lines',
            summary: 'Softens the lines around the eyes when you smile.',
            priceFrom: 'NOK 2,900',
            duration: '30 min',
            photo: 'close-up, cheek and eye',
          },
        ],
      },
      {
        id: 'volume',
        name: 'Volume and contour',
        note: 'For when the face has become flatter or more angular over the years.',
        items: [
          {
            id: 'filler-cheek',
            name: 'Filler, cheeks',
            summary: 'Restores support in the mid-face with small amounts of hyaluronic acid.',
            priceFrom: 'NOK 4,500',
            duration: '45 min',
            photo: 'profile in warm light',
          },
          {
            id: 'filler-lips',
            name: 'Filler, lips',
            summary: 'Hydration and definition, starting from your own lip shape.',
            priceFrom: 'NOK 4,200',
            duration: '45 min',
            photo: 'close-up, mouth',
          },
          {
            id: 'filler-jaw',
            name: 'Filler, jawline',
            summary: 'A clearer transition between jaw and neck.',
            priceFrom: 'NOK 5,400',
            duration: '45 min',
            photo: 'profile, jawline',
          },
        ],
      },
      {
        id: 'face-quality',
        name: 'Skin quality',
        note: 'Treatments aimed at texture, pores and uneven tone in the face.',
        items: [
          {
            id: 'microneedling',
            name: 'Microneedling',
            summary: "Stimulates the skin's own collagen building across a course.",
            priceFrom: 'NOK 2,600',
            duration: '60 min',
            photo: 'treatment room, low light',
          },
          {
            id: 'chemical-peel',
            name: 'Chemical peel',
            summary: 'Evens the surface and lightens uneven pigmentation.',
            priceFrom: 'NOK 1,900',
            duration: '45 min',
            photo: 'product table, amber glass',
          },
        ],
      },
    ],
    intro:
      'Our facial treatments are sorted by what you experience, not by product name. In the consultation we look at the face at rest and in movement, and normally suggest starting with a single measure.',
  },
  {
    id: 'skin',
    name: 'Skin',
    short: 'Skin',
    groups: [
      {
        id: 'pigment',
        name: 'Pigment and tone',
        note: 'Uneven tone, sun damage and marks left by breakouts.',
        items: [
          {
            id: 'pigment-laser',
            name: 'Pigment treatment',
            summary: 'Targeted treatment of spots and sun damage across several sessions.',
            priceFrom: 'NOK 2,400',
            duration: '40 min',
            photo: 'device in treatment room',
          },
          {
            id: 'skin-plan',
            name: 'Skincare plan',
            summary: 'Assessment and a home routine that is realistic to follow.',
            priceFrom: 'NOK 1,200',
            duration: '45 min',
            photo: 'notebook and products',
          },
        ],
      },
      {
        id: 'acne',
        name: 'Acne and congestion',
        note: 'Active acne and the marks it leaves are assessed separately.',
        items: [
          {
            id: 'acne-treatment',
            name: 'Acne treatment',
            summary: 'In-clinic treatment combined with medical follow-up.',
            priceFrom: 'NOK 1,800',
            duration: '45 min',
            photo: 'treatment chair, textile',
          },
          {
            id: 'acne-marks',
            name: 'Acne scarring treatment',
            summary: 'Evens texture where the skin has been left marked.',
            priceFrom: 'NOK 2,600',
            duration: '60 min',
            photo: 'close-up, cheek',
          },
        ],
      },
    ],
    intro:
      'Skin treatment is more about the plan than the individual appointment. We begin by mapping your skin, then set out a course or a home routine that can be adjusted along the way.',
  },
  {
    id: 'body',
    name: 'Body',
    short: 'Body',
    groups: [
      {
        id: 'body-quality',
        name: 'Skin quality on the body',
        note: 'Texture and firmness on the neck, décolletage and arms.',
        items: [
          {
            id: 'body-microneedling',
            name: 'Microneedling, body',
            summary: 'For neck, décolletage or arms, usually as a course.',
            priceFrom: 'NOK 3,200',
            duration: '60 min',
            photo: 'treatment bed, linen',
          },
          {
            id: 'stretch-marks',
            name: 'Stretch mark treatment',
            summary: 'Softens colour and texture. The marks do not disappear entirely.',
            priceFrom: 'NOK 2,800',
            duration: '45 min',
            photo: 'close-up, skin in light',
          },
        ],
      },
      {
        id: 'sweat',
        name: 'Sweating',
        note: 'Medical treatment of heavy sweating.',
        items: [
          {
            id: 'hyperhidrosis',
            name: 'Hyperhidrosis treatment',
            summary: 'Reduces sweat production in the underarms for a period.',
            priceFrom: 'NOK 5,900',
            duration: '45 min',
            photo: 'instrument tray',
          },
        ],
      },
    ],
    intro:
      'Our body treatments are few and selected. We only offer them where we believe the effect is documented and predictable.',
  },
  {
    id: 'hair',
    name: 'Hair and scalp',
    short: 'Hair',
    groups: [
      {
        id: 'hair-loss',
        name: 'Hair loss',
        note: 'Assessment first, treatment after review.',
        items: [
          {
            id: 'hair-assessment',
            name: 'Hair loss assessment',
            summary: 'Examination, blood tests where needed, and a plan.',
            priceFrom: 'NOK 1,400',
            duration: '45 min',
            photo: 'consultation room',
          },
          {
            id: 'hair-injection',
            name: 'Scalp injection therapy',
            summary: 'A series of scalp injections across several months.',
            priceFrom: 'NOK 3,600',
            duration: '45 min',
            photo: 'instrument tray, scalp',
          },
        ],
      },
    ],
    intro:
      'Hair loss has many causes. We begin with an assessment, and treat only where there is reasonable ground to expect a change.',
  },
  {
    id: 'injectables',
    name: 'Injectables',
    short: 'Injectables',
    groups: [
      {
        id: 'muscle',
        name: 'Muscle relaxant',
        note: 'Dosing is adapted to muscle strength and expression.',
        items: [
          {
            id: 'botox-one',
            name: 'One area',
            summary: 'Forehead, between the brows or smile lines.',
            priceFrom: 'NOK 2,900',
            duration: '30 min',
            photo: 'close-up, eye area',
          },
          {
            id: 'botox-three',
            name: 'Three areas',
            summary: 'The upper face treated together in one appointment.',
            priceFrom: 'NOK 5,400',
            duration: '45 min',
            photo: 'portrait in side light',
          },
        ],
      },
      {
        id: 'fillers',
        name: 'Fillers',
        note: 'Hyaluronic acid in small amounts, often spread over several visits.',
        items: [
          {
            id: 'filler-1ml',
            name: 'Filler, 1 ml',
            summary: 'One area, following the plan from your consultation.',
            priceFrom: 'NOK 4,500',
            duration: '45 min',
            photo: 'product table, amber glass',
          },
          {
            id: 'skinbooster',
            name: 'Skinbooster',
            summary: 'Hydration in the skin rather than volume. Usually three sessions.',
            priceFrom: 'NOK 3,400',
            duration: '45 min',
            photo: 'treatment room, warm light',
          },
        ],
      },
    ],
    intro:
      'Here are the injectable treatments gathered in one place, if you already know what you are looking for. If you are unsure, we suggest starting under Face or Skin.',
  },
  {
    id: 'hormones',
    name: 'Hormones and metabolism',
    short: 'Hormones',
    groups: [
      {
        id: 'assessment',
        name: 'Assessment',
        note: 'Blood work and a consultation, with a written summary.',
        items: [
          {
            id: 'hormone-panel',
            name: 'Hormone and metabolic panel',
            summary: 'Blood work with a medical review of the results.',
            priceFrom: 'NOK 2,200',
            duration: '45 min',
            photo: 'consultation desk, notes',
          },
          {
            id: 'menopause-skin',
            name: 'Menopausal skin consultation',
            summary: 'How changing hormones show in the skin, and what helps.',
            priceFrom: 'NOK 1,600',
            duration: '45 min',
            photo: 'consultation room, soft light',
          },
        ],
      },
    ],
    intro:
      'Skin, weight and energy often follow what is happening underneath. We test before we advise, and refer on where that is the right thing to do.',
  },
  {
    id: 'vitality',
    name: 'Sleep and vitality',
    short: 'Vitality',
    groups: [
      {
        id: 'programme',
        name: 'Programmes',
        note: 'Longer follow-up rather than single appointments.',
        items: [
          {
            id: 'longevity-consult',
            name: 'Longevity consultation',
            summary: 'A wider review of habits, skin and health, with a plan.',
            priceFrom: 'NOK 2,400',
            duration: '60 min',
            photo: 'consultation room, olive tree',
          },
          {
            id: 'iv-vitamin',
            name: 'Nutrient assessment',
            summary: 'Testing and advice on supplementation where indicated.',
            priceFrom: 'NOK 1,900',
            duration: '45 min',
            photo: 'instrument tray, glassware',
          },
        ],
      },
    ],
    intro:
      'The slow inputs matter: sleep, sun, nutrition and recovery. They are less visible than a treatment, and usually what decides the result.',
  },
  {
    id: 'dental',
    name: 'Dental & smile',
    short: 'Dental',
    groups: [
      {
        id: 'smile',
        name: 'Smile',
        note: 'Assessment first, treatment with our dental partner.',
        items: [
          {
            id: 'smile-assessment',
            name: 'Smile assessment',
            summary: 'Proportions, gum line and lip position reviewed together.',
            priceFrom: 'NOK 1,400',
            duration: '45 min',
            photo: 'consultation room, mirror',
          },
          {
            id: 'whitening',
            name: 'Whitening',
            summary: 'Gentle, supervised whitening over a short course.',
            priceFrom: 'NOK 3,900',
            duration: '60 min',
            photo: 'treatment room, warm light',
          },
        ],
      },
    ],
    intro:
      'The smile is part of the face, and we assess it alongside it. Dental work is carried out with our partner practice; the aesthetic planning happens here.',
  },
  {
    id: 'laser',
    name: 'Laser & skin quality',
    short: 'Laser',
    groups: [
      {
        id: 'texture',
        name: 'Texture and pores',
        note: "Treatments that rebuild the skin's surface over a course.",
        items: [
          {
            id: 'laser-resurfacing',
            name: 'Laser resurfacing',
            summary: 'Fractional laser for texture and fine lines, in two to three sessions.',
            priceFrom: 'NOK 4,200',
            duration: '60 min',
            photo: 'device in treatment room',
          },
          {
            id: 'laser-microneedling',
            name: 'Microneedling with radiofrequency',
            summary: 'Firmness and texture, usually three sessions a month apart.',
            priceFrom: 'NOK 3,400',
            duration: '60 min',
            photo: 'treatment room, low light',
          },
        ],
      },
      {
        id: 'laser-pigment',
        name: 'Pigment and sun damage',
        note: 'Spots, uneven tone and visible vessels.',
        items: [
          {
            id: 'laser-pigment-spots',
            name: 'Pigment laser',
            summary: 'Targeted treatment of spots and sun damage across several sessions.',
            priceFrom: 'NOK 2,400',
            duration: '40 min',
            photo: 'device in treatment room',
          },
          {
            id: 'laser-vessels',
            name: 'Vascular laser',
            summary: 'For redness and small visible vessels on the face.',
            priceFrom: 'NOK 2,600',
            duration: '40 min',
            photo: 'close-up, cheek in light',
          },
        ],
      },
    ],
    intro:
      'Device-led treatments work gradually. We map the skin first, then plan a course with intervals that let it recover between sessions.',
  },
]
