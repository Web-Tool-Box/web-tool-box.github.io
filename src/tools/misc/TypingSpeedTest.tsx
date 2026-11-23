'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw, Award } from 'lucide-react';

const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog. Fast typing requires practice, consistency, and focus on accuracy.';

export default function TypingSpeedTest() {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!startTime && input.length > 0) {
      setStartTime(Date.now());
    }

    if (startTime && !finished) {
      const minutes = (Date.now() - startTime) / 60000;
      const words = input.length / 5;
      const currentWpm = minutes > 0 ? Math.round(words / minutes) : 0;
      setWpm(currentWpm);

      // Accuracy
      let errors = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== SAMPLE_TEXT[i]) errors++;
      }
      const acc = input.length > 0 ? Math.max(0, Math.round(((input.length - errors) / input.length) * 100)) : 100;
      setAccuracy(acc);

      if (input === SAMPLE_TEXT) {
        setFinished(true);
      }
    }
  }, [input, startTime, finished]);

  const handleReset = () => {
    setInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Target Prompt Box */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm sm:text-base leading-relaxed select-none">
        {SAMPLE_TEXT.split('').map((char, idx) => {
          let col = 'text-slate-400';
          if (idx < input.length) {
            col = input[idx] === char ? 'text-emerald-500 font-bold' : 'text-rose-500 bg-rose-100 dark:bg-rose-950 font-bold';
          }
          return <span key={idx} className={col}>{char}</span>;
        })}
      </div>

      {/* Typing Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={finished}
        placeholder="Start typing the text above to test your WPM..."
        rows={3}
        className="w-full p-4 font-mono text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      {/* Live KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40">
          <span className="text-xs font-bold uppercase text-slate-500 block">Typing Speed</span>
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
            {wpm} <span className="text-xs font-normal text-slate-500">WPM</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
          <span className="text-xs font-bold uppercase text-slate-500 block">Accuracy</span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            {accuracy}%
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
          <button
            onClick={handleReset}
            className="w-full py-4 px-6 rounded-2xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
