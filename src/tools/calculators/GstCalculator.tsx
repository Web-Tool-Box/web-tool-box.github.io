'use client';

import React, { useState, useMemo } from 'react';
import { Receipt } from 'lucide-react';

export default function GstCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const { netPrice, gstAmount, cgst, sgst, grossPrice } = useMemo(() => {
    let net = 0;
    let gst = 0;
    let gross = 0;

    if (mode === 'exclusive') {
      net = amount;
      gst = (amount * rate) / 100;
      gross = net + gst;
    } else {
      gross = amount;
      net = amount / (1 + rate / 100);
      gst = gross - net;
    }

    const half = gst / 2;

    return {
      netPrice: parseFloat(net.toFixed(2)),
      gstAmount: parseFloat(gst.toFixed(2)),
      cgst: parseFloat(half.toFixed(2)),
      sgst: parseFloat(half.toFixed(2)),
      grossPrice: parseFloat(gross.toFixed(2)),
    };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-end">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Amount ($ or ₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            GST Rate Slab
          </label>
          <select
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
          >
            <option value={5}>5% (Essential Goods)</option>
            <option value={12}>12% (Standard Low)</option>
            <option value={18}>18% (Standard Services)</option>
            <option value={28}>28% (Luxury Goods)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('exclusive')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
              mode === 'exclusive'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Add GST (Exclusive)
          </button>
          <button
            onClick={() => setMode('inclusive')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
              mode === 'inclusive'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Extract GST (Inclusive)
          </button>
        </div>
      </div>

      {/* Invoice Breakdown Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs sm:text-sm">
        <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-slate-500">Net / Pre-Tax Amount:</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">${netPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-slate-500">CGST (Central Tax {rate / 2}%):</span>
          <span className="text-slate-800 dark:text-slate-200">${cgst.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-slate-500">SGST (State Tax {rate / 2}%):</span>
          <span className="text-slate-800 dark:text-slate-200">${sgst.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Total GST ({rate}%):</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">${gstAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-black">
          <span className="text-slate-900 dark:text-white">Gross Invoice Total:</span>
          <span className="text-slate-900 dark:text-white">${grossPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
