import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Footer 2 lignes façon garciamateo (S5) : wordmark + une ligne de
 * mentions séparées par « / ». Le ticker vit désormais sur la home,
 * collé au mur de marques (S9).
 */
const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const separator = (
    <span aria-hidden="true" className="text-foreground/25">
      /
    </span>
  );

  return (
    <footer className="px-6 py-10 md:px-10 md:py-12">
      <div className="mx-auto max-w-none">
        <p className="font-serif text-3xl font-light leading-none tracking-tight md:text-4xl">
          Orange Décibel
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-foreground/15 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/50">
          <span>© {year} Orange Décibel</span>
          {separator}
          <a
            href="https://www.instagram.com/orangedecibel.italia/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {t.contactPage.socialItalia}
          </a>
          {separator}
          <a
            href="https://www.instagram.com/orange_decibel/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {t.contactPage.socialFrance}
          </a>
          {separator}
          <a
            href="https://www.linkedin.com/company/orange-decibel-italia"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {t.contactPage.socialLinkedIn}
          </a>
          {separator}
          <span>{t.footer.madeIn}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
