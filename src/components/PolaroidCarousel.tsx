import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import polaroidPhoto1 from '@/assets/photo-1.jpg';
import polaroidPhoto2 from '@/assets/photo-14.jpg';
import polaroidPhoto3 from '@/assets/photo-28.jpg';
import polaroidPhoto4 from '@/assets/photo-42.jpg';

/**
 * ── Carrousel de polaroids façon Monolith ──────────────────────────────
 * Section sticky de 350vh : au scroll, chaque polaroid monte du bas de
 * l'écran puis s'empale en éventail (rotations alternées) pendant que le
 * suivant arrive. Géométrie extraite du template Monolith (About), adaptée
 * à la charte Orange Décibel : cartes crème, filets fins, Fraunces.
 *
 * ⚠️ EMPLACEMENTS VIDES — les photos et légendes seront choisies par le
 * client plus tard. Renseigner `src` et éventuellement name/subtitle.
 */

interface CarouselPhoto {
  /** Image à afficher — null = emplacement vide en attente de photo */
  src: string | null;
  /** Nom affiché dans le bandeau du polaroid (dernière carte seulement) */
  name?: string;
  subtitle?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** Progression du scroll au sein de la section haute (0 → 1) */
function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollable = ref.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(clamp(scrolled / scrollable, 0, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}

/** Carte polaroid : cadre crème, photo carrée, bandeau de légende en bas */
const PolaroidCard = ({
  photo,
  showCaption,
}: {
  photo: CarouselPhoto;
  showCaption: boolean;
}) => (
  <div
    className={`relative w-[280px] bg-foreground p-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] md:w-[340px] ${
      showCaption ? 'pb-16' : 'pb-3'
    }`}
  >
    <div className="relative z-[4] aspect-square overflow-hidden bg-background">
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.name || 'Photo'}
          className="h-full w-full object-cover"
        />
      ) : (
        /* Emplacement vide — croix fine centrée (F7) */
        <div className="relative flex h-full w-full items-center justify-center bg-secondary/40">
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
        </div>
      )}
    </div>
    {showCaption && photo.name && photo.subtitle && (
      <div className="absolute bottom-3 left-3 right-3 border-t border-background/25 pt-2">
        <h3 className="font-serif text-lg md:text-xl text-background">{photo.name}</h3>
        <p className="text-sm text-background/60">{photo.subtitle}</p>
      </div>
    )}
  </div>
);

/** Photos assets (fusion 17/09) — remplaçables par la sélection client */
const carouselPhotos: CarouselPhoto[] = [
  { src: polaroidPhoto1 },
  { src: polaroidPhoto2 },
  { src: polaroidPhoto3 },
  { src: polaroidPhoto4 },
];

const PolaroidCarousel = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const n = carouselPhotos.length;
  const step = 1 / n;

  /** Position/rotation/opacité d'une carte selon la progression du scroll */
  const getCardStyle = (index: number): React.CSSProperties => {
    const start = index * step;
    const end = (index + 1) * step;
    const localT = clamp((progress - start) / step, 0, 1);
    const isActive = progress >= start;
    const cardsPassed = Math.max(
      0,
      Math.floor((progress - end) / step) + (progress >= end ? 1 : 0)
    );
    const isCurrent = progress >= start && progress < end;

    /* Monte du bas de l'écran (70vh) vers sa position de repos */
    let ty: number;
    if (!isActive) ty = 70;
    else if (isCurrent) ty = lerp(70, 0, localT);
    else ty = 0;

    /* Devient opaque en arrivant, se fonce quand les suivantes passent dessus */
    let opacity: number;
    if (!isActive) opacity = 0.3;
    else if (isCurrent) opacity = lerp(0.3, 1, localT);
    else if (cardsPassed === 0) opacity = 1;
    else if (cardsPassed === 1) opacity = lerp(1, 0.45, localT);
    else opacity = 0.2;

    /* Rotation en éventail une fois dépassée, direction alternée */
    let rotate = 0;
    if (isActive && !isCurrent && cardsPassed >= 1) {
      const dir = index % 2 === 0 ? -1 : 1;
      rotate =
        cardsPassed === 1 ? lerp(0, dir * 6, localT) : dir * (cardsPassed === 2 ? 8 : 10);
    }

    /* Petit décalage de dispersion pour l'effet d'empilement */
    let tx = 0;
    let tyExtra = 0;
    if (isActive && !isCurrent && cardsPassed >= 1 && index < n - 1) {
      tx = (index % 2 === 0 ? -1 : 1) * (cardsPassed === 1 ? 10 : 15);
      tyExtra = cardsPassed === 1 ? 10 : 15;
    }

    const zIndex = isActive ? 10 + index : 1;

    return {
      transform: `translateX(${tx}px) translateY(calc(${ty}vh + ${tyExtra - 50}px)) rotate(${rotate}deg)`,
      opacity,
      zIndex,
      transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
      willChange: 'transform, opacity',
    };
  };

  return (
    <section
      ref={sectionRef}
      aria-label={t.carousel.kicker}
      className="relative"
      style={{ height: `${n * 87.5}vh` }}
    >
      {/* Filets du cadre — desktop uniquement */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute top-4 left-4 right-4 h-px bg-foreground/15" />
        <div className="absolute bottom-4 left-4 right-4 h-px bg-foreground/15" />
        <div className="absolute top-4 bottom-4 left-4 w-px bg-foreground/15" />
        <div className="absolute top-4 bottom-4 right-4 w-px bg-foreground/15" />
      </div>

      {/* Écran sticky : titre + pile de polaroids */}
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        <div className="mb-8 px-6 pt-20 text-center md:mb-12 md:pt-24">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t.carousel.kicker}
          </p>
          <h2 className="mx-auto max-w-3xl font-serif text-2xl font-light leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t.carousel.titleA}
            <span className="text-muted-foreground">{t.carousel.titleB}</span>
          </h2>
        </div>

        <div className="flex w-full flex-1 items-center justify-center">
          <div className="relative h-[360px] w-[280px] md:h-[440px] md:w-[340px]">
            {carouselPhotos.map((photo, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={getCardStyle(i)}
              >
                <PolaroidCard photo={photo} showCaption={i === n - 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolaroidCarousel;
