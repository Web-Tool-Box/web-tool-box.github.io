'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

export default function SipCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(500);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);

  const { invested, estReturns, totalValue } = useMemo(() => {
    const P = monthlyDeposit;
    const i = returnRate / 12 / 100;
    const n = years * 12;

    const totalInvested = P * n;
    const maturity = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const gains = maturity - totalInvested;

    return {
      invested: Math.round(totalInvested),
      estReturns: Math.round(gains),
      totalValue: Math.round(maturity),
    };
  }, [monthlyDeposit, returnRate, years]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Monthly Deposit</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">${monthlyDeposit.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={50}
            max={10000}
            step={50}
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Expected Return (%)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{returnRate}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={0.5}
            value={returnRate}
            onChange={(e) => setReturnRate(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Time Period (Years)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{years} Years</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Total Invested
          </span>
          <span className="text-3xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
            ${invested.toLocaleString()}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
            Estimated Returns
          </span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            ${estReturns.toLocaleString()}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
            Total Maturity Value
          </span>
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
            ${totalValue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
