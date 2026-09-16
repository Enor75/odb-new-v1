import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from '@/components/ContactForm';
import Estimator from '@/components/Estimator';
import type { EstimateSummary } from '@/components/Estimator';
import Reveal from '@/components/Reveal';

const Contact = () => {
  const { t } = useLanguage();
  const [estimate, setEstimate] = useState<EstimateSummary | null>(null);

  const infoLabelClass =
    'font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/40';
  const infoLinkClass =
    'underline decoration-foreground/20 underline-offset-8 transition-colors duration-300 hover:text-primary hover:decoration-primary/50';

  return (
    <main className="min-h-screen px-6 pb-32 pt-28 md:px-10 md:pt-36 md:pb-48">
      <div className="mx-auto max-w-[1400px]">
        {/* ── En-tête ──────────────────────────────────────────── */}
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t.contactPage.kicker}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {t.contactPage.title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light text-muted-foreground md:text-lg">
            {t.contactPage.subtitle}
          </p>
        </Reveal>

        {/* ── Calculateur de prix ───────────────────────────────── */}
        <Reveal delay={100}>
          <section className="mt-16 md:mt-24" aria-label={t.contactPage.estimator.title}>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t.contactPage.estimator.kicker}
            </p>
            <h2 className="mb-4 max-w-2xl font-serif text-2xl font-light leading-tight tracking-tight md:text-4xl">
              {t.contactPage.estimator.title}
            </h2>
            <p className="mb-10 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
              {t.contactPage.estimator.subtitle}
            </p>

            <Estimator onComplete={setEstimate} />
          </section>
        </Reveal>

        {/* ── Infos + formulaire ────────────────────────────────── */}
        <div className="mt-24 grid gap-20 md:mt-32 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <aside className="flex flex-col gap-12 md:pr-8 lg:pr-16">
              <div>
                <p className={infoLabelClass}>{t.contactPage.emailLabel}</p>
                <a
                  href="mailto:orangedecibelita@gmail.com"
                  className={`mt-3 inline-block font-serif text-lg font-light tracking-tight md:text-xl ${infoLinkClass}`}
                >
                  orangedecibelita@gmail.com
                </a>
              </div>

              <div>
                <p className={infoLabelClass}>{t.contactPage.socialLabel}</p>
                <div className="mt-3 flex flex-col items-start gap-2 font-serif text-lg font-light tracking-tight md:text-xl">
                  <a
                    href="https://www.instagram.com/orangedecibel.italia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={infoLinkClass}
                  >
                    {t.contactPage.socialItalia}
                  </a>
                  <a
                    href="https://www.instagram.com/orange_decibel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={infoLinkClass}
                  >
                    {t.contactPage.socialFrance}
                  </a>
                  <a
                    href="https://www.linkedin.com/company/orange-decibel-italia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={infoLinkClass}
                  >
                    {t.contactPage.socialLinkedIn}
                  </a>
                </div>
              </div>

              <div>
                <p className={infoLabelClass}>{t.contactPage.baseLabel}</p>
                <p className="mt-3 font-serif text-lg font-light tracking-tight md:text-xl">
                  {t.contactPage.baseValue}
                </p>
              </div>
            </aside>
          </Reveal>

          <Reveal className="md:col-span-7" delay={120}>
            <div id="contact-form" className="scroll-mt-28">
              <p className={`${infoLabelClass} mb-10`}>{t.contactPage.formTitle}</p>
              <ContactForm estimate={estimate} />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

export default Contact;
