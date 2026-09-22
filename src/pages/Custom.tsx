import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactCta from '@/components/ContactCta';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import designDrawing1 from '@/assets/design-drawing-1.png';
import designDrawing2 from '@/assets/design-drawing-2.jpeg';
import detail1 from '@/assets/detail-1.jpeg';
import photo24 from '@/assets/photo-24.jpg';
import photo25 from '@/assets/photo-25.jpg';
import gallery3 from '@/assets/gallery-3.jpeg';
import stack1 from '@/assets/stack-1.jpeg';
import gallery2 from '@/assets/gallery-2.jpeg';

/**
 * Page Custom — design des enceintes sur mesure.
 * Structure inspirée de stoneacoustic.com :
 *  · article magazine (titre fort, filet, 3 colonnes de texte
 *    avec mini-photos) — pattern « Concepteurs » de Stone
 *  · 3 blocs Matériaux / Design / Système son — hover façon Friendly
 *    Pressure : fiche polaroid crème qui se déplie sous l'image
 *    (SANS cercle, contrairement à la home), légende statique mobile
 *  · bloc Caractéristiques façon « carnet de conception » : fond de
 *    page, descriptif + specs aux lignes épaisses à gauche,
 *    2 images min-h 450px à droite (encarts vides en attente de photos)
 *
 * ⚠️ Images provisoires (assets du projet) — remplacer par les photos
 * d'atelier, croquis et drawings du client quand elles arriveront.
 */
