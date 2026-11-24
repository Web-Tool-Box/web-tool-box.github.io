'use client';

import React, { useState } from 'react';
import { Copy, Check, Compass, Link as LinkIcon } from 'lucide-react';

export default function UtmLinkBuilder() {
  const [url, setUrl] = useState('https://web-tool-box.github.io/tools/json-formatter/');
  const [source, setSource] = useState('twitter');
  const [medium, setMedium] = useState('social');
  const [campaign, setCampaign] = useState('spring_launch_2026');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('hero_banner');
  const [copied, setCopied] = useState(false);

  const fullUtmUrl = (() => {
    try {
      const u = new URL(url.trim() || 'https://example.com');
      if (source) u.searchParams.set('utm_source', source.trim().toLowerCase());
      if (medium) u.searchParams.set('utm_medium', medium.trim().toLowerCase());
      if (campaign) u.searchParams.set('utm_campaign', campaign.trim().toLowerCase());
      if (term) u.searchParams.set('utm_term', term.trim().toLowerCase());
      if (content) u.searchParams.set('utm_content', content.trim().toLowerCase());
      return u.toString();
    } catch {
      return '';
    }
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUtmUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="sm:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Destination Website URL *
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Campaign Source (utm_source) *
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. google, newsletter, twitter"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Campaign Medium (utm_medium) *
          </label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="e.g. cpc, banner, email"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Campaign Name (utm_campaign)
          </label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="e.g. promo_2026"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Campaign Content (utm_content)
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="e.g. sidebar_cta"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
          />
        </div>
      </div>

      {/* Generated Tracked URL */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Generated Tracked Link
        </label>
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <LinkIcon className="w-4 h-4 text-indigo-500 shrink-0 ml-1" />
          <span className="flex-1 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
            {fullUtmUrl}
          </span>
          <button
            onClick={handleCopy}
            disabled={!fullUtmUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
