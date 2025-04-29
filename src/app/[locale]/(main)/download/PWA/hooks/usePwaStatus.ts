import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

export function usePwaStatus() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [installStatus, setInstallStatus] = useState<'accepted' | 'dismissed' | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const nav = window.navigator as NavigatorStandalone;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Check standalone mode (Android + iOS)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true;

    setIsStandalone(standalone);

    // Check localStorage for install flag
    const previouslyInstalled = localStorage.getItem('pwa_installed') === 'true';

    setIsInstalled(standalone || previouslyInstalled);

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const promptInstall = async (): Promise<'accepted' | 'dismissed' | null> => {
    if (!deferredPrompt) return null;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    setInstallStatus(result.outcome);
    setDeferredPrompt(null);
    setCanPrompt(false);

    if (result.outcome === 'accepted') {
      localStorage.setItem('pwa_installed', 'true');
      setIsInstalled(true);
    }

    return result.outcome;
  };

  return {
    isStandalone,
    isIOS,
    canPrompt,
    isInstalled,
    promptInstall,
    installStatus,
  };
}
