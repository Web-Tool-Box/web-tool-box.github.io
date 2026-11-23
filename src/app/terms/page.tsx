import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'WebToolBox Terms of Service governing the use of our free online in-browser tools and digital utilities.',
  alternates: {
    canonical: `${siteConfig.url}/terms/`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 2026
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and utilizing WebToolBox (the &quot;Site&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using the tools.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Free & As-Is Provision</h2>
            <p>
              All tools, calculators, formatters, and utilities on WebToolBox are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, whether express or implied.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Intellectual Property</h2>
            <p>
              You retain 100% intellectual property ownership of all code, text, files, images, and data processed through our tools. Because WebToolBox operates entirely in your browser, we never claim any rights to your content.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
