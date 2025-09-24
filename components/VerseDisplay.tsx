import React, { forwardRef } from 'react';
import type { Verse } from '../types';
import CopyIcon from './icons/CopyIcon';
import HeartIcon from './icons/HeartIcon';
import RefreshIcon from './icons/RefreshIcon';
import ShareIcon from './icons/ShareIcon';
import StarIcon from './icons/StarIcon';
import MosqueIcon from './icons/MosqueIcon';

interface VerseDisplayProps {
  verse: Verse | null;
  onCopy: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh: () => void;
  title: string;
}

const VerseDisplay = forwardRef<HTMLDivElement, VerseDisplayProps>(({ verse, onCopy, isFavorite, onToggleFavorite, onRefresh, title }, ref) => {
  if (!verse) {
    return (
      <div className="text-center text-gray-500 mt-10 p-8 mx-4">
        <p className="text-lg">Select a mood to receive a verse.</p>
      </div>
    );
  }
  
  const backgroundStyle = { backgroundImage: 'linear-gradient(to bottom right, #4A4A2C, #2F2F1A, #1A1A0D)' };

  return (
    <div className="animate-fade-in w-full px-4" ref={ref}>
       <div 
          className="rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[400px] md:min-h-[450px]"
          style={backgroundStyle}
        >
        
        <header className="flex items-center justify-between text-white/80">
          <div className="flex items-center gap-2">
            <StarIcon className="w-4 h-4" />
            <span className="font-semibold text-sm">{title}</span>
          </div>
          <MosqueIcon />
        </header>

        <div className="flex-grow flex flex-col items-center justify-center text-center -mt-8">
            <blockquote className="relative z-10">
                <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-white">
                “{verse.translation}”
                </p>
            </blockquote>
            <cite className="block mt-6 text-base font-medium relative z-10 text-white/70">
                — {verse.ref}
            </cite>
        </div>
        
        <footer className="flex justify-center items-center gap-4 text-white/80">
          <button onClick={onRefresh} aria-label="Refresh verse" className="p-2 hover:text-white transition-colors"><RefreshIcon className="w-5 h-5" /></button>
          <button onClick={onToggleFavorite} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={isFavorite} className={`p-2 hover:text-white transition-colors ${isFavorite ? 'text-red-400' : ''}`}><HeartIcon isFilled={isFavorite} className="w-5 h-5" /></button>
          <button onClick={onCopy} aria-label="Copy verse text" className="p-2 hover:text-white transition-colors"><CopyIcon className="w-5 h-5" /></button>
          <button aria-label="Share verse" className="p-2 hover:text-white transition-colors"><ShareIcon className="w-5 h-5" /></button>
        </footer>
      </div>
    </div>
  );
});

export default VerseDisplay;
