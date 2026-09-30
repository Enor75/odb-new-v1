import type { ActivitySectionData } from '@/contexts/LanguageContext';

/**
 * Grille à filets — « hairline grid rules » (styles.refero.design).
 * Les 4 activités en cellules côte à côte (2×2 en md, 4 colonnes en lg),
 * séparées par des filets 1px partagés.
 *
 * Props :
 * - `centered` : textes centrés dans chaque case (version retenue pour
 *   la page Activity — vitrine). Par défaut : aligné à gauche (version
 *   banc d'essai Activity 2, Proposition 01).
 */
const cellBorders = [
  '',
  'border-t md:border-t-0 md:border-l',
  'border-t lg:border-t-0 lg:border-l',
  'border-t md:border-l lg:border-t-0',
];

const HairlineGrid = ({
  sections,
  centered = false,
}: {
  sections: ActivitySectionData[];
  centered?: boolean;
}) => (
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
      </div>
    ))}
  </div>
);

export default HairlineGrid;
