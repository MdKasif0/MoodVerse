import React from 'react';
import { moodEmojis } from './moodEmojis';

interface MoodSelectorProps {
  moods: string[];
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ moods, selectedMood, onSelectMood }) => {
  return (
    <div className="flex items-center gap-2 py-4 overflow-x-auto whitespace-nowrap no-scrollbar px-4">
      {moods.map((mood) => {
        const isSelected = mood === selectedMood;
        const emoji = moodEmojis[mood] || '😊';

        return (
          <button
            key={mood}
            onClick={() => onSelectMood(mood)}
            aria-pressed={isSelected}
            className={`
              relative flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F0F] focus:ring-gray-400
              ${isSelected
                ? 'bg-gray-700 text-white'
                : 'bg-[#2D2D2D] text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            <span>{emoji}</span>
            <span className="text-sm font-medium capitalize">{mood}</span>
            {isSelected && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
