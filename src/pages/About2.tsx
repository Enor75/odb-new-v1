import { useLanguage, type Pillar } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import PolaroidCarousel from '@/components/PolaroidCarousel';
import ContactCta from '@/components/ContactCta';
import sebastien from '@/assets/sebastien.jpg';
import photo24 from '@/assets/photo-24.jpg';
import detailImage from '@/assets/detail-2.jpeg';
import gallery5Image from '@/assets/gallery-5.jpeg';

/* Piliers « The system » — mêmes images que About (aucun nouvel asset) */
const pillarImages = [photo24, detailImage, gallery5Image];

/**
 * PAGE ABOUT 2 (22/09) — banc d'essai : « The system » À LA VERTICALE.
 *
 * La page About présente aujourd'hui les 3 adjectifs (Handcrafted,
 * Precision, Modularity) en lignes horizontales alternées photo/texte.
 * Cette page démontre 4 présentations VERTICALES, à la suite les unes
 * des autres dans l'emplacement des adjectifs (entre la bio et les
 * polaroids « Moments »), chacune étiquetée pour arbitrage client.
 *
 * Références du style (deep-dive, rien de cloné) :
 * - Stone Acoustic (stoneacoustic.com) : sections empilées — kicker
 *   mono + titre serif + paragraphe, un concept par bloc → P2.
 * - Studio type awwwards (Exo Ape, Obys, Locomotive) : grands mots
 *   display empilés plein cadre, texte décalé → P1 / P4.
 * - garciamateo.com/custom (référence Custom 2) : liste numérotée
 *   verticale à filets → P1 / P3.
 * - Rail « régle » Custom 2 (CodePen haraldev) : index à filets,
 *   accent orange au survol → P3.
 *
 * P1 Pile éditoriale numérotée · P2 Manifeste centré · P3 Index à
 * filets · P4 Empilement pleine hauteur. Le client choisit, la
 * variante retenue remplacera The system sur About.
 */

/** Étiquette de variante — « Proposition 01 — Nom » */
const PropLabel = ({ label, n, name }: { label: string; n: number; name: string }) => (
  <p className="mb-10 mt-20 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
    <span className="text-primary">
      {label} 0{n}
    </span>{' '}
    — {name}
  </p>
);

/** P1 — Pile éditoriale numérotée : rangées pleine largeur, numéro
 *  orange, adjectif en grand serif, texte calé à droite, filets. */
const EditorialStack = ({ pillars }: { pillars: Pillar[] }) => (
  <div>
    {pillars.map((p, i) => (
      <Reveal key={p.title}>
        <div className="grid gap-4 border-t border-foreground/15 py-10 md:grid-cols-12 md:gap-8 md:py-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary md:col-span-1">
            0{i + 1}
          </p>
          <h3 className="font-serif text-4xl font-light tracking-tight md:col-span-6 md:text-5xl">
            {p.title}
          </h3>
          <p className="self-center text-sm font-light leading-relaxed text-muted-foreground md:col-span-5 md:text-base">
            {p.text}
          </p>
        </div>
      </Reveal>
    ))}
    <div className="border-t border-foreground/15" aria-hidden="true" />
  </div>
);

/** P2 — Manifeste centré : chaque adjectif seul au centre, numéro
 *  orange, texte aéré dessous — façon sections empilées Stone Acoustic. */
const CenteredManifesto = ({ pillars }: { pillars: Pillar[] }) => (
  <div className="flex flex-col items-center gap-16 py-4 text-center md:gap-24">
    {pillars.map((p, i) => (
      <Reveal key={p.title}>
        <div className="mx-auto max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            0{i + 1}
          </p>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-tight md:text-4xl">
            {p.title}
          </h3>
          <p className="mt-4 text-sm font-light leading-loose text-muted-foreground md:text-base">
            {p.text}
          </p>
        </div>
      </Reveal>
    ))}
  </div>
);

