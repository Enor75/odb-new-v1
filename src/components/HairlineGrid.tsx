import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import type { ActivitySectionData } from '@/contexts/LanguageContext';

/**
 * Grille à filets — « hairline grid rules » (styles.refero.design).
 * Les 4 activités en cellules côte à côte (2×2 en md, 4 colonnes en lg),
 * séparées par des filets 1px partagés.
 *
 * Props :
 * - `centered` : textes centrés dans chaque case (version Activity).
 * - `casesMode` :
 *   · 'list' (défaut) — liste des exemples en bas de case (banc
 *     d'essai Activity 2, Proposition 01) ;
 *   · 'arrow' — DESKTOP uniquement : les exemples sont remplacés par
 *     une flèche vers le bas qui ouvre le carrousel (onOpenCase), avec
 *     au survol une étiquette « Voir » collée au curseur. MOBILE : pas
 *     de flèche — les exemples vivent dans le bloc sous la grille.
 */
const cellBorders = [
  '',
  'border-t md:border-t-0 md:border-l',
  'border-t lg:border-t-0 lg:border-l',
  'border-t md:border-l lg:border-t-0',
];

type Slide =
  | { kind: 'photo'; src: string; caption: string }
  | { kind: 'text'; text: string };

/** Construit les slides du carrousel d'une section : photos ponctuées
 *  de texte explicatif (chaque photo porte sa légende ; les exemples
 *  sans photo deviennent des slides texte). */
export const buildSlides = (
  photos: (string | null)[],
  cases: string[],
  slotLabel: string
): Slide[] => {
  const slides: Slide[] = [];
  const len = Math.max(photos.length, cases.length);
  for (let i = 0; i < len; i++) {
    const src = photos[i] ?? null;
    const caption = cases[i] ?? null;
    if (src) {
      slides.push({ kind: 'photo', src, caption: caption ?? `${slotLabel} — ${String(i + 1).padStart(2, '0')}` });
    } else if (caption) {
      slides.push({ kind: 'text', text: caption });
    }
  }
  return slides;
};

const HairlineGrid = ({
  sections,
  centered = false,
  casesMode = 'list',
  onOpenCase,
  viewLabel = 'View',
}: {
  sections: ActivitySectionData[];
  centered?: boolean;
  casesMode?: 'list' | 'arrow';
  onOpenCase?: (sectionIndex: number) => void;
  viewLabel?: string;
}) => {
  /** Étiquette « Voir » collée au curseur (desktop, survol des flèches) */
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="grid border border-foreground/15 md:grid-cols-2 lg:grid-cols-4">
      {sections.map((s, i) => (
        <div
          key={s.id}
          className={`flex flex-col gap-4 border-foreground/15 p-6 md:p-8 ${cellBorders[i]} ${
            centered ? 'text-center' : ''
          }`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
            {s.kicker}
          </p>
          <h3 className="font-serif text-2xl font-light tracking-tight">{s.title}</h3>
          <p className="text-sm font-light leading-relaxed text-muted-foreground">{s.text}</p>

          {casesMode === 'list' ? (
            <ul className={`mt-auto space-y-1.5 pt-4 ${centered ? '' : 'text-left'}`}>
              {s.cases.map((study) => (
                <li
                  key={study}
                  className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-primary"
                >
                  — {study}
                </li>
              ))}
            </ul>
          ) : (
            /* Flèche desktop — ouvre le carrousel ; mobile : rien
               (les exemples sont dans le bloc sous la grille). */
            <button
              type="button"
              onClick={() => onOpenCase?.(i)}
              onMouseEnter={() => setCursor({ x: 0, y: 0 })}
              onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setCursor(null)}
              aria-label={`${s.title} — ${viewLabel}`}
              className={`mt-auto hidden pt-6 pb-1 text-foreground/50 transition-colors duration-300 hover:text-primary md:inline-flex ${
                centered ? 'self-center' : 'self-start'
              }`}
            >
              <ChevronDown className="h-8 w-8" strokeWidth={1.25} />
            </button>
          )}
        </div>
      ))}

      {/* Étiquette « Voir » collée au curseur — via PORTAL vers body :
          un ancêtre transformé (animations Reveal) rendrait « fixed »
          relatif à cet ancêtre et décalerait l'étiquette. */}
      {cursor &&
        createPortal(
          <span
            aria-hidden="true"
            className="pointer-events-none fixed z-[80] -translate-y-1/2 translate-x-3 border border-primary/40 bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
            style={{ left: cursor.x, top: cursor.y }}
          >
            {viewLabel}
          </span>,
          document.body
        )}
    </div>
  );
};

export default HairlineGrid;
