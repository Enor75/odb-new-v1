import { useEffect, useState } from 'react';

/**
 * FOND (PHOTO OU COULEUR) — phase de test (17/09).
 *
 * La couleur brun (`--background`) reste la base (surfaces, header, menu) ;
 * ce composant ajoute un fond plein écran derrière le contenu : photo
 * (11 candidats) ou couleur unie (palette orange client), recouverte d'un
 * voile brun réglable. Le grain global (body::before) reste appliqué
 * par-dessus — son OPACITÉ est désormais réglable aussi (défaut 0.09).
 *
 * MODE IMAGE (19/09) : « défile » (défaut) — le fond couvre toute la
 * hauteur du document (mesurée + ResizeObserver) et descend exactement
 * avec le scroll ; « fixe » — viewport figé (ancien comportement).
 * NB : en mode défile, l'asset définitif doit faire la hauteur de la
 * page la plus grande (About ≈ 11 000 px en 1080p) — les photos de test
 * 1920px sont donc très zoomées, c'est attendu.
 *
 * ⚙️ OUTIL DE TEST TEMPORAIRE : sélecteur flottant (bas droite, au-dessus
 * du sélecteur typo) — 00 = brun actuel, 01–11 = photos, 12–17 = palette
 * orange (#F1B278, #EEA562, #EC994B, #EA8C35, #E87F1F, #B8704A). Voile 30–95 % (défaut
 * 78), grain 0–0.24 (défaut 0.09). Choix mémorisés en localStorage
 * (`odb-bg`, `odb-bg-veil`, `odb-grain`). À RETIRER au choix final.
 */

interface Candidate {
  n: number;
  label: string;
  color?: string;
}

const CANDIDATES: Candidate[] = [
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
  { n: 12, label: '#F1B278', color: '#F1B278' },
  { n: 13, label: '#EEA562', color: '#EEA562' },
  { n: 14, label: '#EC994B', color: '#EC994B' },
  { n: 15, label: '#EA8C35', color: '#EA8C35' },
  { n: 16, label: '#E87F1F', color: '#E87F1F' },
  { n: 17, label: '#B8704A', color: '#B8704A' },
];

const VEIL_MIN = 0.3;
const VEIL_MAX = 0.95;
const VEIL_STEP = 0.05;
const GRAIN_MIN = 0;
const GRAIN_MAX = 0.24;
const GRAIN_STEP = 0.03;
/** Brun du thème : hsl(25 16% 17%) ≈ rgb(50, 44, 36) */
const VEIL_RGB = '50, 44, 36';

const round2 = (v: number) => Math.round(v * 100) / 100;
const readScroll = (): boolean => {
  try {
    return (localStorage.getItem('odb-bg-scroll') ?? '1') === '1';
  } catch {
    return true;
  }
};

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
  const [grain, setGrain] = useState(() => readNum('odb-grain', 0.09));
  const [scrollMode, setScrollMode] = useState(readScroll);
  const [docHeight, setDocHeight] = useState(0);

  const total = CANDIDATES.length + 1; // 00 brun + 17 candidats

  useEffect(() => {
    document.documentElement.style.setProperty('--odb-grain', String(grain));
  }, [grain]);

  // Mode « défile » : le fond doit couvrir TOUTE la hauteur du document
  // (elle change avec le viewport et les contenus — accordéon, etc.)
  useEffect(() => {
    if (!scrollMode) return;
    const update = () => setDocHeight(document.documentElement.scrollHeight);
    update();
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [scrollMode]);

  const toggleScroll = () => {
    const next = !scrollMode;
    setScrollMode(next);
    try { localStorage.setItem('odb-bg-scroll', next ? '1' : '0'); } catch { /* iframe */ }
  };

  const pick = (dir: number) => {
    setChoice((c) => (c + dir + total) % total);
    try { localStorage.setItem('odb-bg', String((choice + dir + total) % total)); } catch { /* iframe */ }
  };
  const adjust = (
    setter: (v: number) => void,
    key: string,
    value: number,
    delta: number,
    min: number,
    max: number
  ) => {
    const next = round2(Math.min(max, Math.max(min, value + delta)));
    setter(next);
    try { localStorage.setItem(key, String(next)); } catch { /* iframe */ }
  };

  const candidate = CANDIDATES.find((c) => c.n === choice);
  const bgUrl = candidate && !candidate.color
    ? `${import.meta.env.BASE_URL}bg/bg-${String(candidate.n).padStart(2, '0')}.jpg`
    : null;

  const btn =
    'border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground';

  return (
    <>
      {/* Couche fond (photo ou couleur) + voile — derrière tout le contenu.
          Défile : absolute top 0 + hauteur du document (descend avec la page).
          Fixe : viewport figé. */}
      {(bgUrl || candidate?.color) && (
        <div
          aria-hidden="true"
          className={scrollMode ? '-z-10' : 'fixed inset-0 -z-10'}
          style={
            scrollMode
              ? { position: 'absolute', top: 0, left: 0, right: 0, height: docHeight || '100vh' }
              : undefined
          }
        >
          {bgUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgUrl})` }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: candidate!.color }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(${VEIL_RGB}, ${veil})` }}
          />
        </div>
      )}

      {/* Sélecteur de test — à retirer au choix final */}
      <div className="fixed bottom-[72px] right-4 z-[90] border border-foreground/15 bg-background/90 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-foreground/40">fond</span>
          <button onClick={() => pick(-1)} aria-label="Fond précédent" className={btn}>‹</button>
          <span className="min-w-[118px] text-center text-foreground">
            {candidate ? `${String(choice).padStart(2, '0')}/${CANDIDATES.length} ${candidate.label}` : '00 brun actuel'}
          </span>
          <button onClick={() => pick(1)} aria-label="Fond suivant" className={btn}>›</button>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-foreground/40">voile</span>
          <button
            onClick={() => adjust(setVeil, 'odb-bg-veil', veil, -VEIL_STEP, VEIL_MIN, VEIL_MAX)}
            aria-label="Voile moins opaque" className={btn}
          >−</button>
          <span className="min-w-[118px] text-center text-foreground">{Math.round(veil * 100)}%</span>
          <button
            onClick={() => adjust(setVeil, 'odb-bg-veil', veil, VEIL_STEP, VEIL_MIN, VEIL_MAX)}
            aria-label="Voile plus opaque" className={btn}
          >+</button>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-foreground/40">image</span>
          <button onClick={toggleScroll} aria-label="Basculer fond défilant ou fixe" className={btn}>‹</button>
          <span className="min-w-[118px] text-center text-foreground">
            {scrollMode ? 'défile' : 'fixe'}
          </span>
          <button onClick={toggleScroll} aria-label="Basculer fond défilant ou fixe" className={btn}>›</button>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-foreground/40">grain</span>
          <button
            onClick={() => adjust(setGrain, 'odb-grain', grain, -GRAIN_STEP, GRAIN_MIN, GRAIN_MAX)}
            aria-label="Grain moins intense" className={btn}
          >−</button>
          <span className="min-w-[118px] text-center text-foreground">{grain.toFixed(2)}</span>
          <button
            onClick={() => adjust(setGrain, 'odb-grain', grain, GRAIN_STEP, GRAIN_MIN, GRAIN_MAX)}
            aria-label="Grain plus intense" className={btn}
          >+</button>
        </div>
      </div>
    </>
  );
};

export default BackgroundPhoto;
