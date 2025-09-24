import React from 'react';
import HomeIcon from './icons/HomeIcon';
import BuildingIcon from './icons/BuildingIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import HeadphonesIcon from './icons/HeadphonesIcon';
import SettingsIcon from './icons/SettingsIcon';

const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm mx-auto bg-[#1C1C1C] rounded-full shadow-lg z-20">
      <div className="flex justify-around items-center h-16">
        <button aria-label="Home" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
          <HomeIcon className="w-6 h-6" />
        </button>
        <button aria-label="Mosques" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
          <BuildingIcon className="w-6 h-6" />
        </button>
        <button aria-label="Quran" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
          <BookOpenIcon className="w-6 h-6" />
        </button>
        <button aria-label="Listen" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
          <HeadphonesIcon className="w-6 h-6" />
        </button>
        <button aria-label="Settings" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default BottomNavBar;
