import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import ContactCta from '@/components/ContactCta';
import architectureImage from '@/assets/architecture-1.jpeg';
import context1Image from '@/assets/context-1.jpeg';
import context2Image from '@/assets/context-2.jpeg';
import heroMainImage from '@/assets/hero-main.jpeg';
import stackImage from '@/assets/stack-1.jpeg';
import detailImage from '@/assets/detail-2.jpeg';
import gallery5Image from '@/assets/gallery-5.jpeg';
import galleryCatImage from '@/assets/gallery-cat.jpeg';
import designDrawing2Image from '@/assets/design-drawing-2.jpeg';
import galleryTeal from '@/assets/gallery-teal.jpeg';
import galleryBass from '@/assets/gallery-bass.jpg';
import galleryCello from '@/assets/gallery-cello.jpg';

/**
 * PAGE ACTIVITY — fusion ex-Gallery + ex-Philosophy (17/09).
 *
 * 1. En-tête + manifeste très court (intro resserrée)
 * 2. Quatre sections thématiques (marques / festivals / soirées /
 *    listening) : texte + module photo. Le module cycle ses 3 premiers
 *    emplacements au survol (desktop, ~800 ms) ; le clic ouvre la
 *    lightbox filtrée sur la section (5 emplacements, flèches, clavier,
 *    compteur — mécanique de l'ancienne galerie réutilisée).
 * 3. Manifeste complet (ex-page philosophie, en l'état)
 * 4. What we do — grille collée 4 activités (déplacée de la home 20/09)
 * 5. Aperçu galerie — 3 photos (déplacé de la home 20/09)
 * 6. The system — trois piliers (déplacé de la home 20/09)
 * 7. CTA unique — bouton filet orange, remplissage au survol → /contact
 *
 * ⚠️ EMPLACEMENTS PHOTOS VIDES PAR CONVENTION : les noms de fichiers
 * seront fournis par le client. Les insérer dans `sectionPhotos`
 * ci-dessous (5 par section ; les 3 premiers servent au survol, les 2
 * derniers n'apparaissent que dans la lightbox). Une fois nourrie, la
 * légende lightbox utilise `cases` de la section si disponible.
 */

/** Blocs déplacés de la home (20/09) — What we do / Gallery / The system */

const activityImages = [architectureImage, context1Image, context2Image, heroMainImage];
/** Image alternative au survol (blocs 2 et 4) — façon Friendly Pressure */
const activitySwapImages: (string | null)[] = [null, galleryCatImage, null, designDrawing2Image];
/** Sur cette page, seule la cellule Custom navigue (vers /custom) ;
 *  les trois premières sont décoratives (l'activité EST cette page). */
const activityLinks: (string | null)[] = [null, null, null, '/custom'];
/** Piliers ex-philosophie — images alternées */
const pillarImages = [stackImage, detailImage, gallery5Image];
/** Filets entre cellules — grille collée serrée (1px, comme FP) */
const cellBorders = ['border-t', 'border-t border-l', 'border-t md:border-l', 'border-t border-l'];

/** Photos au survol (cycle) puis lightbox */
const HOVER_SLOTS = 3;
/** Total par section — la lightbox montre les 5 */
const LIGHTBOX_SLOTS = 5;

/** Emplacements photos par section — null = encart vide (croix fine) */
const sectionPhotos: Record<string, (string | null)[]> = {
  brands: [null, null, null, null, null],
  festivals: [null, null, null, null, null],
  nights: [null, null, null, null, null],
  listening: [null, null, null, null, null],
};

/** Encart vide — croix fine + libellé (F7) */
const EmptySlot = ({ label, n }: { label: string; n?: number }) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary/40">
    <svg
      className="h-8 w-8 text-foreground/25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M12 4v16M4 12h16" />
    </svg>
    {n !== undefined && (
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
        {label} — {String(n).padStart(2, '0')}
      </p>
    )}
  </div>
);

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
            <EmptySlot label={slotLabel} n={idx + 1} />
          </div>
        )}
      </div>

      {/* Liseré bas — compteur d'emplacements + indice d'ouverture */}
      <div className="flex items-center justify-between border-t border-foreground/15 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300 group-hover:border-foreground/40 group-hover:text-foreground">
        <span>
          {String(filled).padStart(2, '0')} / {String(LIGHTBOX_SLOTS).padStart(2, '0')}
        </span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
};

