import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'WebToolBox Privacy Policy detailing our 100% in-browser processing guarantee, cookie consent policy, and Google AdSense / DoubleClick disclosures.',
  alternates: {
    canonical: `${siteConfig.url}/privacy/`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Our Core Privacy Commitment: 100% In-Browser Execution</h2>
            <p>
              At WebToolBox (accessible at {siteConfig.url}), the privacy of our visitors is our paramount architectural priority. Unlike traditional online tool providers, WebToolBox does not transmit, store, or process your files, documents, text strings, images, or passwords on any remote server.
            </p>
            <p>
              All tool calculations and conversions are performed strictly inside your web browser client using client-side JavaScript, HTML5 Canvas, and WebAssembly. Your data resides only in your computer's temporary random access memory (RAM) and is purged immediately upon closing or refreshing the browser tab.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Google AdSense & DoubleClick Cookie Disclosure</h2>
            <p>
              WebToolBox is monetized through third-party advertising provided by Google AdSense to remain free forever. Google uses cookies to serve ads based on a user's prior visits to our website or other websites on the Internet.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google Ads Settings</a>.</li>
              <li>Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">www.aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. European Economic Area (EEA), UK & Swiss User Consent</h2>
            <p>
              In accordance with Google's EU User Consent Policy and Google Consent Mode v2, visitors located in the European Economic Area (EEA), the United Kingdom, and Switzerland are presented with a cookie consent mechanism prior to loading non-essential cookies.
            </p>
            <p>
              You can grant, modify, or revoke your cookie choices at any time via the cookie banner or by clearing your browser cache.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Local Storage Usage</h2>
            <p>
              WebToolBox utilizes your browser's local HTML5 `localStorage` exclusively for client-side user experience conveniences:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Saving your preferred color theme (Light vs Dark mode).</li>
              <li>Remembering your starred / favorite tools.</li>
              <li>Maintaining a list of your recently visited tools.</li>
              <li>Storing your cookie consent preferences.</li>
            </ul>
            <p>
              This information never leaves your personal device and can be cleared at any time in your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Contact Us</h2>
            <p>
              If you have any questions, inquiries, or feedback regarding our privacy practices, please contact us at privacy@webtoolbox.dev or visit our <Link href="/contact/" className="text-indigo-600 underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
