import React, { useRef } from 'react';
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
  onRefresh?: () => void;
  onShare: (element: HTMLElement | null, verse: Verse | null) => void;
  onShowCitation: (verse: Verse) => void;
  title: string;
  selectedMood: string | null; // Kept for title consistency, but not for styling
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse, onCopy, isFavorite, onToggleFavorite, onRefresh, onShare, onShowCitation, title }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!verse) {
    return (
      <div className="text-center text-gray-500 mt-10 p-8 mx-4">
        <p className="text-xl">Select a mood to receive a verse.</p>
      </div>
    );
  }
  
  const backgroundStyle = {
    background: 'radial-gradient(circle at 50% 50%, #3F431D 0%, #14140F 100%)',
  };

  return (
    <div className="animate-card-enter w-full px-4">
      <div 
        ref={cardRef}
        className="rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between aspect-[3/4] text-white/90 shadow-2xl max-w-md mx-auto"
        style={backgroundStyle}
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <StarIcon className="w-5 h-5" />
            <span className="font-medium">{title}</span>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm ring-1 ring-white/10">
            <MosqueIcon className="w-7 h-7" />
          </div>
        </header>

        <div className="flex-grow flex flex-col items-center justify-center text-center -mt-10">
            <blockquote className="relative z-10 px-4">
                <p className="font-sans text-3xl md:text-4xl font-bold leading-relaxed text-white">
                “{verse.translation}”
                </p>
            </blockquote>
             <button onClick={() => onShowCitation(verse)} className="block mt-6 text-lg font-medium relative z-10 text-white/70 tracking-wide focus:outline-none focus:underline">
                — Quran {verse.sura}:{verse.ayah} —
            </button>
        </div>
        
        <footer className="flex justify-end items-center do-not-capture">
            <div className="bg-black/20 backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-center gap-x-6 ring-1 ring-white/10">
                {onRefresh && <button onClick={onRefresh} aria-label="Refresh verse" className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"><RefreshIcon className="w-6 h-6" /></button>}
                <button onClick={onToggleFavorite} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={isFavorite} className={`p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full ${isFavorite ? 'text-white' : 'text-white/80 hover:text-white'}`}><HeartIcon isFilled={isFavorite} className="w-6 h-6" /></button>
                <button onClick={onCopy} aria-label="Copy verse text" className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"><CopyIcon className="w-6 h-6" /></button>
                <button onClick={() => onShare(cardRef.current, verse)} aria-label="Share verse" className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"><ShareIcon className="w-6 h-6" /></button>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default VerseDisplay;