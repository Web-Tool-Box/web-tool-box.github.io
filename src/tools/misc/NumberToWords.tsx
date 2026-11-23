'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, WholeWord } from 'lucide-react';

export default function NumberToWords() {
  const [num, setNum] = useState<string>('2450');
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => {
    const n = parseInt(num);
    if (isNaN(n)) return '';
    if (n === 0) return 'Zero';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const numToWords = (val: number): string => {
      if (val < 20) return ones[val];
      if (val < 100) return tens[Math.floor(val / 10)] + (val % 10 ? '-' + ones[val % 10] : '');
      if (val < 1000) return ones[Math.floor(val / 100)] + ' Hundred' + (val % 100 ? ' and ' + numToWords(val % 100) : '');
      if (val < 1000000) return numToWords(Math.floor(val / 1000)) + ' Thousand' + (val % 1000 ? ' ' + numToWords(val % 1000) : '');
      if (val < 1000000000) return numToWords(Math.floor(val / 1000000)) + ' Million' + (val % 1000000 ? ' ' + numToWords(val % 1000000) : '');
      return String(val);
    };

    return numToWords(n);
  }, [num]);

  const handleCopy = () => {
    navigator.clipboard.writeText(words);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Enter Number
        </label>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border text-lg font-bold font-mono"
        />
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Spelled-Out Words
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {words || 'Enter a number above'}
          </p>
        </div>
        <button
          onClick={handleCopy}
          disabled={!words}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
