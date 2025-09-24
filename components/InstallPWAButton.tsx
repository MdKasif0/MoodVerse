import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}


const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsAppInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
        setDeferredPrompt(null);
        setIsAppInstalled(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (!deferredPrompt || isAppInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in" role="dialog" aria-labelledby="install-dialog-title">
        <div className="max-w-md mx-auto bg-[#1C1C1C] rounded-2xl shadow-lg p-5 flex items-center space-x-4 ring-1 ring-white/10">
            <img src="/images/moodverses-logo.png" alt="MoodVerse App Icon" className="w-14 h-14 rounded-lg" />
            <div className="flex-1">
                <h2 id="install-dialog-title" className="text-white font-bold text-lg">Install MoodVerse</h2>
                <p className="text-gray-400 text-sm">Add to home screen for a better offline experience.</p>
            </div>
            <button
                onClick={handleInstallClick}
                className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1C1C1C] focus:ring-purple-500"
            >
                Install
            </button>
        </div>
    </div>
  );
};

export default InstallPWAButton;