/** P3 — Index à filets : ligne par adjectif, adjectif en mono
 *  uppercase, texte à droite, tout l'item passe orange au survol
 *  (écho du rail « régle » Custom 2). */
const HairlineIndex = ({ pillars }: { pillars: Pillar[] }) => (
  <ul>
    {pillars.map((p, i) => (
      <li
        key={p.title}
        className="group grid items-baseline gap-2 border-t border-foreground/15 py-6 md:grid-cols-12 md:gap-8 md:py-8"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/40 transition-colors duration-300 group-hover:text-primary md:col-span-1">
          0{i + 1}
        </p>
        <h3 className="font-mono text-sm uppercase tracking-[0.25em] transition-colors duration-300 group-hover:text-primary md:col-span-4">
          {p.title}
        </h3>
        <p className="text-sm font-light leading-relaxed text-muted-foreground md:col-span-7 md:text-base">
          {p.text}
        </p>
      </li>
    ))}
    <li className="border-t border-foreground/15" aria-hidden="true" />
  </ul>
);

/** P4 — Empilement pleine hauteur : un bloc ~65svh par adjectif,
 *  très grand serif, texte décalé en bas, petite photo en médaillon —
 *  façon panneaux studio plein écran. */
const FullHeightStack = ({ pillars, images }: { pillars: Pillar[]; images: string[] }) => (
  <div>
    {pillars.map((p, i) => (
      <section
        key={p.title}
        className="-mx-6 flex min-h-[65svh] flex-col justify-center border-t border-foreground/15 px-6 py-16 md:-mx-10 md:px-10"
      >
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            0{i + 1}
          </p>
          <h3 className="mt-5 font-serif text-5xl font-light tracking-tight md:text-7xl">
            {p.title}
          </h3>
          <div className="mt-10 flex items-end justify-between gap-10">
            <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground md:text-base">
              {p.text}
            </p>
            <div className="film-grain hidden w-44 shrink-0 overflow-hidden md:block">
              <img src={images[i]} alt={p.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </section>
    ))}
  </div>
);

const About2 = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.about2Title, t.meta.about2Desc);
  const ap = t.about2Page;
  const pillars = t.philosophyPage.pillars;

  return (
    <main className="min-h-svh">
      {/* ── Bio — identique à About (photo col 3/12) ─────────────── */}
      <section className="mx-auto max-w-none px-6 pb-4 pt-24 md:px-10 md:pb-6 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3" delay={100}>
            <div className="film-grain relative aspect-[4/5] w-full overflow-hidden">
              <img src={sebastien} alt="Sébastien Coutelas" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={150}>
              <p className="mb-8 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {t.aboutPage.kicker}
              </p>
              <div className="flex max-w-2xl flex-col gap-6">
                {t.aboutPage.paragraphs.map((paragraph) => (
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

      {/* ── The system — 4 présentations VERTICALES à la suite ──── */}
      <section className="mx-auto max-w-none px-6 pb-0 md:px-10">
        <p className="mb-6 border-t border-foreground/15 pt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:pt-12">
          {t.philosophyPage.pillarsKicker}
        </p>

        <PropLabel label={ap.propositionLabel} n={1} name={ap.propositionNames[0]} />
        <EditorialStack pillars={pillars} />

        <PropLabel label={ap.propositionLabel} n={2} name={ap.propositionNames[1]} />
        <CenteredManifesto pillars={pillars} />

        <PropLabel label={ap.propositionLabel} n={3} name={ap.propositionNames[2]} />
        <HairlineIndex pillars={pillars} />

        <PropLabel label={ap.propositionLabel} n={4} name={ap.propositionNames[3]} />
        <FullHeightStack pillars={pillars} images={pillarImages} />
      </section>

      {/* ── CTA + Moments (polaroids) — identiques à About ──────── */}
      <ContactCta />
      <PolaroidCarousel />
    </main>
  );
};

export default About2;
