import { useLanguage } from '@/contexts/LanguageContext';
import ContactCta from '@/components/ContactCta';
import usePageMeta from '@/hooks/usePageMeta';
import Reveal from '@/components/Reveal';
import designDrawing1 from '@/assets/design-drawing-1.png';
import designDrawing2 from '@/assets/design-drawing-2.jpeg';
import detail1 from '@/assets/detail-1.jpeg';
import gallery3 from '@/assets/gallery-3.jpeg';
import stack1 from '@/assets/stack-1.jpeg';
import gallery2 from '@/assets/gallery-2.jpeg';

/**
 * Page Custom — design des enceintes sur mesure.
 * Structure inspirée de stoneacoustic.com :
 *  · article magazine (titre fort, filet, 3 colonnes de texte
 *    avec mini-photos) — pattern « Concepteurs » de Stone
 *  · 3 blocs Matériaux / Design / Système son — hover façon Friendly
 *    Pressure : fiche polaroid crème qui se déplie sous l'image
 *    (SANS cercle, contrairement à la home), légende statique mobile
 *  · bloc Caractéristiques façon « carnet de conception » : fond de
 *    page, descriptif + specs aux lignes épaisses à gauche,
 *    2 images min-h 450px à droite (encarts vides en attente de photos)
 *
 * ⚠️ Images provisoires (assets du projet) — remplacer par les photos
 * d'atelier, croquis et drawings du client quand elles arriveront.
 */
const Custom = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.customTitle, t.meta.customDesc);
  const cp = t.customPage;

  /* Images provisoires — en attente des vraies photos d'atelier */
  const miniImages = [designDrawing1, designDrawing2, detail1];
  const blockImages = [gallery3, stack1, gallery2];

  const sectionTitle = (strong: string, rest: string) => (
    <h2 className="font-serif text-2xl font-light leading-snug tracking-tight md:text-4xl">
      <span className="font-normal">{strong}</span>
      <br />
      <span className="text-foreground/60">{rest}</span>
    </h2>
  );

  return (
    <main className="min-h-screen">
      {/* ── En-tête ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-none px-6 pt-24 md:px-10 md:pt-28">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {cp.kicker}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {cp.title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
            {cp.subtitle}
          </p>
        </Reveal>
      </div>

      {/* ── Article magazine (pattern « Concepteurs ») ──────────── */}
      <section className="mx-auto mt-12 max-w-none px-6 md:mt-16 md:px-10">
        <Reveal>{sectionTitle(cp.magTitleA, cp.magTitleB)}</Reveal>
        <div className="my-4 h-px w-full bg-foreground/15 md:my-6" />
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {cp.magColumns.map((col, i) => (
            <Reveal key={col.title} delay={i * 100}>
              <p className="text-base font-light leading-relaxed text-foreground/75">
                {col.text}
              </p>
              <div className="film-grain mt-8 overflow-hidden">
                <img
                  src={miniImages[i]}
                  alt={col.title}
                  className="h-[40vh] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/40">
                {col.title}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3 blocs : fiche polaroid au survol (FP sans cercle) ─── */}
      <section className="mx-auto mt-14 max-w-none px-6 pb-16 md:mt-20 md:px-10 md:pb-24">
        <Reveal>{sectionTitle(cp.blocksTitleA, cp.blocksTitleB)}</Reveal>
        <div className="my-4 h-px w-full bg-foreground/15 md:my-6" />
        <div className="grid gap-4 md:grid-cols-3">
          {cp.blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 100}>
              <div className="group relative">
                <div className="film-grain overflow-hidden">
                  <img
                    src={blockImages[i]}
                    alt={block.title}
                    className="h-[35vh] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Fiche polaroid — se déplie sous l'image au survol (desktop) */}
                <div className="absolute left-[-1px] top-[calc(100%-1px)] z-10 hidden w-[calc(100%+2px)] grid-rows-[0fr] transition-[grid-template-rows] duration-[180ms] ease-in-out group-hover:grid-rows-[1fr] md:grid">
                  <div className="overflow-hidden bg-foreground">
                    <div className="px-3 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                        {cp.kicker}
                      </p>
                      <h3 className="mt-1 font-serif text-base text-background">
                        {block.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-background/70">
                        {block.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Légende statique mobile */}
                <div className="mt-4 border-t border-foreground/15 pt-3 md:hidden">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 transition-colors group-hover:text-primary">
                    {cp.kicker}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-foreground">{block.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                    {block.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Caractéristiques : carnet de conception ── */}
      <section>
        <div className="mx-auto max-w-none px-6 pt-12 pb-0 md:px-10 md:pt-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            {/* Gauche : descriptif + specs aux lignes épaisses */}
            <div className="md:col-span-7">
              <Reveal>
                <h2 className="font-serif text-2xl font-light leading-snug tracking-tight md:text-4xl">
                  <span className="font-normal">{cp.carTitleA}</span>
                  <br />
                  <span className="text-foreground/60">{cp.carTitleB}</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-foreground/75">
                  {cp.carText}
                </p>

                {/* Carnet de conception : ligne d'en-tête + specs, lignes épaisses */}
                <div className="mt-10">
                  <div className="flex items-baseline justify-between border-b-[3px] border-foreground pb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                    <span>{cp.specHeaderA}</span>
                    <span>{cp.specHeaderB}</span>
                  </div>
                  {cp.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-6 border-b border-foreground py-3.5"
                    >
                      <span className="text-sm font-light text-foreground/90">
                        {spec.label}
                      </span>
                      <span className="text-sm font-light text-foreground/50">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Droite : 1 seul encart photo (17/09) — photo au repos +
                photo alternative en fondu au survol. Emplacements vides
                (croix fine) en attendant les fichiers : renseigner
                specPhotos.rest / specPhotos.hover + remplacer les croix
                par <img> quand ils arriveront. */}
            <div className="md:col-span-5 md:flex">
              <Reveal delay={150} className="flex w-full flex-col">
                {/* L'encart s'étire sur la hauteur de la rangée de grille :
                    son bas s'aligne sur la dernière ligne du carnet de
                    spécifications (sous « Finish »). */}
                <div className="group relative min-h-[40vh] w-full flex-1 overflow-hidden bg-foreground/[0.06] md:min-h-0">
                  {/* Photo au repos */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-foreground/25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        aria-hidden="true"
                      >
                        <path d="M12 4v16M4 12h16" />
                      </svg>
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                        {cp.img1Label}
                      </p>
                    </div>
                  </div>
                  {/* Photo de survol — fondu par-dessus */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-foreground/25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        aria-hidden="true"
                      >
                        <path d="M12 4v16M4 12h16" />
                      </svg>
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                        {cp.img1Label}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — bouton « Contact us » partagé ─────────────────── */}
      <ContactCta />
    </main>
  );
};

export default Custom;
