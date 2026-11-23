import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface PrivacyBadgeProps {
  className?: string;
  variant?: 'banner' | 'compact';
}

export function PrivacyBadge({ className = '', variant = 'banner' }: PrivacyBadgeProps) {
  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 ${className}`}
        title="All processing happens on your computer. Zero data is ever uploaded to a server."
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>100% In-Browser & Private</span>
      </span>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/40 text-xs sm:text-sm font-medium ${className}`}
    >
      <div className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 shrink-0 text-emerald-600 dark:text-emerald-400">
        <ShieldCheck className="w-4 h-4" />
      </div>
      <div>
        <span className="font-semibold text-emerald-900 dark:text-emerald-200">Zero Server Uploads:</span>{' '}
        All processing occurs 100% client-side inside your browser. Your files, text, and inputs never leave your computer.
      </div>
    </div>
  );
}
