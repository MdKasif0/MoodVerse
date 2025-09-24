import React from 'react';
import type { Verse } from '../types';
import VerseDisplay from './VerseDisplay';

interface FavoritesPageProps {
  favoriteVerseIds: string[];
  allVerses: Verse[];
  onToggleFavorite: (verseId: string) => void;
  onCopy: (verse: Verse) => void;
  onShare: (element: HTMLElement | null, verse: Verse | null) => void;
  onShowCitation: (verse: Verse) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favoriteVerseIds, allVerses, onToggleFavorite, onCopy, onShare, onShowCitation }) => {
  const favoriteVerses = favoriteVerseIds
    .map(id => allVerses.find(verse => verse.id === id))
    .filter((verse): verse is Verse => !!verse)
    .reverse();

  if (favoriteVerses.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 p-8 animate-card-enter mx-4">
        <h2 className="text-2xl font-bold mb-2 text-white">No Favorites Yet</h2>
        <p className="text-lg">Tap the heart on any verse to save it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 animate-card-enter">
      {favoriteVerses.map(verse => (
        <VerseDisplay
          key={verse.id}
          verse={verse}
          onCopy={() => onCopy(verse)}
          isFavorite={true}
          onToggleFavorite={() => onToggleFavorite(verse.id)}
          onShare={onShare}
          onShowCitation={onShowCitation}
          title={verse.moods[0].charAt(0).toUpperCase() + verse.moods[0].slice(1)}
          selectedMood={verse.moods[0]}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
