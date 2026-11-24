'use client';

import React, { useState } from 'react';
import { Globe, Twitter, Share2 } from 'lucide-react';

export default function OpenGraphPreview() {
  const [title, setTitle] = useState('WebToolBox: 60+ Free Online Tools');
  const [desc, setDesc] = useState('100% In-Browser digital tools for developers, writers, and designers. No tracking or server uploads.');
  const [url, setUrl] = useState('https://web-tool-box.github.io');
  const [imageUrl, setImageUrl] = useState('https://web-tool-box.github.io/og-default.png');
  const [tab, setTab] = useState<'google' | 'twitter' | 'facebook'>('google');

  return (
    <div className="space-y-6">
      {/* Parameter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Destination URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
          />
        </div>
      </div>

      {/* Platform Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {(['google', 'twitter', 'facebook'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              tab === t
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {t} Preview
          </button>
        ))}
      </div>

      {/* Simulated Preview Card */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
        {tab === 'google' ? (
          <div className="w-full max-w-xl bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-1 text-left">
            <span className="text-xs text-slate-400 block truncate">{url}</span>
            <h4 className="text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer truncate">
              {title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {desc}
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 text-left">
            <div className="h-44 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-mono">
              [Social Share Image: 1200x630]
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">web-tool-box.github.io</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
