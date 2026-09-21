import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * ── Carrousel horizontal « Selected Work » ────────────────────────────
 * Mécanique du template Lovable Editorial Portfolio (section épinglée :
 * le scroll vertical fait défiler la bande vers la gauche), adaptée à
 * la philosophie minimaliste OD : rail épurée — toutes les images à la
 * même hauteur, centrées sur un axe horizontal, gouttière constante.
 * Barre de progression, label vertical, ombre + légende au survol.
 *
 * ⚠️ Images provisoires (assets du projet) — à remplacer par les photos
 * choisies par le client.
 */

const WorkCarousel = ({ items }: { items: { src: string }[] }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [stripWidth, setStripWidth] = useState(0);
  const [viewportW, setViewportW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const [viewportH, setViewportH] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Respect de prefers-reduced-motion (transitions coupées) */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* Mesure de la bande + viewport */
  useEffect(() => {
    const measure = () => {
      if (stripRef.current) setStripWidth(stripRef.current.scrollWidth);
      setViewportW(window.innerWidth);
      setViewportH(window.innerHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* Progression du scroll dans la section (0 → 1) */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / scrollable)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overflow = Math.max(0, stripWidth - viewportW);
  const translateX = -progress * overflow;

  /* Hauteur de la section : distance horizontale × 0.6 + un écran */
  const sectionHeight = Math.max(300, overflow * 0.6 + viewportH);

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-label={t.aboutPage.workLabel}
      className="relative w-full bg-background"
      style={{ height: `${sectionHeight}px` }}
    >
      {/* Écran épinglé */}
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-background">
        {/* Label vertical — desktop */}
        <div className="absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block md:left-12">
          <div className="-rotate-90 origin-center whitespace-nowrap">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {t.aboutPage.workLabel}
            </span>
          </div>
        </div>
        {/* Label horizontal — mobile */}
        <div className="absolute left-6 top-8 z-10 lg:hidden">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {t.aboutPage.workLabel}
          </span>
        </div>

        {/* Rail d'images — hauteur uniforme, axe central, gouttière constante */}
        <div
          ref={stripRef}
          className="flex h-full items-center gap-8 pl-20 pr-20 md:gap-10 md:pl-28 lg:pl-36"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: reducedMotion ? 'none' : 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        >
          {items.map((item, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                className="group relative flex h-[280px] flex-shrink-0 items-center md:h-[420px]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="film-grain relative h-full overflow-hidden"
                  style={{
                    boxShadow: isHovered
                      ? '0 25px 80px rgba(0, 0, 0, 0.45)'
                      : '0 8px 30px rgba(0, 0, 0, 0.25)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src={item.src}
                    alt=""
                    loading={i < 8 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-auto object-cover"
                  />
                </div>
                {/* Légende au survol — mono, façon galerie */}
                <div
                  className="absolute -bottom-8 left-0 transition-all duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
                  }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">
                    © Orange Decibel — {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Barre de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/5">
          <div
            className="h-full bg-foreground/20"
            style={{
              width: `${progress * 100}%`,
              transition: reducedMotion ? 'none' : 'width 0.1s ease-out',
            }}
          />
        </div>

        {/* Indication scroll — disparaît dès qu'on avance */}
        <div
          className="absolute bottom-8 right-8 flex items-center gap-2 text-muted-foreground transition-opacity duration-500"
          style={{ opacity: progress < 0.1 ? 1 : 0 }}
        >
          <span className="text-xs tracking-wide">{t.aboutPage.scrollHint}</span>
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;
