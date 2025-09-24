import React, { forwardRef } from 'react';
import type { Verse } from '../types';
import CopyIcon from './icons/CopyIcon';
import ShareIcon from './icons/ShareIcon';
import MoodVerseLogo from './icons/MoodVerseLogo';
import { moodPalettes } from './moodPalettes';
import HeartIcon from './icons/HeartIcon';

interface VerseDisplayProps {
  verse: Verse | null;
  mood: string | null;
  onCopy: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const VerseDisplay = forwardRef<HTMLDivElement, VerseDisplayProps>(({ verse, mood, onCopy, isFavorite, onToggleFavorite }, ref) => {
  if (!verse || !mood) {
    return (
      <div className="text-center text-slate-500 mt-10 p-8 border-2 border-dashed border-slate-300 rounded-xl">
        <p className="text-lg">Select a mood above to receive a verse.</p>
      </div>
    );
  }
  
  const palette = (mood && moodPalettes[mood]) || moodPalettes['hopeful']; // Robust fallback
  
  // Use a softer, more subtle shadow and a very light border.
  const cardClasses = 'shadow-lg shadow-slate-300/40 border border-black/5';
    
  const textColor = palette.textColor;
  const citeColor = palette.citeColor;
  const logoColor = palette.logoColor;

  // Combine the texture pattern and the gradient for a layered background effect.
  const backgroundStyle = { backgroundImage: `${palette.patternUrl}, ${palette.gradient}` };

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto">
       <div 
          ref={ref} 
          className={`rounded-2xl p-6 md:p-10 relative overflow-hidden transition-all duration-700 ease-in-out ${cardClasses}`}
          style={backgroundStyle}
        >
        
        <blockquote className="text-center relative z-10">
            <p className={`font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed ${textColor}`}>
            “{verse.translation}”
            </p>
        </blockquote>
        <cite className={`block text-right mt-8 text-base font-medium relative z-10 ${citeColor}`}>
            — {verse.ref}
        </cite>
        <div className={`absolute bottom-4 right-4 flex items-center gap-2 z-10 ${logoColor}`}>
            <MoodVerseLogo className="w-5 h-5" />
            <span className="font-semibold text-xs">MoodVerse</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={onToggleFavorite} 
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          className={`flex items-center justify-center p-3 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 ${
            isFavorite
              ? 'bg-red-100 text-red-500 ring-red-300'
              : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 ring-slate-400'
          }`}
        >
          <HeartIcon isFilled={isFavorite} className="w-5 h-5" />
        </button>
        <button 
          onClick={onCopy} 
          aria-label="Copy verse text"
          className="flex items-center justify-center p-3 rounded-full bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-slate-50"
        >
          <CopyIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

export default VerseDisplay;