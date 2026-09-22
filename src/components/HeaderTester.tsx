import { useHeaderSettings } from '@/hooks/useHeaderSettings';
import TestBox from '@/components/TestBox';

/**
 * BOX DE TEST HEADER (20/09) — TEMPORAIRE, à retirer au choix final
 * (comme BackgroundPhoto et TypoTester). Positionnée en HAUT à droite
 * (top-14 : sous le header sticky Anuc 32/44 px) pour ne pas empiler
 * une 3e box en bas.
 *
 * Contrôles :
 * - header : actuel (Orange Decibel) | anuc (spec SPEC_HEADER_ANUC.md)
 * - thème : clair (paper/ink Anuc) | sombre (brun/crème ODB)
 * - accents : anuc (earth/wood/water/fire par item) | orange (mono ODB)
 * - hauteur : 32 (spec) | 44 (confort tactile)
 *
 * Persistance : localStorage `odb-header` (voir useHeaderSettings).
 */
const HeaderTester = () => {
  const [settings, write] = useHeaderSettings();

  const btn =
    'border border-foreground/15 px-1.5 py-0.5 transition-colors hover:border-foreground/50 hover:text-foreground';

  const Row = ({
    label,
    value,
    options,
    onPick,
  }: {
    label: string;
    value: string;
    options: { v: string; label: string }[];
    onPick: (v: string) => void;
  }) => {
    const i = options.findIndex((o) => o.v === value);
    const cycle = (dir: number) => onPick(options[(i + dir + options.length) % options.length].v);
    return (
      <div className="mt-1.5 flex items-center gap-2 first:mt-0">
        <span className="text-foreground/40">{label}</span>
        <button onClick={() => cycle(-1)} aria-label={`${label} précédent`} className={btn}>
          ‹
        </button>
        <span className="min-w-[104px] text-center text-foreground">
          {options.find((o) => o.v === value)?.label}
        </span>
        <button onClick={() => cycle(1)} aria-label={`${label} suivant`} className={btn}>
          ›
        </button>
      </div>
    );
  };

  return (
    <TestBox id="header" title="header">
      <Row
        label="header"
        value={settings.variant}
        options={[
          { v: 'current', label: 'actuel' },
          { v: 'anuc', label: 'anuc' },
        ]}
        onPick={(v) => write({ variant: v as 'current' | 'anuc' })}
      />
      {settings.variant === 'anuc' && (
        <>
          <Row
            label="thème"
            value={settings.theme}
            options={[
              { v: 'light', label: 'clair' },
              { v: 'dark', label: 'sombre' },
            ]}
            onPick={(v) => write({ theme: v as 'light' | 'dark' })}
          />
          <Row
            label="accents"
            value={settings.accents}
            options={[
              { v: 'anuc', label: 'anuc ×4' },
              { v: 'orange', label: 'orange odb' },
            ]}
            onPick={(v) => write({ accents: v as 'anuc' | 'orange' })}
          />
          <Row
            label="hauteur"
            value={String(settings.height)}
            options={[
              { v: '32', label: '32 px' },
              { v: '44', label: '44 px' },
            ]}
            onPick={(v) => write({ height: Number(v) as 32 | 44 })}
          />
        </>
      )}
    </TestBox>
  );
};

export default HeaderTester;
