'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

export type AdVariant = 'in-article' | 'sidebar' | 'sticky-bottom-mobile';

interface AdSlotProps {
  variant: AdVariant;
  className?: string;
}

export function AdSlot({ variant, className = '' }: AdSlotProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pubId = siteConfig.adsense.publisherId;
  const isEnabled = siteConfig.adsense.enabled;

  useEffect(() => {
    // Check if user has consented
    const consent = localStorage.getItem('wtb_cookie_consent');
    if (consent === 'granted') {
      setHasConsent(true);
    }

    const handleConsentGranted = () => {
      setHasConsent(true);
    };

    window.addEventListener('cookie_consent_updated', handleConsentGranted);
    return () => {
      window.removeEventListener('cookie_consent_updated', handleConsentGranted);
    };
  }, []);

  // When AdSense is ready and consented, trigger adsbygoogle push
  useEffect(() => {
    if (hasConsent && isEnabled && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // AdSense error or ad blocker detected
      }
    }
  }, [hasConsent, isEnabled]);

  if (isDismissed) return null;

  // Strict reserved heights to guarantee CLS = 0
  const heightClasses = {
    'in-article': 'min-h-[280px] w-full max-w-4xl my-8',
    'sidebar': 'min-h-[600px] w-full max-w-[320px] my-4',
    'sticky-bottom-mobile': 'fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 py-1 flex flex-col items-center justify-center min-h-[60px] md:hidden shadow-lg',
  }[variant];

  const slotId = {
    'in-article': siteConfig.adsense.slots.inArticle,
    'sidebar': siteConfig.adsense.slots.sidebar,
    'sticky-bottom-mobile': siteConfig.adsense.slots.stickyMobile,
  }[variant];

  return (
    <div className={`ad-slot-container ${heightClasses} ${className}`}>
      {/* Label and Close for sticky mobile */}
      <div className="w-full flex items-center justify-between px-3 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
        <span>Advertisement</span>
        {variant === 'sticky-bottom-mobile' && (
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Close ad"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-bold px-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Ad Content or Placeholder */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
        {hasConsent && pubId && !pubId.includes('0000000000') ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={pubId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="text-center p-4">
            <span className="inline-block text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-300/40 dark:border-slate-700/40">
              Ad Space ({variant.replace(/-/g, ' ')})
            </span>
            <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1">
              Reserved unit • No layout shift
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
