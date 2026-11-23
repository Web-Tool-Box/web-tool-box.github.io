'use client';

import React, { useState, useMemo } from 'react';
import { Utensils } from 'lucide-react';

export default function TipCalculator() {
  const [bill, setBill] = useState<number>(85);
  const [tipPct, setTipPct] = useState<number>(18);
  const [people, setPeople] = useState<number>(3);
  const [roundUp, setRoundUp] = useState(false);

  const { tipAmount, totalBill, perPerson } = useMemo(() => {
    let tip = (bill * tipPct) / 100;
    let total = bill + tip;
    if (roundUp) {
      total = Math.ceil(total);
      tip = total - bill;
    }
    const split = people > 0 ? total / people : total;

    return {
      tipAmount: parseFloat(tip.toFixed(2)),
      totalBill: parseFloat(total.toFixed(2)),
      perPerson: parseFloat(split.toFixed(2)),
    };
  }, [bill, tipPct, people, roundUp]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-end">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Bill Subtotal ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={bill}
            onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Tip Percentage ({tipPct}%)
          </label>
          <div className="flex items-center gap-1">
            {[10, 15, 18, 20, 25].map((pct) => (
              <button
                key={pct}
                onClick={() => setTipPct(pct)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                  tipPct === pct
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Split Among People
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          checked={roundUp}
          onChange={(e) => setRoundUp(e.target.checked)}
          className="rounded text-indigo-600"
        />
        Round total up to nearest dollar
      </label>

      {/* Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Tip Amount
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
            ${tipAmount.toFixed(2)}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
            Total with Tip
          </span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
            ${totalBill.toFixed(2)}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
            Each Person Pays
          </span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            ${perPerson.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
