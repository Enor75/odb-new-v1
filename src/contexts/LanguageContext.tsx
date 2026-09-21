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
    /** Intro éditoriale validée client (21/09) — 4 ¶ + ligne de clôture */
    introParagraphs: string[];
    introClosing: string;
    sections: ActivitySectionData[];
    ctaButton: string;
    slotLabel: string;
  };
  customPage: {
    /** Chemin de création — process en 5 étapes (module Custom, 20/09) */
    process: {
      kicker: string;
      title: string;
      steps: { title: string; text: string }[];
    };
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
    carTitleB: string;
    carText: string;
    specHeaderA: string;
    specHeaderB: string;
    specs: { label: string; value: string }[];
    img1Label: string;
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
    nav: { home: 'Home', activity: 'Activity', custom: 'Custom', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close' },
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
      title: 'Brands, festivals, nights and listening sessions.',
      introParagraphs: [
        "Sound has the power to awaken emotions and transform an event. It is not a mere accessory, but the beating heart of every experience.",
        "Reading venues, artists and our clients' intentions is part of our DNA — it is what allows us to deliver creative sound solutions, whatever the brief.",
        "Our proactive approach guarantees a reliable, powerful and constantly evolving system. With a team of passionate people and our own workshop, we offer a personal, fast and exclusive service.",
        "Through a unique sound, we help you captivate your audience and amplify the essence of your project.",
      ],
      introClosing: "Let's create the sonic identity of your event together.",
      sections: [
        {
          id: 'brands',
          kicker: 'Brand events',
          title: 'Brands & labels.',
          text: "Launches, activations, exhibitions, showcases — we give brand events a sound of their own. The system adapts to the creative direction, the venue and the audience: precise, powerful, and visually part of the staging. From the Nike × Rassvet « Dawn Space » launch in Paris to the trailer of Netflix's « Nouvelle École » — the same standard, format after format.",
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
          title: 'Sound for nights & parties.',
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
      process: {
        kicker: 'The process',
        title: 'From your idea to your system.',
        steps: [
          { title: 'Brief & direction', text: 'We start with your event, your venue and the feeling you want to create.' },
          { title: 'Design & engineering', text: 'The system is drawn for your space — power, coverage, aesthetics.' },
          { title: 'Handcrafted build', text: 'Each cabinet is assembled and finished by hand, in our workshop.' },
          { title: 'Calibration & testing', text: 'Measured, tuned and auditioned until the sound is right.' },
          { title: 'Delivery & setup', text: 'Installed on site, seamlessly and invisibly, ready for your event.' },
        ],
      },
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
      carTitleB: 'The system in numbers',
      carText: 'Every Orange Decibel system is designed on a custom basis. The values below are given as an example for a typical configuration — every project comes with its own technical sheet.',
      specHeaderA: 'Specification',
      specHeaderB: 'Value',
      specs: [
        { label: 'Enclosure type', value: '—' },
        { label: 'Drivers', value: '—' },
        { label: 'Amplification', value: '—' },
        { label: 'Bandwidth', value: '—' },
        { label: 'Dimensions', value: '—' },
        { label: 'Weight', value: '—' },
        { label: 'Finish', value: '—' },
      ],
      img1Label: 'Speaker front',
    },
    aboutPage: {
      kicker: 'About',
      paragraphs: [
        'Founder of Orange Decibel in 2023, Sébastien Coutelas drives a High-End Sound System project born in France and now based in Paris & Milan.',
        'His concept rests on the alliance between the acoustic precision of Hi-Fi and the power and impact of professional sound reinforcement. Through Orange Decibel, he offers a complete service for the organisation and equipment of musical and cultural events.',
        'Specialised in electronic music (DJ sets and live sets), Sébastien also adapts his system for the sound reinforcement of bands and acoustic performances.',
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
      aboutTitle: 'About — Orange Decibel',
      aboutDesc: 'Orange Decibel, a sound system collective based in Paris and Milan.',
      contactTitle: 'Contact — Orange Decibel',
      contactDesc: 'Estimate your event and get in touch — Orange Decibel, Paris and Milan.',
      notFoundTitle: 'Page not found — Orange Decibel',
    },
    notFound: { code: '404', text: 'Page not found', back: 'Back to home' },
  },

  fr: {
    nav: { home: 'Accueil', activity: 'Activités', custom: 'Sur mesure', about: 'À propos', contact: 'Contact', menu: 'Menu', close: 'Fermer' },
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
      title: 'Marques, festivals, soirées et listening.',
      introParagraphs: [
        "Le son a le pouvoir d'éveiller les émotions et de transformer un événement. Il n'est pas un simple accessoire, mais le cœur battant de chaque expérience.",
        "Comprendre les lieux, les artistes et les intentions de nos clients fait partie de notre ADN : c'est ce qui nous permet de proposer des solutions sonores créatives, quelle que soit la demande.",
        "Notre approche proactive garantit un système fiable, puissant et en constante évolution. Avec une équipe de passionnés et notre atelier, nous offrons un service personnalisé, rapide et exclusif.",
        "À travers un son unique, nous vous aidons à captiver votre audience et à amplifier l'essence de votre projet.",
      ],
      introClosing: "Créons ensemble l'identité sonore de votre événement.",
      sections: [
        {
          id: 'brands',
          kicker: 'Événements de marques',
          title: 'Marques & labels.',
          text: "Lancements, activations, expositions, showcases — nous donnons aux événements de marques un son qui leur appartient. Le système s'adapte à la direction artistique, au lieu et au public : précis, puissant, et visuellement intégré à la scénographie. Du lancement Nike × Rassvet « Dawn Space » à Paris à la bande-annonce de « Nouvelle École » pour Netflix — la même exigence, format après format.",
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
          title: 'Le son des soirées.',
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
      process: {
        kicker: 'Le process',
        title: 'De votre idée à votre système.',
        steps: [
          { title: 'Brief & direction', text: "Nous partons de votre événement, de votre lieu et de l'émotion recherchée." },
          { title: 'Conception & ingénierie', text: 'Le système est dessiné pour votre espace — puissance, couverture, esthétique.' },
          { title: 'Fabrication artisanale', text: 'Chaque caisse est assemblée et finie à la main dans notre atelier.' },
          { title: 'Calibration & tests', text: "Mesuré, réglé et écouté jusqu'à ce que le son soit juste." },
          { title: 'Livraison & installation', text: 'Installé sur place, en douceur et en toute discrétion, prêt pour votre événement.' },
        ],
      },
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
      carTitleB: 'Le système en chiffres',
      carText: 'Chaque système Orange Decibel est conçu sur mesure. Les valeurs ci-dessous sont données à titre d’exemple pour une configuration type — chaque projet fait l’objet d’une fiche technique dédiée.',
      specHeaderA: 'Caractéristique',
      specHeaderB: 'Spécification',
      specs: [
        { label: 'Type d’enceinte', value: '—' },
        { label: 'Haut-parleurs', value: '—' },
        { label: 'Amplification', value: '—' },
        { label: 'Bande passante', value: '—' },
        { label: 'Dimensions', value: '—' },
        { label: 'Poids', value: '—' },
        { label: 'Finition', value: '—' },
      ],
      img1Label: 'Front d’enceinte',
    },
    aboutPage: {
      kicker: 'À propos',
      paragraphs: [
        'Fondateur d’Orange Decibel en 2023, Sébastien Coutelas pilote un projet de Sound System High-End né en France et aujourd’hui basé à Paris et à Milan.',
        'Son concept repose sur l’alliance entre la précision acoustique de la Hi-Fi et la puissance d’impact de la sonorisation professionnelle. À travers Orange Decibel, il propose une prestation globale pour l’organisation et l’équipement d’événements musicaux et culturels.',
        'Spécialisé dans les musiques électroniques (DJ sets et live sets), Sébastien adapte également son système pour la sonorisation de groupes et de prestations acoustiques.',
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
      aboutTitle: 'À propos — Orange Decibel',
      aboutDesc: 'Orange Decibel, un collectif sound system basé à Paris et à Milan.',
      contactTitle: 'Contact — Orange Decibel',
      contactDesc: 'Estimez votre événement et écrivez-nous — Orange Decibel, Paris et Milan.',
      notFoundTitle: 'Page introuvable — Orange Decibel',
    },
    notFound: { code: '404', text: 'Page introuvable', back: "Retour à l'accueil" },
  },

  it: {
    nav: { home: 'Home', activity: 'Attività', custom: 'Su misura', about: 'Chi siamo', contact: 'Contatti', menu: 'Menu', close: 'Chiudi' },
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
      title: 'Marchi, festival, serate e listening.',
      introParagraphs: [
        "Il suono ha il potere di risvegliare le emozioni e di trasformare un evento. Non è un semplice accessorio, ma il cuore pulsante di ogni esperienza.",
        "Capire i luoghi, gli artisti e le intenzioni dei nostri clienti fa parte del nostro DNA: è ciò che ci permette di proporre soluzioni sonore creative, qualsiasi sia la richiesta.",
        "Il nostro approccio proattivo garantisce un sistema affidabile, potente e in costante evoluzione. Con una squadra di appassionati e il nostro laboratorio, offriamo un servizio personalizzato, rapido ed esclusivo.",
        "Attraverso un suono unico, vi aiutiamo a catturare il vostro pubblico e ad amplificare l'essenza del vostro progetto.",
      ],
      introClosing: "Creiamo insieme l'identità sonora del vostro evento.",
      sections: [
        {
          id: 'brands',
          kicker: 'Eventi per marchi',
          title: 'Marchi & label.',
          text: "Lanci, attivazioni, mostre, showcase — diamo agli eventi dei brand un suono che appartiene loro. Il sistema si adatta alla direzione creativa, al luogo e al pubblico: preciso, potente e visivamente parte della scenografia. Dal lancio Nike × Rassvet « Dawn Space » a Parigi al trailer di « Nouvelle École » per Netflix — lo stesso standard, formato dopo formato.",
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
          title: 'Il suono delle serate.',
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
      process: {
        kicker: 'Il processo',
        title: 'Dalla tua idea al tuo sistema.',
        steps: [
          { title: 'Brief e direzione', text: "Partiamo dal tuo evento, dal luogo e dall'emozione che vuoi creare." },
          { title: 'Progettazione e ingegneria', text: 'Il sistema è disegnato per il tuo spazio — potenza, copertura, estetica.' },
          { title: 'Costruzione artigianale', text: 'Ogni cassa è assemblata e rifinita a mano nel nostro laboratorio.' },
          { title: 'Calibrazione e test', text: 'Misurato, regolato e ascoltato finché il suono è giusto.' },
          { title: 'Consegna e installazione', text: 'Installato sul posto, con fluidità e discrezione, pronto per il tuo evento.' },
        ],
      },
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
      carTitleB: 'Il sistema in numeri',
      carText: 'Ogni sistema Orange Decibel è progettato su misura. I valori qui sotto sono indicativi per una configurazione tipo — ogni progetto ha una propria scheda tecnica.',
      specHeaderA: 'Caratteristica',
      specHeaderB: 'Specifica',
      specs: [
        { label: 'Tipo di cassa', value: '—' },
        { label: 'Driver', value: '—' },
        { label: 'Amplificazione', value: '—' },
        { label: 'Banda passante', value: '—' },
        { label: 'Dimensioni', value: '—' },
        { label: 'Peso', value: '—' },
        { label: 'Finitura', value: '—' },
      ],
      img1Label: 'Fronte cassa',
    },
    aboutPage: {
      kicker: 'Chi siamo',
      paragraphs: [
        'Fondatore di Orange Decibel nel 2023, Sébastien Coutelas guida un progetto di Sound System High-End nato in Francia e oggi con base a Parigi e Milano.',
        'Il suo concept si basa sull’unione tra la precisione acustica dell’Hi-Fi e la potenza d’impatto della sonorizzazione professionale. Attraverso Orange Decibel, offre un servizio completo per l’organizzazione e l’equipaggiamento di eventi musicali e culturali.',
        'Specializzato in musiche elettroniche (DJ set e live set), Sébastien adatta il proprio sistema anche alla sonorizzazione di band e performance acustiche.',
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
