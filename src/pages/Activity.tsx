import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import ContactCta from '@/components/ContactCta';
import HairlineGrid, { buildSlides } from '@/components/HairlineGrid';
import { sectionPhotos } from '@/data/sectionPhotos';

/**
 * PAGE ACTIVITY — VITRINE.
 *
 * Structure :
 * 1. En-tête — titre « Sonic identity service for musical and cultural
 *    events — a modular system designed around each space. » + intro
 *    en un seul bloc centré.
 * 2. Grille à filets (Proposition 01 retenue), textes centrés —
 *    DESKTOP : chaque case se termine par une flèche ↓ qui ouvre le
 *    carrousel de la section (photos ponctuées de texte explicatif) ;
 *    au survol, une étiquette « Voir » suit le curseur.
 *    MOBILE : pas de flèche — sous la grille, un bloc par activité :
 *    exemples + photos en défilement horizontal.
 * 3. CTA « Contact us ».
 *
 * Sections (30/09) : Brand events · Festivals & lives · Listening ·
 * Tournage (ex-nights, id i18n inchangé 'nights').
 * L'ancien module des 4 activités (rangées alternées + lightbox) vit
 * sur Activity 2 (banc d'essai).
 */
const Activity = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.activityTitle, t.meta.activityDesc);
  const SECTION_ORDER = ['brands', 'festivals', 'listening', 'nights'] as const;
  const sections = SECTION_ORDER.map(
    (id) => t.activityPage.sections.find((sec) => sec.id === id)!
  );

  /* Slides par section (photos + textes explicatifs) */
  const slidesOf = useCallback(
    (sectionId: string) =>
      buildSlides(
        sectionPhotos[sectionId] ?? [],
        sections.find((s) => s.id === sectionId)?.cases ?? [],
        t.activityPage.slotLabel
      ),
    [sections, t]
  );

  /* ── Carrousel desktop ── */
  const [open, setOpen] = useState<{ section: number; slide: number } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const openSlides = open ? slidesOf(sections[open.section].id) : null;
  const prev = () =>
    setOpen((o) => (o && openSlides ? { ...o, slide: (o.slide - 1 + openSlides.length) % openSlides.length } : o));
  const next = () =>
    setOpen((o) => (o && openSlides ? { ...o, slide: (o.slide + 1) % openSlides.length } : o));

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

  const slide = openSlides && open ? openSlides[open.slide] : null;

  return (
    <main className="min-h-svh">
      {/* ── En-tête — titre + intro en un bloc centré ─────────────── */}
      <section className="mx-auto max-w-none px-6 pt-16 text-center md:px-10 md:pt-24">
        <Reveal>
          <h1 className="mx-auto max-w-4xl font-serif text-2xl font-light tracking-tight md:text-3xl">
            {t.activityPage.title}
          </h1>
          <p className="mx-auto mt-8 max-w-5xl text-sm font-light leading-loose text-muted-foreground md:text-base md:leading-loose">
            {t.activityPage.intro}
          </p>
        </Reveal>
      </section>

      {/* ── Grille à filets — textes centrés, flèches desktop ────── */}
      <section className="mx-auto max-w-none px-6 pb-0 pt-10 md:px-10 md:pt-14">
        <Reveal>
          <HairlineGrid
            sections={sections}
            centered
            casesMode="arrow"
            viewLabel={t.activityPage.viewLabel}
            onOpenCase={(i) => setOpen({ section: i, slide: 0 })}
          />
        </Reveal>

        {/* ── MOBILE : exemples + photos en défilement horizontal ──
            (pas de clic « Voir » sur mobile — demande client) */}
        <div className="mt-10 flex flex-col gap-8 md:hidden">
          {sections.map((s) => {
            const photos = (sectionPhotos[s.id] ?? []).filter(Boolean) as string[];
            return (
              <div key={s.id} className="border-t border-foreground/15 pt-6">
                <h3 className="font-serif text-xl font-light tracking-tight">{s.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {s.cases.map((study) => (
                    <li
                      key={study}
                      className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-primary"
                    >
                      — {study}
                    </li>
                  ))}
                </ul>
                {photos.length > 0 && (
                  <div className="snap-x snap-mandatory overflow-x-auto">
                    <div className="mt-4 flex w-max gap-3 pb-2">
                      {photos.map((src, i) => (
                        <div key={i} className="film-grain w-40 shrink-0 snap-start overflow-hidden">
                          <img
                            src={src}
                            alt=""
                            className="aspect-[4/3] w-full object-cover"
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA — bouton « Contact us » partagé ──────────────────── */}
      <ContactCta />

      {/* ── Carrousel desktop — photos ponctuées de texte ─────────── */}
      {open && openSlides && slide && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={sections[open.section].title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-6 px-6 py-5 text-foreground md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
              {sections[open.section].title}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
              {String(open.slide + 1).padStart(2, '0')} / {String(openSlides.length).padStart(2, '0')}
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
              aria-label="Previous"
              className="absolute left-2 z-10 p-3 text-foreground/60 transition-colors hover:text-primary md:left-6"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1} />
            </button>

            {slide.kind === 'photo' ? (
              <figure className="flex max-h-full flex-col items-center">
                <img
                  src={slide.src}
                  alt=""
                  className="max-h-[72svh] w-auto max-w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <figcaption className="mt-5 max-w-xl text-center font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-foreground/60">
                  {slide.caption}
                </figcaption>
              </figure>
            ) : (
              <figure
                className="max-w-xl text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <blockquote className="font-serif text-2xl font-light leading-snug tracking-tight text-foreground md:text-4xl">
                  {slide.text}
                </blockquote>
              </figure>
            )}

            <button
              onClick={next}
              aria-label="Next"
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
