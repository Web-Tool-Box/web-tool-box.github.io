import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Cpu, Zap, Lock, Heart, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us - Privacy First In-Browser Tools',
  description: 'Learn about WebToolBox mission: high-performance, 100% in-browser digital utilities engineered for complete data privacy and zero server latency.',
  alternates: {
    canonical: `${siteConfig.url}/about/`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            About WebToolBox
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We believe everyday online utilities should be fast, elegant, and uncompromisingly private.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your files, passwords, code, and text never touch a remote server. Everything executes locally in your device RAM.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Zero Server Latency</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No waiting for slow API network round-trips or file upload queues. Conversions and calculations happen instantaneously.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Free Forever • No Signup</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No subscription paywalls, no trial expirations, and no account registrations required. Open and use instantly.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why We Built WebToolBox
          </h2>
          <p>
            When searching for simple utilities like merging a PDF, formatting JSON, or compressing an image, most online services force users to upload confidential files to unfamiliar third-party servers. In many cases, these services log files, sell telemetry, or inject aggressive popups.
          </p>
          <p>
            With modern web standards like WebAssembly, HTML5 Canvas, Web Workers, and the Web Crypto API, your web browser possesses the power of a standalone desktop operating system. WebToolBox leverages this modern architecture to process all computations locally on your machine.
          </p>
        </div>
      </div>
    </div>
  );
}
