// ─────────────────────────────────────────────────────────────────
// MODÈLE DE PRIX — ESTIMATEUR DE PROJET
//
// ⚠️ VALEURS PLACEHOLDER (€) à ajuster selon les vrais tarifs
// Orange Décibel. Les ids doivent correspondre aux labels traduits
// dans LanguageContext.tsx (estimator.*Labels).
//
// Structure du calcul :
//   sous-total = base(type) × facteur(duration) × facteur(guests)
//              + transport(location)
//   total      = sous-total + somme(options)
//   fourchette = total ± RANGE_SPREAD
// ─────────────────────────────────────────────────────────────────

export interface PricedItem {
  id: string;
  /** Prix de base en € (types) */
  base?: number;
  /** Multiplicateur (durée, audience) */
  factor?: number;
  /** Coût fixe additionnel en € (lieu, options) */
  price?: number;
}

/** Types d'événement — prix de base en € */
export const EVENT_TYPES: PricedItem[] = [
  { id: 'dj', base: 800 },
  { id: 'live', base: 1200 },
  { id: 'band', base: 1500 },
  { id: 'acoustic', base: 900 },
  { id: 'other', base: 1000 },
];

/** Durée — multiplicateurs */
export const DURATIONS: PricedItem[] = [
  { id: 'short', factor: 0.8 },
  { id: 'standard', factor: 1 },
  { id: 'fullnight', factor: 1.3 },
  { id: 'multiday', factor: 2.2 },
];

/** Audience — multiplicateurs */
export const GUESTS: PricedItem[] = [
  { id: 'small', factor: 0.8 },
  { id: 'medium', factor: 1 },
  { id: 'large', factor: 1.4 },
  { id: 'xl', factor: 2 },
];

/** Lieu — transport logistique en € */
export const LOCATIONS: PricedItem[] = [
  { id: 'milan', price: 0 },
  { id: 'italy', price: 200 },
  { id: 'europe', price: 500 },
  { id: 'intl', price: 1200 },
];

/** Options additionnelles — prix fixes en € */
export const OPTIONS: PricedItem[] = [
  { id: 'technician', price: 250 },
  { id: 'engineer', price: 400 },
  { id: 'lighting', price: 300 },
  { id: 'backup', price: 500 },
];

/** Fourchette : ± 20 % autour du total */
export const RANGE_SPREAD = 0.2;

export interface EstimateSelection {
  type?: string;
  duration?: string;
  guests?: string;
  location?: string;
  options: string[];
}

export interface EstimateResult {
  min: number;
  max: number;
  total: number;
  base: number;
  durationFactor?: number;
  guestsFactor?: number;
  transport: number;
  optionsTotal: number;
}

const findById = (items: PricedItem[], id?: string) =>
  items.find((item) => item.id === id);

/** Arrondi au multiple de 50 € le plus proche */
const round50 = (n: number) => Math.round(n / 50) * 50;

export const computeEstimate = (selection: EstimateSelection): EstimateResult | null => {
  const type = findById(EVENT_TYPES, selection.type);
  const duration = findById(DURATIONS, selection.duration);
  const guests = findById(GUESTS, selection.guests);
  const location = findById(LOCATIONS, selection.location);

  if (!type?.base || !duration?.factor || !guests?.factor || !location) return null;

  const base = type.base;
  const transport = location.price ?? 0;
  const optionsTotal = OPTIONS.filter((o) => selection.options.includes(o.id)).reduce(
    (sum, o) => sum + (o.price ?? 0),
    0
  );

  const total = base * duration.factor * guests.factor + transport + optionsTotal;

  return {
    total: round50(total),
    min: round50(total * (1 - RANGE_SPREAD)),
    max: round50(total * (1 + RANGE_SPREAD)),
    base,
    durationFactor: duration.factor,
    guestsFactor: guests.factor,
    transport,
    optionsTotal,
  };
};

/** Formatage prix : 1 350 → "€1.350" (séparateur point, style continental) */
export const formatPrice = (n: number) =>
  `€${new Intl.NumberFormat('it-IT').format(n)}`;
