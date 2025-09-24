import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

const TopBar: React.FC = () => {
  return (
    <header className="bg-[#1E3932] w-full p-4 flex items-center justify-between sticky top-0 z-20">
      <button aria-label="Go back" className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full">
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <h1 className="text-xl font-bold text-white absolute left-1/2 -translate-x-1/2">
        MoodVerse
      </h1>
      <div className="w-6"></div>
    </header>
  );
};

export default TopBar;
