import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage, type ActivitySectionData } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import ContactCta from '@/components/ContactCta';
import HairlineGrid from '@/components/HairlineGrid';
import photo15 from '@/assets/photo-15.jpg';
import photo1 from '@/assets/photo-1.jpg';
import photo33 from '@/assets/photo-33.jpg';
/* Photos du module des 4 activités (déplacé d'Activity, 30/09) */
import photo38 from '@/assets/photo-38.jpg';
import photo34 from '@/assets/photo-34.jpg';
import photo37 from '@/assets/photo-37.jpg';
import photo52 from '@/assets/photo-52.jpg';
import photo53 from '@/assets/photo-53.jpg';
import photo54 from '@/assets/photo-54.jpg';
import photo12 from '@/assets/photo-12.jpg';
import photo16 from '@/assets/photo-16.jpg';
import photo31 from '@/assets/photo-31.jpg';
import photo26 from '@/assets/photo-26.jpg';
import photo29 from '@/assets/photo-29.jpg';
import photo19 from '@/assets/photo-19.jpg';
import photo21 from '@/assets/photo-21.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import gallery7 from '@/assets/gallery-7.jpg';
import photo40 from '@/assets/photo-40.jpg';

/** Première photo de chaque section (réutilisation, zéro nouvel asset) —
 *  nights : emplacement vide en attente (croix fine, convention F7). */
const sectionImages: Record<string, string | null> = {
  brands: photo15,
  festivals: photo1,
  listening: photo33,
  nights: null,
};

/** ── Module des 4 activités (DÉPLACÉ d'Activity, 30/09) ─────────────
 *  Rangées alternées photo/texte ; le module cycle ses 3 premiers
 *  emplacements au survol (~800 ms) ; le clic ouvre la lightbox filtrée
 *  sur la section (flèches, clavier, compteur dynamique). */
const HOVER_SLOTS = 3;
const modulePhotos: Record<string, (string | null)[]> = {
  brands: [photo15, photo38, photo34, photo37, photo52, photo53, photo54],
  festivals: [photo1, photo12, photo16],
  nights: [null, null, null],
  listening: [photo33, photo31, photo26, photo29, photo19, photo21, gallery6, gallery7, photo40],
};

/** Module photo : cycle auto des 3 premiers emplacements au survol */
const HoverPhotoModule = ({
  photos,
  slotLabel,
  onOpen,
}: {
  photos: (string | null)[];
  slotLabel: string;
  onOpen: () => void;
}) => {
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const hoverSet = photos.slice(0, HOVER_SLOTS);
  const hasPhotos = hoverSet.some(Boolean);
  const filled = photos.filter(Boolean).length;

  useEffect(() => {
    if (!hovering || !hasPhotos) return;
    if (hoverSet.filter(Boolean).length < 2) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % HOVER_SLOTS), 800);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, hasPhotos]);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label="Open photos"
      className="group relative block w-full cursor-pointer border border-foreground bg-background text-left"
    >
      <div className="film-grain relative aspect-[4/3] overflow-hidden">
        {hoverSet.map((src, i) =>
          src ? (
            <img
              key={i}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                i === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null
        )}
        {!hoverSet[idx] && (
          <div className="absolute inset-0">
            <EmptySlot />
          </div>
        )}
      </div>

      {/* Liseré bas — compteur d'emplacements + indice d'ouverture */}
      <div className="flex items-center justify-between border-t border-foreground/15 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300 group-hover:border-foreground/40 group-hover:text-foreground">
        <span>
          {String(filled).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
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
 *
 * (30/09) : la Proposition 01 (Hairline grid) est RETENUE et vit
 * désormais sur Activity (textes centrés, composant partagé
 * HairlineGrid) ; l'ancien module des 4 activités (rangées alternées
 * photo/texte + lightbox) a été DÉPLACÉ ICI, en bas de page.
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

  /* ── Lightbox du module photo (déplacée d'Activity, 30/09) ────── */
  const [open, setOpen] = useState<{ section: number; index: number } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const prev = () =>
    setOpen((o) => {
      if (!o) return o;
      const len = (modulePhotos[sections[o.section].id] ?? []).length;
      return { ...o, index: (o.index - 1 + len) % len };
    });
  const next = () =>
    setOpen((o) => {
      if (!o) return o;
      const len = (modulePhotos[sections[o.section].id] ?? []).length;
      return { ...o, index: (o.index + 1) % len };
    });
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);
  const openPhotos = open ? modulePhotos[sections[open.section].id] : null;
  const openSrc = openPhotos ? openPhotos[open.index] : null;

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

      {/* ── Module des 4 activités (DÉPLACÉ d'Activity, 30/09) :
            rangées alternées photo/texte + lightbox ───────────────── */}
      <section className="mx-auto max-w-none px-6 pt-10 md:px-10 md:pt-14">
        <div className="flex flex-col gap-10 md:gap-14">
          {sections.map((section, i) => {
            const photos = modulePhotos[section.id] ?? [];
            const textBlock = (
              <div>
                <h2 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                  {section.text}
                </p>
                <CaseList cases={section.cases} />
              </div>
            );
            return (
              <Reveal key={section.id}>
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                  {i % 2 === 0 ? (
                    <>
                      <div className="md:col-span-7">{textBlock}</div>
                      <div className="md:col-span-5">
                        <HoverPhotoModule
                          photos={photos}
                          slotLabel={t.activityPage.slotLabel}
                          onOpen={() => setOpen({ section: i, index: 0 })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-5 md:order-first">
                        <HoverPhotoModule
                          photos={photos}
                          slotLabel={t.activityPage.slotLabel}
                          onOpen={() => setOpen({ section: i, index: 0 })}
                        />
                      </div>
                      <div className="md:col-span-7 md:order-last">{textBlock}</div>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA — bouton « Contact us » partagé ──────────────────── */}
      <ContactCta />

      {/* ── Lightbox plein écran, filtrée sur la section ──────────── */}
      {open && openPhotos && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-6 px-6 py-5 text-foreground md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
              {sections[open.section].title}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
              {String(open.index + 1).padStart(2, '0')} / {String(openPhotos.length).padStart(2, '0')}
            </p>
            <button
              onClick={close}
              aria-label="Close"
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-6 pb-8 md:px-20">
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 z-10 p-3 text-foreground/60 transition-colors hover:text-primary md:left-6"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1} />
            </button>

            <figure className="flex max-h-full flex-col items-center">
              {openSrc ? (
                <>
                  <img
                    src={openSrc}
                    alt=""
                    className="max-h-[72svh] w-auto max-w-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <figcaption className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                    {sections[open.section].cases[open.index] ??
                      `${t.activityPage.slotLabel} — ${String(open.index + 1).padStart(2, '0')}`}
                  </figcaption>
                </>
              ) : (
                <div
                  className="flex aspect-[4/3] w-full max-w-[640px] items-center justify-center border border-foreground/15"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EmptySlot />
                </div>
              )}
            </figure>

            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 z-10 p-3 text-foreground/60 transition-colors hover:text-primary md:right-6"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Activity2;
