import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import PartnerLogos from '@/components/PartnerLogos';
import Ticker from '@/components/Ticker';
import ContactCta from '@/components/ContactCta';
import heroVideoFrame from '@/assets/hero-video-frame.jpg';

const kickerClass = 'mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground';
const arrowLinkClass =
  'group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-primary';

/**
 * LANDING HOME — convention design :
 * volontairement SANS animation au scroll (pas de composant Reveal ici).
 * Les hovers sophistiqués sont autorisés partout.
 *
 * Structure (20/09, ajusté) : hero VIDÉO puis Philosophy RESSERRÉE
 * pleine largeur (CTA « Explore » centré en bas du bloc), puis Partners.
 * (vidéo : `public/videos/compressO-OdB-compressed.mp4`,
 * upload manuel client — poster puis fallback image automatique tant que
 * le fichier est absent). POSTER = PREMIÈRE FRAME DE LA VIDÉO (20/09,
 * extraite en 2560×1440) : plus de flash de l'ancienne photo pendant les
 * premiers ms de chargement. Chaîne : vidéo → Philosophy (pleine largeur,
 * CTA « Explore » centré en bas) → Partners & Collaborators → Ticker →
 * CTA « Contact us ». Les blocs What we do / Gallery / The system ont
 * été déplacés sur Activity (20/09).
 */
const Index = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.indexTitle, t.meta.indexDesc);
  // Vidéo hero : fallback image si le fichier est absent ou illisible
  const [videoAvailable, setVideoAvailable] = useState(true);

  return (
    <main className="min-h-svh">
      {/* ── Hero : vidéo plein écran (poster/image en attendant l'upload) ── */}
      <section className="relative h-[100svh]">
        {videoAvailable ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroVideoFrame}
            aria-label="Orange Decibel Sound System"
            className="absolute inset-0 h-full w-full object-cover transform-gpu"
            onError={() => setVideoAvailable(false)}
          >
            <source
              src={`${import.meta.env.BASE_URL}videos/compressO-OdB-compressed.mp4`}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={heroVideoFrame}
            alt="Orange Decibel Sound System"
            className="absolute inset-0 h-full w-full object-cover transform-gpu"
          />
        )}
        {/* Voiles pour la lisibilité du header et de la légende */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-6 px-6 md:bottom-10 md:px-10">
          <div className="mx-auto flex max-w-none items-end justify-between text-foreground">
            <p className="animate-fade-in text-[11px] uppercase tracking-[0.25em] opacity-90 md:text-xs">
              {t.hero.caption}
            </p>
            {/* Scroll cue — fine barre verticale animée (S6) */}
            <div className="hidden animate-fade-in md:flex" aria-hidden="true">
              <span className="relative h-12 w-px overflow-hidden bg-foreground/30">
                <span className="absolute left-0 top-0 h-1/2 w-px animate-scroll-cue bg-foreground" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy — bio sans titre (20/09) : RESSERRÉE sous la vidéo,
            PLEINE LARGEUR (plus de colonne max-w : le texte utilise toute
            la largeur du site), 4 textes savoir-faire en grille, CTA
            « Explore » centré en bas du bloc. ──────────────────────── */}
      <section className="px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-none text-center">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t.home.statementKicker}
          </p>
          <div className="space-y-6">
            {t.home.statementParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base font-light leading-relaxed text-foreground/80 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Les 4 savoir-faire (ex-« At a glance » d'Activity, 20/09) —
              textes seuls, sans images ni titres, pleine largeur. */}
          <div className="mt-12 grid gap-6 border-t border-foreground/15 pt-10 text-left sm:grid-cols-2 lg:grid-cols-4">
            {t.home.activities.map((activity) => (
              <p
                key={activity.title}
                className="text-sm font-light leading-relaxed text-muted-foreground"
              >
                {activity.text}
              </p>
            ))}
          </div>

          {/* CTA « Explore » — centré au milieu du site, bas du bloc (20/09) */}
          <div className="mt-12 flex justify-center md:mt-16">
            <Link to="/activity" className={arrowLinkClass}>
              {t.home.galleryLink}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mur de marques partenaires — sous Philosophy (20/09) ──── */}
      <section className="border-t border-foreground/15 px-6 pb-20 pt-16 md:px-10 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-none">
          <p className={`${kickerClass} text-center`}>{t.home.partnersKicker}</p>
          <h2 className="mx-auto mb-12 max-w-2xl text-center font-serif text-2xl font-light tracking-tight md:mb-16 md:text-3xl">
            {t.home.partnersTitle}
          </h2>
          <PartnerLogos />
        </div>
      </section>

      {/* Ticker — collé au mur de marques (S9) */}
      <Ticker items={t.ticker} />

      {/* ── CTA — bouton « Contact us » partagé ─────────────────── */}
      <ContactCta />
    </main>
  );
};

export default Index;
