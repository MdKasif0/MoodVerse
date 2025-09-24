import React, { useState, useEffect, useCallback } from 'react';
import type { Verse } from './types';
import MoodSelector from './components/MoodSelector';
import VerseDisplay from './components/VerseDisplay';
import TopBar from './components/TopBar';
import ActionButtons from './components/ActionButtons';
import FavoritesPage from './components/FavoritesPage';
import CitationModal from './components/CitationModal';
import Notification from './components/Notification';

declare const htmlToImage: any;

const App: React.FC = () => {
  const [versesData, setVersesData] = useState<Verse[] | null>(null);
  const [allMoods, setAllMoods] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [displayTitle, setDisplayTitle] = useState('Verse of the Day');
  const [view, setView] = useState<'main' | 'favorites'>('main');
  const [isSharing, setIsSharing] = useState(false);
  const [modalVerse, setModalVerse] = useState<Verse | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
    const isCurrentlyFavorite = favorites.includes(verseId);
    if (isCurrentlyFavorite) {
      setFavorites(prev => prev.filter(id => id !== verseId));
      setNotification('Removed from favorites');
    } else {
      setFavorites(prev => [...prev, verseId]);
      setNotification('Added to favorites');
    }
  }, [favorites]);

  const handleCopyText = useCallback((verseToCopy: Verse | null) => {
    if (verseToCopy) {
      const textToCopy = `“${verseToCopy.translation}”\n— ${verseToCopy.ref}\n\nShared from MoodVerse`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => setNotification('Verse copied to clipboard!'))
        .catch(err => {
          console.error('Failed to copy text: ', err);
          setNotification('Failed to copy. Please try again.');
        });
    }
  }, []);

  const handleShare = useCallback(async (element: HTMLElement | null, verse: Verse | null) => {
    if (!element || isSharing) return;

    setIsSharing(true);
    try {
      const dataUrl = await htmlToImage.toPng(element, {
        pixelRatio: 2,
        width: element.offsetWidth,
        height: element.offsetHeight,
        filter: (node: HTMLElement) => !node.classList?.contains('do-not-capture'),
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'moodverse-verse.png', { type: 'image/png' });
      const verseText = verse ? `“${verse.translation}”\n— ${verse.ref}\n\nShared from MoodVerse` : "An inspirational verse from MoodVerse";
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Verse from MoodVerse',
          text: verseText,
        });
      } else {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'moodverse-verse.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setNotification('Image saved to downloads!');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      if (error instanceof Error && error.name !== 'AbortError') {
        setNotification('Could not share image. Please try again.');
      }
    } finally {
      setIsSharing(false);
    }
  }, [isSharing]);

  const handleShowCitation = (verse: Verse) => setModalVerse(verse);
  const handleCloseModal = () => setModalVerse(null);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-400 text-xl">Loading verses...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500 text-xl">Error: {error}</div>;
    }
    if (view === 'favorites') {
        return (
            <FavoritesPage
                favoriteVerseIds={favorites}
                allVerses={versesData || []}
                onToggleFavorite={handleToggleFavorite}
                onCopy={handleCopyText}
                onShare={handleShare}
                onShowCitation={handleShowCitation}
            />
        );
    }
    return (
      <>
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
          verse={currentVerse} 
          onCopy={() => handleCopyText(currentVerse)}
          isFavorite={currentVerse ? favorites.includes(currentVerse.id) : false}
          onToggleFavorite={() => currentVerse && handleToggleFavorite(currentVerse.id)}
          onRefresh={handleRefresh}
          onShare={handleShare}
          onShowCitation={handleShowCitation}
          title={displayTitle}
          selectedMood={selectedMood}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-gray-200 font-sans">
      {isSharing && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 animate-fade-in">
          <svg className="animate-spin h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-lg">Generating Image...</p>
        </div>
      )}
      <style>{`
        @keyframes card-enter {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card-enter { animation: card-enter 0.4s ease-out forwards; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        @keyframes content-enter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-content-enter { animation: content-enter 0.3s ease-out forwards; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <TopBar 
        view={view}
        onNavigate={view === 'main' ? () => setView('favorites') : () => setView('main')}
      />
      <main className="pb-8">
        {renderContent()}
      </main>
      <CitationModal verse={modalVerse} onClose={handleCloseModal} />
      <Notification message={notification} onClose={() => setNotification(null)} />
    </div>
  );
};

export default App;