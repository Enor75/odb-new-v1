import { useState } from 'react';

/**
 * FOND PHOTO — phase de test (17/09).
 *
 * La couleur brun (`--background`) reste la base (surfaces, header, menu) ;
 * ce composant ajoute une PHOTO plein écran fixe derrière tout le contenu,
 * recouverte d'un voile brun réglable — le grain global (body::before,
 * 0.09) reste appliqué par-dessus, inchangé.
 *
 * ⚙️ OUTIL DE TEST TEMPORAIRE : le sélecteur flottant (bas droite) permet
 * de cycler les 11 candidats et d'ajuster le voile. Le choix est mémorisé
 * en localStorage (`odb-bg`, `odb-bg-veil`). Index 0 = brun actuel (aucune
 * photo). À RETIRER au moment du choix final (garder uniquement le
 * candidat retenu en dur).
 */

const CANDIDATES = [
  { n: 1, label: 'jonathan-borba' },
  { n: 2, label: 'wood007' },
  { n: 3, label: '8u4dmc3' },
  { n: 4, label: 'tmj2214' },
  { n: 5, label: 'sdl-3003' },
  { n: 6, label: 'd147' },
  { n: 7, label: 'red-black' },
  { n: 8, label: 'reddish-brown' },
  { n: 9, label: 'muchatseble' },
  { n: 10, label: 'telechargement' },
  { n: 11, label: 'walnut-burl' },
];

const VEIL_MIN = 0.54;
const VEIL_MAX = 0.9;
const VEIL_STEP = 0.06;
/** Brun du thème : hsl(25 16% 17%) ≈ rgb(50, 44, 36) */
const VEIL_RGB = '50, 44, 36';

const readNum = (key: string, fallback: number): number => {
  try {
    const v = parseFloat(localStorage.getItem(key) ?? '');
    return Number.isFinite(v) ? v : fallback;
  } catch {
    return fallback;
  }
};

const BackgroundPhoto = () => {
  const [choice, setChoice] = useState(() => readNum('odb-bg', 0));
  const [veil, setVeil] = useState(() => readNum('odb-bg-veil', 0.78));

  const pick = (dir: number) => {
    const total = CANDIDATES.length + 1; // 00 brun + 11 candidats
    const next = (choice + dir + total) % total;
    setChoice(next);
    try { localStorage.setItem('odb-bg', String(next)); } catch { /* iframe */ }
  };
  const adjustVeil = (delta: number) => {
    const next = Math.min(VEIL_MAX, Math.max(VEIL_MIN, Math.round((veil + delta) * 100) / 100));
    setVeil(next);
    try { localStorage.setItem('odb-bg-veil', String(next)); } catch { /* iframe */ }
  };

  const candidate = CANDIDATES.find((c) => c.n === choice);
  const bgUrl = candidate
    ? `${import.meta.env.BASE_URL}bg/bg-${String(candidate.n).padStart(2, '0')}.jpg`
    : null;

  return (
    <>
      {/* Couche photo + voile — derrière tout le contenu */}
      {bgUrl && (
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(${VEIL_RGB}, ${veil})` }}
          />
        </div>
      )}

      {/* Sélecteur de test — à retirer au choix final */}
      <div className="fixed bottom-4 right-4 z-[90] border border-foreground/15 bg-background/90 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-foreground/40">fond</span>
          <button
            onClick={() => pick(-1)}
            aria-label="Fond précédent"
            className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            ‹
          </button>
          <span className="min-w-[108px] text-center text-foreground">
            {candidate ? `${String(choice).padStart(2, '0')}/${CANDIDATES.length} ${candidate.label}` : '00 brun actuel'}
          </span>
          <button
            onClick={() => pick(1)}
            aria-label="Fond suivant"
            className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            ›
          </button>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-foreground/40">voile</span>
          <button
            onClick={() => adjustVeil(-VEIL_STEP)}
            aria-label="Voile moins opaque"
            className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            −
          </button>
          <span className="min-w-[108px] text-center text-foreground">
            {Math.round(veil * 100)}%
          </span>
          <button
            onClick={() => adjustVeil(VEIL_STEP)}
            aria-label="Voile plus opaque"
            className="border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundPhoto;
