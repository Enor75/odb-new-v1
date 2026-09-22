import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';
import type { HeaderSettings } from '@/hooks/useHeaderSettings';

/**
 * HEADER « ANUC » (test 20/09) — spec SPEC_HEADER_ANUC.md, adapté à
 * Orange Decibel selon la section 8 (« garde la mécanique, change les
 * signes ») :
 *
 * - Desktop ≥ lg : grille 6 colonnes ÉGALES full-bleed, sticky top,
 *   hauteur 32 px (+1 px hairline), rayon 0, pas d'ombre. Col 1 =
 *   marque « Orange Decibel (OdB) » (Sans 500 + serif italic), cols
 *   2–5 = Activity / Custom / About / Contact (serif uppercase +
 *   carré 4 px), col 6 = langues EN/FR/IT. Survol = slide vertical
 *   split-face (32 px, 520 ms, cubic-bezier(0.16,1,0.3,1)) : face
 *   idle → face invert (fond accent, texte blanc, carré blanc).
 *   La marque passe aux glyphes géométriques O·D·B sur metal/20.
 * - Mobile < lg : dock bas fixe (inset 8 px), grille 1fr/88px
 *   marque + bouton Menu/Close (même split-face), panneau au-dessus
 *   (items 56 px + ligne langues), Esc ferme, scroll lock.
 * - Thème clair (paper/ink Anuc) ou sombre (brun/crème ODB).
 * - Accents : earth/wood/water/fire (Anuc) ou mono orange ODB avec
 *   faces hover = invert ink.
 *
 * Fontes propres au header : Instrument Sans + Instrument Serif
 * (Google Fonts, chargées dans index.html) — indépendantes du
 * TypoTester.
 */

const LANGUAGES: Language[] = ['en', 'fr', 'it'];

const SANS = "'Instrument Sans', ui-sans-serif, system-ui, sans-serif";
const SERIF = "'Instrument Serif', ui-serif, Georgia, serif";
const CAPTION = 'clamp(12px, calc(12px + 4 * (100vw - 375px) / 1225), 16px)';
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Tokens par thème */
const THEMES = {
  light: {
    bg: '#FFFFFF',
    ink: '#1a1a1e',
    muted: 'rgba(26,26,30,0.5)',
    hairline: 'rgba(193,194,189,0.35)',
    metalFace: 'rgba(193,194,189,0.2)',
  },
  dark: {
    bg: '#322C24', /* = --background hsl(25 16% 17%) */
    ink: '#F6ECDD',
    muted: 'rgba(246,236,221,0.5)',
    hairline: 'rgba(246,236,221,0.15)',
    metalFace: 'rgba(246,236,221,0.12)',
  },
} as const;

/** Accents par item — mode 'anuc' (earth/wood/water/fire) */
const ACCENT_ANUC: Record<string, string> = {
  activity: '#9A682C',
  custom: '#707455',
  custom2: '#707455',
  about: '#4A626F',
  contact: '#976751',
};
/** Orange ODB (thème) — mode mono */
const ACCENT_ORANGE = '#E36631';

/** Glyphes géométriques O·D·B (face hover de la marque) */
const GLYPHS = [
  // O — disque plein
  'M200 0C310.4 0 400 89.6 400 200s-89.6 200-200 200S0 310.4 0 200 89.6 0 200 0z',
  // D — bord gauche + renflement droit
  'M0 0v400h150c110.4 0 200-89.6 200-200S260.4 0 150 0H0z',
  // B — fût + deux bourrelets
  'M0 0h110v400H0z M110 0h40a150 100 0 0 1 0 200h-40z M110 200h40a150 100 0 0 1 0 200h-40z',
];

const Wordmark = () => (
  <span className="flex h-4 items-center justify-center gap-1" aria-hidden="true">
    {GLYPHS.map((d) => (
      <svg key={d} viewBox="0 0 400 400" className="h-full w-auto" fill="currentColor">
        <path d={d} />
      </svg>
    ))}
  </span>
);

