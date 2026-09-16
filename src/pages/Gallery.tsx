import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';
import PolaroidCarousel from '@/components/PolaroidCarousel';
import gallery1 from '@/assets/gallery-1.jpeg';
import gallery2 from '@/assets/gallery-2.jpeg';
import gallery3 from '@/assets/gallery-3.jpeg';
import gallery4 from '@/assets/gallery-4.jpeg';
import gallery5 from '@/assets/gallery-5.jpeg';
import gallery6 from '@/assets/gallery-6.jpg';
import gallery7 from '@/assets/gallery-7.jpg';
import gallery8 from '@/assets/gallery-8.jpeg';
import galleryBass from '@/assets/gallery-bass.jpg';
import galleryCat from '@/assets/gallery-cat.jpeg';
import galleryCello from '@/assets/gallery-cello.jpg';
import galleryTeal from '@/assets/gallery-teal.jpeg';
import designDrawing1 from '@/assets/design-drawing-1.png';
import designDrawing2 from '@/assets/design-drawing-2.jpeg';
import detail1 from '@/assets/detail-1.jpeg';

interface Photo {
  src: string;
  /** ⚠️ Légendes PLACEHOLDER (EN) — à remplacer par les vraies descriptions */
  caption: string;
  /** Image pleine largeur (rupture rythmique, alignée sur la grille) */
  wide?: boolean;
  contain?: boolean;
}

const caption = (n: number) => `© Orange Décibel — ${String(n).padStart(2, '0')}`;

/* Grille épurée : 2 colonnes alignées, ratios uniformes, gouttières
   constantes. Seules les images `wide` prennent toute la largeur. */
const photos: Photo[] = [
  { src: galleryTeal, caption: 'Reference monitor — workshop' },
  { src: galleryBass, caption: 'Double bass system — live setup' },
  { src: galleryCello, caption: 'Cello performance — amplified acoustic set' },
  { src: gallery1, caption: 'Full system — event, Milan' },
  { src: gallery7, caption: 'System at full scale — main stage', wide: true },
  { src: gallery2, caption: 'Stack detail — mid-high section' },
  { src: gallery3, caption: 'Cabinet — birch ply finish' },
  { src: gallery4, caption: 'Modular configuration — three-way' },
  { src: gallery5, caption: 'System in context — private event' },
  { src: detail1, caption: 'Handcrafted detail — driver mount' },
  { src: gallery8, caption: 'Modular array — configuration study' },
  { src: galleryCat, caption: 'System in context — club night', wide: true },
  { src: designDrawing1, caption: 'Technical drawing — cabinet plan', contain: true },
  { src: designDrawing2, caption: 'Design study — prototype sketch' },
  { src: gallery6, caption: 'Night session — low light' },
];

/** Point de coupe de la grille : le carrousel s'insère après cette photo */
const SPLIT_AT = 9;

const gridClass = (photo: Photo) => (photo.wide ? 'md:col-span-3' : '');
const aspectClass = (photo: Photo) =>
  photo.wide ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[4/5]';

const Gallery = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((a) => (a === null ? null : (a - 1 + photos.length) % photos.length)),
    []
  );
  const next = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % photos.length)),
    []
  );

  // Navigation clavier + verrouillage du scroll quand le lightbox est ouvert
  useEffect(() => {
    if (active === null) return;

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
  }, [active, close, prev, next]);

  const renderGrid = (from: number, to: number) => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
      {photos.slice(from, to).map((photo, i) => (
        <Reveal key={photo.src + i} className={gridClass(photo)}>
          <figure className="group cursor-zoom-in" onClick={() => setActive(from + i)}>
            <div className="film-grain overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className={`w-full object-cover ${aspectClass(photo)} ${
                  photo.contain ? 'bg-foreground/[0.04] object-contain p-4' : ''
                }`}
              />
            </div>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.25em] text-foreground/40 transition-colors duration-300 group-hover:text-foreground/70">
              {caption(from + i + 1)}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen">
      {/* ── Partie haute : en-tête + première moitié de la grille ── */}
      <div className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10 md:pt-28">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t.galleryPage.kicker}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {t.galleryPage.title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light text-muted-foreground">
            {t.galleryPage.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16">{renderGrid(0, SPLIT_AT)}</div>
      </div>

      {/* ── Milieu de page : carrousel de polaroids façon Monolith ── */}
      <PolaroidCarousel />

      {/* ── Partie basse : seconde moitié de la grille ── */}
      <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        {renderGrid(SPLIT_AT, photos.length)}
      </div>

      {/* ── Lightbox plein écran ─────────────────────────────────── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between px-6 py-5 text-foreground md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
              {String(active + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
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
              <img
                src={photos[active].src}
                alt={photos[active].caption}
                className="max-h-[72vh] w-auto max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <figcaption className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                {photos[active].caption} — © Orange Décibel
              </figcaption>
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

export default Gallery;
