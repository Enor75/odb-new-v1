import { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Retard avant l'animation (ms) — pour créer des cascades */
  delay?: number;
  /** Classes du grid child (ex. spans éditoriaux) — appliquées à la racine */
  className?: string;
}

/**
 * Apparition douce au scroll (fade + translation), via IntersectionObserver.
 *
 * ⚠️ CONVENTION DESIGN : à n'utiliser QUE sur les pages intérieures
 * (galerie, philosophie, contact) — PAS sur la landing home,
 * qui reste volontairement sans animation au scroll.
 *
 * Respecte prefers-reduced-motion (apparition immédiate sans transition).
 */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-500 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
