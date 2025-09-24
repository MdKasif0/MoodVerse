import React from 'react';
import { moodIcons } from './moodIcons';

interface MoodSelectorProps {
  moods: string[];
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ moods, selectedMood, onSelectMood }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 justify-center gap-4 my-8">
      {moods.map((mood) => {
        const isSelected = mood === selectedMood;
        const Icon = moodIcons[mood] || null;

        return (
          <button
            key={mood}
            onClick={() => onSelectMood(mood)}
            aria-pressed={isSelected}
            className={`
              flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-200 ease-in-out aspect-square border
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-purple-500
              ${isSelected
                ? 'bg-purple-50 text-purple-600 border-purple-200 shadow-sm'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300'
              }
            `}
          >
            {Icon && <Icon />}
            <span className="text-xs sm:text-sm font-semibold capitalize">{mood}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;