const Custom = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.customTitle, t.meta.customDesc);
  const cp = t.customPage;

  /* Images provisoires — en attente des vraies photos d'atelier */
  /* Atelier (option A client 21/09) : 1 croquis + photos atelier */
  const miniImages = [designDrawing1, photo24, photo25];
  const blockImages = [gallery3, stack1, gallery2];

  /* Carrousel des 4 enceintes (21/09) — fiche technique + 2 emplacements
     photos par enceinte, flèches ‹ ›. */
  const [speaker, setSpeaker] = useState(0);
  const sp = cp.speakers[speaker];
  const cycleSpeaker = (dir: number) =>
    setSpeaker((i) => (i + dir + cp.speakers.length) % cp.speakers.length);
  const arrowBtn =
    'flex h-10 w-10 items-center justify-center border border-foreground/15 font-mono text-base text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground';

  const sectionTitle = (strong: string, rest: string) => (
    <h2 className="font-serif text-2xl font-light leading-snug tracking-tight md:text-4xl">
      <span className="font-normal">{strong}</span>
      <br />
      <span className="text-foreground/60">{rest}</span>
    </h2>
  );

  return (
    <main className="min-h-svh">
      {/* ── En-tête ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-none px-6 pt-24 md:px-10 md:pt-28">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {cp.kicker}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {cp.title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
            {cp.subtitle}
          </p>
        </Reveal>
      </div>

      {/* ── Article magazine (pattern « Concepteurs ») ──────────── */}
      <section className="mx-auto mt-12 max-w-none px-6 md:mt-16 md:px-10">
        <Reveal>{sectionTitle(cp.magTitleA, cp.magTitleB)}</Reveal>
        <div className="my-4 h-px w-full bg-foreground/15 md:my-6" />
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {cp.magColumns.map((col, i) => (
            <Reveal key={col.title} delay={i * 100}>
              <p className="text-base font-light leading-relaxed text-foreground/75">
                {col.text}
              </p>
              <div className="film-grain mt-8 overflow-hidden">
                <img
                  src={miniImages[i]}
                  alt={col.title}
                  className="h-[40svh] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/40">
                {col.title}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3 blocs : fiche polaroid au survol (FP sans cercle) ─── */}
      <section className="mx-auto mt-14 max-w-none px-6 pb-16 md:mt-20 md:px-10 md:pb-24">
        <Reveal>{sectionTitle(cp.blocksTitleA, cp.blocksTitleB)}</Reveal>
        <div className="my-4 h-px w-full bg-foreground/15 md:my-6" />
        <div className="grid gap-4 md:grid-cols-3">
          {cp.blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 100}>
              <div className="group relative">
                <div className="film-grain overflow-hidden">
                  <img
                    src={blockImages[i]}
                    alt={block.title}
                    className="h-[35svh] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Fiche polaroid — se déplie sous l'image au survol (desktop) */}
                <div className="absolute left-[-1px] top-[calc(100%-1px)] z-10 hidden w-[calc(100%+2px)] grid-rows-[0fr] transition-[grid-template-rows] duration-[180ms] ease-in-out group-hover:grid-rows-[1fr] md:grid">
                  <div className="overflow-hidden bg-foreground">
                    <div className="px-3 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                        {cp.kicker}
                      </p>
                      <h3 className="mt-1 font-serif text-base text-background">
                        {block.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-background/70">
                        {block.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Légende statique mobile */}
                <div className="mt-4 border-t border-foreground/15 pt-3 md:hidden">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 transition-colors group-hover:text-primary">
                    {cp.kicker}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-foreground">{block.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                    {block.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Le chemin de création — process en 5 étapes (20/09) :
            le client se projette dans la construction de ses enceintes. */}
      <section className="mx-auto mt-16 max-w-none px-6 md:mt-24 md:px-10">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {cp.process.kicker}
          </p>
          <h2 className="max-w-2xl font-serif text-2xl font-light tracking-tight md:text-4xl">
            {cp.process.title}
          </h2>
        </Reveal>
        <div className="mt-10 border-b border-foreground/15 md:mt-14">
          {cp.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60}>
              <div className="grid gap-3 border-t border-foreground/15 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <p className="font-mono text-[11px] tracking-[0.25em] text-primary md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-xl font-light tracking-tight md:col-span-4 md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Caractéristiques : carnet de conception — CARROUSEL des 4
            enceintes (21/09) : flèches ‹ › pour faire défiler fiche
            technique + 2 emplacements photos côte à côte (vides pour
            l'instant). Largeur des specs RÉDUITE pour laisser place aux
            deux images à droite (cf. stoneacoustic.com). Le sous-titre
            « The system in numbers » a été supprimé. ──────────────── */}
      <section>
        <div className="mx-auto max-w-none px-6 pt-12 pb-0 md:px-10 md:pt-20">
          <Reveal>
            <h2 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
              {cp.carTitleA}
            </h2>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-foreground/75">
              {cp.carText}
            </p>
          </Reveal>

          <Reveal delay={100}>
            {/* Contrôles mobile : ‹ compteur › */}
            <div className="mt-8 flex items-center justify-between md:hidden">
              <button onClick={() => cycleSpeaker(-1)} aria-label="Enceinte précédente" className={arrowBtn}>
                ‹
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                {String(speaker + 1).padStart(2, '0')} / {String(cp.speakers.length).padStart(2, '0')}
              </span>
              <button onClick={() => cycleSpeaker(1)} aria-label="Enceinte suivante" className={arrowBtn}>
                ›
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-12 md:gap-4">
              {/* Flèche gauche — desktop */}
              <button
                onClick={() => cycleSpeaker(-1)}
                aria-label="Enceinte précédente"
                className={`${arrowBtn} hidden self-center md:col-span-1 md:flex`}
              >
                ‹
              </button>

              {/* Fiche technique (largeur réduite : col 5/12) */}
              <div className="md:col-span-5" key={`spec-${speaker}`}>
                <div className="odb-slide-in">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                      {sp.name}
                    </p>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 md:block">
                      {String(speaker + 1).padStart(2, '0')} / {String(cp.speakers.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-between border-b-[3px] border-foreground pb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                      <span>{cp.specHeaderA}</span>
                      <span>{cp.specHeaderB}</span>
                    </div>
                    {(
                      [
                        ['type', cp.specLabels.type],
                        ['drivers', cp.specLabels.drivers],
                        ['amplification', cp.specLabels.amplification],
                        ['bandwidth', cp.specLabels.bandwidth],
                        ['dimensions', cp.specLabels.dimensions],
                        ['weight', cp.specLabels.weight],
                        ['finish', cp.specLabels.finish],
                      ] as const
                    ).map(([key, label]) => (
                      <div
                        key={key}
                        className="flex items-baseline justify-between gap-4 border-b border-foreground py-3"
                      >
                        <span className="shrink-0 text-sm font-light text-foreground/90">{label}</span>
                        <span className="max-w-[62%] text-right text-sm font-light text-foreground/50">
                          {sp[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2 emplacements photos côte à côte (vides — croix fine) */}
              <div className="grid grid-cols-2 gap-3 md:col-span-5" key={`img-${speaker}`}>
                {[0, 1].map((n) => (
                  <div
                    key={n}
                    className="odb-slide-in flex aspect-[4/5] flex-col items-center justify-center border border-foreground/10 bg-foreground/[0.04]"
                    style={{ animationDelay: `${n * 90}ms` }}
                  >
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
                    <p className="mt-3 px-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                      {cp.photoLabel}
                    </p>
                  </div>
                ))}
              </div>

              {/* Flèche droite — desktop */}
              <button
                onClick={() => cycleSpeaker(1)}
                aria-label="Enceinte suivante"
                className={`${arrowBtn} hidden self-center md:col-span-1 md:flex`}
              >
                ›
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA — bouton « Contact us » partagé ─────────────────── */}
      <ContactCta />
    </main>
  );
};

export default Custom;
