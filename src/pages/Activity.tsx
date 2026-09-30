import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import ContactCta from '@/components/ContactCta';
import HairlineGrid from '@/components/HairlineGrid';

/**
 * PAGE ACTIVITY — VITRINE (30/09).
 *
 * Activity est la page de production ; Activity 2 (/activity-2) est la
 * zone d'expérimentation d'où proviennent les présentations.
 *
 * Structure :
 * 1. En-tête — titre « Sonic identity service for musical and cultural
 *    events — a modular system designed around each space. » + intro
 *    en un seul bloc centré (max-w-5xl ≈ 5 lignes).
 * 2. Grille à filets — la Proposition 01 d'Activity 2, retenue par le
 *    client, avec textes CENTRÉS dans chaque case (composant partagé
 *    HairlineGrid).
 * 3. CTA « Contact us ».
 *
 * Historique : l'ancien module des 4 activités (rangées alternées
 * photo/texte + lightbox au survol) a été DÉPLACÉ vers Activity 2.
 */
const Activity = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.activityTitle, t.meta.activityDesc);
  /* Même ordre que la page Activity 2 (listening avant nights) */
  const SECTION_ORDER = ['brands', 'festivals', 'listening', 'nights'] as const;
  const sections = SECTION_ORDER.map(
    (id) => t.activityPage.sections.find((sec) => sec.id === id)!
  );

  return (
    <main className="min-h-svh">
      {/* ── En-tête — titre + intro en un bloc centré ─────────────── */}
      <section className="mx-auto max-w-none px-6 pt-16 text-center md:px-10 md:pt-24">
        <Reveal>
          <h1 className="mx-auto max-w-4xl font-serif text-2xl font-light tracking-tight md:text-3xl">
            {t.activityPage.title}
          </h1>
          <p className="mx-auto mt-8 max-w-5xl text-sm font-light leading-loose text-muted-foreground md:text-base md:leading-loose">
            {t.activityPage.intro}
          </p>
        </Reveal>
      </section>

      {/* ── Grille à filets — Proposition 01 (activity-2), centrée ── */}
      <section className="mx-auto max-w-none px-6 pb-0 pt-10 md:px-10 md:pt-14">
        <Reveal>
          <HairlineGrid sections={sections} centered />
        </Reveal>
      </section>

      {/* ── CTA — bouton « Contact us » partagé ──────────────────── */}
      <ContactCta />
    </main>
  );
};

export default Activity;
