import React from 'react';
import HeartIcon from './icons/HeartIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface TopBarProps {
  view: 'main' | 'favorites';
  onNavigate: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ view, onNavigate }) => {
  return (
    <header className="bg-black w-full p-4 flex items-center justify-between sticky top-0 z-20">
      <div className="w-10">
        {view === 'favorites' && (
          <button
            onClick={onNavigate}
            aria-label="Back to main view"
            className="text-white hover:bg-gray-800 transition-colors p-2 -ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      <h1 className="text-xl font-bold text-white text-center">
        {view === 'main' ? 'MoodVerse' : 'Favorites'}
      </h1>
      <div className="w-10 flex justify-end">
        {view === 'main' && (
          <button
            onClick={onNavigate}
            aria-label="View favorites"
            className="text-white hover:bg-gray-800 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <HeartIcon isFilled={false} className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default TopBar;