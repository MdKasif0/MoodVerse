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
  // sad: soft slate blue → light grey
  sad: {
    gradient: 'linear-gradient(to top right, #E8F1F8, #D4DEE7)',
    patternUrl: paperTexture,
    textColor: 'text-slate-800',
    citeColor: 'text-slate-600',
    logoColor: 'text-slate-500/60',
  },
  // stress: very light cream / soft neutral
  stress: {
    gradient: 'linear-gradient(to top right, #F9F6F2, #EFEAE4)',
    patternUrl: paperTexture,
    textColor: 'text-stone-800',
    citeColor: 'text-stone-700/80',
    logoColor: 'text-stone-600/60',
  },
  // grateful: light cream / pale yellow
  grateful: {
    gradient: 'linear-gradient(to top right, #FFF9F0, #FBE7C6)',
    patternUrl: paperTexture,
    textColor: 'text-amber-900',
    citeColor: 'text-amber-800/80',
    logoColor: 'text-amber-800/50',
  },
  // hopeful: pale mint → white
  hopeful: {
    gradient: 'linear-gradient(to top right, #F6FFF6, #D8F0D8)',
    patternUrl: paperTexture,
    textColor: 'text-green-900',
    citeColor: 'text-green-800/80',
    logoColor: 'text-green-800/50',
  },
  // patience: soft lavender
  patience: {
    gradient: 'linear-gradient(to top right, #F5F4FF, #E2E0FF)',
    patternUrl: paperTexture,
    textColor: 'text-indigo-900',
    citeColor: 'text-indigo-800/80',
    logoColor: 'text-indigo-800/50',
  },
  // calm: light teal
  calm: {
    gradient: 'linear-gradient(to top right, #F0FAFA, #D0E8E8)',
    patternUrl: paperTexture,
    textColor: 'text-teal-900',
    citeColor: 'text-teal-800/80',
    logoColor: 'text-teal-800/50',
  },
  // forgiveness: gentle grey / off-white
  forgiveness: {
    gradient: 'linear-gradient(to top right, #F7F7F9, #EAEAF0)',
    patternUrl: paperTexture,
    textColor: 'text-slate-800',
    citeColor: 'text-slate-600',
    logoColor: 'text-slate-500/60',
  },
  // courage: gentle warm gold
  courage: {
    gradient: 'linear-gradient(to top right, #FCFAF5, #F5EADF)',
    patternUrl: paperTexture,
    textColor: 'text-orange-900',
    citeColor: 'text-orange-800/80',
    logoColor: 'text-orange-700/60',
  },
  // demotivated: gentle grey
  demotivated: {
    gradient: 'linear-gradient(to top right, #F5F5F5, #E0E0E0)',
    patternUrl: paperTexture,
    textColor: 'text-gray-800',
    citeColor: 'text-gray-600',
    logoColor: 'text-gray-500/60',
  },
};