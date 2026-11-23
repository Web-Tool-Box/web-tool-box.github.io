'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function RomanNumeralConverter() {
  const [arabic, setArabic] = useState<string>('2026');
  const [roman, setRoman] = useState<string>('MMXXVI');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const romanMap: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];

  const toRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return '';
    let result = '';
    for (const [val, letter] of romanMap) {
      while (num >= val) {
        result += letter;
        num -= val;
      }
    }
    return result;
  };

  const toArabic = (str: string): number => {
    const map: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
    };
    const upper = str.toUpperCase().trim();
    let total = 0;
    for (let i = 0; i < upper.length; i++) {
      const current = map[upper[i]] || 0;
      const next = map[upper[i + 1]] || 0;
      if (current < next) {
        total -= current;
      } else {
        total += current;
      }
    }
    return total;
  };

  const handleArabicChange = (val: string) => {
    setArabic(val);
    const num = parseInt(val);
    if (!isNaN(num) && num > 0 && num <= 3999) {
      setRoman(toRoman(num));
    }
  };

  const handleRomanChange = (val: string) => {
    setRoman(val.toUpperCase());
    const num = toArabic(val);
    if (num > 0) {
      setArabic(String(num));
    }
  };

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Arabic Number (1 – 3,999)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={3999}
              value={arabic}
              onChange={(e) => handleArabicChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border text-lg font-bold font-mono"
            />
            <button
              onClick={() => handleCopy('arabic', arabic)}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600"
            >
              {copiedKey === 'arabic' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Roman Numeral
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={roman}
              onChange={(e) => handleRomanChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border text-lg font-bold font-mono uppercase text-indigo-600 dark:text-indigo-400"
            />
            <button
              onClick={() => handleCopy('roman', roman)}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600"
            >
              {copiedKey === 'roman' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