const kickerClass = 'font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground';

const Activity = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.activityTitle, t.meta.activityDesc);
  const sections = t.activityPage.sections;

  const [open, setOpen] = useState<{ section: number; index: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o ? { ...o, index: (o.index - 1 + LIGHTBOX_SLOTS) % LIGHTBOX_SLOTS } : o)),
    []
  );
  const next = useCallback(
    () => setOpen((o) => (o ? { ...o, index: (o.index + 1) % LIGHTBOX_SLOTS } : o)),
    []
  );

  // Navigation clavier + verrouillage du scroll quand la lightbox est ouverte
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

  const openPhotos = open ? sectionPhotos[sections[open.section].id] : null;
  const openSrc = openPhotos ? openPhotos[open.index] : null;

  return (
    <main className="min-h-screen">
      {/* ── En-tête + manifeste très court ────────────────────────── */}
      <section className="mx-auto max-w-none px-6 pt-24 md:px-10 md:pt-28">
        <Reveal>
          <p className={`mb-8 ${kickerClass}`}>{t.activityPage.kicker}</p>
          <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {t.activityPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {t.activityPage.introShort}
          </p>
        </Reveal>
      </section>

      {/* ── Quatre sections thématiques ───────────────────────────── */}
      <section className="mx-auto max-w-none px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24 lg:pt-28">
        <div className="flex flex-col gap-16 md:gap-24">
          {sections.map((section, i) => {
            const photos = sectionPhotos[section.id] ?? [];

            const textBlock = (
              <div>
                <p className={kickerClass}>{section.kicker}</p>
                <h2 className="mt-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                  {section.text}
                </p>
                <ul className="mt-6 space-y-1.5">
                  {section.cases.map((study) => (
                    <li
                      key={study}
                      className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-foreground/50"
                    >
                      — {study}
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <Reveal key={section.id}>
                <div
                  className={`grid items-center gap-10 md:grid-cols-12 md:gap-8 ${
                    i > 0 ? 'border-t border-foreground/15 pt-16 md:pt-24' : ''
                  }`}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div className="md:col-span-5">{textBlock}</div>
                      <div className="md:col-span-7">
                        <HoverPhotoModule
                          photos={photos}
                          slotLabel={t.activityPage.slotLabel}
                          onOpen={() => setOpen({ section: i, index: 0 })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-7 md:order-first">
                        <HoverPhotoModule
                          photos={photos}
                          slotLabel={t.activityPage.slotLabel}
                          onOpen={() => setOpen({ section: i, index: 0 })}
                        />
                      </div>
                      <div className="md:col-span-5 md:order-last">{textBlock}</div>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Manifeste complet (ex-philosophie, en l'état) ─────────── */}
      <section className="border-t border-foreground/15 px-6 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-none">
          <Reveal>
            <p className={kickerClass}>{t.philosophyPage.kicker}</p>
            <div className="mt-8 max-w-3xl space-y-8">
              {t.philosophyPage.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg font-light leading-relaxed text-foreground/75 md:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What we do — grille collée (déplacée de la home, 20/09). 
            Seule la cellule Custom navigue (vers /custom) ; les trois
            premières sont décoratives sur cette page. ──────────────── */}
      <section className="pb-16 pt-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-none px-6 md:px-10">
          <p className={`${kickerClass} mb-8 md:mb-10`}>{t.activityPage.gridKicker}</p>

          <div className="grid grid-cols-2 border-b border-foreground md:grid-cols-4">
            {t.home.activities.map((activity, i) => {
              const swap = activitySwapImages[i];
              const to = activityLinks[i];

              const cellContent = (
                <>
                  <div className="film-grain relative overflow-hidden">
                    <img
                      src={activityImages[i]}
                      alt={activity.title}
                      className={`aspect-square w-full object-cover transition-all duration-300 ${
                        swap
                          ? 'group-hover:opacity-0'
                          : 'group-hover:rounded-full group-hover:brightness-[0.55]'
                      }`}
                    />

                    {/* Voile orange — images sans swap uniquement */}
                    {!swap && (
                      <div className="absolute inset-0 z-[2] bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
                    )}

                    {/* Rond overlay façon Friendly Pressure */}
                    <div className="absolute left-1/2 top-1/2 z-[3] aspect-square h-[calc(100%-2px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {swap && (
                        <img src={swap} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  </div>

                  {/* Légende statique — mobile uniquement */}
                  <div className="mt-4 border-t border-foreground/15 pt-3 md:hidden">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors group-hover:text-primary">
                      {activity.link} →
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-light tracking-tight">
                      {activity.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                      {activity.text}
                    </p>
                  </div>

                  {/* Fiche polaroid — desktop */}
                  <div
                    className="absolute left-[-1px] top-[calc(100%-1px)] z-10 hidden h-0 w-[calc(100%+2px)] overflow-hidden bg-foreground px-0 py-0 transition-[height,padding] duration-[180ms] ease-in-out group-hover:h-24 group-hover:px-3 group-hover:py-3 md:block"
                    aria-hidden="true"
                  >
                    <p className="font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-primary">
                      {activity.link} →
                    </p>
                    <h3 className="mt-1.5 font-serif text-base font-normal leading-tight tracking-tight text-background">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-light leading-[1.25] text-background/70">
                      {activity.text}
                    </p>
                  </div>
                </>
              );

              const cellClass = `group relative block border-foreground ${cellBorders[i]}`;
              return to ? (
                <Link key={activity.title} to={to} className={cellClass}>
                  {cellContent}
                </Link>
              ) : (
                <div key={activity.title} className={cellClass}>
                  {cellContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Aperçu galerie (déplacé de la home, 20/09) — photos sans
            lien : la galerie EST cette page ───────────────────────── */}
      <section className="px-6 pb-16 md:px-10 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-none">
          <p className={kickerClass}>{t.home.galleryKicker}</p>
          <h2 className="mb-8 max-w-3xl font-serif text-2xl font-light leading-tight tracking-tight md:mb-10 md:text-4xl">
            {t.home.galleryTitle}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {[galleryTeal, galleryBass, galleryCello].map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The system — trois piliers (déplacé de la home, 20/09) ── */}
      <section className="px-6 pb-16 md:px-10 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-none">
          <p className={`${kickerClass} border-t border-foreground/15 pt-16 md:pt-24`}>
            {t.philosophyPage.pillarsKicker}
          </p>

          <div className="flex flex-col gap-16 md:gap-24">
            {t.philosophyPage.pillars.map((pillar, i) => (
              <div key={pillar.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                {i % 2 === 0 ? (
                  <>
                    <div className="film-grain group overflow-hidden md:col-span-7">
                      <img
                        src={pillarImages[i]}
                        alt={pillar.title}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-4 md:col-start-9">
                      <h2 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
                        {pillar.title}
                      </h2>
                      <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                        {pillar.text}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:col-span-4 md:col-start-2 md:order-first">
                      <h2 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
                        {pillar.title}
                      </h2>
                      <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                        {pillar.text}
                      </p>
                    </div>
                    <div className="film-grain group overflow-hidden md:col-span-7 md:col-start-6 md:order-last">
                      <img
                        src={pillarImages[i]}
                        alt={pillar.title}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — bouton « Contact us » partagé ─────────────────── */}
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
              {sections[open.section].kicker}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
              {String(open.index + 1).padStart(2, '0')} / {String(LIGHTBOX_SLOTS).padStart(2, '0')}
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
                    className="max-h-[72vh] w-auto max-w-full object-contain"
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
                  <EmptySlot label={t.activityPage.slotLabel} n={open.index + 1} />
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

export default Activity;
