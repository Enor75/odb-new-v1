import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'it';

export interface Activity {
  title: string;
  text: string;
  link: string;
}

export interface Pillar {
  title: string;
  text: string;
}

export interface ActivitySectionData {
  id: string;
  kicker: string;
  title: string;
  text: string;
  cases: string[];
}

export interface EstimatorLabels {
  typeLabels: Record<string, string>;
  durationLabels: Record<string, string>;
  guestLabels: Record<string, string>;
  locationLabels: Record<string, string>;
  optionLabels: Record<string, string>;
}

export interface Translations {
  nav: {
    home: string;
    activity: string;
    custom: string;
    custom2: string;
    about2: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
  };
  hero: {
    caption: string;
  };
  ticker: string[];
  home: {
    statementKicker: string;
    /** Bio Philosophy (20/09) — 3 paragraphes, sans titre, centrée. */
    statementParagraphs: string[];
    activitiesKicker: string;
    activities: Activity[];
    partnersKicker: string;
    partnersTitle: string;
    galleryKicker: string;
    galleryTitle: string;
    galleryLink: string;
  };
  philosophyPage: {
    kicker: string;
    title: string;
    paragraphs: string[];
    pillarsKicker: string;
    pillars: Pillar[];
  };
  carousel: {
    kicker: string;
  };
  activityPage: {
    kicker: string;
    /** Kicker du bloc grille déplacé de la home (20/09) — évite le
        doublon avec le kicker d'en-tête « What we do ». */
    gridKicker: string;
    title: string;
    /** (22/09) : titre = ancienne ligne de clôture ; les 4 ¶ de
        l'intro sont fusionnées en UN seul bloc centré. */
    intro: string;
    sections: ActivitySectionData[];
    ctaButton: string;
    slotLabel: string;
  };
  customPage: {
    kicker: string;
    title: string;
    subtitle: string;
    magTitleA: string;
    magTitleB: string;
    magColumns: { title: string; text: string }[];
    blocksTitleA: string;
    blocksTitleB: string;
    blocks: { title: string; desc: string }[];
    carTitleA: string;
    carText: string;
    specHeaderA: string;
    specHeaderB: string;
    /** 4 enceintes du catalogue (21/09) — carrousel de fiches techniques */
    specLabels: {
      type: string;
      drivers: string;
      amplification: string;
      bandwidth: string;
      dimensions: string;
      weight: string;
      finish: string;
    };
    speakers: {
      name: string;
      type: string;
      drivers: string;
      amplification: string;
      bandwidth: string;
      dimensions: string;
      weight: string;
      finish: string;
    }[];
    /** Libellé des emplacements photos vides */
    photoLabel: string;
  };
  custom2Page: {
    kicker: string;
    title: string;
    intro: string;
    /** Libellé « Phase » (kicker de chaque phase) */
    phaseLabel: string;
    deliverablesLabel: string;
    /** 6 phases du parcours (rail de navigation court + contenu) */
    phases: {
      short: string;
      title: string;
      subtitle: string;
      points: string[];
      deliverables: string;
    }[];
  };
  about2Page: {
    /** Étiquette au-dessus de chaque variante de présentation */
    propositionLabel: string;
    /** Noms des 4 propositions verticales */
    propositionNames: string[];
  };
  aboutPage: {
    kicker: string;
    paragraphs: string[];
    workLabel: string;
    scrollHint: string;
    photoLabel: string;
  };
  contactPage: {
    kicker: string;
    title: string;
    subtitle: string;
    estimatorToggle: string;
    emailFranceLabel: string;
    emailItaliaLabel: string;
    socialLabel: string;
    socialItalia: string;
    socialFrance: string;
    socialLinkedIn: string;
    baseLabel: string;
    baseValue: string;
    estimator: {
      title: string;
      disclaimer: string;
      steps: {
        type: string;
        duration: string;
        guests: string;
        location: string;
        options: string;
      };
      questions: {
        type: string;
        duration: string;
        guests: string;
        location: string;
        options: string;
      };
      labels: EstimatorLabels;
      back: string;
      seeEstimate: string;
      resultTitle: string;
      resultNote: string;
      continueToForm: string;
      recalculate: string;
      estimateWord: string;
    };
    formTitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      eventDate: string;
      venue: string;
      guestsLabel: string;
      eventType: string;
      budget: string;
      budgetLabels: Record<string, string>;
      message: string;
      estimateLabel: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    rights: string;
    madeIn: string;
  };
  meta: {
    indexTitle: string;
    indexDesc: string;
    activityTitle: string;
    activityDesc: string;
    customTitle: string;
    customDesc: string;
    custom2Title: string;
    custom2Desc: string;
    about2Title: string;
    about2Desc: string;
    aboutTitle: string;
    aboutDesc: string;
    contactTitle: string;
    contactDesc: string;
    notFoundTitle: string;
  };
  notFound: {
    code: string;
    text: string;
    back: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: { home: 'Home', activity: 'Activity', custom: 'Custom', custom2: 'Custom 2', about2: 'About 2', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close' },
    hero: {
      caption: 'High-End Sound System — Designed in France, based in Paris & Milan',
    },
    ticker: [
      'Orange Decibel',
      'High-End Sound System',
      'Designed in France — Based in Paris & Milan',
      'Electronic Music — DJ Sets & Live Sets',
      'Bands & Acoustic Performances',
    ],
    home: {
      statementKicker: 'Philosophy',
      statementParagraphs: [
        'Orange Decibel makes it possible to hear, feel, and connect through immersive, high-end sound.',
        'Born in France from the idea of combining Hi-Fi precision and clarity with the power and impact of professional sound, Orange Decibel is a High-End Sound System now based in Paris & Milan, offering a complete service for musical and cultural events.',
        'We work as an autonomous, demanding and reactive partner: seamless, invisible setup on-site, real adaptation to every venue and creative direction, and a level of human proximity and understanding that turns a technical service into a genuine collaboration. Our vibrant orange speakers have become a signature visual marker for brands looking to stand out through sound.',
      ],
      activitiesKicker: 'What we do',
      activities: [
        {
          title: 'Sound Architecture',
          text: 'A complete service for musical and cultural events — a modular system designed around each space.',
          link: 'The gallery',
        },
        {
          title: 'Electronic Music',
          text: 'Our specialty: DJ sets and live sets, delivered with natural, precise and controlled sound.',
          link: 'The gallery',
        },
        {
          title: 'Bands & Acoustic',
          text: 'We also work successfully with bands and acoustic performances, beyond the electronic repertoire.',
          link: 'Our philosophy',
        },
        {
          title: 'Custom Systems',
          text: 'Bespoke systems designed, built and configured around your space, your music and your event.',
          link: 'Custom systems',
        },
      ],
      partnersKicker: 'Partners & Collaborators',
      partnersTitle: 'They trust us',
      galleryKicker: 'Gallery',
      galleryTitle: 'Materials, shapes and volumes of our system',
      galleryLink: 'Explore',
    },
    philosophyPage: {
      kicker: 'Philosophy',
      title: 'Sound Architecture',
      paragraphs: [
        'Orange Decibel is a High-End Sound System born in France from the idea of combining Hi-Fi precision and clarity with the power and impact of professional sound.',
        'A project developed in France, now based in Paris & Milan. We offer a complete service for musical and cultural events.',
        'We specialize in electronic music — DJ sets and live sets — but we also work successfully with bands and acoustic performances.',
      ],
      pillarsKicker: 'The system',
      pillars: [
        {
          title: 'Handcrafted',
          text: 'Each system is built by hand, tuned with care, and designed for real-world sound performance.',
        },
        {
          title: 'Precision',
          text: 'Our system reaches its full potential with analog and acoustic sources, delivering natural, precise and controlled sound.',
        },
        {
          title: 'Modularity',
          text: "We offer a modular system that can be configured according to each event's specific requirements.",
        },
      ],
    },
    carousel: {
      kicker: 'Moments',
    },
    activityPage: {
      kicker: 'What we do',
      gridKicker: 'At a glance',
      title: "Let's create the sonic identity of your event together.",
      intro: "Sound has the power to awaken emotions and transform an event. It is not a mere accessory, but the beating heart of every experience. Reading venues, artists and our clients' intentions is part of our DNA — it is what allows us to deliver creative sound solutions, whatever the brief. Our proactive approach guarantees a reliable, powerful and constantly evolving system. With a team of passionate people and our own workshop, we offer a personal, fast and exclusive service. Through a unique sound, we help you captivate your audience and amplify the essence of your project.",
      sections: [
        {
          id: 'brands',
          kicker: 'Brand events',
          title: 'Brand events.',
          text: "Launches, activations, exhibitions, showcases — for brands and labels alike, we design events with a sound of their own. The system adapts to the creative direction, the venue and the audience: precise, powerful, and visually part of the staging.",
          cases: ['Nike × Rassvet — « Dawn Space », Paris', 'Netflix — « Nouvelle École », trailer', 'SNIPES × Air Max'],
        },
        {
          id: 'festivals',
          kicker: 'Festivals',
          title: 'Festivals & live stages.',
          text: "Full systems for festivals and live stages — from a single stage to multi-zone setups. Power where it matters, clarity everywhere else: the crowd feels the impact, the artists hear themselves. Assembled, aligned and calibrated by our own crew, however tight the schedule.",
          cases: ["Superbock × Halfpipe — Fête de la Musique, Cirque d'hiver, Paris"],
        },
        {
          id: 'nights',
          kicker: 'Night sound',
          title: 'Nights & parties.',
          text: "Club nights, warehouse parties, late sessions — sound for nights that go long. Bass you feel in your chest, control you keep at 3 a.m., a system that stays musical from the first record to the last. Warehouse nights with Loophole in Paris; the Fête de la Musique with Urban Outfitters × Foundation FM × M0NDIAL.",
          cases: ['Soirée Loophole — Warehouse, Paris', 'Urban Outfitters × Foundation FM × M0NDIAL — Fête de la Musique'],
        },
        {
          id: 'listening',
          kicker: 'Listening',
          title: 'Listening sessions.',
          text: "Our Hi-Fi DNA at its purest: listening sessions where detail, silence and texture matter as much as level. Analog and acoustic sources, a calibrated system, a room treated like an instrument. The inaugural edition of Salomon Listening Grounds was conceived exactly this way.",
          cases: ['Salomon — Listening Grounds, inaugural edition'],
        },
      ],
      ctaButton: 'Contact us',
      slotLabel: 'Photo to come',
    },
    customPage: {
      kicker: 'Custom',
      title: 'Custom Systems',
      subtitle: 'Every Orange Decibel speaker starts from a blank page: sketches, technical drawings, prototypes — until the system matches your space and your listening.',
      magTitleA: 'The workshop',
      magTitleB: 'Sketches, drawings & prototypes',
      magColumns: [
        { title: 'The sketch', text: 'Everything starts by hand: proportions, volumes, intent. The sketch sets the character of the system before any calculation.' },
        { title: 'The technical drawing', text: 'Plans, dimensions, sections: every cabinet is drawn to the millimetre before the first cut.' },
        { title: 'The prototype', text: 'Prototypes, listening sessions, iterations. Wood, drivers and electronics are tuned together until the result is right.' },
      ],
      blocksTitleA: 'The art of the custom speaker',
      blocksTitleB: 'Explore and perfect your sound',
      blocks: [
        { title: 'Materials', desc: 'Birch plywood, acoustic treatments, hand finishes: noble materials chosen for their acoustic response and their feel.' },
        { title: 'Design', desc: 'A fair volume, a clean line: every system is drawn for its space — discreet presence, precise sound image.' },
        { title: 'Sound system', desc: 'Loading, filtering, placement: acoustics first. The system is tuned to the room for a deep, precise listening experience.' },
      ],
      carTitleA: 'Specifications',
      carText: 'Our standard cabinets, built and tuned in our workshop. Some values are still being finalized — every project comes with its own technical sheet.',
      specHeaderA: 'Specification',
      specHeaderB: 'Value',
            specLabels: { type: 'Enclosure type', drivers: 'Drivers', amplification: 'Amplification', bandwidth: 'Bandwidth', dimensions: 'Dimensions', weight: 'Weight', finish: 'Finish' },
      photoLabel: 'Photo to come',
      speakers: [
        { name: '15″ Tops — Les Blues', type: 'Bass-reflex, 2-way', drivers: '1 × 18Sound 15NMB420 + 1 × 18Sound NSD1480N compression driver on XT1464 horn', amplification: 'Active bi-amplification, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'To be measured', weight: 'To be weighed', finish: 'To be confirmed' },
        { name: '15″ Coaxial Tops', type: 'Bass-reflex, 2-way coaxial', drivers: '1 × 18Sound 15NCX750', amplification: 'Active bi-amplification, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'To be measured', weight: 'To be weighed', finish: 'To be confirmed' },
        { name: '12″ Tops', type: 'Bass-reflex, 2-way', drivers: '1 × 18Sound 12NTLW2500 + 1.4″ compression driver', amplification: 'Active bi-amplification, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'To be measured', weight: 'To be weighed', finish: 'To be confirmed' },
        { name: '18″ Bass Cabinets', type: 'Bass-reflex / custom design', drivers: 'Depending on the system: 18Sound 18LW1400, 18TLW3000 or 18TLW5000 Tetracoil', amplification: 'PKN XD6000 / XE10000 depending on the configuration', bandwidth: '30 Hz – 120/130 Hz', dimensions: 'Depending on the model', weight: 'Depending on the model', finish: 'To be confirmed' },
      ],
    },
    custom2Page: {
      kicker: 'Custom',
      title: 'The journey of your system.',
      intro: 'From the first conversation to the first record — how we design, build and tune a system that is yours alone.',
      phaseLabel: 'Phase',
      deliverablesLabel: 'Deliverables',
      phases: [
        {
          short: 'Brief',
          title: 'Pre-conception.',
          subtitle: 'Understanding your needs & constraints',
          points: [
            'Initial meetings and on-site visit: the project takes shape in a design brief — use-case scenarios and site-specific constraints.',
            'Analysis of the space: architecture, key elements, everything that shapes sound behaviour.',
            'Definition of the required system and audio sources, according to the listening experience you want.',
          ],
          deliverables: 'Briefing summary, moodboards, benchmark, initial sketches.',
        },
        {
          short: 'Concept',
          title: 'Concept development.',
          subtitle: 'Exploring directions, generating concepts',
          points: [
            'Collaborative work sessions: we explore two or three directions for your system.',
            'Presentation of the concepts — sketches, drawings, early 3D models, material samples, reference images.',
            'Dialogue with your architects and scenographers on layout, materials and staging, for the best possible acoustic result.',
          ],
          deliverables: 'Concept sketches, design variations, initial 3D models, material choices.',
        },
        {
          short: 'Refinement',
          title: 'Design refinement.',
          subtitle: 'Detailing the selected concept',
          points: [
            'Development of the chosen direction — research and validation of every element and detail.',
            'Precise costing of cabinets and components, adjusted together.',
            '3D modelling and rendering of the final system.',
            'Sourcing of complementary equipment — turntables, mixers, sources — in line with the artistic direction.',
          ],
          deliverables: 'High-fidelity 3D renders and detailed visuals.',
        },
        {
          short: 'Final design',
          title: 'Final design.',
          subtitle: 'Preparing for manufacturing',
          points: [
            'Precise design of every speaker component and detailed modelling for CNC machining.',
            'Preparation of technical files and exports, according to manufacturing constraints.',
            'Ordering of the materials and components required for production.',
            'Hand finishing of individual parts.',
          ],
          deliverables: 'Production-ready 3D files (CAD), technical drawings, material & finish specifications.',
        },
        {
          short: 'Build',
          title: 'Handcrafted production.',
          subtitle: 'Building your system in our workshop',
          points: [
            'Hand assembly of every cabinet in our workshop.',
            'Electronics: soldering, audio cabling, amplifier mounting, installation of the drivers.',
            'First verification tests and acoustic measurements, followed by adjustments and finish detailing.',
            'Signature and numbering of your system; preparation for transport.',
          ],
          deliverables: 'Workshop validation, measurement report, pre-series adjustments.',
        },
        {
          short: 'Delivery',
          title: 'Delivery & calibration.',
          subtitle: 'Installation and first listen',
          points: [
            'Delivery and installation on site — positioning, cable routing, configuration of the equipment.',
            'Sound tuning and final equalisation, in your presence, according to your listening habits.',
            'Support on your first events — we stay with the system until it sounds right.',
          ],
          deliverables: 'Installation guidelines, care & maintenance documentation, on-site support.',
        },
      ],
    },
    about2Page: {
      propositionLabel: 'Proposition',
      propositionNames: [
        'Numbered editorial stack',
        'Centered manifesto',
        'Index with hairlines',
        'Full-height stacking',
      ],
    },
    aboutPage: {
      kicker: 'About',
      paragraphs: [
        'Sébastien Coutelas is a musician, producer and the founder of Orange Decibel.',
        'His relationship to sound comes first from music and sensation, before technique. Self-taught, he develops his own speakers with one desire: to build systems that render music in a physical, living and immersive way.',
        'Orange Decibel was born from this approach: bringing together instinct and precision, vibration and the science of sound. Every system is built and tuned with particular attention to the venue — its materials, its acoustics — and above all to the experience felt by the audience.',
        'Today, Orange Decibel accompanies projects in music, art, fashion and events, in France and abroad.',
      ],
      workLabel: 'Selected Work',
      scrollHint: 'Scroll to explore',
      photoLabel: 'Portrait — Sébastien Coutelas',
    },

    contactPage: {
      kicker: 'Contact',
      title: 'Contact',
      subtitle: 'For collaborations, events and inquiries.',
      estimatorToggle: 'Estimate my event',
      emailFranceLabel: 'Email — France',
      emailItaliaLabel: 'Email — Italia',
      socialLabel: 'Follow us',
      socialItalia: 'Instagram — Italia',
      socialFrance: 'Instagram — France',
      socialLinkedIn: 'LinkedIn',
      baseLabel: 'Based in',
      baseValue: 'Based in Paris & Milan — Designed in France',
      estimator: {
        title: 'Tell us about your event.',
        disclaimer: 'Indicative estimate only — the final quote depends on your exact needs.',
        steps: {
          type: 'Event type',
          duration: 'Duration',
          guests: 'Audience',
          location: 'Location',
          options: 'Options',
        },
        questions: {
          type: 'What kind of event are you planning?',
          duration: 'How long is the event?',
          guests: 'How many people are you expecting?',
          location: 'Where does it take place?',
          options: 'Any additional options?',
        },
        labels: {
          typeLabels: {
            festival: 'Festival',
            djlive: 'DJ set / live event',
            corporate: 'Corporate / brand',
            liveact: 'Live stage',
            acoustic: 'Acoustic / band',
            listening: 'Listening',
            other: 'Other / custom',
          },
          durationLabels: {
            short: '≤ 4 hours',
            standard: '4 – 8 hours',
            fullnight: 'Full night',
            multiday: 'Multi-day',
          },
          guestLabels: {
            small: '< 100 guests',
            medium: '100 – 300',
            large: '300 – 800',
            xl: '800 +',
          },
          locationLabels: {
            milan: 'Milan area',
            italy: 'Elsewhere in Italy',
            europe: 'Europe',
            intl: 'International',
          },
          optionLabels: {
            technician: 'On-site technician',
            engineer: 'Sound engineer',
            lighting: 'Lighting',
            backup: 'Backup system',
          },
        },
        back: 'Back',
        seeEstimate: 'See the estimate',
        resultTitle: 'Estimated range',
        resultNote:
          'The estimate includes the system, transport and selected options. The final quote is confirmed after a quick conversation.',
        continueToForm: 'Request a precise quote',
        recalculate: 'Recalculate',
        estimateWord: 'Estimate',
      },
      formTitle: 'Write to us',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        eventDate: 'Event date',
        venue: 'Venue / city',
        guestsLabel: 'Guests',
        eventType: 'Event type',
        budget: 'Budget',
        budgetLabels: {
          under: '< €1.000',
          mid: '€1.000 – 3.000',
          high: '€3.000 – 6.000',
          top: '> €6.000',
          discuss: 'To discuss',
        },
        message: 'Message',
        estimateLabel: 'Calculator estimate',
        send: 'Send',
        sending: 'Sending…',
        success: 'Message sent successfully',
        error: 'Something went wrong. Please try again.',
      },
    },
    footer: {
      rights: 'All rights reserved',
      madeIn: 'Designed in France, based in Paris & Milan',
    },
    meta: {
      indexTitle: 'Orange Decibel — High-End Sound System',
      indexDesc: 'Orange Decibel is a High-End Sound System born in France. Hi-Fi precision and professional power for musical and cultural events, based in Paris & Milan.',
      activityTitle: 'Activity — Orange Decibel',
      activityDesc: 'Brand events, festivals, nights and listening sessions by the Orange Decibel sound system.',
      customTitle: 'Custom — Orange Decibel',
      customDesc: 'Custom sound stages and tailor-made systems for brands and venues.',
      custom2Title: 'Custom 2 — Orange Decibel', custom2Desc: 'From brief to calibration — the six phases of a custom Orange Decibel system.',
      about2Title: 'About 2 — Orange Decibel', about2Desc: 'The system, vertical — four layout propositions.',
      aboutTitle: 'About — Orange Decibel',
      aboutDesc: 'Orange Decibel, a sound system collective based in Paris and Milan.',
      contactTitle: 'Contact — Orange Decibel',
      contactDesc: 'Estimate your event and get in touch — Orange Decibel, Paris and Milan.',
      notFoundTitle: 'Page not found — Orange Decibel',
    },
    notFound: { code: '404', text: 'Page not found', back: 'Back to home' },
  },

  fr: {
    nav: { home: 'Accueil', activity: 'Activités', custom: 'Sur mesure', custom2: 'Custom 2', about2: 'About 2', about: 'À propos', contact: 'Contact', menu: 'Menu', close: 'Fermer' },
    hero: {
      caption: 'Système Son Haut de Gamme — Conçu en France, basé à Paris et à Milan',
    },
    ticker: [
      'Orange Decibel',
      'Système Son Haut de Gamme',
      'Conçu en France — Basé à Paris et à Milan',
      'Musique Électronique — DJ Sets & Live Sets',
      'Groupes & Performances Acoustiques',
    ],
    home: {
      statementKicker: 'Philosophie',
      statementParagraphs: [
        "Orange Decibel permet d'entendre, de ressentir et de créer du lien à travers un son immersif haut de gamme.",
        "Né en France de l'idée d'allier la précision et la clarté Hi-Fi à la puissance et à l'impact du son professionnel, Orange Decibel est un High-End Sound System aujourd'hui basé à Paris et à Milan, offrant un service complet pour les événements musicaux et culturels.",
        "Nous travaillons comme un partenaire autonome, exigeant et réactif : installation sur site fluide et invisible, adaptation réelle à chaque lieu et à chaque direction artistique, et une proximité humaine qui transforme une prestation technique en une véritable collaboration. Nos enceintes orange vif sont devenues une signature visuelle pour les marques qui cherchent à se démarquer par le son.",
      ],
      activitiesKicker: 'Ce que nous faisons',
      activities: [
        {
          title: 'Architecture du Son',
          text: 'Un service complet pour les événements musicaux et culturels — un système modulaire pensé pour chaque espace.',
          link: 'Notre philosophie',
        },
        {
          title: 'Musique Électronique',
          text: 'Notre spécialité : DJ sets et live sets, avec un son naturel, précis et contrôlé.',
          link: 'La galerie',
        },
        {
          title: 'Groupes & Acoustique',
          text: 'Nous travaillons également avec succès avec des groupes et des performances acoustiques.',
          link: 'La galerie',
        },
      ],
      partnersKicker: 'Partenaires & Collaborations',
      partnersTitle: 'Ils nous font confiance',
      galleryKicker: 'Galerie',
      galleryTitle: 'Matériaux, formes et volumes de notre système',
      galleryLink: 'Explorer',
    },
    philosophyPage: {
      kicker: 'Philosophie',
      title: 'Architecture du Son',
      paragraphs: [
        "Orange Decibel est un système son Haut de Gamme né en France de l'idée de combiner la précision et la clarté Hi-Fi avec la puissance et l'impact du son professionnel.",
        'Un projet développé en France, désormais basé à Paris et à Milan. Nous offrons un service complet pour les événements musicaux et culturels.',
        'Nous sommes spécialisés dans la musique électronique — DJ sets et live sets — mais nous travaillons également avec succès avec des groupes et des performances acoustiques.',
      ],
      pillarsKicker: 'Le système',
      pillars: [
        {
          title: 'Artisanal',
          text: 'Chaque système est construit à la main, soigneusement réglé et conçu pour offrir des performances sonores authentiques.',
        },
        {
          title: 'Précision',
          text: 'Notre système atteint son plein potentiel avec des sources analogiques et acoustiques, offrant un son naturel, précis et contrôlé.',
        },
        {
          title: 'Modularité',
          text: 'Nous offrons un système modulaire qui peut être configuré selon les besoins spécifiques de chaque événement.',
        },
      ],
    },
    carousel: {
      kicker: 'Instants',
    },
    activityPage: {
      kicker: 'Ce que nous faisons',
      gridKicker: "En un coup d'œil",
      title: "Créons ensemble l'identité sonore de votre événement.",
      intro: "Le son a le pouvoir d'éveiller les émotions et de transformer un événement. Il n'est pas un simple accessoire, mais le cœur battant de chaque expérience. Comprendre les lieux, les artistes et les intentions de nos clients fait partie de notre ADN : c'est ce qui nous permet de proposer des solutions sonores créatives, quelle que soit la demande. Notre approche proactive garantit un système fiable, puissant et en constante évolution. Avec une équipe de passionnés et notre atelier, nous offrons un service personnalisé, rapide et exclusif. À travers un son unique, nous vous aidons à captiver votre audience et à amplifier l'essence de votre projet.",
      sections: [
        {
          id: 'brands',
          kicker: 'Événements de marques',
          title: 'Événements de marque.',
          text: "Lancements, activations, expositions, showcases — pour des marques comme des labels, nous concevons des événements au son qui leur appartient. Le système s'adapte à la direction artistique, au lieu et au public : précis, puissant, et visuellement intégré à la scénographie.",
          cases: ['Nike × Rassvet — « Dawn Space », Paris', 'Netflix — « Nouvelle École », bande-annonce', 'SNIPES × Air Max'],
        },
        {
          id: 'festivals',
          kicker: 'Festivals',
          title: 'Festivals & scènes live.',
          text: "Des systèmes complets pour les festivals et les scènes live — d'une scène unique aux dispositifs multi-zones. La puissance là où elle compte, la clarté partout ailleurs : le public ressent l'impact, les artistes s'entendent. Montage, alignement et calibration par notre propre équipe, quel que soit le timing.",
          cases: ["Superbock × Halfpipe — Fête de la Musique, Cirque d'hiver, Paris"],
        },
        {
          id: 'nights',
          kicker: 'Sonorisation de soirée',
          title: 'Nuits & fêtes.',
          text: "Soirées en club, warehouse parties, sessions tardives — le son des nuits qui durent. Des basses qu'on sent dans la poitrine, un contrôle qu'on garde à 3 h du matin, un système qui reste musical du premier au dernier disque. Les nuits warehouse avec Loophole à Paris ; la Fête de la Musique avec Urban Outfitters × Foundation FM × M0NDIAL.",
          cases: ['Soirée Loophole — Warehouse, Paris', 'Urban Outfitters × Foundation FM × M0NDIAL — Fête de la Musique'],
        },
        {
          id: 'listening',
          kicker: 'Listening',
          title: "Sessions d'écoute.",
          text: "Notre ADN Hi-Fi à l'état pur : des sessions d'écoute où le détail, le silence et la texture comptent autant que le niveau. Sources analogiques et acoustiques, système calibré, salle traitée comme un instrument. L'édition inaugurale des Salomon Listening Grounds a été pensée exactement ainsi.",
          cases: ['Salomon — Listening Grounds, édition inaugurale'],
        },
      ],
      ctaButton: 'Contactez-nous',
      slotLabel: 'Photo à venir',
    },
    customPage: {
      kicker: 'Sur mesure',
      title: 'Systèmes Sur Mesure',
      subtitle: 'Chaque enceinte Orange Decibel naît d’une feuille blanche : croquis, dessins techniques, prototypes — jusqu’au système qui correspond à votre espace et à votre écoute.',
      magTitleA: 'L’atelier',
      magTitleB: 'Croquis, dessins & prototypes',
      magColumns: [
        { title: 'Le croquis', text: 'Tout commence à main levée : proportions, volumes, intention. Le croquis fixe le caractère du système avant tout calcul.' },
        { title: 'Le dessin technique', text: 'Plans, cotations, sections : chaque caisson est dessiné au millimètre avant la première découpe.' },
        { title: 'Le prototype', text: 'Prototypes, écoutes, itérations. Le bois, les haut-parleurs et l’électronique s’accordent jusqu’au résultat juste.' },
      ],
      blocksTitleA: 'L’art de l’enceinte sur mesure',
      blocksTitleB: 'Explorez et perfectionnez votre son',
      blocks: [
        { title: 'Matériaux', desc: 'Bouleau multiplis, traitements acoustiques, finitions à la main : des matériaux nobles choisis pour leur réponse acoustique et leur toucher.' },
        { title: 'Design', desc: 'Un volume juste, une ligne épurée : chaque système est dessiné pour son espace — présence discrète, image sonore précise.' },
        { title: 'Système son', desc: 'Charge, filtrage, placement : l’acoustique d’abord. Le système est accordé à la pièce pour une écoute profonde et précise.' },
      ],
      carTitleA: 'Caractéristiques',
      carText: 'Nos caissons standards, conçus et réglés à l’atelier. Certaines valeurs sont en cours de finalisation — chaque projet fait l’objet d’une fiche technique dédiée.',
      specHeaderA: 'Caractéristique',
      specHeaderB: 'Spécification',
            specLabels: { type: 'Type d’enceinte', drivers: 'Haut-parleurs', amplification: 'Amplification', bandwidth: 'Bande passante', dimensions: 'Dimensions', weight: 'Poids', finish: 'Finition' },
      photoLabel: 'Photo à venir',
      speakers: [
        { name: 'Têtes 15″ – Les Blues', type: 'Bass-reflex, 2 voies', drivers: '1 × 18Sound 15NMB420 + 1 × compression 18Sound NSD1480N sur pavillon XT1464', amplification: 'Bi-amplification active, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'À mesurer', weight: 'À peser', finish: 'À préciser' },
        { name: 'Têtes coaxiales 15″', type: 'Bass-reflex, 2 voies coaxiales', drivers: '1 × 18Sound 15NCX750', amplification: 'Bi-amplification active, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'À mesurer', weight: 'À peser', finish: 'À préciser' },
        { name: 'Têtes 12″', type: 'Bass-reflex, 2 voies', drivers: '1 × 18Sound 12NTLW2500 + moteur de compression 1,4″', amplification: 'Bi-amplification active, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'À mesurer', weight: 'À peser', finish: 'À préciser' },
        { name: 'Caissons de basses 18″', type: 'Bass-reflex / conception sur mesure', drivers: 'Selon les systèmes : 18Sound 18LW1400, 18TLW3000 ou 18TLW5000 Tetracoil', amplification: 'PKN XD6000 / XE10000 selon la configuration', bandwidth: '30 Hz – 120/130 Hz', dimensions: 'Selon le modèle', weight: 'Selon le modèle', finish: 'À préciser' },
      ],
    },
    custom2Page: {
      kicker: 'Sur mesure',
      title: 'Le chemin de votre système.',
      intro: 'De la première conversation au premier disque — comment nous concevons, fabriquons et réglons un système qui n’appartient qu’à vous.',
      phaseLabel: 'Phase',
      deliverablesLabel: 'Livrables',
      phases: [
        {
          short: 'Brief',
          title: 'Pré-conception.',
          subtitle: 'Comprendre vos besoins et vos contraintes',
          points: [
            'Premières rencontres et visite du lieu : le projet prend forme dans une note de conception — scénarios d’usage et contraintes du site.',
            'Analyse de l’espace : architecture, éléments clés, tout ce qui façonne le comportement du son.',
            'Définition du système et des sources nécessaires, selon l’expérience d’écoute visée.',
          ],
          deliverables: 'Note de brief, moodboards, benchmark, premiers croquis.',
        },
        {
          short: 'Concept',
          title: 'Développement du concept.',
          subtitle: 'Explorer des directions, générer des concepts',
          points: [
            'Sessions de travail collaboratives : nous explorons deux ou trois directions pour votre système.',
            'Présentation des concepts — croquis, dessins, premières 3D, échantillons de matériaux, images de référence.',
            'Dialogue avec vos architectes et scénographes sur l’agencement, les matériaux et la scénographie, pour le meilleur résultat acoustique.',
          ],
          deliverables: 'Croquis concept, variantes de design, premières 3D, choix de matériaux.',
        },
        {
          short: 'Affinage',
          title: 'Affinage du design.',
          subtitle: 'Détailler le concept retenu',
          points: [
            'Développement de la direction retenue — recherche et validation de chaque élément et détail.',
            'Chiffrage précis des caissons et composants, ajusté ensemble.',
            'Modélisation 3D et rendus du système final.',
            'Sourcing d’équipements complémentaires — platines, mixeurs, sources — en accord avec la direction artistique.',
          ],
          deliverables: 'Rendus 3D haute fidélité et visuels détaillés.',
        },
        {
          short: 'Design final',
          title: 'Design final.',
          subtitle: 'Préparer la fabrication',
          points: [
            'Conception précise de chaque composant et modélisation détaillée pour l’usinage CNC.',
            'Préparation des dossiers techniques et exports, selon les contraintes de fabrication.',
            'Commande des matériaux et composants nécessaires à la production.',
            'Finition à la main des pièces individuelles.',
          ],
          deliverables: 'Fichiers 3D de production (CAO), plans techniques, spécifications matériaux et finitions.',
        },
        {
          short: 'Fabrication',
          title: 'Fabrication à la main.',
          subtitle: 'Construire votre système à l’atelier',
          points: [
            'Assemblage à la main de chaque caisson, à notre atelier.',
            'Électronique : soudure, câblage audio, montage des amplificateurs, installation des haut-parleurs.',
            'Premiers tests de vérification et mesures acoustiques, puis ajustements et finitions.',
            'Signature et numérotation de votre système ; préparation au transport.',
          ],
          deliverables: 'Validation atelier, rapport de mesure, ajustements de pré-série.',
        },
        {
          short: 'Livraison',
          title: 'Livraison & calibration.',
          subtitle: 'Installation et première écoute',
          points: [
            'Livraison et installation sur site — positionnement, passage des câbles, configuration.',
            'Réglage du son et égalisation finale, en votre présence, selon vos habitudes d’écoute.',
            'Accompagnement de vos premiers événements — nous restons avec le système jusqu’à ce que le son soit juste.',
          ],
          deliverables: 'Guides d’installation, documentation d’entretien, présence au montage.',
        },
      ],
    },
    about2Page: {
      propositionLabel: 'Proposition',
      propositionNames: [
        'Pile éditoriale numérotée',
        'Manifeste centré',
        'Index à filets',
        'Empilement pleine hauteur',
      ],
    },
    aboutPage: {
      kicker: 'À propos',
      paragraphs: [
        'Sébastien Coutelas est musicien, producteur et fondateur d’Orange Decibel.',
        'Son rapport au son vient d’abord de la musique et de la sensation, avant la technique. Autodidacte, il développe ses propres enceintes avec l’envie de créer des systèmes capables de restituer la musique de manière physique, vivante et immersive.',
        'C’est de cette approche qu’est né Orange Decibel : faire cohabiter l’instinct et la précision, la vibration et la science du son. Chaque système est fabriqué et réglé avec une attention particulière portée au lieu, à ses matériaux, à son acoustique et surtout à l’expérience ressentie par le public.',
        'Aujourd’hui, Orange Decibel accompagne des projets dans la musique, l’art, la mode et l’événementiel, en France et à l’étranger.',
      ],
      workLabel: 'Travaux sélectionnés',
      scrollHint: 'Défiler pour explorer',
      photoLabel: 'Portrait — Sébastien Coutelas',
    },

    contactPage: {
      kicker: 'Contact',
      title: 'Contact',
      subtitle: 'Pour collaborations, événements et informations.',
      estimatorToggle: 'Estimer mon événement',
      emailFranceLabel: 'Email — France',
      emailItaliaLabel: 'Email — Italia',
      socialLabel: 'Suivez-nous',
      socialItalia: 'Instagram — Italia',
      socialFrance: 'Instagram — France',
      socialLinkedIn: 'LinkedIn',
      baseLabel: 'Basé à',
      baseValue: 'Basé à Paris et à Milan — Conçu en France',
      estimator: {
        title: 'Parlez-nous de votre événement.',
        disclaimer: 'Estimation indicative — le devis final dépend de vos besoins exacts.',
        steps: {
          type: "Type d'événement",
          duration: 'Durée',
          guests: 'Audience',
          location: 'Lieu',
          options: 'Options',
        },
        questions: {
          type: 'Quel type d\'événement préparez-vous ?',
          duration: 'Combien de temps dure l\'événement ?',
          guests: 'Combien de personnes attendez-vous ?',
          location: 'Où se déroule-t-il ?',
          options: 'Des options supplémentaires ?',
        },
        labels: {
          typeLabels: {
            festival: 'Festival',
            djlive: 'Événement DJ set / live',
            corporate: 'Corporate / marque',
            liveact: 'Scène live',
            acoustic: 'Acoustique / groupe',
            listening: 'Listening',
            other: 'Autre / sur mesure',
          },
          durationLabels: {
            short: '≤ 4 heures',
            standard: '4 – 8 heures',
            fullnight: 'Nuit complète',
            multiday: 'Plusieurs jours',
          },
          guestLabels: {
            small: '< 100 personnes',
            medium: '100 – 300',
            large: '300 – 800',
            xl: '800 +',
          },
          locationLabels: {
            milan: 'Région de Milan',
            italy: 'Ailleurs en Italie',
            europe: 'Europe',
            intl: 'International',
          },
          optionLabels: {
            technician: 'Technicien sur place',
            engineer: 'Ingénieur son',
            lighting: 'Éclairage',
            backup: 'Système de secours',
          },
        },
        back: 'Retour',
        seeEstimate: "Voir l'estimation",
        resultTitle: 'Fourchette estimée',
        resultNote:
          "L'estimation comprend le système, le transport et les options sélectionnées. Le devis final est confirmé après un rapide échange.",
        continueToForm: 'Demander un devis précis',
        recalculate: 'Recalculer',
        estimateWord: 'Estimation',
      },
      formTitle: 'Écrivez-nous',
      form: {
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        eventDate: "Date de l'événement",
        venue: 'Lieu / ville',
        guestsLabel: 'Personnes',
        eventType: "Type d'événement",
        budget: 'Budget',
        budgetLabels: {
          under: '< €1.000',
          mid: '€1.000 – 3.000',
          high: '€3.000 – 6.000',
          top: '> €6.000',
          discuss: 'À discuter',
        },
        message: 'Message',
        estimateLabel: 'Estimation du calculateur',
        send: 'Envoyer',
        sending: 'Envoi en cours…',
        success: 'Message envoyé avec succès',
        error: 'Une erreur est survenue. Veuillez réessayer.',
      },
    },
    footer: {
      rights: 'Tous droits réservés',
      madeIn: 'Conçu en France, basé à Paris et à Milan',
    },
    meta: {
      indexTitle: 'Orange Decibel — Sound System haut de gamme',
      indexDesc: 'Orange Decibel est un sound system haut de gamme né en France. Précision Hi-Fi et puissance professionnelle pour les événements musicaux et culturels, basé à Paris et à Milan.',
      activityTitle: 'Activités — Orange Decibel',
      activityDesc: 'Événements de marques, festivals, soirées et listening par le sound system Orange Decibel.',
      customTitle: 'Sur mesure — Orange Decibel',
      customDesc: 'Scènes sonores et systèmes conçus sur mesure pour marques et lieux.',
      custom2Title: 'Custom 2 — Orange Decibel', custom2Desc: "Du brief à la calibration — les six phases d'un système Orange Decibel sur mesure.",
      about2Title: 'About 2 — Orange Decibel', about2Desc: 'The system, à la verticale — quatre propositions de mise en page.',
      aboutTitle: 'À propos — Orange Decibel',
      aboutDesc: 'Orange Decibel, un collectif sound system basé à Paris et à Milan.',
      contactTitle: 'Contact — Orange Decibel',
      contactDesc: 'Estimez votre événement et écrivez-nous — Orange Decibel, Paris et Milan.',
      notFoundTitle: 'Page introuvable — Orange Decibel',
    },
    notFound: { code: '404', text: 'Page introuvable', back: "Retour à l'accueil" },
  },

  it: {
    nav: { home: 'Home', activity: 'Attività', custom: 'Su misura', custom2: 'Custom 2', about2: 'About 2', about: 'Chi siamo', contact: 'Contatti', menu: 'Menu', close: 'Chiudi' },
    hero: {
      caption: 'High-End Sound System — Progettato in Francia, con base a Parigi e Milano',
    },
    ticker: [
      'Orange Decibel',
      'High-End Sound System',
      'Progettato in Francia — Con base a Parigi e Milano',
      'Musica Elettronica — DJ Set e Live Set',
      'Band e Performance Acustiche',
    ],
    home: {
      statementKicker: 'Filosofia',
      statementParagraphs: [
        'Orange Decibel permette di ascoltare, di sentire e di entrare in connessione attraverso un suono immersivo di alta gamma.',
        "Nato in Francia dall'idea di unire la precisione e la chiarezza Hi-Fi alla potenza e all'impatto del suono professionale, Orange Decibel è un High-End Sound System oggi con base a Parigi e Milano, che offre un servizio completo per eventi musicali e culturali.",
        "Lavoriamo come partner autonomo, esigente e reattivo: installazione sul posto fluida e invisibile, reale adattamento a ogni spazio e a ogni direzione creativa, e una vicinanza umana che trasforma un servizio tecnico in una vera collaborazione. I nostri altoparlanti arancio vivo sono diventati un segno visivo distintivo per i brand che vogliono distinguersi attraverso il suono.",
      ],
      activitiesKicker: 'Cosa facciamo',
      activities: [
        {
          title: 'Architettura del Suono',
          text: 'Un servizio completo per eventi musicali e culturali — un sistema modulare progettato per ogni spazio.',
          link: 'La filosofia',
        },
        {
          title: 'Musica Elettronica',
          text: 'La nostra specialità: DJ set e live set, con un suono naturale, preciso e controllato.',
          link: 'La galleria',
        },
        {
          title: 'Band & Acustica',
          text: 'Lavoriamo con successo anche con band e performance acustiche.',
          link: 'La galleria',
        },
      ],
      partnersKicker: 'Partner & Collaborazioni',
      partnersTitle: 'Si fidano di noi',
      galleryKicker: 'Galleria',
      galleryTitle: 'Materiali, forme e volumi del nostro sistema',
      galleryLink: 'Esplora',
    },
    philosophyPage: {
      kicker: 'Filosofia',
      title: 'Architettura del Suono',
      paragraphs: [
        "Orange Decibel è un High-End Sound System nato in Francia dall'idea di unire la precisione e la chiarezza dell'Hi-Fi con la potenza e l'impatto del suono professionale.",
        'Un progetto sviluppato in Francia, oggi con base a Parigi e Milano. Offriamo un servizio completo per eventi musicali e culturali.',
        'Siamo specializzati in musica elettronica — DJ set e live set — ma lavoriamo con successo anche con band e performance acustiche.',
      ],
      pillarsKicker: 'Il sistema',
      pillars: [
        {
          title: 'Artigianale',
          text: 'Ogni sistema è costruito a mano, messo a punto con cura e progettato per offrire prestazioni sonore autentiche.',
        },
        {
          title: 'Precisione',
          text: 'Il nostro sistema esprime il massimo delle sue potenzialità con sorgenti analogiche e acustiche, garantendo un suono naturale, preciso e controllato.',
        },
        {
          title: 'Modularità',
          text: 'Offriamo un sistema modulabile che permette di configurare gli speaker in base alle esigenze di ogni evento.',
        },
      ],
    },
    carousel: {
      kicker: 'Istanti',
    },
    activityPage: {
      kicker: 'Cosa facciamo',
      gridKicker: 'In sintesi',
      title: "Creiamo insieme l'identità sonora del vostro evento.",
      intro: "Il suono ha il potere di risvegliare le emozioni e di trasformare un evento. Non è un semplice accessorio, ma il cuore pulsante di ogni esperienza. Capire i luoghi, gli artisti e le intenzioni dei nostri clienti fa parte del nostro DNA: è ciò che ci permette di proporre soluzioni sonore creative, qualsiasi sia la richiesta. Il nostro approccio proattivo garantisce un sistema affidabile, potente e in costante evoluzione. Con una squadra di appassionati e il nostro laboratorio, offriamo un servizio personalizzato, rapido ed esclusivo. Attraverso un suono unico, vi aiutiamo a catturare il vostro pubblico e ad amplificare l'essenza del vostro progetto.",
      sections: [
        {
          id: 'brands',
          kicker: 'Eventi per marchi',
          title: 'Eventi per marchi.',
          text: "Lanci, attivazioni, mostre, showcase — per marchi e label, diamo agli eventi un suono che appartiene loro. Il sistema si adatta alla direzione creativa, al luogo e al pubblico: preciso, potente e visivamente parte della scenografia.",
          cases: ['Nike × Rassvet — « Dawn Space », Parigi', 'Netflix — « Nouvelle École », trailer', 'SNIPES × Air Max'],
        },
        {
          id: 'festivals',
          kicker: 'Festival',
          title: 'Palchi live & festival.',
          text: "Sistemi completi per festival e palchi live — da una singola scena a disposizioni multi-zona. Potenza dove serve, chiarezza ovunque: il pubblico sente l'impatto, gli artisti si sentono. Montaggio, allineamento e calibrazione con la nostra squadra, qualsiasi sia il timing.",
          cases: ["Superbock × Halfpipe — Fête de la Musique, Cirque d'hiver, Parigi"],
        },
        {
          id: 'nights',
          kicker: 'Sonorizzazione serate',
          title: 'Notti & feste.',
          text: "Notti in club, warehouse party, late session — il suono delle notti che durano. Bassi che si sentono nel petto, controllo che si mantiene alle tre del mattino, un sistema che resta musicale dal primo all'ultimo disco. Le notti warehouse con Loophole a Parigi; la Fête de la Musique con Urban Outfitters × Foundation FM × M0NDIAL.",
          cases: ['Soirée Loophole — Warehouse, Parigi', 'Urban Outfitters × Foundation FM × M0NDIAL — Fête de la Musique'],
        },
        {
          id: 'listening',
          kicker: 'Listening',
          title: "Sessioni d'ascolto.",
          text: "Il nostro DNA Hi-Fi allo stato puro: listening session dove il dettaglio, il silenzio e la texture contano quanto il volume. Sorgenti analogiche e acustiche, sistema calibrato, sala trattata come uno strumento. L'edizione inaugurale dei Salomon Listening Grounds è stata pensata esattamente così.",
          cases: ['Salomon — Listening Grounds, edizione inaugurale'],
        },
      ],
      ctaButton: 'Contattaci',
      slotLabel: 'Foto in arrivo',
    },
    customPage: {
      kicker: 'Su misura',
      title: 'Sistemi Su Misura',
      subtitle: 'Ogni cassa Orange Decibel nasce da una pagina bianca: schizzi, disegni tecnici, prototipi — fino al sistema che risponde al tuo spazio e al tuo ascolto.',
      magTitleA: 'L’atelier',
      magTitleB: 'Schizzi, disegni & prototipi',
      magColumns: [
        { title: 'Lo schizzo', text: 'Tutto inizia a mano libera: proporzioni, volumi, intenzione. Lo schizzo fissa il carattere del sistema prima di ogni calcolo.' },
        { title: 'Il disegno tecnico', text: 'Piani, quote, sezioni: ogni cassa è disegnata al millimetro prima del primo taglio.' },
        { title: 'Il prototipo', text: 'Prototipi, ascolti, iterazioni. Legno, driver ed elettronica si accordano fino al risultato giusto.' },
      ],
      blocksTitleA: 'L’arte della cassa su misura',
      blocksTitleB: 'Esplora e perfeziona il tuo suono',
      blocks: [
        { title: 'Materiali', desc: 'Multistrato di betulla, trattamenti acustici, finiture a mano: materiali nobili scelti per la risposta acustica e per il tatto.' },
        { title: 'Design', desc: 'Un volume giusto, una linea pulita: ogni sistema è disegnato per il suo spazio — presenza discreta, immagine sonora precisa.' },
        { title: 'Sistema audio', desc: 'Carico, filtraggio, posizionamento: prima l’acustica. Il sistema è accordato alla sala per un ascolto profondo e preciso.' },
      ],
      carTitleA: 'Caratteristiche',
carText: 'Le nostre casse standard, progettate e regolate nel nostro laboratorio. Alcuni valori sono ancora in via di definizione — ogni progetto ha una propria scheda tecnica.',
      specHeaderA: 'Caratteristica',
      specHeaderB: 'Specifica',
            specLabels: { type: 'Tipo di cassa', drivers: 'Altoparlanti', amplification: 'Amplificazione', bandwidth: 'Banda passante', dimensions: 'Dimensioni', weight: 'Peso', finish: 'Finitura' },
      photoLabel: 'Foto in arrivo',
      speakers: [
        { name: 'Tops 15″ — Les Blues', type: 'Bass-reflex, 2 vie', drivers: '1 × 18Sound 15NMB420 + 1 × driver a compressione 18Sound NSD1480N su tromba XT1464', amplification: 'Biamplificazione attiva, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'Da misurare', weight: 'Da pesare', finish: 'Da definire' },
        { name: 'Tops coassiali 15″', type: 'Bass-reflex, 2 vie coassiali', drivers: '1 × 18Sound 15NCX750', amplification: 'Biamplificazione attiva, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'Da misurare', weight: 'Da pesare', finish: 'Da definire' },
        { name: 'Tops 12″', type: 'Bass-reflex, 2 vie', drivers: '1 × 18Sound 12NTLW2500 + motore a compressione 1,4″', amplification: 'Biamplificazione attiva, PKN', bandwidth: '150 Hz – 20 kHz', dimensions: 'Da misurare', weight: 'Da pesare', finish: 'Da definire' },
        { name: 'Sub 18″', type: 'Bass-reflex / progettazione su misura', drivers: 'Secondo i sistemi: 18Sound 18LW1400, 18TLW3000 o 18TLW5000 Tetracoil', amplification: 'PKN XD6000 / XE10000 secondo la configurazione', bandwidth: '30 Hz – 120/130 Hz', dimensions: 'Secondo il modello', weight: 'Secondo il modello', finish: 'Da definire' },
      ],
    },
    custom2Page: {
      kicker: 'Su misura',
      title: 'Il percorso del vostro sistema.',
      intro: 'Dalla prima conversazione al primo disco — come progettiamo, costruiamo e regoliamo un sistema che è solo vostro.',
      phaseLabel: 'Fase',
      deliverablesLabel: 'Consegnabili',
      phases: [
        {
          short: 'Brief',
          title: 'Pre-concezione.',
          subtitle: 'Capire le vostre esigenze e i vincoli',
          points: [
            'Primi incontri e visita sul posto: il progetto prende forma in un brief di progettazione — scenari d’uso e vincoli del sito.',
            'Analisi dello spazio: architettura, elementi chiave, tutto ciò che modella il comportamento del suono.',
            'Definizione del sistema e delle sorgenti necessarie, secondo l’esperienza d’ascolto desiderata.',
          ],
          deliverables: 'Sintesi del brief, moodboard, benchmark, primi schizzi.',
        },
        {
          short: 'Concept',
          title: 'Sviluppo del concept.',
          subtitle: 'Esplorare direzioni, generare concept',
          points: [
            'Sessioni di lavoro collaborative: esploriamo due o tre direzioni per il vostro sistema.',
            'Presentazione dei concept — schizzi, disegni, prime 3D, campioni di materiali, immagini di riferimento.',
            'Dialogo con i vostri architetti e scenografi su layout, materiali e allestimento, per il miglior risultato acustico.',
          ],
          deliverables: 'Schizzi concettuali, varianti di design, prime 3D, scelta dei materiali.',
        },
        {
          short: 'Rifinitura',
          title: 'Rifinitura del design.',
          subtitle: 'Dettagliare il concept scelto',
          points: [
            'Sviluppo della direzione scelta — ricerca e validazione di ogni elemento e dettaglio.',
            'Preventivo preciso di casse e componenti, aggiustato insieme.',
            'Modellazione 3D e rendering del sistema finale.',
            'Ricerca di equipaggiamenti complementari — giradischi, mixer, sorgenti — in linea con la direzione artistica.',
          ],
          deliverables: 'Rendering 3D ad alta fedeltà e visuali dettagliate.',
        },
        {
          short: 'Design finale',
          title: 'Design finale.',
          subtitle: 'Preparare la produzione',
          points: [
            'Progettazione precisa di ogni componente e modellazione dettagliata per la lavorazione CNC.',
            'Preparazione dei file tecnici e degli export, secondo i vincoli di produzione.',
            'Ordine dei materiali e dei componenti necessari alla produzione.',
            'Finitura a mano dei singoli pezzi.',
          ],
          deliverables: 'File 3D di produzione (CAD), disegni tecnici, specifiche di materiali e finiture.',
        },
        {
          short: 'Costruzione',
          title: 'Produzione artigianale.',
          subtitle: 'Costruire il vostro sistema in laboratorio',
          points: [
            'Assemblaggio a mano di ogni cassa, nel nostro laboratorio.',
            'Elettronica: saldatura, cablaggio audio, montaggio degli amplificatori, installazione degli altoparlanti.',
            'Primi test di verifica e misurazioni acustiche, seguiti da aggiustamenti e finiture.',
            'Firma e numerazione del vostro sistema; preparazione al trasporto.',
          ],
          deliverables: 'Validazione in laboratorio, rapporto di misura, aggiustamenti pre-serie.',
        },
        {
          short: 'Consegna',
          title: 'Consegna e calibrazione.',
          subtitle: 'Installazione e primo ascolto',
          points: [
            'Consegna e installazione sul sito — posizionamento, passaggio dei cavi, configurazione.',
            'Regolazione del suono ed equalizzazione finale, in vostra presenza, secondo le vostre abitudini d’ascolto.',
            'Supporto ai primi eventi — restiamo con il sistema finché il suono non è giusto.',
          ],
          deliverables: 'Linee guida di installazione, documentazione di manutenzione, supporto on-site.',
        },
      ],
    },
    about2Page: {
      propositionLabel: 'Proposta',
      propositionNames: [
        'Pila editoriale numerata',
        'Manifesto centrato',
        'Indice con filetti',
        'Impilamento a piena altezza',
      ],
    },
    aboutPage: {
      kicker: 'Chi siamo',
      paragraphs: [
        'Sébastien Coutelas è musicista, produttore e fondatore di Orange Decibel.',
        'Il suo rapporto con il suono nasce prima di tutto dalla musica e dalla sensazione, prima ancora che dalla tecnica. Autodidatta, sviluppa i propri altoparlanti con il desiderio di creare sistemi capaci di restituire la musica in modo fisico, vivo e coinvolgente.',
        'È da questo approccio che nasce Orange Decibel: far convivere l’istinto e la precisione, la vibrazione e la scienza del suono. Ogni sistema è costruito e regolato con un’attenzione particolare al luogo, ai suoi materiali, alla sua acustica e soprattutto all’esperienza vissuta dal pubblico.',
        'Oggi Orange Decibel accompagna progetti nella musica, nell’arte, nella moda e negli eventi, in Francia e all’estero.',
      ],
      workLabel: 'Lavori selezionati',
      scrollHint: 'Scorri per esplorare',
      photoLabel: 'Ritratto — Sébastien Coutelas',
    },

    contactPage: {
      kicker: 'Contatti',
      title: 'Contatti',
      subtitle: 'Per collaborazioni, eventi e informazioni.',
      estimatorToggle: 'Stima il tuo evento',
      emailFranceLabel: 'Email — France',
      emailItaliaLabel: 'Email — Italia',
      socialLabel: 'Seguici',
      socialItalia: 'Instagram — Italia',
      socialFrance: 'Instagram — France',
      socialLinkedIn: 'LinkedIn',
      baseLabel: 'Base a',
      baseValue: 'Basato a Parigi e a Milano — Progettato in Francia',
      estimator: {
        title: 'Parlaci del tuo evento.',
        disclaimer: 'Stima indicativa — il preventivo finale dipende dalle tue esigenze esatte.',
        steps: {
          type: 'Tipo di evento',
          duration: 'Durata',
          guests: 'Pubblico',
          location: 'Luogo',
          options: 'Opzioni',
        },
        questions: {
          type: 'Che tipo di evento stai organizzando?',
          duration: 'Quanto dura l\'evento?',
          guests: 'Quante persone aspetti?',
          location: 'Dove si svolge?',
          options: 'Opzioni aggiuntive?',
        },
        labels: {
          typeLabels: {
            festival: 'Festival',
            djlive: 'Evento DJ set / live',
            corporate: 'Corporate / brand',
            liveact: 'Palco live',
            acoustic: 'Acustico / band',
            listening: 'Listening',
            other: 'Altro / su misura',
          },
          durationLabels: {
            short: '≤ 4 ore',
            standard: '4 – 8 ore',
            fullnight: 'Notte intera',
            multiday: 'Più giorni',
          },
          guestLabels: {
            small: '< 100 persone',
            medium: '100 – 300',
            large: '300 – 800',
            xl: '800 +',
          },
          locationLabels: {
            milan: 'Area di Milano',
            italy: 'Altrove in Italia',
            europe: 'Europa',
            intl: 'Internazionale',
          },
          optionLabels: {
            technician: 'Tecnico on-site',
            engineer: 'Tecnico del suono',
            lighting: 'Illuminazione',
            backup: 'Sistema di backup',
          },
        },
        back: 'Indietro',
        seeEstimate: 'Vedi la stima',
        resultTitle: 'Forbice stimata',
        resultNote:
          'La stima include il sistema, il trasporto e le opzioni selezionate. Il preventivo finale viene confermato dopo una breve chiamata.',
        continueToForm: 'Richiedi un preventivo preciso',
        recalculate: 'Ricalcola',
        estimateWord: 'Stima',
      },
      formTitle: 'Scrivici',
      form: {
        name: 'Nome',
        email: 'Email',
        phone: 'Telefono',
        eventDate: 'Data dell\'evento',
        venue: 'Luogo / città',
        guestsLabel: 'Persone',
        eventType: 'Tipo di evento',
        budget: 'Budget',
        budgetLabels: {
          under: '< €1.000',
          mid: '€1.000 – 3.000',
          high: '€3.000 – 6.000',
          top: '> €6.000',
          discuss: 'Da discutere',
        },
        message: 'Messaggio',
        estimateLabel: 'Stima dal calcolatore',
        send: 'Invia',
        sending: 'Invio in corso…',
        success: 'Messaggio inviato con successo',
        error: 'Si è verificato un errore. Riprova.',
      },
    },
    footer: {
      rights: 'Tutti i diritti riservati',
      madeIn: 'Progettato in Francia, con base a Parigi e Milano',
    },
    meta: {
      indexTitle: 'Orange Decibel — Sound system di alta gamma',
      indexDesc: 'Orange Decibel è un sound system di alta gamma nato in Francia. Precisione Hi-Fi e potenza professionale per eventi musicali e culturali, con base a Parigi e Milano.',
      activityTitle: 'Attività — Orange Decibel',
      activityDesc: 'Eventi per marchi, festival, serate e listening del sound system Orange Decibel.',
      customTitle: 'Su misura — Orange Decibel',
      customDesc: 'Palchi sonori e sistemi su misura per brand e luoghi.',
      custom2Title: 'Custom 2 — Orange Decibel', custom2Desc: 'Dal brief alla calibrazione — le sei fasi di un sistema Orange Decibel su misura.',
      about2Title: 'About 2 — Orange Decibel', about2Desc: 'The system, in verticale — quattro proposte di layout.',
      aboutTitle: 'Chi siamo — Orange Decibel',
      aboutDesc: 'Orange Decibel, un collettivo sound system con base a Parigi e Milano.',
      contactTitle: 'Contatti — Orange Decibel',
      contactDesc: 'Stima il tuo evento e scrivici — Orange Decibel, Parigi e Milano.',
      notFoundTitle: 'Pagina non trovata — Orange Decibel',
    },
    notFound: { code: '404', text: 'Pagina non trovata', back: 'Torna alla home' },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'odb-language';

const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr' || stored === 'it') return stored;
  } catch {
    // localStorage indisponible (iframe sandbox, etc.)
  }
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
