'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Trash2, Split, Rows } from 'lucide-react';

export default function TextDiffChecker() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simple line-by-line diff engine
  const diffResults = useMemo(() => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');

    const origSet = new Set(origLines.map((l) => (ignoreWhitespace ? l.trim() : l)));
    const modSet = new Set(modLines.map((l) => (ignoreWhitespace ? l.trim() : l)));

    let additions = 0;
    let deletions = 0;

    const maxLen = Math.max(origLines.length, modLines.length);
    const rows = [];

    for (let i = 0; i < maxLen; i++) {
      const o = origLines[i] !== undefined ? origLines[i] : null;
      const m = modLines[i] !== undefined ? modLines[i] : null;

      const oCmp = o !== null ? (ignoreWhitespace ? o.trim() : o) : null;
      const mCmp = m !== null ? (ignoreWhitespace ? m.trim() : m) : null;

      if (o !== null && m !== null) {
        if (oCmp === mCmp) {
          rows.push({ type: 'equal', orig: o, mod: m });
        } else {
          rows.push({ type: 'change', orig: o, mod: m });
          additions++;
          deletions++;
        }
      } else if (o !== null) {
        rows.push({ type: 'delete', orig: o, mod: '' });
        deletions++;
      } else if (m !== null) {
        rows.push({ type: 'add', orig: '', mod: m });
        additions++;
      }
    }

    return { rows, additions, deletions };
  }, [original, modified, ignoreWhitespace]);

  const handleLoadSample = () => {
    setOriginal(
      `function calculateTotal(subtotal, taxRate) {\n  const tax = subtotal * taxRate;\n  return subtotal + tax;\n}`
    );
    setModified(
      `function calculateTotal(subtotal, taxRate, discount = 0) {\n  const discounted = Math.max(0, subtotal - discount);\n  const tax = discounted * taxRate;\n  return discounted + tax;\n}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('split')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              viewMode === 'split'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            Split View
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              viewMode === 'unified'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Rows className="w-3.5 h-3.5" />
            Unified View
          </button>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Ignore Whitespace
          </label>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">+{diffResults.additions} additions</span>
            <span className="text-rose-600 dark:text-rose-400">-{diffResults.deletions} deletions</span>
          </div>
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load Sample
          </button>
        </div>
      </div>

      {/* Input Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Original Text (Before)
          </label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            rows={8}
            className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Modified Text (After)
          </label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            rows={8}
            className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>
      </div>

      {/* Diff Result Box */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Comparison Result
        </h3>
        <div className="font-mono text-xs rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950 max-h-96 overflow-y-auto">
          {diffResults.rows.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              Paste text into both panels above to see visual line differences.
            </div>
          ) : viewMode === 'split' ? (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {diffResults.rows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 text-xs">
                  <div
                    className={`p-2 border-r border-slate-200 dark:border-slate-800 overflow-x-auto ${
                      row.type === 'delete' || row.type === 'change'
                        ? 'bg-rose-100/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-slate-400 select-none mr-2">{idx + 1}</span>
                    {row.orig}
                  </div>
                  <div
                    className={`p-2 overflow-x-auto ${
                      row.type === 'add' || row.type === 'change'
                        ? 'bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-slate-400 select-none mr-2">{idx + 1}</span>
                    {row.mod}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {diffResults.rows.map((row, idx) => (
                <div key={idx}>
                  {row.orig && (row.type === 'delete' || row.type === 'change') && (
                    <div className="p-2 bg-rose-100/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 flex items-center gap-2">
                      <span className="text-rose-500 font-bold select-none">-</span>
                      <span>{row.orig}</span>
                    </div>
                  )}
                  {row.mod && (row.type === 'add' || row.type === 'change') && (
                    <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                      <span className="text-emerald-500 font-bold select-none">+</span>
                      <span>{row.mod}</span>
                    </div>
                  )}
                  {row.type === 'equal' && (
                    <div className="p-2 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="text-slate-400 select-none"> </span>
                      <span>{row.orig}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
