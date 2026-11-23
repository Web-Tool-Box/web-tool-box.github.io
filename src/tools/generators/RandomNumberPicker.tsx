'use client';

import React, { useState } from 'react';
import { Shuffle, Sparkles, RefreshCw } from 'lucide-react';

export default function RandomNumberPicker() {
  const [mode, setMode] = useState<'number' | 'list'>('number');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [listText, setListText] = useState('Alice\nBob\nCharlie\nDiana\nEdward');
  const [pickedResult, setPickedResult] = useState<string | number | null>(null);

  const handlePick = () => {
    if (mode === 'number') {
      const array = new Uint32Array(1);
      if (typeof window !== 'undefined' && window.crypto) {
        window.crypto.getRandomValues(array);
        const range = max - min + 1;
        if (range <= 0) return;
        const res = min + (array[0] % range);
        setPickedResult(res);
      }
    } else {
      const items = listText.split('\n').map((i) => i.trim()).filter(Boolean);
      if (items.length === 0) return;
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const chosen = items[array[0] % items.length];
      setPickedResult(chosen);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setMode('number');
            setPickedResult(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            mode === 'number'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Random Number Range
        </button>
        <button
          onClick={() => {
            setMode('list');
            setPickedResult(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            mode === 'list'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Pick from List / Contest
        </button>
      </div>

      {mode === 'number' ? (
        <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Minimum Value
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-sm font-bold"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Maximum Value
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-sm font-bold"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Candidate List (One per line)
          </label>
          <textarea
            value={listText}
            onChange={(e) => setListText(e.target.value)}
            rows={5}
            className="w-full p-3 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
          />
        </div>
      )}

      {/* Trigger & Result Display */}
      <div className="text-center space-y-4">
        <button
          onClick={handlePick}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
        >
          <Shuffle className="w-4 h-4" />
          <span>Pick Randomly Now</span>
        </button>

        {pickedResult !== null && (
          <div className="p-8 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 animate-in zoom-in-95">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Selected Result
            </span>
            <span className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white font-mono">
              {pickedResult}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
