import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';

/**
 * Bouton « Contact us » — CTA de fin de page, identique sur tout le site
 * (17/09) : filet orange, remplissage au survol, centré, section bordée.
 */
const ContactCta = () => {
  const { t } = useLanguage();

  return (
    <section className="border-t border-foreground/15 px-6 py-16 text-center md:px-10 md:py-24">
      <Reveal>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center border border-primary bg-transparent px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          {t.activityPage.ctaButton}
        </Link>
      </Reveal>
    </section>
  );
};

export default ContactCta;
