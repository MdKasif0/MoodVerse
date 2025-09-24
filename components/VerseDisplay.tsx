import React, { useRef } from 'react';
import type { Verse } from '../types';
import CopyIcon from './icons/CopyIcon';
import HeartIcon from './icons/HeartIcon';
import RefreshIcon from './icons/RefreshIcon';
import ShareIcon from './icons/ShareIcon';
import StarIcon from './icons/StarIcon';
import MoodVerseLogo from './icons/MoodVerseLogo';
import { moodPalettes } from './moodPalettes';

interface VerseDisplayProps {
  verse: Verse | null;
  onCopy: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh?: () => void;
  onShare: (element: HTMLElement | null, verse: Verse | null) => void;
  onShowCitation: (verse: Verse) => void;
  title: string;
  selectedMood: string | null;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse, onCopy, isFavorite, onToggleFavorite, onRefresh, onShare, onShowCitation, title, selectedMood }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!verse) {
    return (
      <div className="text-center text-gray-500 mt-10 p-8 mx-4">
        <p className="text-xl">Select a mood to receive a verse.</p>
      </div>
    );
  }

  const paletteKey = selectedMood || (verse.moods && verse.moods[0]) || 'demotivated';
  const palette = moodPalettes[paletteKey] || moodPalettes.demotivated;

  const backgroundStyle = { 
    backgroundImage: `${palette.patternUrl}, ${palette.gradient}` 
  };
  
  const favoriteColorClass = isFavorite ? 'text-red-500' : 'text-inherit';

  return (
    <div className="animate-card-enter w-full px-4 max-w-xl mx-auto">
       <div 
          ref={cardRef}
          className="rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[400px] md:min-h-[450px] shadow-lg"
          style={backgroundStyle}
        >
        
        <header className="flex items-center justify-between opacity-80">
          <div className={`flex items-center gap-2 ${palette.textColor}`}>
            <StarIcon className="w-4 h-4" />
            <span className="font-semibold text-sm">{title}</span>
          </div>
          <MoodVerseLogo className={`w-6 h-6 ${palette.logoColor}`} />
        </header>

        <div className="flex-grow flex flex-col items-center justify-center text-center -mt-8">
            <blockquote className="relative z-10">
                <p className={`font-serif text-3xl md:text-4xl italic leading-relaxed ${palette.textColor}`}>
                “{verse.translation}”
                </p>
            </blockquote>
             <button onClick={() => onShowCitation(verse)} className={`block mt-6 text-base font-medium relative z-10 ${palette.citeColor} hover:underline focus:outline-none focus:underline`}>
                — {verse.ref}
            </button>
        </div>
        
        <footer className={`flex justify-center items-center gap-4 do-not-capture ${palette.textColor} opacity-70`}>
          {onRefresh && <button onClick={onRefresh} aria-label="Refresh verse" className="p-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"><RefreshIcon className="w-5 h-5" /></button>}
          <button onClick={onToggleFavorite} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={isFavorite} className={`p-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full ${favoriteColorClass}`}><HeartIcon isFilled={isFavorite} className="w-5 h-5" /></button>
          <button onClick={onCopy} aria-label="Copy verse text" className="p-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"><CopyIcon className="w-5 h-5" /></button>
          <button onClick={() => onShare(cardRef.current, verse)} aria-label="Share verse" className="p-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"><ShareIcon className="w-5 h-5" /></button>
        </footer>
      </div>
    </div>
  );
};

export default VerseDisplay;