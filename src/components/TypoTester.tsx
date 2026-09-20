import { useEffect, useState } from 'react';

/**
 * SÉLECTEUR TYPO DE TEST — 6 propositions (17/09), TEMPORAIRE.
 *
 * Bascule les stacks typo du site en direct via les variables CSS
 * `--odb-serif / --odb-sans / --odb-mono` (voir tailwind.config.ts et
 * index.css). Fontes auto-hébergées dans src/assets/fonts/ (Inter et
 * IBM Plex Mono, OFL) ; Fraunces / Archivo / Source Code Pro restent
 * chargés par index.html.
 *
 * 0 · mix actuel — Fraunces (titres) + Archivo (corps) + Source Code Pro (méta)
 * 1 · IBM Plex Mono partout
 * 2 · Inter partout
 * 3 · mix actuel + IBM Plex — Fraunces (titres) + IBM Plex Mono (corps & méta)
 * 4 · mix actuel + Inter — Fraunces (titres) + Inter (corps) + SCP (méta)
 * 5 · Inter + IBM Plex — Inter (titres & corps) + IBM Plex Mono (méta)
 * 6 · Fraunces + Switzer — Switzer ≈ Suisse Int'l (alternative libre,
 *     Fontshare CDN) ; Suisse Int'l et STK Bureau Serif (demandées
 *     client) sont commerciales — fichiers requis si licence
 * 7 · Switzer partout (≈ Suisse Int'l partout)
 *
 * Choix mémorisé en localStorage (`odb-typo`). À RETIRER au choix final
 * (puis trimmer les fontes inutilisées).
 */

const F = {
  fraunces: "'Fraunces', Georgia, serif",
  switzer: "'Switzer', 'Helvetica Neue', Arial, sans-serif",
  archivo: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
  scp: "'Source Code Pro', ui-monospace, SFMono-Regular, monospace",
  inter: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  plex: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
};

const MODES = [
  { label: '0 · mix actuel', serif: F.fraunces, sans: F.archivo, mono: F.scp },
  { label: '1 · plex partout', serif: F.plex, sans: F.plex, mono: F.plex },
  { label: '2 · inter partout', serif: F.inter, sans: F.inter, mono: F.inter },
  { label: '3 · fraunces+plex', serif: F.fraunces, sans: F.plex, mono: F.plex },
  { label: '4 · fraunces+inter', serif: F.fraunces, sans: F.inter, mono: F.scp },
  { label: '5 · inter+plex', serif: F.inter, sans: F.inter, mono: F.plex },
  { label: '6 · fraunces+switzer', serif: F.fraunces, sans: F.switzer, mono: F.scp },
  { label: '7 · switzer partout', serif: F.switzer, sans: F.switzer, mono: F.switzer },
];

const TypoTester = () => {
  const [mode, setMode] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('odb-typo') ?? '0', 10);
      return Number.isFinite(v) && v >= 0 && v < MODES.length ? v : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const m = MODES[mode];
    const root = document.documentElement.style;
    root.setProperty('--odb-serif', m.serif);
    root.setProperty('--odb-sans', m.sans);
    root.setProperty('--odb-mono', m.mono);
    try { localStorage.setItem('odb-typo', String(mode)); } catch { /* iframe */ }
  }, [mode]);

  const cycle = (dir: number) => setMode((m) => (m + dir + MODES.length) % MODES.length);

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex items-center gap-2 border border-foreground/15 bg-background/90 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 backdrop-blur-md">
      <span className="text-foreground/40">typo</span>
      <button
        onClick={() => cycle(-1)}
        aria-label="Typo précédente"
        className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
      >
        ‹
      </button>
      <span className="min-w-[132px] text-center text-foreground">{MODES[mode].label}</span>
      <button
        onClick={() => cycle(1)}
        aria-label="Typo suivante"
        className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
      >
        ›
      </button>
    </div>
  );
};

export default TypoTester;