const Sq = ({ color }: { color: string }) => (
  <span className="block h-1 w-1 shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
);

/**
 * Lien split-face — hublot h px (overflow hidden), piste 2h px,
 * translateY(-h) au survol / focus-visible. Reduced motion : swap
 * instantané (pas de slide).
 */
const FaceLink = ({
  to,
  idle,
  hover,
  h,
  hoverFaceStyle,
}: {
  to: string;
  idle: React.ReactNode;
  hover: React.ReactNode;
  h: number;
  hoverFaceStyle?: React.CSSProperties;
}) => (
  <NavLink
    to={to}
    end={to === '/'}
    className="group block overflow-hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
    style={{ height: h, outlineColor: 'currentColor' }}
  >
    <div
      className="transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2"
      style={{ height: h * 2 }}
    >
      <div
        className="flex items-center justify-between gap-2 px-2 uppercase"
        style={{ height: h, fontSize: CAPTION, lineHeight: 1.2 }}
      >
        {idle}
      </div>
      <div
        className="flex items-center justify-between gap-2 px-2 uppercase"
        style={{ height: h, fontSize: CAPTION, lineHeight: 1.2, ...hoverFaceStyle }}
        aria-hidden="true"
      >
        {hover}
      </div>
    </div>
  </NavLink>
);

