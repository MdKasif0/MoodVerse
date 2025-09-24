import React from 'react';
import type { SelectionMode } from '../types';

interface SelectionModeToggleProps {
  selectionMode: SelectionMode;
  onModeChange: (mode: SelectionMode) => void;
}

const SelectionModeToggle: React.FC<SelectionModeToggleProps> = ({ selectionMode, onModeChange }) => {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="relative flex w-full max-w-xs items-center rounded-full bg-slate-100 p-1 shadow-inner shadow-slate-200/50">
        <div
          className={`
            absolute top-1 bottom-1 w-1/2 rounded-full bg-purple-600 transition-all duration-300 ease-in-out
            ${selectionMode === 'random' ? 'left-1' : 'left-1/2'}
          `}
        />
        <button
          onClick={() => onModeChange('random')}
          className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-medium transition-colors focus:outline-none ${
            selectionMode === 'random' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-pressed={selectionMode === 'random'}
        >
          Random
        </button>
        <button
          onClick={() => onModeChange('sequential')}
          className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-medium transition-colors focus:outline-none ${
            selectionMode === 'sequential' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-pressed={selectionMode === 'sequential'}
        >
          Sequential
        </button>
      </div>
    </div>
  );
};

export default SelectionModeToggle;
