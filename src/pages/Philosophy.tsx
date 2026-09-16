import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import stackImage from '@/assets/stack-1.jpeg';
import detailImage from '@/assets/detail-2.jpeg';
import gallery5Image from '@/assets/gallery-5.jpeg';

const pillarImages = [stackImage, detailImage, gallery5Image];

const kickerClass = 'mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground';

const Philosophy = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.philosophyTitle, t.meta.philosophyDesc);

  return (
    <main className="min-h-screen">
      {/* ── En-tête + manifeste ──────────────────────────────────── */}
      <section className="px-6 pb-16 pt-24 md:px-10 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className={kickerClass}>{t.philosophyPage.kicker}</p>
            <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
              {t.philosophyPage.title}
            </h1>
          </Reveal>

          <div className="mt-16 max-w-3xl space-y-8 md:mt-24">
            {t.philosophyPage.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-lg font-light leading-relaxed text-foreground/75 md:text-xl">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Les trois piliers ────────────────────────────────────── */}
      <section className="px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className={`${kickerClass} border-t border-foreground/15 pt-16 md:pt-24`}>
              {t.philosophyPage.pillarsKicker}
            </p>
          </Reveal>

          <div className="flex flex-col gap-16 md:gap-24">
            {t.philosophyPage.pillars.map((pillar, i) => (
              <Reveal key={pillar.title}>
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                  {i % 2 === 0 ? (
                    <>
                      <div className="film-grain group overflow-hidden md:col-span-7">
                        <img
                          src={pillarImages[i]}
                          alt={pillar.title}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-4 md:col-start-9">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/40">
                          0{i + 1}
                        </p>
                        <h2 className="mt-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
                          {pillar.title}
                        </h2>
                        <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                          {pillar.text}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-4 md:col-start-2 md:order-first">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/40">
                          0{i + 1}
                        </p>
                        <h2 className="mt-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
                          {pillar.title}
                        </h2>
                        <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                          {pillar.text}
                        </p>
                      </div>
                      <div className="group overflow-hidden md:col-span-7 md:col-start-6 md:order-last">
                        <img
                          src={pillarImages[i]}
                          alt={pillar.title}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-foreground/15 px-6 py-16 text-center md:px-10 md:py-24">
        <Reveal>
          <Link
            to="/contact"
            className="group inline-block font-serif text-3xl font-light leading-[1.05] tracking-tight transition-colors duration-300 hover:text-primary md:text-5xl"
          >
            {t.philosophyPage.ctaTitle}
            <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2 md:ml-5">
              →
            </span>
          </Link>
          <div className="mt-8">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-primary"
            >
              {t.philosophyPage.ctaLink}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default Philosophy;
