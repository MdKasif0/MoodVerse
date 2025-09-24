import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Verse } from './types';
import MoodSelector from './components/MoodSelector';
import VerseDisplay from './components/VerseDisplay';
import TopBar from './components/TopBar';
import BottomNavBar from './components/BottomNavBar';
import ActionButtons from './components/ActionButtons';


const App: React.FC = () => {
  const [versesData, setVersesData] = useState<Verse[] | null>(null);
  const [allMoods, setAllMoods] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [displayTitle, setDisplayTitle] = useState('Verse of the Day');
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
        setAllMoods(['sad', 'stress', 'demotivated', 'grateful', 'hopeful', 'patience', 'calm', 'forgiveness', 'courage']);

        // Set initial "Verse of the Day"
        const verseOfTheDay = data.find(v => v.id === 'mv-054'); // Quran 16:53 as default
        setCurrentVerse(verseOfTheDay || data[0]);

      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerses();
  }, []);
  
  useEffect(() => {
    if (currentVerse && selectedMood) {
      document.title = `Verse for ${selectedMood}: ${currentVerse.ref} | MoodVerse`;
    } else {
      document.title = 'MoodVerse | Find a Verse for Your Mood';
    }
  }, [currentVerse, selectedMood]);

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

    // Prevent showing the same verse twice in a row for the same mood
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * versesForMood.length);
    } while (versesForMood.length > 1 && versesForMood[randomIndex].id === currentVerse?.id);
    const nextVerse = versesForMood[randomIndex];
    
    setSelectedMood(mood);
    const capitalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1);
    setDisplayTitle(capitalizedMood);
    setCurrentVerse(nextVerse);
  }, [versesData, currentVerse]);

  const handleVerseOfTheDay = useCallback(() => {
    if (!versesData) return;
    const verse = versesData.find(v => v.id === 'mv-054');
    setCurrentVerse(verse || versesData[0]);
    setDisplayTitle('Verse of the Day');
    setSelectedMood(null);
  }, [versesData]);

  const handleRandom = useCallback(() => {
    if (!versesData) return;
    const randomIndex = Math.floor(Math.random() * versesData.length);
    setCurrentVerse(versesData[randomIndex]);
    setDisplayTitle('Random');
    setSelectedMood(null);
  }, [versesData]);

  const handleRefresh = useCallback(() => {
    if (selectedMood) {
      handleMoodSelect(selectedMood);
    } else {
      handleRandom();
    }
  }, [selectedMood, handleMoodSelect, handleRandom]);
  
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
      return <div className="text-center text-gray-400 text-xl">Loading verses...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500 text-xl">Error: {error}</div>;
    }
    return (
      <>
        <div className="px-4">
          <h2 className="text-2xl font-bold text-white mb-4">How are you feeling?</h2>
        </div>
        <MoodSelector
          moods={allMoods}
          selectedMood={selectedMood}
          onSelectMood={handleMoodSelect}
        />
        <ActionButtons 
          onVerseOfTheDay={handleVerseOfTheDay}
          onRandom={handleRandom}
        />
        <VerseDisplay 
          key={currentVerse ? currentVerse.id : 'no-verse'}
          ref={verseCardRef}
          verse={currentVerse} 
          onCopy={handleCopyText}
          isFavorite={currentVerse ? favorites.includes(currentVerse.id) : false}
          onToggleFavorite={() => currentVerse && handleToggleFavorite(currentVerse.id)}
          onRefresh={handleRefresh}
          title={displayTitle}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-gray-200 font-sans">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <TopBar />
      <main className="pb-24">
        {renderContent()}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default App;
