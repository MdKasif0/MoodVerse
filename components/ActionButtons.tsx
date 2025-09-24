import React from 'react';
import StarIcon from './icons/StarIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ActionButtonsProps {
  onVerseOfTheDay: () => void;
  onRandom: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onVerseOfTheDay, onRandom }) => {
  return (
    <div className="flex justify-center items-center gap-3 my-6 px-4">
      <button 
        onClick={onVerseOfTheDay}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2D2D2D] text-white rounded-full text-sm font-medium transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F0F] focus:ring-gray-400"
      >
        <StarIcon className="w-4 h-4" />
        Verse of the Day
      </button>
      <button 
        onClick={onRandom}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2D2D2D] text-white rounded-full text-sm font-medium transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F0F] focus:ring-gray-400"
      >
        <SparklesIcon className="w-4 h-4" />
        Random
      </button>
    </div>
  );
};

export default ActionButtons;
