export interface Verse {
  id: string;
  ref: string;
  sura: number;
  ayah: number;
  translation: string;
  moods: string[];
}

export type SelectionMode = 'random' | 'sequential';

export interface Palette {
  gradient: string;
  patternUrl: string;
  textColor: string;
  citeColor: string;
  logoColor: string;
}
