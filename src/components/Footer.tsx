import { useLanguage } from '@/contexts/LanguageContext';
import Ticker from './Ticker';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Ticker — signature en fin de page */}
      <Ticker items={t.ticker} />

      <div className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p className="font-serif text-3xl font-light leading-none tracking-tight md:text-4xl">
              Orange Décibel
            </p>

            <div className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/50 md:items-end">
              <a
                href="https://www.instagram.com/orangedecibel.italia/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {t.contactPage.socialItalia}
              </a>
              <a
                href="https://www.instagram.com/orange_decibel/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {t.contactPage.socialFrance}
              </a>
              <a
                href="https://www.linkedin.com/company/orange-decibel-italia"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {t.contactPage.socialLinkedIn}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-foreground/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/40 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} Orange Décibel — {t.footer.rights}
            </p>
            <p>{t.footer.madeIn}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
