import { useLanguage, type ActivitySectionData } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import ContactCta from '@/components/ContactCta';
import photo15 from '@/assets/photo-15.jpg';
import photo1 from '@/assets/photo-1.jpg';
import photo33 from '@/assets/photo-33.jpg';

/** Première photo de chaque section (réutilisation, zéro nouvel asset) —
 *  nights : emplacement vide en attente (croix fine, convention F7). */
const sectionImages: Record<string, string | null> = {
  brands: photo15,
  festivals: photo1,
  listening: photo33,
  nights: null,
};

/**
 * PAGE ACTIVITY 2 (22/09) — banc d'essai : 4 propositions de
 * présentation pour les 4 activités (Brand events / Festivals & live
 * stages / Listening sessions / Nights & parties), à la suite.
 *
 * L'en-tête (« Let's create the sonic identity of your event
 * together. » + intro en un bloc centré) et les descriptions/exemples
 * sont ceux de la page Activity actuelle (t.activityPage) — seule la
 * présentation change.
 *
 * Propositions issues d'un deep-dive styles.refero.design (rien de
 * cloné, aucun nouvel asset) :
 * - P1 Grille à filets — « hairline grid rules » : 4 cellules côte à
 *   côte séparées par des filets 1px partagés.
 * - P2 Catalogue industriel — teenage engineering « industrial
 *   catalogue » : rangées « ruled bands », préfixe 0N, mono uppercase
 *   whisper, un seul accent orange.
 * - P3 Cartes empilées — panneaux pleine largeur sticky qui se
 *   superposent au scroll (texte + photo / encart vide nights).
 * - P4 Double page éditoriale — Intercom « warm cream editorial
 *   spread » : display serif géant weight 300, texte décalé en
 *   colonne étroite, pas de filet dur entre les sections.
 *
 * La variante retenue remplacera la présentation d'Activity.
 */

/** Étiquette de variante — « Proposition 0N — Nom » */
const PropLabel = ({ label, n, name }: { label: string; n: number; name: string }) => (
  <p className="mb-10 mt-20 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
    <span className="text-primary">
      {label} 0{n}
    </span>{' '}
    — {name}
  </p>
);

/** Encart vide — croix fine (nights, en attente de photos) */
const EmptySlot = () => (
  <div className="flex aspect-[4/3] w-full items-center justify-center border border-foreground/15 bg-secondary/40">
    <svg
      className="h-7 w-7 text-foreground/25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M12 4v16M4 12h16" />
    </svg>
  </div>
);

/** Liste d'exemples (cases) — orange, comme sur Activity */
const CaseList = ({ cases }: { cases: string[] }) => (
  <ul className="mt-6 space-y-1.5">
    {cases.map((study) => (
      <li
        key={study}
        className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-primary"
      >
        — {study}
      </li>
    ))}
  </ul>
);

/** P1 — Grille à filets : 4 cellules, filets partagés (2×2 en md,
 *  4 colonnes en lg). */
