'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Replace, Trash2 } from 'lucide-react';

export default function FindAndReplace() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [copied, setCopied] = useState(false);
  const [matchCount, setMatchCount] = useState<number | null>(null);

  const handleExecuteReplace = () => {
    if (!find) return;

    try {
      let count = 0;
      let newText = '';

      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        const re = new RegExp(find, flags);
        const matches = text.match(re);
        count = matches ? matches.length : 0;
        newText = text.replace(re, replaceWith);
      } else {
        let pattern = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (wholeWord) {
          pattern = `\\b${pattern}\\b`;
        }
        const flags = caseSensitive ? 'g' : 'gi';
        const re = new RegExp(pattern, flags);
        const matches = text.match(re);
        count = matches ? matches.length : 0;
        newText = text.replace(re, replaceWith);
      }

      setMatchCount(count);
      setText(newText);
    } catch (err) {
      alert('Invalid Regular Expression syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    setText('The quick brown fox jumps over the lazy dog. The fox was nimble and the dog was sleeping.');
    setFind('fox');
    setReplaceWith('cat');
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Find String or Pattern
            </label>
            <input
              type="text"
              value={find}
              onChange={(e) => {
                setFind(e.target.value);
                setMatchCount(null);
              }}
              placeholder="e.g. target text or regex"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Replace With
            </label>
            <input
              type="text"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              placeholder="Replacement text (leave empty to delete)"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Case Sensitive
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={wholeWord}
                disabled={useRegex}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Match Whole Word
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Regular Expression (RegEx)
            </label>
          </div>

          <div className="flex items-center gap-2">
            {matchCount !== null && (
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Replaced {matchCount} occurrence(s)
              </span>
            )}
            <button
              onClick={handleExecuteReplace}
              disabled={!find || !text}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Replace className="w-3.5 h-3.5" />
              Replace All
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Document Editor
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
          placeholder="Paste text here to search and replace..."
          rows={10}
          className="w-full p-4 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
        />
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        disabled={!text}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied Document!' : 'Copy Result'}</span>
      </button>
    </div>
  );
}
