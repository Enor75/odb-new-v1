import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PartnerLogos from '@/components/PartnerLogos';
import heroImage from '@/assets/modular-1.jpeg';
import architectureImage from '@/assets/architecture-1.jpeg';
import context1Image from '@/assets/context-1.jpeg';
import context2Image from '@/assets/context-2.jpeg';
import heroMainImage from '@/assets/hero-main.jpeg';
import galleryCatImage from '@/assets/gallery-cat.jpeg';
import designDrawing2Image from '@/assets/design-drawing-2.jpeg';
import galleryTeal from '@/assets/gallery-teal.jpeg';
import galleryBass from '@/assets/gallery-bass.jpg';
import galleryCello from '@/assets/gallery-cello.jpg';

const activityImages = [architectureImage, context1Image, context2Image, heroMainImage];
/** Image alternative au survol (blocs 2 et 4) — façon Friendly Pressure */
const activitySwapImages: (string | null)[] = [null, galleryCatImage, null, designDrawing2Image];
const activityLinks = ['/gallery', '/gallery', '/philosophy', '/custom'];
/** Filets entre cellules — grille collée serrée (1px, comme FP) */
const cellBorders = ['border-t', 'border-t border-l', 'border-t md:border-l', 'border-t border-l'];

const kickerClass = 'mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground';
const arrowLinkClass =
  'group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-primary';

/**
 * LANDING HOME — convention design :
 * volontairement SANS animation au scroll (pas de composant Reveal ici).
 * Les hovers sophistiqués sont autorisés partout.
 */
const Index = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* ── Hero : image nue plein écran ─────────────────────────── */}
      <section className="relative h-[100svh]">
        <img
          src={heroImage}
          alt="Orange Décibel Sound System"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Voiles pour la lisibilité du header et de la légende */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-6 px-6 md:bottom-10 md:px-10">
          <div className="mx-auto flex max-w-[1200px] items-end justify-between text-foreground">
            <p className="animate-fade-in text-[11px] uppercase tracking-[0.25em] opacity-90 md:text-xs">
              {t.hero.caption}
            </p>
            <p className="hidden animate-fade-in items-center gap-2 text-[11px] uppercase tracking-[0.25em] opacity-90 md:flex">
              {t.hero.scroll}
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            </p>
          </div>
        </div>
      </section>

      {/* ── Déclaration serif ────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className={kickerClass}>01 — {t.home.statementKicker}</p>
          <h1 className="max-w-4xl font-serif text-3xl font-light leading-[1.15] tracking-tight md:text-5xl">
            {t.home.statementTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {t.home.statementText}
          </p>
          <Link to="/philosophy" className={`${arrowLinkClass} mt-6`}>
            {t.home.statementLink}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>

      {/* ── Activités — grille collée façon Friendly Pressure ────── */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className={`${kickerClass} mb-8 md:mb-10`}>02 — {t.home.activitiesKicker}</p>

          <div className="grid grid-cols-2 border-b border-foreground/60 md:grid-cols-4">
            {t.home.activities.map((activity, i) => {
              const swap = activitySwapImages[i];

              return (
                <Link
                  key={activity.title}
                  to={activityLinks[i]}
                  className={`group relative block border-foreground/60 ${cellBorders[i]}`}
                >
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

                    {/* Rond overlay façon Friendly Pressure : cercle centré,
                        anneau crème 1px — contient l'image alternative (blocs
                        2 et 4) ou encercle l'image assombrie (blocs 1 et 3). */}
                    <div className="absolute left-1/2 top-1/2 z-[3] aspect-square h-[calc(100%-2px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {swap && (
                        <img src={swap} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  </div>

                  {/* Légende statique — mobile uniquement (comme FP en mobile) */}
                  <div className="mt-4 border-t border-foreground/20 pt-3 md:hidden">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors group-hover:text-primary">
                      0{i + 1} — {activity.link} →
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-light tracking-tight">
                      {activity.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                      {activity.text}
                    </p>
                  </div>

                  {/* Fiche polaroid — desktop, façon FP mais prononcée :
                      carte crème plein contraste à texte sombre, hauteur 96px,
                      dépassement latéral 1px, transition height/padding 250ms. */}
                  <div
                    className="absolute left-[-1px] top-[calc(100%-1px)] z-10 hidden h-0 w-[calc(100%+2px)] overflow-hidden bg-foreground px-0 py-0 transition-[height,padding] duration-[250ms] ease-in-out group-hover:h-24 group-hover:px-3 group-hover:py-3 md:block"
                    aria-hidden="true"
                  >
                    <p className="font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-primary">
                      0{i + 1} — {activity.link} →
                    </p>
                    <h3 className="mt-1.5 font-serif text-base font-normal leading-tight tracking-tight text-background">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-light leading-[1.25] text-background/70">
                      {activity.text}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Aperçu galerie ───────────────────────────────────────── */}
      <section className="px-6 pb-16 md:px-10 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <p className={kickerClass}>03 — {t.home.galleryKicker}</p>
          <h2 className="mb-8 max-w-3xl font-serif text-2xl font-light leading-tight tracking-tight md:mb-10 md:text-4xl">
            {t.home.galleryTitle}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {[galleryTeal, galleryBass, galleryCello].map((src, i) => (
              <Link key={i} to="/gallery" className="group block overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
              </Link>
            ))}
          </div>

          <Link to="/gallery" className={`${arrowLinkClass} mt-10`}>
            {t.home.galleryLink}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>

      {/* ── Mur de marques partenaires — bas de la home ──────────── */}
      <section className="border-t border-foreground/10 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className={kickerClass}>04 — {t.home.partnersKicker}</p>
          <h2 className="mb-12 max-w-2xl font-serif text-2xl font-light tracking-tight md:mb-16 md:text-3xl">
            {t.home.partnersTitle}
          </h2>
          <PartnerLogos />
        </div>
      </section>
    </main>
  );
};

export default Index;