const AnucHeader = ({ settings }: { settings: HeaderSettings }) => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const th = THEMES[settings.theme];
  const h = settings.height;
  const mono = settings.accents === 'orange';

  const accentOf = (key: string) => (mono ? ACCENT_ORANGE : ACCENT_ANUC[key]);
  /** Face hover : accent par item (mode anuc) ou invert ink (mono orange) */
  const hoverFace = (key: string): React.CSSProperties =>
    mono ? { backgroundColor: th.ink, color: th.bg } : { backgroundColor: accentOf(key) };

  const items = [
    { to: '/activity', key: 'activity', label: t.nav.activity },
    { to: '/custom', key: 'custom', label: t.nav.custom },
    { to: '/custom-2', key: 'custom2', label: t.nav.custom2 },
    { to: '/about', key: 'about', label: t.nav.about },
    { to: '/contact', key: 'contact', label: t.nav.contact },
  ];

  // Ferme le menu mobile à chaque navigation
  useEffect(() => setOpen(false), [location.pathname]);

  // Scroll lock + Esc quand le panneau mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const brandIdle = (
    <span className="flex items-center gap-1" style={{ fontFamily: SANS, fontWeight: 500 }}>
      <span>Orange Decibel</span>
      <span className="normal-case italic" style={{ fontFamily: SERIF, fontWeight: 400 }}>
        (OdB)
      </span>
    </span>
  );
  const brandHoverFace = { backgroundColor: th.metalFace, color: th.ink };

  const itemFaces = (key: string, label: string) => ({
    idle: (
      <span style={{ fontFamily: SERIF, fontWeight: 400, color: th.ink }}>{label}</span>
    ),
    hover: (
      <span style={{ fontFamily: SERIF, fontWeight: 400 }}>{label}</span>
    ),
    square: <Sq color={accentOf(key)} />,
    squareHover: <Sq color={mono ? th.bg : '#FFFFFF'} />,
  });

  const langCell = (big = false) => (
    <div
      className={`flex items-center justify-center ${big ? 'h-14 gap-5' : 'h-full gap-3'}`}
      style={{ fontFamily: SANS, fontSize: CAPTION }}
    >
      {LANGUAGES.map((l) => (
        <button
          key={l}
          onClick={() => setLanguage(l)}
          aria-label={`Switch language to ${l.toUpperCase()}`}
          className="uppercase transition-opacity hover:opacity-70"
          style={{
            color: language === l ? th.ink : th.muted,
            fontWeight: language === l ? 500 : 400,
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ── Desktop ≥ lg : grille 6 colonnes égales, sticky ─────────── */}
      <header
        className="sticky top-0 z-40 hidden border-b lg:block"
        style={{ backgroundColor: th.bg, borderColor: th.hairline }}
      >
        <nav aria-label="Principale">
          <ul className="grid grid-cols-7" style={{ height: h, color: th.ink }}>
            <li>
              <FaceLink
                to="/"
                h={h}
                idle={brandIdle}
                hover={<Wordmark />}
                hoverFaceStyle={brandHoverFace}
              />
            </li>
            {items.map((it) => {
              const f = itemFaces(it.key, it.label);
              return (
                <li key={it.to} className="border-l" style={{ borderColor: th.hairline }}>
                  <FaceLink
                    to={it.to}
                        h={h}
                    idle={<>{f.idle}{f.square}</>}
                    hover={<>{f.hover}{f.squareHover}</>}
                    hoverFaceStyle={hoverFace(it.key)}
                  />
                </li>
              );
            })}
            <li className="border-l" style={{ borderColor: th.hairline }}>
              {langCell()}
            </li>
          </ul>
        </nav>
      </header>

      {/* ── Mobile < lg : dock bas + panneau ─────────────────────────── */}
      <header className="fixed inset-x-2 bottom-2 z-40 lg:hidden">
        <div
          className="grid overflow-hidden border transition-[grid-template-rows] duration-500"
          style={{
            gridTemplateRows: open ? '1fr' : '0fr',
            backgroundColor: th.bg,
            borderColor: th.hairline,
            borderBottomWidth: 0,
          }}
          id="anuc-drawer"
        >
          <nav className="min-h-0 overflow-hidden" aria-label="Mobile">
            <ul style={{ color: th.ink }}>
              {items.map((it) => {
                const f = itemFaces(it.key, it.label);
                return (
                  <li key={it.to} className="border-b" style={{ borderColor: th.hairline }}>
                    <FaceLink
                      to={it.to}
                            h={56}
                      idle={<>{f.idle}{f.square}</>}
                      hover={<>{f.hover}{f.squareHover}</>}
                      hoverFaceStyle={hoverFace(it.key)}
                    />
                  </li>
                );
              })}
              <li className="border-b" style={{ borderColor: th.hairline }}>
                {langCell(true)}
              </li>
            </ul>
          </nav>
        </div>

        {/* Barre du dock : marque + Menu/Close */}
        <div
          className="grid grid-cols-[1fr_88px] border"
          style={{ backgroundColor: th.bg, borderColor: th.hairline }}
        >
          <FaceLink
            to="/"
            h={h}
            idle={brandIdle}
            hover={<Wordmark />}
            hoverFaceStyle={brandHoverFace}
          />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="anuc-drawer"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
            className="group overflow-hidden border-l focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
            style={{ height: h, borderColor: th.hairline, outlineColor: th.ink }}
          >
            <div
              className={`transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                open ? '-translate-y-1/2' : ''
              }`}
              style={{ height: h * 2 }}
            >
              <div
                className="flex items-center justify-center gap-2 uppercase"
                style={{ height: h, fontSize: CAPTION, fontFamily: SANS, fontWeight: 500, color: th.ink }}
              >
                {t.nav.menu} <span className="block h-2 w-2" style={{ backgroundColor: mono ? ACCENT_ORANGE : '#C1C2BD' }} />
              </div>
              <div
                className="flex items-center justify-center gap-2 uppercase"
                style={{ height: h, fontSize: CAPTION, fontFamily: SANS, fontWeight: 500, ...brandHoverFace }}
                aria-hidden="true"
              >
                {t.nav.close}{' '}
                <span className="block h-2 w-2 border" style={{ borderColor: brandHoverFace.color }} />
              </div>
            </div>
          </button>
        </div>
      </header>
    </>
  );
};

export default AnucHeader;
