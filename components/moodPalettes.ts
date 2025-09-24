import type { Palette } from '../types';

// Creates a subtle, seamless noise texture that mimics paper.
// The texture is semi-transparent and is meant to be layered over a gradient.
const createPaperTextureUrl = () => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'>
      <filter id='paper' x='0' y='0' width='100%' height='100%'>
        <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/>
        <feColorMatrix type='matrix' values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.04 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#paper)'/>
    </svg>
  `;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const paperTexture = createPaperTextureUrl();

export const moodPalettes: { [key: string]: Palette } = {
  // sadness: #9BB7D4 → #E8F1F8
  sad: {
    gradient: 'linear-gradient(to top right, #E8F1F8, #9BB7D4)',
    patternUrl: paperTexture,
    textColor: 'text-slate-800',
    citeColor: 'text-slate-600',
    logoColor: 'text-slate-500/60',
  },
  // anxiety: #F6D0C4 → #FFF5F3 -> Mapped to 'stress'
  stress: {
    gradient: 'linear-gradient(to top right, #FFF5F3, #F6D0C4)',
    patternUrl: paperTexture,
    textColor: 'text-orange-900',
    citeColor: 'text-orange-800',
    logoColor: 'text-orange-800/50',
  },
  // gratitude: #FBE7C6 → #FFF9F0 -> Mapped to 'grateful'
  grateful: {
    gradient: 'linear-gradient(to top right, #FFF9F0, #FBE7C6)',
    patternUrl: paperTexture,
    textColor: 'text-amber-900',
    citeColor: 'text-amber-800',
    logoColor: 'text-amber-800/50',
  },
  // hope: #C6EBC6 → #F6FFF6 -> Mapped to 'hopeful'
  hopeful: {
    gradient: 'linear-gradient(to top right, #F6FFF6, #C6EBC6)',
    patternUrl: paperTexture,
    textColor: 'text-green-900',
    citeColor: 'text-green-800',
    logoColor: 'text-green-800/50',
  },
  // patience: #D7D2FF → #F5F4FF
  patience: {
    gradient: 'linear-gradient(to top right, #F5F4FF, #D7D2FF)',
    patternUrl: paperTexture,
    textColor: 'text-indigo-900',
    citeColor: 'text-indigo-800',
    logoColor: 'text-indigo-800/50',
  },
  // calm: light teal #BDE6E6 -> #F0FAFA
  calm: {
    gradient: 'linear-gradient(to top right, #F0FAFA, #BDE6E6)',
    patternUrl: paperTexture,
    textColor: 'text-teal-900',
    citeColor: 'text-teal-800',
    logoColor: 'text-teal-800/50',
  },
  // forgiveness: soft lavender #E1E1ED -> #F7F7F9
  forgiveness: {
    gradient: 'linear-gradient(to top right, #F7F7F9, #E1E1ED)',
    patternUrl: paperTexture,
    textColor: 'text-slate-800',
    citeColor: 'text-slate-600',
    logoColor: 'text-slate-500/60',
  },
  // courage: warm peach #FFDAB9 -> #FFF8F0
  courage: {
    gradient: 'linear-gradient(to top right, #FFF8F0, #FFDAB9)',
    patternUrl: paperTexture,
    textColor: 'text-orange-900',
    citeColor: 'text-orange-800',
    logoColor: 'text-orange-800/50',
  },
  // demotivated: neutral grey #D8D8D8 -> #F5F5F5
  demotivated: {
    gradient: 'linear-gradient(to top right, #F5F5F5, #D8D8D8)',
    patternUrl: paperTexture,
    textColor: 'text-gray-800',
    citeColor: 'text-gray-600',
    logoColor: 'text-gray-500/60',
  },
};