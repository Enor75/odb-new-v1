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
/**
 * Garde les mots composés et les petits mots insécables : les tirets
 * internes deviennent U+2011 (non-breaking hyphen) et tout mot de
 * 1 à 3 lettres reste lié au mot suivant (U+00A0). « on-site » ne peut
 * plus se couper après « on », quelle que soit la largeur.
 */
const keepTogether = (text: string) =>
  text
    .replace(/(\p{L})-(\p{L})/gu, '$1\u2011$2')
    .replace(/(^|\s)(\p{L}{1,3})\s/gu, '$1$2\u00A0');

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

      {/* ── Philosophy — bio sans titre (20/09) : RESSERRÉE sous la vidéo.
            (30/09) : texte recentré avec une marge légère mais perceptible
            de chaque côté (px-4 / md:px-24) ; veille typographique
            keepTogether (mots composés et déterminants insécables —
            « on-site » ne casse plus après « on ») ; les 3 mini-modules
            savoir-faire sont SUPPRIMÉS (demande client) — seul le CTA
            « Explore » reste en bas du bloc. ─────────────────────── */}
      <section className="px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-none px-4 text-center md:px-24">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t.home.statementKicker}
          </p>
          <div className="space-y-6">
            {t.home.statementParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base font-light leading-relaxed text-foreground/80 md:text-lg"
              >
                {keepTogether(paragraph)}
              </p>
            ))}
          </div>

          {/* (30/09) les 3 mini-modules savoir-faire sont SUPPRIMÉS
              (demande client) — le CTA suit directement le texte. */}

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
