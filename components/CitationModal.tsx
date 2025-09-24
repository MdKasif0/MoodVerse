import React, { useEffect } from 'react';
import type { Verse } from '../types';
import { suraNames } from './suraNames';
import CloseIcon from './icons/CloseIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

interface CitationModalProps {
  verse: Verse | null;
  onClose: () => void;
}

const CitationModal: React.FC<CitationModalProps> = ({ verse, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!verse) {
    return null;
  }

  const suraName = suraNames[verse.sura] || 'Unknown Sura';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-md p-6 bg-[#1A1A1A] rounded-2xl shadow-lg text-white animate-content-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Full Citation</h2>
          <p className="text-gray-300">
            Sūrah {suraName}, Ayah {verse.ayah}
          </p>

          <blockquote className="border-l-2 border-gray-600 pl-4">
            <p className="font-serif italic text-lg leading-relaxed text-gray-200">
              “{verse.translation}”
            </p>
          </blockquote>

          <a
            href={`https://quran.com/${verse.sura}/${verse.ayah}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] focus:ring-purple-500"
          >
            <span>View Tafsir on Quran.com</span>
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CitationModal;