'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Link as LinkIcon } from 'lucide-react';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [copied, setCopied] = useState(false);

  const STOP_WORDS = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'in', 'with'
  ]);

  const slug = useMemo(() => {
    if (!input.trim()) return '';

    // Normalize accents (NFD decomposition)
    let str = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Convert to lowercase
    str = str.toLowerCase();

    // Split words
    let words = str
      .replace(/[^a-z0-9\s-_]/g, '')
      .trim()
      .split(/[\s-_]+/);

    if (removeStopWords) {
      words = words.filter((w) => !STOP_WORDS.has(w));
    }

    return words.join(separator);
  }, [input, separator, removeStopWords]);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    setInput('10 Essential Tips for Building High-Performance Web Applications in 2026!');
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Separator:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="separator"
              checked={separator === '-'}
              onChange={() => setSeparator('-')}
              className="text-indigo-600"
            />
            <span>Hyphen (-)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer ml-3">
            <input
              type="radio"
              name="separator"
              checked={separator === '_'}
              onChange={() => setSeparator('_')}
              className="text-indigo-600"
            />
            <span>Underscore (_)</span>
          </label>
        </div>

        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={removeStopWords}
            onChange={(e) => setRemoveStopWords(e.target.checked)}
            className="rounded text-indigo-600"
          />
          Remove common stop words (a, the, in, for...)
        </label>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Article Title or Phrase
          </label>
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            Load Sample
          </button>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10 Best Online Tools for Software Engineers"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 text-sm font-medium"
        />
      </div>

      {/* Output Card */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Generated SEO Slug
        </label>
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <LinkIcon className="w-4 h-4 text-indigo-500 shrink-0 ml-2" />
          <span className="flex-1 font-mono text-sm text-slate-800 dark:text-slate-200 break-all select-all">
            {slug || 'your-seo-friendly-slug-will-appear-here'}
          </span>
          <button
            onClick={handleCopy}
            disabled={!slug}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Slug'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
