import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import GrainOverlay from '@/components/GrainOverlay';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

const LANGUAGES: Language[] = ['en', 'fr', 'it'];

/**
 * Bouton « + » animé — tourne de 45° pour devenir une croix « × »
 * quand le menu mobile est ouvert (un plus incliné EST une croix).
 */
const PlusToggle = ({ open }: { open: boolean }) => (
  <span
    aria-hidden="true"
    className={`relative block h-6 w-6 transition-transform duration-300 ease-out ${
      open ? 'rotate-45' : ''
    }`}
  >
    {/* barre horizontale */}
    <span className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-current" />
    {/* barre verticale */}
    <span className="absolute left-1/2 top-1/2 h-full w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current" />
  </span>
);

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Ferme le menu mobile à chaque navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Header fugace façon garciamateo : disparaît au scroll vers le bas,
  // réapparaît au scroll vers le haut (avec fond lisible une fois scrollé)
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) < 8) return;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
      isActive ? 'text-foreground underline underline-offset-[6px]' : 'text-foreground/50 hover:text-foreground'
    }`;

  const langButtonClass = (isActive: boolean) =>
    `font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${
      isActive ? 'text-foreground underline underline-offset-[6px]' : 'text-foreground/40 hover:text-foreground'
    }`;

  const menuItems = [
    { to: '/', label: t.nav.home },
    { to: '/activity', label: t.nav.activity },
    { to: '/custom', label: t.nav.custom },
    { to: '/custom-2', label: t.nav.custom2 },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      {/* z-[70] : le header passe AU-DESSUS du menu plein écran (z-[60])
          pour que le bouton + reste en place et s'anime en × */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] text-foreground transition-transform duration-500 ease-out will-change-transform ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled && !hidden
            ? 'border-b border-foreground/15 bg-background/30 backdrop-blur-md'
            : ''
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 md:h-20 md:px-10">
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.25em]">
            Orange Decibel
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={langButtonClass(language === lang)}
                aria-label={`Switch language to ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Bouton + mobile — grande zone tactile, devient × quand ouvert */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            aria-expanded={menuOpen}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <PlusToggle open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Menu mobile plein écran — liens alignés à droite */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-background text-foreground animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          <nav className="flex flex-col items-end gap-7 px-6 pb-6 pt-28 text-right">
            {menuItems.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-serif text-4xl font-light tracking-tight transition-colors duration-300 hover:text-primary animate-in fade-in slide-in-from-right-8 duration-500"
                style={{ animationDelay: `${60 + i * 60}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Grain animé newformcap (21/09) — texture « pellicule » par-dessus
              le fond du menu, exactement comme newformcap.com (opacity 0.6,
              tuile 15 %, steps(6) 0.3s) */}
          <GrainOverlay />

          {/* Sélecteur de langue — en bas à GAUCHE (les liens restent à droite) */}
          <div
            className="mt-auto flex justify-start gap-6 px-6 pb-10 animate-in fade-in duration-500"
            style={{ animationDelay: '400ms' }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={langButtonClass(language === lang)}
                aria-label={`Switch language to ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
