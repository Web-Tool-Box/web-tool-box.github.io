'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowUpDown, Shuffle, Download } from 'lucide-react';

export default function TextSorter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const sortLines = (
    method: 'az' | 'za' | 'natural' | 'length' | 'reverse' | 'shuffle'
  ) => {
    const lines = text.split('\n');
    let sorted: string[] = [];

    switch (method) {
      case 'az':
        sorted = [...lines].sort((a, b) => a.localeCompare(b));
        break;
      case 'za':
        sorted = [...lines].sort((a, b) => b.localeCompare(a));
        break;
      case 'natural':
        sorted = [...lines].sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
        );
        break;
      case 'length':
        sorted = [...lines].sort((a, b) => a.length - b.length);
        break;
      case 'reverse':
        sorted = [...lines].reverse();
        break;
      case 'shuffle':
        sorted = [...lines];
        for (let i = sorted.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
        }
        break;
    }

    setText(sorted.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    setText('Item 10\nItem 2\nItem 1\nAlpha\nCharlie\nBravo\nItem 20\nDelta');
  };

  return (
    <div className="space-y-6">
      {/* Sorting Methods Bar */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Sort Method:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => sortLines('az')}
            disabled={!text}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950 font-semibold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-center"
          >
            A → Z (Alphabetical)
          </button>
          <button
            onClick={() => sortLines('za')}
            disabled={!text}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950 font-semibold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-center"
          >
            Z → A (Reverse)
          </button>
          <button
            onClick={() => sortLines('natural')}
            disabled={!text}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950 font-semibold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-center"
          >
            Natural (1, 2, 10)
          </button>
          <button
            onClick={() => sortLines('length')}
            disabled={!text}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950 font-semibold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-center"
          >
            By Length
          </button>
          <button
            onClick={() => sortLines('reverse')}
            disabled={!text}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950 font-semibold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-center"
          >
            Reverse Order
          </button>
          <button
            onClick={() => sortLines('shuffle')}
            disabled={!text}
            className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800 disabled:opacity-40 transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Shuffle List
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Text Lines
          </label>
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            Load Sample
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste lines of text or items to sort..."
          rows={10}
          className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
        />
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        disabled={!text}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied Sorted Text!' : 'Copy Sorted Lines'}</span>
      </button>
    </div>
  );
}
