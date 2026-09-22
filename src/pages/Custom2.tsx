import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactCta from '@/components/ContactCta';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import designDrawing1 from '@/assets/design-drawing-1.png';
import designDrawing2 from '@/assets/design-drawing-2.jpeg';
import photo24 from '@/assets/photo-24.jpg';
import photo25 from '@/assets/photo-25.jpg';

/**
 * PAGE « CUSTOM 2 » (21/09) — le parcours de création en 6 phases
 * (00→05), sur la structure de garciamateo.com/custom, réinterprétée
 * avec la direction artistique ODB :
 *
 *  · RAIL DE NAVIGATION scroll-spy (desktop ≥ lg) : colonne sticky à
 *    gauche — marqueurs mono cliquables 00→05, ligne verticale 1px qui
 *    se remplit d'orange au fil du scroll (scaleY, GPU).
 *  · Chaque phase : kicker mono orange « PHASE 0N » + titre serif light
 *    + sous-titre serif italique (comme la référence) + points à filets
 *    (Reveal décalé) + encart « LIVRABLES » (hairline + fond discret).
 *  · Images DA : croquis (phase 01) et atelier (phase 04) en duo
 *    col 4, grain — identité du site.
 *  · Mobile : rail masqué, phases pleine largeur, enchaînement filets.
 *
 * TEMPORAIRE : page de comparaison avec /custom — l'une des deux sera
 * retenue (ou fusionnées) au choix final.
 */
const Custom2 = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.custom2Title, t.meta.custom2Desc);
  const c2 = t.custom2Page;

  const phaseRefs = useRef<(HTMLElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  /* Scroll-spy : phase active = dernière phase passée sous le seuil
     (40 % du viewport) ; progression = avancement dans le rail. */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      let idx = 0;
      phaseRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= threshold) idx = i;
      });
      setActive(idx);
      const rail = railRef.current;
      if (rail) {
        const r = rail.getBoundingClientRect();
        const done = Math.min(Math.max(threshold - r.top, 0), r.height);
        setProgress(r.height > 0 ? done / r.height : 0);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToPhase = (i: number) =>
    phaseRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* Duos d'images par phase (identité DA) : 01 = croquis, 04 = atelier */
  const phaseImages: Record<number, { src: string; alt: string }[]> = {
    1: [
      { src: designDrawing1, alt: c2.phases[1].title },
      { src: designDrawing2, alt: c2.phases[1].title },
    ],
    4: [
      { src: photo24, alt: c2.phases[4].title },
      { src: photo25, alt: c2.phases[4].title },
    ],
  };

  return (
    <main className="min-h-svh">
      {/* ── En-tête ── */}
      <section className="mx-auto max-w-none px-6 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {c2.kicker}
          </p>
          <h1 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
            {c2.title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            {c2.intro}
          </p>
        </Reveal>
      </section>

      {/* ── Rail (desktop) + phases ── */}
      <div className="mx-auto max-w-none px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Rail scroll-spy — sticky, ligne qui se remplit */}
          <aside className="hidden lg:col-span-2 lg:block">
            <div ref={railRef} className="sticky top-28">
              <div className="relative ml-[5px]">
                <div className="absolute bottom-2 left-0 top-2 w-px bg-foreground/15">
                  <div
                    className="absolute inset-x-0 top-0 h-full origin-top bg-primary"
                    style={{ transform: `scaleY(${progress})` }}
                  />
                </div>
                <ul className="space-y-6">
                  {c2.phases.map((ph, i) => (
                    <li key={ph.title}>
                      <button
                        onClick={() => scrollToPhase(i)}
                        className="group flex items-center gap-3 py-0.5 text-left"
                        aria-label={`${c2.phaseLabel} ${String(i).padStart(2, '0')} — ${ph.short}`}
                      >
                        <span
                          className={`h-px w-4 shrink-0 transition-colors duration-300 ${
                            i === active
                              ? 'bg-primary'
                              : 'bg-foreground/30 group-hover:bg-foreground/60'
                          }`}
                        />
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                            i === active
                              ? 'text-primary'
                              : 'text-foreground/40 group-hover:text-foreground'
                          }`}
                        >
                          {String(i).padStart(2, '0')} · {ph.short}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Phases */}
          <div className="lg:col-span-10">
            {c2.phases.map((ph, i) => (
              <section
                key={ph.title}
                ref={(el) => {
                  phaseRefs.current[i] = el;
                }}
                className="scroll-mt-24 border-t border-foreground/15 py-14 md:py-20"
              >
                <Reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                    {c2.phaseLabel} {String(i).padStart(2, '0')}
                  </p>
                  <h2 className="mt-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
                    {ph.title}
                  </h2>
                  <p className="mt-3 font-serif text-base font-light italic text-foreground/60 md:text-lg">
                    {ph.subtitle}
                  </p>
                </Reveal>

                <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-8">
                    {ph.points.map((point, j) => (
                      <Reveal key={j} delay={j * 60}>
                        <p className="border-b border-foreground/10 py-3.5 text-sm font-light leading-relaxed text-muted-foreground">
                          {point}
                        </p>
                      </Reveal>
                    ))}
                    <Reveal delay={ph.points.length * 60}>
                      <div className="mt-8 border border-foreground/15 bg-foreground/[0.04] px-4 py-3">
                        <p className="text-sm font-light text-foreground/70">
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                            {c2.deliverablesLabel}
                          </span>
                          <span className="mx-2 text-foreground/30">—</span>
                          {ph.deliverables}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {phaseImages[i] && (
                    <div className="grid grid-cols-2 gap-3 md:col-span-4">
                      {phaseImages[i].map((img, n) => (
                        <Reveal key={n} delay={n * 90}>
                          <div className="film-grain aspect-[4/5] overflow-hidden border border-foreground/10">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <ContactCta />
    </main>
  );
};

export default Custom2;
