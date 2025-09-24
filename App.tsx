import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Verse, SelectionMode } from './types';
import MoodSelector from './components/MoodSelector';
import VerseDisplay from './components/VerseDisplay';
import MoodVerseLogo from './components/icons/MoodVerseLogo';
import SelectionModeToggle from './components/SelectionModeToggle';
// import { toPng } from 'html-to-image';


const App: React.FC = () => {
  const [versesData, setVersesData] = useState<Verse[] | null>(null);
  const [allMoods, setAllMoods] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('random');
  const [verseIndices, setVerseIndices] = useState<{ [mood: string]: number }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const verseCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('moodverse-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
      setFavorites([]);
    }

    const fetchVerses = async () => {
      try {
        const response = await fetch('/verses.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Verse[] = await response.json();
        setVersesData(data);
        
        const moods = [...new Set(data.flatMap(v => v.moods))].sort();
        setAllMoods(moods);

      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerses();
  }, []);

  useEffect(() => {
    localStorage.setItem('moodverse-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleMoodSelect = useCallback((mood: string) => {
    if (!versesData) return;

    const versesForMood = versesData.filter(v => v.moods.includes(mood));
    if (versesForMood.length === 0) {
      setCurrentVerse(null);
      return;
    }

    let nextVerse: Verse;
    const isNewMood = mood !== selectedMood;
    setSelectedMood(mood);

    if (selectionMode === 'random') {
      // Prevent showing the same verse twice in a row for the same mood
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * versesForMood.length);
      } while (versesForMood.length > 1 && versesForMood[randomIndex].id === currentVerse?.id);
      nextVerse = versesForMood[randomIndex];

    } else { // sequential
      const currentIndex = isNewMood ? 0 : (verseIndices[mood] ?? -1) + 1;
      const nextIndex = currentIndex % versesForMood.length;
      nextVerse = versesForMood[nextIndex];
      setVerseIndices(prev => ({ ...prev, [mood]: nextIndex }));
    }
    
    setCurrentVerse(nextVerse);
  }, [versesData, selectedMood, selectionMode, verseIndices, currentVerse]);
  
  const handleToggleFavorite = useCallback((verseId: string) => {
    setFavorites(prev => 
      prev.includes(verseId)
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
    );
  }, []);

  const handleCopyText = useCallback(() => {
    if (currentVerse) {
      const textToCopy = `“${currentVerse.translation}”\n— ${currentVerse.ref}\n\nShared from MoodVerse`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Verse copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err));
    }
  }, [currentVerse]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-slate-500 text-xl">Loading verses...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500 text-xl">Error: {error}</div>;
    }
    return (
      <>
        <MoodSelector
          moods={allMoods}
          selectedMood={selectedMood}
          onSelectMood={handleMoodSelect}
        />
        <SelectionModeToggle 
          selectionMode={selectionMode}
          onModeChange={setSelectionMode}
        />
        <VerseDisplay 
          key={currentVerse ? currentVerse.id : 'no-verse'}
          ref={verseCardRef}
          verse={currentVerse} 
          mood={selectedMood} 
          onCopy={handleCopyText}
          isFavorite={currentVerse ? favorites.includes(currentVerse.id) : false}
          onToggleFavorite={() => currentVerse && handleToggleFavorite(currentVerse.id)}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-purple-500 selection:text-white">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards; }
      `}</style>
      <main className="container mx-auto text-center w-full flex-grow flex flex-col justify-center max-w-4xl">
        <header className="mb-8 mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <MoodVerseLogo className="w-8 h-8 md:w-10 h-10 text-purple-600" />
            MoodVerse
          </h1>
          <p className="text-slate-600 mt-4 text-lg md:text-xl max-w-xl mx-auto">
            Find a verse that speaks to your heart. How are you feeling today?
          </p>
        </header>
        {renderContent()}
      </main>
      <footer className="w-full text-center py-4 text-slate-500 text-sm mt-8">
        <p>Created with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;