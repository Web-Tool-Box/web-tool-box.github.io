'use client';

import React, { useState, useMemo } from 'react';
import { Coins, DollarSign } from 'lucide-react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);
  const [freq, setFreq] = useState<number>(12); // monthly

  const { totalAmount, totalInterest } = useMemo(() => {
    const P = principal;
    const r = rate / 100;
    const n = freq;
    const t = years;

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    return {
      totalAmount: Math.round(A),
      totalInterest: Math.round(interest),
    };
  }, [principal, rate, years, freq]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Initial Principal ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step={0.1}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Duration (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Compounding Frequency
          </label>
          <select
            value={freq}
            onChange={(e) => setFreq(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
          >
            <option value={365}>Daily (365x / yr)</option>
            <option value={12}>Monthly (12x / yr)</option>
            <option value={4}>Quarterly (4x / yr)</option>
            <option value={1}>Annually (1x / yr)</option>
          </select>
        </div>
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
            Future Balance (Principal + Interest)
          </span>
          <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mt-2 block">
            ${totalAmount.toLocaleString()}
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
            Total Interest Earned
          </span>
          <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-2 block">
            ${totalInterest.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
