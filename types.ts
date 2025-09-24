export interface Verse {
  id: string;
  ref: string;
  sura: number;
  ayah: number;
  translation: string;
  moods: string[];
}

// FIX: Export 'SelectionMode' type to resolve import error in components/SelectionModeToggle.tsx
export type SelectionMode = 'random' | 'sequential';

// FIX: Export 'Palette' type to resolve import error in components/moodPalettes.ts
export interface Palette {
  gradient: string;
  patternUrl: string;
  textColor: string;
  citeColor: string;
  logoColor: string;
}