const HairlineGrid = ({ sections }: { sections: ActivitySectionData[] }) => {
  const cellBorders = [
    '',
    'border-t md:border-t-0 md:border-l',
    'border-t lg:border-t-0 lg:border-l',
    'border-t md:border-l lg:border-t-0',
  ];
  return (
    <div className="grid border border-foreground/15 md:grid-cols-2 lg:grid-cols-4">
      {sections.map((s, i) => (
        <div key={s.id} className={`flex flex-col gap-4 border-foreground/15 p-6 md:p-8 ${cellBorders[i]}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
            {s.kicker}
          </p>
          <h3 className="font-serif text-2xl font-light tracking-tight">{s.title}</h3>
          <p className="text-sm font-light leading-relaxed text-muted-foreground">{s.text}</p>
          <CaseList cases={s.cases} />
        </div>
      ))}
    </div>
  );
};

/** P2 — Catalogue industriel : rangées « ruled bands » 1px, numéro
 *  orange, titre mono uppercase, exemples sous le titre, description
 *  à droite. */
const CatalogueTable = ({ sections }: { sections: ActivitySectionData[] }) => (
  <div className="border-t border-foreground/15">
    {sections.map((s, i) => (
      <div
        key={s.id}
        className="grid gap-3 border-b border-foreground/15 py-7 md:grid-cols-12 md:gap-6 md:py-9"
      >
        <p className="font-mono text-[10px] tracking-[0.25em] text-primary md:col-span-1">0{i + 1}</p>
        <div className="md:col-span-4">
          <h3 className="font-mono text-base font-light uppercase tracking-[0.2em]">{s.title}</h3>
          <ul className="mt-3 space-y-1">
            {s.cases.map((study) => (
              <li
                key={study}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
              >
                — {study}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm font-light leading-relaxed text-muted-foreground md:col-span-7 md:text-base">
          {s.text}
        </p>
      </div>
    ))}
  </div>
);

/** P3 — Cartes empilées : panneaux sticky top-24, bordure 1px, fond
 *  crème opaque, texte à gauche / photo (ou encart vide) à droite. */
const StackingPanels = ({ sections }: { sections: ActivitySectionData[] }) => (
  <div>
    {sections.map((s, i) => {
      const img = sectionImages[s.id];
      return (
        <div
          key={s.id}
          className="sticky top-24 mb-6 border border-foreground/15 bg-background md:mb-8"
        >
          <div className="grid gap-8 p-6 md:grid-cols-12 md:p-12">
            <div className="md:col-span-7">
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary">0{i + 1}</p>
              <h3 className="mt-4 font-serif text-3xl font-light tracking-tight md:text-5xl">
                {s.title}
              </h3>
              <p className="mt-5 max-w-lg text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                {s.text}
              </p>
              <CaseList cases={s.cases} />
            </div>
            <div className="md:col-span-5">
              {img ? (
                <div className="film-grain overflow-hidden">
                  <img src={img} alt={s.title} className="aspect-[4/3] w-full object-cover" />
                </div>
              ) : (
                <EmptySlot />
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

/** P4 — Double page éditoriale : titre display serif géant (leading
 *  0.95, weight 300), texte + exemples en colonne étroite décalée,
 *  numéros orange, séparations par l'espace uniquement. */
const EditorialSpread = ({ sections }: { sections: ActivitySectionData[] }) => (
  <div className="flex flex-col gap-16 py-4 md:gap-24">
    {sections.map((s, i) => (
      <Reveal key={s.id}>
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h3 className="font-serif text-5xl font-light leading-[0.95] tracking-tight md:col-span-7 md:text-7xl">
            {s.title}
          </h3>
          <div className="md:col-span-4 md:col-start-9">
            <p className="mb-4 font-mono text-[10px] tracking-[0.25em] text-primary">— 0{i + 1}</p>
            <p className="text-sm font-light leading-relaxed text-muted-foreground md:text-base">
              {s.text}
            </p>
            <ul className="mt-4 space-y-1">
              {s.cases.map((study) => (
                <li
                  key={study}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
                >
                  — {study}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

const Activity2 = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.activity2Title, t.meta.activity2Desc);
  const a2 = t.activity2Page;
  /* Même ordre que la page Activity (listening avant nights) */
  const SECTION_ORDER = ['brands', 'festivals', 'listening', 'nights'] as const;
  const sections = SECTION_ORDER.map(
    (id) => t.activityPage.sections.find((sec) => sec.id === id)!
  );

  return (
    <main className="min-h-svh">
      {/* ── En-tête — identique à Activity (titre + intro un bloc) ── */}
      <section className="mx-auto max-w-none px-6 pt-16 text-center md:px-10 md:pt-24">
        <Reveal>
          <h1 className="mx-auto max-w-3xl font-serif text-2xl font-light tracking-tight md:text-3xl">
            {t.activityPage.title}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-sm font-light leading-loose text-muted-foreground md:text-base md:leading-loose">
            {t.activityPage.intro}
          </p>
        </Reveal>
      </section>

      {/* ── 4 propositions de présentation ───────────────────────── */}
      <section className="mx-auto max-w-none px-6 pb-0 pt-10 md:px-10 md:pt-14">
        <PropLabel label={a2.propositionLabel} n={1} name={a2.propositionNames[0]} />
        <HairlineGrid sections={sections} />

        <PropLabel label={a2.propositionLabel} n={2} name={a2.propositionNames[1]} />
        <CatalogueTable sections={sections} />

        <PropLabel label={a2.propositionLabel} n={3} name={a2.propositionNames[2]} />
        <StackingPanels sections={sections} />

        <PropLabel label={a2.propositionLabel} n={4} name={a2.propositionNames[3]} />
        <EditorialSpread sections={sections} />
      </section>

      {/* ── CTA — bouton « Contact us » partagé ──────────────────── */}
      <ContactCta />
    </main>
  );
};

export default Activity2;
