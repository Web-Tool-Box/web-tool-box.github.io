'use client';

import React, { useState } from 'react';
import { Percent } from 'lucide-react';

export default function PercentageCalculator() {
  // Scenario 1: What is X% of Y?
  const [val1, setVal1] = useState(15);
  const [val2, setVal2] = useState(250);

  // Scenario 2: X is what % of Y?
  const [val3, setVal3] = useState(40);
  const [val4, setVal4] = useState(200);

  // Scenario 3: Percentage increase / decrease
  const [val5, setVal5] = useState(100);
  const [val6, setVal6] = useState(125);

  const res1 = ((val1 / 100) * val2).toFixed(2);
  const res2 = val4 !== 0 ? (((val3 / val4) * 100).toFixed(2)) : '0';
  const res3 = val5 !== 0 ? ((((val6 - val5) / val5) * 100).toFixed(2)) : '0';

  return (
    <div className="space-y-6">
      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block">
            What is X% of Y?
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span>What is</span>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
            />
            <span>% of</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
              className="w-20 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
            />
            <span>?</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {res1}
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block">
            X is what % of Y?
          </span>
          <div className="flex items-center gap-2 text-xs">
            <input
              type="number"
              value={val3}
              onChange={(e) => setVal3(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={val4}
              onChange={(e) => setVal4(parseFloat(e.target.value) || 0)}
              className="w-20 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
            />
            <span>?</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {res2}%
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block">
            % Increase / Decrease
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span>From</span>
            <input
              type="number"
              value={val5}
              onChange={(e) => setVal5(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
            />
            <span>to</span>
            <input
              type="number"
              value={val6}
              onChange={(e) => setVal6(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
            />
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className={`text-2xl font-black font-mono ${parseFloat(res3) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {parseFloat(res3) >= 0 ? `+${res3}%` : `${res3}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
