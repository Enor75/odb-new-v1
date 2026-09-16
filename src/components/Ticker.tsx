interface TickerProps {
  items: string[];
  className?: string;
}

/**
 * Bandeau défilant infini — signature garciamateo.
 * Utilisé UNIQUEMENT en bas de page, au-dessus du footer.
 * Le contenu est dupliqué en deux moitiés identiques pour une
 * boucle parfaite (translateX -50%).
 */
const Ticker = ({ items, className = '' }: TickerProps) => {
  // On répète la séquence pour garantir une moitié plus large que l'écran
  const half = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y border-foreground/10 py-4 md:py-5 ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((halfIndex) => (
          <div key={halfIndex} className="flex shrink-0">
            {half.map((item, i) => (
              <span
                key={`${halfIndex}-${i}`}
                className="flex items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 md:text-xs"
              >
                <span className="px-6 md:px-10">{item}</span>
                <span className="text-primary/70">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
