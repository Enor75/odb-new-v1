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
    statementTitle: string;
    statementText: string;
    statementLink: string;
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
    introShort: string;
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
      statementTitle: "It's about how the space feels.",
      statementText:
        'Orange Decibel is a High-End Sound System born in France from the idea of combining Hi-Fi precision and clarity with the power and impact of professional sound.',
      statementLink: 'Our philosophy',
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
      introShort: 'Orange Decibel is a High-End Sound System born in France — Hi-Fi precision and professional power, for brands, festivals, nights and listening sessions.',
      sections: [
        {
          id: 'brands',
          kicker: 'Brand events',
          title: 'Brands & labels.',
          text: 'Launch nights, collaborations, exhibitions and DJ sets — we design the sound of brand events, in France and in Italy. From the Nike × Rassvet « Dawn Space » collaborative launch in Paris to video productions for Netflix — the trailer of « Nouvelle École » — the same care for every format.',
          cases: ['Nike × Rassvet — « Dawn Space », Paris', 'Netflix — « Nouvelle École », trailer'],
        },
        {
          id: 'festivals',
          kicker: 'Festivals',
          title: 'Festivals & live stages.',
          text: "Complete systems for festivals and live stages — power and clarity at every scale. The Fête de la Musique with Superbock × Halfpipe at the Cirque d'hiver, Paris.",
          cases: ["Superbock × Halfpipe — Fête de la Musique, Cirque d'hiver, Paris"],
        },
        {
          id: 'nights',
          kicker: 'Night sound',
          title: 'Sound for nights & parties.',
          text: 'Club nights, warehouse parties, late sessions — sound for nights that go long. Warehouse nights with Loophole in Paris, the Fête de la Musique with Urban Outfitters × Foundation FM × M0NDIAL.',
          cases: ['Soirée Loophole — Warehouse, Paris', 'Urban Outfitters × Foundation FM × M0NDIAL — Fête de la Musique'],
        },
        {
          id: 'listening',
          kicker: 'Listening',
          title: 'Listening sessions.',
          text: 'Shared listening, live experimental sound, performances and films — quiet attention, precise reproduction. The inaugural edition of Salomon Listening Grounds: international artists from the experimental sound scene, for a night of live sound, performances, films and shared listening.',
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
      statementTitle: "Ce qui compte, c'est ce que l'espace fait ressentir.",
      statementText:
        "Orange Decibel est un système son Haut de Gamme né en France de l'idée de combiner la précision et la clarté Hi-Fi avec la puissance et l'impact du son professionnel.",
      statementLink: 'Notre philosophie',
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
      introShort: "Orange Decibel est un sound system haut de gamme né en France — précision Hi-Fi et puissance professionnelle, pour les marques, les festivals, les soirées et les listening.",
      sections: [
        {
          id: 'brands',
          kicker: 'Événements de marques',
          title: 'Marques & labels.',
          text: "Soirées de lancement, collaborations, expositions et DJ sets — nous concevons le son des événements de marques, en France et en Italie. Du lancement collaboratif Nike × Rassvet « Dawn Space » à Paris aux productions vidéo pour Netflix — la bande-annonce de « Nouvelle École » — le même soin pour chaque format.",
          cases: ['Nike × Rassvet — « Dawn Space », Paris', 'Netflix — « Nouvelle École », bande-annonce'],
        },
        {
          id: 'festivals',
          kicker: 'Festivals',
          title: 'Festivals & scènes live.',
          text: "Des systèmes complets pour les festivals et les scènes live — puissance et clarté à toutes les échelles. La Fête de la Musique avec Superbock × Halfpipe au Cirque d'hiver, Paris.",
          cases: ["Superbock × Halfpipe — Fête de la Musique, Cirque d'hiver, Paris"],
        },
        {
          id: 'nights',
          kicker: 'Sonorisation de soirée',
          title: 'Le son des soirées.',
          text: "Nuits de club, warehouse parties, sessions tardives — le son des soirées qui durent. Soirées warehouse avec Loophole à Paris, la Fête de la Musique avec Urban Outfitters × Foundation FM × M0NDIAL.",
          cases: ['Soirée Loophole — Warehouse, Paris', 'Urban Outfitters × Foundation FM × M0NDIAL — Fête de la Musique'],
        },
        {
          id: 'listening',
          kicker: 'Listening',
          title: "Sessions d'écoute.",
          text: "Écoute partagée, son live expérimental, performances et films — attention tranquille, reproduction précise. L'édition inaugurale de Salomon Listening Grounds : des artistes internationaux de la scène sonore expérimentale, pour une soirée de son live, de performances, de films et d'écoute partagée.",
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
      statementTitle: 'Conta come lo spazio si fa sentire.',
      statementText:
        "Orange Decibel è un High-End Sound System nato in Francia dall'idea di unire la precisione e la chiarezza dell'Hi-Fi con la potenza e l'impatto del suono professionale.",
      statementLink: 'La nostra filosofia',
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
      introShort: "Orange Decibel è un sound system di alta gamma nato in Francia — precisione Hi-Fi e potenza professionale, per marchi, festival, serate e listening.",
      sections: [
        {
          id: 'brands',
          kicker: 'Eventi per marchi',
          title: 'Marchi & label.',
          text: "Serate di lancio, collaborazioni, esposizioni e DJ set — progettiamo il suono degli eventi dei marchi, in Francia e in Italia. Dal lancio collaborativo Nike × Rassvet « Dawn Space » a Parigi alle produzioni video per Netflix — il trailer di « Nouvelle École » — la stessa cura per ogni formato.",
          cases: ['Nike × Rassvet — « Dawn Space », Parigi', 'Netflix — « Nouvelle École », trailer'],
        },
        {
          id: 'festivals',
          kicker: 'Festival',
          title: 'Palchi live & festival.',
          text: "Sistemi completi per festival e palchi live — potenza e chiarezza a ogni scala. La Fête de la Musique con Superbock × Halfpipe al Cirque d'hiver, Parigi.",
          cases: ["Superbock × Halfpipe — Fête de la Musique, Cirque d'hiver, Parigi"],
        },
        {
          id: 'nights',
          kicker: 'Sonorizzazione serate',
          title: 'Il suono delle serate.',
          text: "Notti di club, warehouse party, sessioni fino a tardi — il suono delle serate che durano. Serate warehouse con Loophole a Parigi, la Fête de la Musique con Urban Outfitters × Foundation FM × M0NDIAL.",
          cases: ['Soirée Loophole — Warehouse, Parigi', 'Urban Outfitters × Foundation FM × M0NDIAL — Fête de la Musique'],
        },
        {
          id: 'listening',
          kicker: 'Listening',
          title: "Sessioni d'ascolto.",
          text: "Ascolto condiviso, suono live sperimentale, performance e film — attenzione quieta, riproduzione precisa. L'edizione inaugurale di Salomon Listening Grounds: artisti internazionali della scena sonora sperimentale, per una serata di live, performance, film e ascolto condiviso.",
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
