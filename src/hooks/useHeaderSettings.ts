import { useEffect, useState } from 'react';

/**
 * RÉGLAGES HEADER DE TEST (20/09) — partagés entre App (choix du header
 * rendu) et HeaderTester (box flottante). Persistance localStorage
 * `odb-header` + événement `odb-header` pour synchroniser les composants
 * sans rechargement.
 *
 * variant : 'current' (header Orange Decibel actuel) | 'anuc' (header
 *           Anuc Home — spec SPEC_HEADER_ANUC.md)
 * theme :   'light' (paper/ink Anuc) | 'dark' (adapté au brun ODB)
 * accents : 'anuc' (earth/wood/water/fire par item) | 'orange' (mono
 *           orange ODB, faces hover = invert ink — section 8 de la spec)
 * height :  32 (spec) | 44 (QA : cible tactile confortable)
 */
export interface HeaderSettings {
  variant: 'current' | 'anuc';
  theme: 'light' | 'dark';
  accents: 'anuc' | 'orange';
  height: 32 | 44;
}

const DEFAULTS: HeaderSettings = {
  variant: 'current',
  theme: 'dark',
  accents: 'anuc',
  height: 32,
};

const read = (): HeaderSettings => {
  try {
    const parsed = JSON.parse(localStorage.getItem('odb-header') || '{}');
    return {
      variant: parsed.variant === 'anuc' ? 'anuc' : 'current',
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      accents: parsed.accents === 'orange' ? 'orange' : 'anuc',
      height: parsed.height === 44 ? 44 : 32,
    };
  } catch {
    return DEFAULTS;
  }
};

export const useHeaderSettings = () => {
  const [settings, setSettings] = useState<HeaderSettings>(read);

  useEffect(() => {
    const onChange = () => setSettings(read());
    window.addEventListener('odb-header', onChange);
    return () => window.removeEventListener('odb-header', onChange);
  }, []);

  const write = (next: Partial<HeaderSettings>) => {
    const merged = { ...read(), ...next };
    try {
      localStorage.setItem('odb-header', JSON.stringify(merged));
    } catch {
      /* iframe */
    }
    window.dispatchEvent(new Event('odb-header'));
  };

  return [settings, write] as const;
};
