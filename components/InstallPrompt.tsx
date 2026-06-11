'use client';
import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useT } from '@/lib/i18n/context';

// Non-standard event fired by Chromium browsers when the PWA is installable.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type View = 'hidden' | 'install' | 'ios';
const DISMISS_KEY = 'lc-install-dismissed';

/** Dismissible "install this app" banner. Uses the native beforeinstallprompt flow on
 *  Android/desktop Chromium; shows a Share -> Add to Home Screen hint on iOS Safari.
 *  Hidden when already installed (standalone) or previously dismissed. */
export function InstallPrompt() {
  const t = useT();
  const [view, setView] = useState<View>('hidden');
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch { /* storage may be unavailable */ }

    const nav = navigator as Navigator & { standalone?: boolean };
    const win = window as Window & { MSStream?: unknown };
    const standalone = window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true;
    if (standalone) return; // already installed

    if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !win.MSStream) {
      // iOS has no beforeinstallprompt; detection is client-only and must run after mount to
      // avoid an SSR hydration mismatch (server renders nothing).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView('ios');
      return;
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setView('install');
    };
    const onInstalled = () => setView('hidden');
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (view === 'hidden') return null;
  const isIOS = view === 'ios';

  const dismiss = () => {
    setView('hidden');
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* storage may be unavailable */ }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setView('hidden');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center p-4">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border bg-card/95 p-3 shadow-2xl backdrop-blur animate-in fade-in slide-in-from-bottom-4 duration-300 motion-reduce:animate-none">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lc-red text-white">
          <Download className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">{t.install.title}</div>
          <div className="text-xs text-muted-foreground">{isIOS ? t.install.iosHint : t.install.subtitle}</div>
        </div>
        {!isIOS && (
          <button
            type="button"
            onClick={install}
            className="shrink-0 rounded-lg bg-lc-yellow px-3.5 py-2 text-sm font-bold text-lc-ink transition hover:brightness-105 active:scale-95"
          >
            {t.install.cta}
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.install.dismiss}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
