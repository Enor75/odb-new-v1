import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  EVENT_TYPES,
  DURATIONS,
  GUESTS,
  LOCATIONS,
  OPTIONS,
  computeEstimate,
  formatPrice,
  type EstimateSelection,
} from '@/config/pricing';

export interface EstimateSummary {
  /** Fourchette formatée, ex. "€1.100 – €1.600" */
  range: string;
  /** Détail lisible des choix, ex. "DJ set · 4–8h · 100–300 · Milan area" */
  detail: string;
}

interface EstimatorProps {
  /** Appelé quand l'utilisateur valide l'estimation et continue vers le formulaire */
  onComplete: (summary: EstimateSummary) => void;
}

const STEP_KEYS = ['type', 'duration', 'guests', 'location', 'options'] as const;
const TOTAL_STEPS = STEP_KEYS.length;

/**
 * Estimateur de projet multi-étapes (inspiration template Lovable "Raum Studio").
 * 4 questions à choix unique + 1 étape d'options (choix multiple),
 * puis affichage de la fourchette estimée avec détail du calcul.
 * Le modèle de prix (PLACEHOLDER) vit dans src/config/pricing.ts.
 */
const Estimator = ({ onComplete }: EstimatorProps) => {
  const { t } = useLanguage();
  const est = t.contactPage.estimator;

  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<EstimateSelection>({ options: [] });
  const [finished, setFinished] = useState(false);

  const result = useMemo(() => computeEstimate(selection), [selection]);

  const stepTitles = [est.steps.type, est.steps.duration, est.steps.guests, est.steps.location, est.steps.options];
  const stepQuestions = [est.questions.type, est.questions.duration, est.questions.guests, est.questions.location, est.questions.options];

  const selectSingle = (key: 'type' | 'duration' | 'guests' | 'location', id: string) => {
    setSelection((s) => ({ ...s, [key]: id }));
    // Léger délai pour laisser voir la sélection avant l'étape suivante
    window.setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), 260);
  };

  const toggleOption = (id: string) => {
    setSelection((s) => ({
      ...s,
      options: s.options.includes(id) ? s.options.filter((o) => o !== id) : [...s.options, id],
    }));
  };

  const reset = () => {
    setSelection({ options: [] });
    setStep(0);
    setFinished(false);
  };

  const continueToForm = () => {
    if (!result) return;
    const parts = [
      est.labels.typeLabels[selection.type ?? ''],
      est.labels.durationLabels[selection.duration ?? ''],
      est.labels.guestLabels[selection.guests ?? ''],
      est.labels.locationLabels[selection.location ?? ''],
    ];
    if (selection.options.length > 0) {
      parts.push(selection.options.map((o) => est.labels.optionLabels[o]).join(' + '));
    }
    onComplete({
      range: `${formatPrice(result.min)} – ${formatPrice(result.max)}`,
      detail: parts.join(' · '),
    });
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const optionButtonClass = (selected: boolean) =>
    `flex min-h-[3.25rem] items-center justify-center border px-5 py-3 text-center font-mono text-xs tracking-wide transition-all duration-300 ${
      selected
        ? 'border-primary bg-primary/10 text-foreground'
        : 'border-foreground/20 text-foreground/70 hover:border-primary/60 hover:text-foreground'
    }`;

  const monoMeta = 'font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50';

  return (
    <div className="border border-foreground/15">
      {/* Barre de progression */}
      <div className="h-px w-full bg-foreground/10">
        <div
          className="h-px bg-primary transition-all duration-500"
          style={{ width: finished ? '100%' : `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-12">
        {!finished ? (
          <>
            {/* En-tête d'étape */}
            <div className="mb-8 flex items-center justify-between">
              <p className={monoMeta}>
                {String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')} —{' '}
                {stepTitles[step]}
              </p>
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className={`${monoMeta} transition-colors hover:text-foreground`}
                >
                  ← {est.back}
                </button>
              )}
            </div>

            {/* Question + options */}
            <div key={step} className="animate-fade-in">
              <h3 className="mb-8 font-serif text-2xl font-light tracking-tight md:text-3xl">
                {stepQuestions[step]}
              </h3>

              {step < 4 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(step === 0 ? EVENT_TYPES : step === 1 ? DURATIONS : step === 2 ? GUESTS : LOCATIONS).map(
                    (item) => {
                      const key = STEP_KEYS[step] as 'type' | 'duration' | 'guests' | 'location';
                      const selected = selection[key] === item.id;
                      const label =
                        step === 0
                          ? est.labels.typeLabels[item.id]
                          : step === 1
                            ? est.labels.durationLabels[item.id]
                            : step === 2
                              ? est.labels.guestLabels[item.id]
                              : est.labels.locationLabels[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => selectSingle(key, item.id)}
                          className={optionButtonClass(selected)}
                        >
                          {label}
                        </button>
                      );
                    }
                  )}
                </div>
              )}

              {step === 4 && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {OPTIONS.map((item) => {
                      const selected = selection.options.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleOption(item.id)}
                          className={optionButtonClass(selected)}
                        >
                          {selected ? '× ' : '+ '}
                          {est.labels.optionLabels[item.id]}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setFinished(true)}
                    className="mt-10 inline-flex items-center justify-center bg-primary px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                  >
                    {est.seeEstimate}
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          /* ── Résultat ─────────────────────────────────────────── */
          <div className="animate-fade-in">
            <p className={monoMeta}>{est.resultTitle}</p>

            <p className="mt-6 font-serif text-5xl font-light tracking-tight text-primary md:text-7xl">
              {result ? `${formatPrice(result.min)} – ${formatPrice(result.max)}` : '—'}
            </p>

            {result && (
              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3 border-t border-foreground/10 pt-6 font-mono text-xs text-foreground/60">
                <dt>{est.labels.typeLabels[selection.type ?? '']}</dt>
                <dd className="text-right">{formatPrice(result.base)}</dd>
                <dt>{est.labels.durationLabels[selection.duration ?? '']}</dt>
                <dd className="text-right">× {result.durationFactor?.toFixed(1)}</dd>
                <dt>{est.labels.guestLabels[selection.guests ?? '']}</dt>
                <dd className="text-right">× {result.guestsFactor?.toFixed(1)}</dd>
                <dt>{est.labels.locationLabels[selection.location ?? '']}</dt>
                <dd className="text-right">
                  {result.transport === 0 ? '—' : `+ ${formatPrice(result.transport)}`}
                </dd>
                {result.optionsTotal > 0 && (
                  <>
                    <dt>{est.steps.options}</dt>
                    <dd className="text-right">+ {formatPrice(result.optionsTotal)}</dd>
                  </>
                )}
              </dl>
            )}

            <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
              {est.resultNote}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={continueToForm}
                className="inline-flex items-center justify-center bg-primary px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                {est.continueToForm} →
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center border border-foreground/25 px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:border-foreground hover:text-foreground"
              >
                {est.recalculate}
              </button>
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/35">
              {est.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Estimator;
