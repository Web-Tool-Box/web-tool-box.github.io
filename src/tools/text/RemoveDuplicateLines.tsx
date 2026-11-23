'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Trash2, Download } from 'lucide-react';

export default function RemoveDuplicateLines() {
  const [text, setText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortAlpha, setSortAlpha] = useState(false);
  const [copied, setCopied] = useState(false);

  const { result, originalCount, uniqueCount, removedCount } = useMemo(() => {
    if (!text) {
      return { result: '', originalCount: 0, uniqueCount: 0, removedCount: 0 };
    }

    const lines = text.split('\n');
    const originalCount = lines.length;

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (const rawLine of lines) {
      let line = trimWhitespace ? rawLine.trim() : rawLine;
      if (removeEmpty && !line) continue;

      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }

    if (sortAlpha) {
      uniqueLines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    const result = uniqueLines.join('\n');
    const uniqueCount = uniqueLines.length;
    const removedCount = Math.max(0, originalCount - uniqueCount);

    return { result, originalCount, uniqueCount, removedCount };
  }, [text, caseSensitive, trimWhitespace, removeEmpty, sortAlpha]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deduplicated-lines.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setText(
      'apple\nbanana\ncherry\napple\norange\nbanana\npear\nCHERRY\napple\ngrapes\nbanana'
    );
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="block text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-200">
            {originalCount}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Original Lines
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
          <span className="block text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {uniqueCount}
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            Unique Lines
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40 text-center">
          <span className="block text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
            {removedCount}
          </span>
          <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
            Duplicates Removed
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded text-indigo-600"
          />
          Case Sensitive
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="rounded text-indigo-600"
          />
          Trim Whitespace
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="rounded text-indigo-600"
          />
          Remove Empty Lines
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={sortAlpha}
            onChange={(e) => setSortAlpha(e.target.checked)}
            className="rounded text-indigo-600"
          />
          Sort Alphabetically
        </label>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Input Text / List
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
            placeholder="Paste your multi-line list here..."
            rows={10}
            className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Deduplicated Output
          </label>
          <textarea
            readOnly
            value={result}
            placeholder="Clean unique list will appear here..."
            rows={10}
            className="w-full p-3 font-mono text-xs rounded-xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!result}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Output!' : 'Copy Unique Lines'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={!result}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download .txt</span>
        </button>
      </div>
    </div>
  );
}
