'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, DollarSign } from 'lucide-react';

export default function CurrencyFormatter() {
  const [amount, setAmount] = useState<number>(1234567.89);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const formats = useMemo(() => {
    const num = amount;
    return {
      'USD ($ US Standard)': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num),
      'EUR (€ European Standard)': new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num),
      'GBP (£ British Pound)': new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(num),
      'INR (₹ Indian Lakh/Crore)': new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num),
      'JPY (¥ Japanese Yen)': new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(num),
      'Compact Notation (Millions)': new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num),
    };
  }, [amount]);

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Enter Numerical Amount
        </label>
        <input
          type="number"
          step={0.01}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-base font-bold text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(formats).map(([label, formatted]) => (
          <div
            key={label}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                {label}
              </span>
              <span className="font-mono text-base font-bold text-slate-800 dark:text-slate-200">
                {formatted}
              </span>
            </div>
            <button
              onClick={() => handleCopy(label, formatted)}
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600"
            >
              {copiedKey === label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
