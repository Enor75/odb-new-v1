import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';
import ContactForm from '@/components/ContactForm';
import Estimator from '@/components/Estimator';
import type { EstimateSummary } from '@/components/Estimator';
import Reveal from '@/components/Reveal';

/**
 * Page Contact — composition centrée (17/09) :
 *  · en-tête centré : « Contact » (taille réduite) + sous-titre +
 *    lien « Estimer mon événement »
 *  · estimateur dépliable en accordéon (conteneur centré)
 *  · « Write to us » centré puis formulaire seul (plus de colonne
 *    coordonnées — emails/réseaux/base retirés de cette page)
 *  · le bouton final de l'estimateur replie l'accordéon et amène au
 *    formulaire avec l'estimation injectée
 */
const Contact = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.contactTitle, t.meta.contactDesc);
  const [estimate, setEstimate] = useState<EstimateSummary | null>(null);
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  const infoLabelClass =
    'font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/40';

  return (
    <main className="min-h-screen px-6 pb-20 pt-24 md:px-10 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-none">
        {/* ── En-tête centré : Contact + sous-titre + estimateur ── */}
        <Reveal className="flex flex-col items-center text-center">
          <h1 className="font-serif text-3xl font-light leading-[1.05] tracking-tight md:text-5xl">
            {t.contactPage.title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light text-muted-foreground md:text-lg">
            {t.contactPage.subtitle}
          </p>

          {/* Lien « Estimer mon événement » — déplie l'estimateur */}
          <button
            onClick={() => setEstimatorOpen((v) => !v)}
            aria-expanded={estimatorOpen}
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60 transition-colors duration-300 hover:text-primary"
          >
            {t.contactPage.estimatorToggle}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                estimatorOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={1.5}
            />
          </button>
        </Reveal>

        {/* ── Estimateur dépliable ──────────────────────────────── */}
        {estimatorOpen && (
          <section
            className="mx-auto mt-12 max-w-2xl animate-fade-in md:mt-16"
            aria-label={t.contactPage.estimatorToggle}
          >
            <h2 className="mb-8 max-w-2xl font-serif text-2xl font-light leading-tight tracking-tight md:text-4xl">
              {t.contactPage.estimator.title}
            </h2>
            <Estimator
              onComplete={setEstimate}
              onRequestQuote={() => setEstimatorOpen(false)}
            />
          </section>
        )}

        {/* ── Formulaire seul, centré ────────────────────────────── */}
        <div className="mx-auto mt-16 max-w-2xl md:mt-20">
          <Reveal>
            <div id="contact-form" className="scroll-mt-28">
              <p className={`${infoLabelClass} mb-10 text-center`}>{t.contactPage.formTitle}</p>
              <ContactForm estimate={estimate} />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

export default Contact;
