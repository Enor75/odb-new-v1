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
 *  · RAIL « RÈGLE » scroll-spy (desktop ≥ lg, refonte 21/09) : colonne
 *    ÉTROITE (1/12) sticky — épine verticale 1px remplie d'orange au
 *    scroll + ticks horizontaux par phase avec ONDE DE PROXIMITÉ au
 *    survol (CodePen NWVvNqy : 40×4px spring, voisins ±1/±2) + labels
 *    mono flottants au survol.
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
  const tickRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  /* Hauteur remplie de l'épine verticale (px) — atteint le tick i quand
     la phase i s'active (bug 21/09 : l'ancien calcul mesurait l'élément
     sticky, dont le top se fige à 112px -> progression gelée à ~83 %). */
  const [fill, setFill] = useState(0);
  /* Tick survolé (rail) — onde de proximité façon CodePen NWVvNqy :
     le tick survolé grandit (spring), ses voisins ±1 et ±2 réagissent. */
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  /* Scroll-spy : phase active = dernière phase passée sous le seuil
     (40 % du viewport). REMPLISSAGE DE L'ÉPINE : la ligne atteint le
     tick i quand la phase i s'active, avec interpolation douce entre
     deux activations (mesure des positions réelles des ticks dans le
     rail — plus aucune dépendance au rect de l'élément sticky). */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      let idx = 0;
      const docTops = phaseRefs.current.map(
        (el) => (el ? el.getBoundingClientRect().top + window.scrollY : 0)
      );
      phaseRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= threshold) idx = i;
      });
      setActive(idx);

      const rail = railRef.current;
      const rel = rail?.firstElementChild as HTMLElement | null;
      if (rail && rel) {
        const n = phaseRefs.current.length;
        const SPINE_TOP = 12; // top-3 de l'épine
        const tickY = (i: number) => {
          const li = tickRefs.current[i];
          return li ? li.offsetTop + li.offsetHeight / 2 - SPINE_TOP : 0;
        };
        // position de scroll (doc) à laquelle la phase i s'active
        const A = (i: number) => docTops[i] - threshold;
        const y = window.scrollY;
        let target = 0;
        if (y >= A(n - 1)) {
          target = tickY(n - 1);
        } else if (y > A(0)) {
          const t = Math.min(
            1,
            Math.max(0, (y - A(idx)) / Math.max(1, A(idx + 1) - A(idx)))
          );
          target = tickY(idx) + t * (tickY(idx + 1) - tickY(idx));
        }
        setFill(Math.max(0, Math.min(target, rel.clientHeight - 24)));
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
      <div className="mx-auto max-w-none px-6 pb-0 pt-14 md:px-10 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Rail « régle » (21/09, refonte) : épine verticale 1px qui se
              remplit d'orange au scroll + ticks horizontaux par phase.
              Onde de proximité (CodePen NWVvNqy) : tick survolé 40×4px
              (spring), voisins ±1 30×3px, ±2 20×2px ; label flottant au
              survol. Colonne ÉTROITE (1/12) pour laisser la place aux
              phases. */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div ref={railRef} className="sticky top-28">
              <div className="relative">
                <div className="absolute bottom-3 left-0 top-3 w-px bg-foreground/15">
                  <div
                    className="absolute inset-x-0 top-0 bg-primary"
                    style={{ height: `${fill}px` }}
                  />
                </div>
                <ul className="space-y-9">
                  {c2.phases.map((ph, i) => {
                    const d = hoverIdx === null ? 9 : Math.abs(i - hoverIdx);
                    const isActive = i === active;
                    const w = isActive && d > 2 ? 24 : d === 0 ? 40 : d === 1 ? 30 : d === 2 ? 20 : 15;
                    const h = isActive && d > 2 ? 2 : d === 0 ? 4 : d === 1 ? 3 : d === 2 ? 2 : 1;
                    const bg = isActive
                      ? 'hsl(var(--primary))'
                      : d === 0
                        ? 'hsl(var(--foreground))'
                        : `hsl(var(--foreground) / ${d === 1 ? 0.55 : d === 2 ? 0.4 : 0.3})`;
                    return (
                      <li
                        key={ph.title}
                        ref={(el) => {
                          tickRefs.current[i] = el;
                        }}
                        onMouseEnter={() => setHoverIdx(i)}
                        onMouseLeave={() => setHoverIdx(null)}
                      >
                        <button
                          onClick={() => scrollToPhase(i)}
                          className="relative flex h-5 items-center"
                          aria-label={`${c2.phaseLabel} ${String(i).padStart(2, '0')} — ${ph.short}`}
                        >
                          <span
                            className="block rounded-full"
                            style={{
                              width: `${w}px`,
                              height: `${h}px`,
                              backgroundColor: bg,
                              transition:
                                'width 300ms cubic-bezier(0.34, 1.56, 0.64, 1), height 300ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 200ms linear',
                            }}
                          />
                          <span
                            className={`pointer-events-none absolute left-12 z-20 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                              d === 0 ? 'translate-x-2 opacity-100' : 'translate-x-0 scale-75 opacity-0'
                            }`}
                            style={{
                              transformOrigin: 'left center',
                              color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.75)',
                            }}
                          >
                            {String(i).padStart(2, '0')} · {ph.short}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* Phases */}
          <div className="lg:col-span-11">
            {c2.phases.map((ph, i) => (
              <section
                key={ph.title}
                ref={(el) => {
                  phaseRefs.current[i] = el;
                }}
                className={`scroll-mt-24 border-t border-foreground/15 pt-14 md:pt-20 ${
                  i === c2.phases.length - 1 ? 'pb-0' : 'pb-14 md:pb-20'
                }`}
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
