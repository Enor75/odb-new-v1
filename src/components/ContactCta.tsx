import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';

/**
 * Bouton « Contact us » — CTA de fin de page, identique sur tout le site
 * (19/09) : filet orange, remplissage au survol, centré. Positionné à
 * mi-chemin entre la fin du dernier bloc et le footer : pt-12/16 au-dessus,
 * footer pt-12/16 au-dessous (symétrie ~48/64px de chaque côté). Pas de
 * filet propre — les derniers blocs (activity/custom) n'ont plus de pb.
 */
const ContactCta = () => {
  const { t } = useLanguage();

  return (
    <section className="px-6 pt-12 text-center md:px-10 md:pt-16">
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
