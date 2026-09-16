import { Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';
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

const About = () => {
  const { t } = useLanguage();
  const ap = t.aboutPage;

  return (
    <main className="min-h-screen">
      {/* ── Portrait à gauche / texte à droite ─────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {ap.kicker}
          </p>
        </Reveal>

        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8">
          {/* Premier tiers gauche : photo de Sébastien */}
          <Reveal className="md:col-span-4" delay={100}>
            <div className="film-grain relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-secondary/40">
              <div className="absolute inset-4 border border-dashed border-foreground/25" />
              <div className="text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-foreground/30" strokeWidth={1} />
                <p className="mt-4 px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                  {ap.photoLabel}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Droite : nom, rôle, texte */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={150}>
              <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
                {ap.title}
              </h1>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                {ap.role}
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-10 flex max-w-2xl flex-col gap-6">
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

      {/* ── Carrousel « Selected Work » — pleine largeur ───────── */}
      <WorkCarousel items={workItems.map((src) => ({ src }))} />
    </main>
  );
};

export default About;
