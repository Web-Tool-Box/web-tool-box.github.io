'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('wtb_cookie_consent');
    if (!consent) {
      // Small delay before showing banner to ensure smooth page load
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    } else if (consent === 'granted') {
      loadAdSenseScript();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('wtb_cookie_consent', 'granted');
    setIsVisible(false);
    window.dispatchEvent(new Event('cookie_consent_updated'));

    // Google Consent Mode v2 update
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }

    loadAdSenseScript();
  };

  const handleDecline = () => {
    localStorage.setItem('wtb_cookie_consent', 'denied');
    setIsVisible(false);
    window.dispatchEvent(new Event('cookie_consent_updated'));

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }
  };

  const loadAdSenseScript = () => {
    if (typeof window === 'undefined') return;
    const pubId = siteConfig.adsense.publisherId;
    if (!pubId || document.getElementById('adsense-script')) return;

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
    document.head.appendChild(script);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-semibold text-sm mb-1 text-slate-900 dark:text-white flex items-center gap-1.5">
            Privacy & Cookie Preferences
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            We use cookies to analyze web traffic, remember your favorite tools, and deliver relevant advertisements via Google AdSense.
            Your tool data is processed entirely inside your browser. See our{' '}
            <Link href="/privacy/" className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
