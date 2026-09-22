import { useEffect, useState, type ReactNode } from 'react';

/**
 * BOX DE TEST REPLIABLE (21/09) — wrapper commun aux box flottantes de
 * test (HeaderTester, TypoTester, box « fond » de BackgroundPhoto).
 *
 * Repliée : un onglet compact (label + « + »). Ouverte : ligne de titre
 * (label + « × ») puis le contenu. L'état ouvert/fermé est persisté en
 * localStorage `odb-box-{id}` ('open' | 'closed', défaut : ouvert) —
 * identique sur desktop et mobile.
 *
 * Les box vivent dans la colonne fixe #odb-testboxes rendue par App
 * (fixed right-4 top-14, flex-col items-end gap-2) : empilement propre
 * sans position absolue par box, aucune superposition possible.
 *
 * TEMPORAIRE : à retirer (avec les box) au choix final avant le ship.
 */
const TestBox = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(() => {
    try {
      return (localStorage.getItem(`odb-box-${id}`) ?? 'open') === 'open';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`odb-box-${id}`, open ? 'open' : 'closed');
    } catch {
      /* iframe */
    }
  }, [id, open]);

  const shell =
    'border border-foreground/15 bg-background/90 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 backdrop-blur-md';

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label={`Ouvrir la box ${title}`}
        className={`${shell} flex items-center gap-2 transition-colors hover:border-foreground/50 hover:text-foreground`}
      >
        <span>{title}</span>
        <span className="text-foreground/50">+</span>
      </button>
    );
  }

  return (
    <div className={shell}>
      <div className="flex items-center justify-between gap-6">
        <span className="text-foreground/40">{title}</span>
        <button
          onClick={() => setOpen(false)}
          aria-label={`Fermer la box ${title}`}
          className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
        >
          ×
        </button>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default TestBox;
