import { ReactElement } from "react";

export interface Verse {
  id: string;
  ref: string;
  sura: number;
  ayah: number;
  translation: string;
  moods: string[];
}

export interface Palette {
  gradient: string;
  patternUrl: string;
  textColor: string;
  citeColor: string;
  logoColor: string;
}

// FIX: Export SelectionMode type to be used in SelectionModeToggle.tsx
export type SelectionMode = 'random' | 'sequential';
