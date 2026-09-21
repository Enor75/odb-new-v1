import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import PolaroidCarousel from '@/components/PolaroidCarousel';
import ContactCta from '@/components/ContactCta';
import sebastien from '@/assets/sebastien.jpg';
import stackImage from '@/assets/stack-1.jpeg';
import detailImage from '@/assets/detail-2.jpeg';
import gallery5Image from '@/assets/gallery-5.jpeg';

/** Piliers « The system » (déplacés d'Activity, 20/09) */
const pillarImages = [stackImage, detailImage, gallery5Image];
import WorkCarousel from '@/components/WorkCarousel';
import gallery1 from '@/assets/gallery-1.jpeg';
import gallery2 from '@/assets/gallery-2.jpeg';
import gallery3 from '@/assets/gallery-3.jpeg';
import gallery4 from '@/assets/gallery-4.jpeg';
import galleryBass from '@/assets/gallery-bass.jpg';
import galleryCello from '@/assets/gallery-cello.jpg';
import galleryTeal from '@/assets/gallery-teal.jpeg';
import detail1 from '@/assets/detail-1.jpeg';
import context1 from '@/assets/context-1.jpeg';
import context2 from '@/assets/context-2.jpeg';
import architecture1 from '@/assets/architecture-1.jpeg';
import stack1 from '@/assets/stack-1.jpeg';

/**
 * Page About — simple et concise.
 * Photo de Sébastien sur le premier tiers gauche, texte à droite,
 * puis le carrousel horizontal « Selected Work » (extrait du template
 * Lovable Editorial Portfolio) sur toute la largeur.
 *
 * ⚠️ La photo de Sébastien est un emplacement vide en attente du
 * portrait définitif. Les images du carrousel sont provisoires.
 */

/* Images provisoires du carrousel — en attente de la sélection du client */
const workItems = [
  galleryTeal,
  gallery1,
  context1,
  galleryBass,
  stack1,
  gallery2,
  architecture1,
  galleryCello,
  detail1,
  gallery3,
  context2,
  gallery4,
];

/** Selected Work désactivé provisoirement (17/09) — basculer à true pour réactiver */
const showSelectedWork = false;

const About = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.aboutTitle, t.meta.aboutDesc);
  const ap = t.aboutPage;

  return (
    <main className="min-h-svh">
      {/* ── Portrait à gauche / texte à droite ─────────────────── */}
      <section className="mx-auto max-w-none px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
          {/* Premier tiers gauche : photo de Sébastien */}
          <Reveal className="md:col-span-4" delay={100}>
            <div className="film-grain relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={sebastien}
                alt="Sébastien Coutelas"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Droite : texte — plus de titre, juste le kicker « About » en gras */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={150}>
              <p className="mb-8 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {ap.kicker}
              </p>
              <div className="flex max-w-2xl flex-col gap-6">
                {ap.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-base font-light leading-relaxed text-foreground/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The system — trois piliers (déplacé d'Activity, 20/09 ;
            images réduites 21/09 : colonne 6→4, ~33 % du conteneur) ── */}
      <section className="mx-auto max-w-none px-6 pb-16 md:px-10 md:pb-24">
        <p className="mb-6 border-t border-foreground/15 pt-16 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:pt-24">
          {t.philosophyPage.pillarsKicker}
        </p>
        <div className="flex flex-col gap-16 md:gap-24">
          {t.philosophyPage.pillars.map((pillar, i) => (
            <div key={pillar.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
              {i % 2 === 0 ? (
                <>
                  <div className="film-grain group overflow-hidden md:col-span-4">
                    <img
                      src={pillarImages[i]}
                      alt={pillar.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-6 md:col-start-6">
                    <h2 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
                      {pillar.title}
                    </h2>
                    <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                      {pillar.text}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-6 md:col-start-2 md:order-first">
                    <h2 className="font-serif text-2xl font-light tracking-tight md:text-3xl">
                      {pillar.title}
                    </h2>
                    <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                      {pillar.text}
                    </p>
                  </div>
                  <div className="film-grain group overflow-hidden md:col-span-4 md:col-start-9 md:order-last">
                    <img
                      src={pillarImages[i]}
                      alt={pillar.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA — bouton « Contact us » (module 3, avant les polaroids) */}
      <ContactCta />

      {/* ── Carrousel de polaroids (module 4, en fin de page) ────── */}
      <PolaroidCarousel />

      {/* ── Carrousel « Selected Work » — DÉSACTIVÉ provisoirement (17/09).
          Réactiver : passer showSelectedWork à true (les images provisoires
          restent en place dans workItems ci-dessus). */}
      {showSelectedWork && <WorkCarousel items={workItems.map((src) => ({ src }))} />}

    </main>
  );
};

export default About;
