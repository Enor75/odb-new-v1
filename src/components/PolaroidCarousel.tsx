import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import polaroidPhoto1 from '@/assets/photo-1.jpg';
import polaroidPhoto2 from '@/assets/photo-2.jpg';
import polaroidPhoto5 from '@/assets/photo-5.jpg';
import polaroidPhoto6 from '@/assets/photo-6.jpg';
import polaroidPhoto8 from '@/assets/photo-8.jpg';
import polaroidPhoto15 from '@/assets/photo-15.jpg';
import polaroidPhoto34 from '@/assets/photo-34.jpg';
import polaroidPhoto38 from '@/assets/photo-38.jpg';
import polaroidPhoto39 from '@/assets/photo-39.jpg';
import polaroidPhoto40 from '@/assets/photo-40.jpg';
import polaroidPhoto42 from '@/assets/photo-42.jpg';
import polaroidPhoto44 from '@/assets/photo-44.jpg';
import polaroidPhoto45 from '@/assets/photo-45.jpg';

/**
 * ── Carrousel de polaroids façon Monolith ──────────────────────────────
 * Section sticky : au scroll, chaque polaroid monte du bas de l'écran et
 * s'empale en éventail. Géométrie adaptée à la charte Orange Decibel :
 * cartes crème, filets fins, ombre longue et douce.
 *
 * UX (retour client 17/09) :
 * - la carte 0 est déjà en place à l'arrivée sur la section ;
 * - pas de cadre filet autour de la section, pas de titre — juste le
 *   kicker « Moments » ;
 * - cartes grandes : ~2/3 de la hauteur d'écran ;
 * - OPACITÉ CONTINUE : le sommet de la pile reste toujours à 1 (la
 *   dernière carte ne devient jamais transparente) ; chaque carte posée
 *   s'estompe progressivement (paliers doux 1 → 0.3 → 0.1 → 0 (cartes profondes supprimées)) au
 *   rythme exact de la montée de la suivante ; l'arrivée se fait quasi
 *   opaque (léger fondu 0.6 → 1 sur le premier quart de montée, hors
 *   champ) — modèle « première polaroid », plus de sauts brusques.
 *
 * ⚠️ Sélection provisoire (13 photos assets) — le client affinera.
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

/** Progression du scroll au sein de la section (0 → 1) */
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
    className={`relative w-full bg-foreground p-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] ${
      showCaption ? 'pb-[13%]' : 'pb-3'
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
        /* Emplacement vide — croix fine centrée */
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
        <h3 className="font-serif text-xl text-background md:text-2xl">{photo.name}</h3>
        <p className="text-sm text-background/60">{photo.subtitle}</p>
      </div>
    )}
  </div>
);

/** Sélection provisoire (13 photos) — en attente du choix définitif du client */
const carouselPhotos: CarouselPhoto[] = [
  { src: polaroidPhoto1 },
  { src: polaroidPhoto2 },
  { src: polaroidPhoto5 },
  { src: polaroidPhoto6 },
  { src: polaroidPhoto8 },
  { src: polaroidPhoto15 },
  { src: polaroidPhoto34 },
  { src: polaroidPhoto38 },
  { src: polaroidPhoto39 },
  { src: polaroidPhoto40 },
  { src: polaroidPhoto42 },
  { src: polaroidPhoto44 },
  { src: polaroidPhoto45 },
];

const PolaroidCarousel = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const n = carouselPhotos.length;
  /** Durée d'une fenêtre de montée (la carte 0 n'en consomme pas) */
  const w = 1 / (n - 1);

  /** Chaîne douce entre 4 paliers selon la couverture cumulée (0→3+) */
  const chain = (v0: number, v1: number, v2: number, v3: number, cover: number) =>
    cover <= 0
      ? v0
      : cover <= 1
        ? lerp(v0, v1, cover)
        : cover <= 2
          ? lerp(v1, v2, cover - 1)
          : lerp(v2, v3, clamp(cover - 2, 0, 1));

  /** Position/rotation/opacité d'une carte selon la progression du scroll */
  const getCardStyle = (index: number): React.CSSProperties => {
    const start = index === 0 ? 0 : (index - 1) * w;
    /* Carte 0 : posée d'office (localT = 1) — ni montée ni fondu d'arrivée */
    const localT = index === 0 ? 1 : clamp((progress - start) / w, 0, 1);
    const isActive = progress >= start;

    /* Couverture cumulée : chaque carte au-dessus entièrement posée compte
       1, celle en cours de montée compte sa fraction → tout est continu. */
    let cover = 0;
    for (let j = index + 1; j < n; j++) {
      const jStart = j === 0 ? 0 : (j - 1) * w;
      cover += clamp((progress - jStart) / w, 0, 1);
    }

    /* Montée depuis 70vh dessous — à opacité constante (modèle « première
       polaroid » : la carte arrive comme une photo qu'on pose, sans fondu) */
    const ty = !isActive ? 70 : lerp(70, 0, localT);

    /* Opacité : 1 à l'arrivée et tant que la carte est au sommet ;
       en dessous, estompage progressif à chaque nouvelle carte posée
       (paliers doux 1 → 0.3 → 0.1 → 0 (cartes profondes supprimées), aucun saut). */
    const opacity = !isActive ? 0 : chain(1, 0.3, 0.1, 0, cover);

    /* Rotation en éventail + dispersion — mêmes courbes continues */
    const dir = index % 2 === 0 ? -1 : 1;
    const rotate = dir * chain(0, 6, 8, 10, cover);
    const tx = dir * chain(0, 10, 14, 16, cover);
    const tyExtra = chain(0, 10, 14, 16, cover);

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
      style={{ height: `${n * 70}vh` }}
    >
      {/* Écran sticky : kicker + pile de polaroids (pas de cadre, pas de titre) */}
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        <p className="px-6 pt-16 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:pt-20">
          {t.carousel.kicker}
        </p>

        <div className="flex w-full flex-1 items-center justify-center">
          {/* Cartes ~2/3 de la hauteur d'écran (couverte par le plafond 85vw) */}
          <div className="relative aspect-[1/1.18] w-[min(calc(66vh-76px),85vw)]">
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
