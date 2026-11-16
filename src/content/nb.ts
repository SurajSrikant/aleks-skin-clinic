import type { SiteContent } from './types'

/**
 * Norsk bokmål — the site's default language. PLACEHOLDER copy throughout
 * until the clinic supplies its own text. Reseptbelagte legemidler skal ikke
 * nevnes ved navn (ingen merkenavn som Botox).
 */
export const nb: SiteContent = {
  meta: {
    title: 'Dr. M Klinikken — Estetiske behandlinger i Oslo',
    description:
      'Filler, medisinsk rynkebehandling og hudbehandlinger i Oslo. Se priser og bestill time på nett.',
  },

  nav: {
    home: 'Hjem',
    treatments: 'Behandlinger',
    about: 'Om oss',
    contact: 'Kontakt',
    book: 'Bestill time',
    menu: 'Meny',
    close: 'Lukk',
    language: 'Språk',
    skip: 'Gå til innholdet',
  },

  common: {
    book: 'Bestill',
    bookTreatment: (name) => `Bestill ${name}`,
    from: 'Fra',
    minutes: (minutes) => `${minutes} min`,
    treatmentCount: (count) => `${count} ${count === 1 ? 'behandling' : 'behandlinger'}`,
    opensInNewTab: 'åpnes i ny fane',
  },

  home: {
    title: 'Naturlige resultater, med omtanke',
    intro:
      'En estetisk klinikk i Oslo som tilbyr filler, medisinsk rynkebehandling og hudbehandlinger. Hver behandling starter med en ærlig vurdering av hva som passer for deg.',
    seeTreatments: 'Se behandlinger og priser',
    treatmentsHeading: 'Behandlinger',
    treatmentsIntro: 'Velg en kategori for å se behandlinger, priser og bestilling.',
  },

  treatmentsPage: {
    title: 'Behandlinger',
    intro: 'Trykk på en kategori for å se behandlingene. Prisene inkluderer behandling og kontroll.',
  },

  about: {
    title: 'Om oss',
    lead: 'Dr. M Klinikken er en liten estetisk klinikk i Oslo, med fokus på naturlige resultater og ærlige råd.',
    body: [
      'Vi startet klinikken for å tilby den behandlingen vi selv ville ønsket: uten hastverk, grundig vurdert og aldri mer enn du trenger. Alle behandlinger utføres av autorisert helsepersonell, og vi sier alltid ærlig ifra dersom vi mener en behandling ikke passer for deg.',
    ],
    facts: [
      { value: '10+ år', label: 'Erfaring' },
      { value: '2', label: 'Behandlere' },
      { value: '1 000+', label: 'Fornøyde kunder' },
    ],
    seeTreatments: 'Se behandlinger og priser',
    approachHeading: 'Slik jobber vi',
    approach: [
      {
        title: 'Vurdering først',
        body: 'Nye kunder starter med en konsultasjon, slik at vi kan bli enige om en plan sammen.',
      },
      {
        title: 'Naturlige resultater',
        body: 'Vi gjør heller litt mindre og bygger opp, enn for mye på én gang.',
      },
      {
        title: 'Oppfølging',
        body: 'Vi følger deg opp etter behandlingen og er tilgjengelige hvis du har spørsmål.',
      },
    ],
  },

  contact: {
    title: 'Kontakt',
    address: 'Adresse',
    hours: 'Åpningstider',
    phoneEmail: 'Telefon og e-post',
    gettingHere: 'Slik finner du oss',
    travel: 'Trikk 13 til Skovveien, tre minutters gange. Gateparkering i nærheten.',
    openMap: 'Åpne i kart',
    map: {
      title: 'Kart som viser klinikken',
      show: 'Vis kart',
      note: 'Kartet hentes fra Google Maps når du trykker på knappen.',
    },
    bookingHeading: 'Timebestilling',
    bookingBody:
      'Timer bestilles på nett. Skjemaet under er for generelle spørsmål og passer ikke for medisinske opplysninger.',
    form: {
      heading: 'Send oss et spørsmål',
      name: 'Navn',
      email: 'E-post',
      message: 'Melding',
      send: 'Send melding',
      sent: 'Takk! Vi har mottatt meldingen din og svarer innen to virkedager.',
    },
  },

  hours: ['Mandag–torsdag 10–18', 'Fredag 10–16', 'Lørdag–søndag stengt'],

  openStatus: {
    openUntil: (time) => `Åpent nå, til kl. ${time}`,
    opensToday: (time) => `Stengt nå, åpner i dag kl. ${time}`,
    opensTomorrow: (time) => `Stengt nå, åpner i morgen kl. ${time}`,
    opensOn: (day, time) => `Stengt nå, åpner ${day} kl. ${time}`,
    closed: 'Stengt nå',
    dayNames: ['', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'],
  },

  footer: { visit: 'Besøk', contact: 'Kontakt', orgNo: 'Org.nr.', privacy: 'Personvern' },

  notFound: {
    title: 'Fant ikke siden',
    body: 'Siden kan ha blitt flyttet. Behandlinger og timebestilling er bare et trykk unna.',
    home: 'Gå til forsiden',
  },

  categories: {
    consultation: {
      name: 'Konsultasjon',
      intro: 'Påkrevd før første medisinske rynkebehandling.',
    },
    'lip-fillers': { name: 'Leppefiller', intro: 'Volum, form og fukt for leppene.' },
    'facial-fillers': {
      name: 'Ansiktsfiller',
      intro: 'Kontur og balanse for kinn, hake, kjevelinje og under øynene.',
    },
    'wrinkle-treatments': {
      name: 'Rynkebehandling',
      intro: 'Medisinsk behandling som myker opp linjer og mimikkrynker.',
    },
    'skin-treatments': {
      name: 'Hudbehandlinger',
      intro: 'Microneedling, peeling og skinbooster for tekstur og glød.',
    },
  },

  treatments: {
    consultation: {
      name: 'Konsultasjon',
      description:
        'En samtale om hva du ønsker å oppnå og en vurdering av hva som passer for deg. Påkrevd før første medisinske rynkebehandling.',
    },
    'skin-analysis': {
      name: 'Hudanalyse',
      description: 'En grundig gjennomgang av huden din, med råd om behandling og hudpleie.',
    },
    'lips-05': {
      name: 'Leppefiller 0,5 ml',
      description: 'Diskret volum og definisjon med et naturlig resultat.',
    },
    'lips-10': {
      name: 'Leppefiller 1 ml',
      description: 'Merkbart volum og form, samtidig som resultatet forblir naturlig.',
    },
    'lips-hydration': {
      name: 'Fuktbehandling lepper',
      description: 'Fukt og glød for tørre lepper, uten å tilføre volum.',
    },
    'lips-touch-up': {
      name: 'Leppefiller touch-up',
      description: 'En liten påfylling for å friske opp eller justere en tidligere behandling.',
    },
    'filler-cheeks': {
      name: 'Filler kinn',
      description: 'Løfter og gir volum til kinnene for en mer definert kontur.',
    },
    'filler-chin': {
      name: 'Filler hake',
      description: 'Gir haken mer definisjon og balanserer profilen.',
    },
    'filler-jawline': {
      name: 'Filler kjevelinje',
      description: 'Definerer og fremhever kjevelinjen.',
    },
    'filler-tear-trough': {
      name: 'Filler under øynene',
      description: 'Myker opp hulhet og skygger under øynene for et friskere uttrykk.',
    },
    'filler-nasolabial': {
      name: 'Filler nesesmilefurer',
      description: 'Glatter ut linjene fra nesen ned mot munnvikene.',
    },
    'filler-dissolve': {
      name: 'Fjerning av filler',
      description: 'Trygg oppløsning av uønsket eller ujevn filler fra en tidligere behandling.',
    },
    'wrinkles-1': {
      name: 'Rynkebehandling, 1 område',
      description: 'Panne, sinnarynke eller smilerynker. Velg ett område.',
    },
    'wrinkles-2': {
      name: 'Rynkebehandling, 2 områder',
      description: 'To valgfrie av panne, sinnarynke og smilerynker.',
    },
    'wrinkles-3': {
      name: 'Rynkebehandling, 3 områder',
      description: 'Panne, sinnarynke og smilerynker samlet.',
    },
    masseter: {
      name: 'Tanngnissing (masseter)',
      description: 'Demper tanngnissing og kjevespenning, og kan gi en slankere kjevelinje.',
    },
    sweating: {
      name: 'Svettebehandling',
      description: 'Reduserer svette i armhuler, hender eller føtter.',
    },
    microneedling: {
      name: 'Microneedling',
      description: 'Stimulerer kollagen for bedre tekstur, færre fine linjer, porer og arr.',
    },
    'microneedling-peel': {
      name: 'Microneedling med peeling',
      description: 'Microneedling kombinert med kjemisk peeling for dypere fornyelse.',
    },
    'chemical-peel': {
      name: 'Kjemisk peeling',
      description: 'Jevner ut hudtone og tekstur. Typen peeling velges ut fra huden din.',
    },
    'skin-booster': {
      name: 'Skinbooster',
      description: 'Dyp fuktighet for fastere og mer strålende hud.',
    },
  },
}
