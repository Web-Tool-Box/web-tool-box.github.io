'use client';

import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [includeEndDay, setIncludeEndDay] = useState(false);

  const diff = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const diffMs = e.getTime() - s.getTime();
    let totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (includeEndDay && totalDays >= 0) totalDays += 1;

    // Calculate business days
    let businessDays = 0;
    let weekends = 0;
    const cur = new Date(s);
    const endBound = new Date(e);
    if (includeEndDay) endBound.setDate(endBound.getDate() + 1);

    while (cur < endBound) {
      const day = cur.getDay();
      if (day === 0 || day === 6) weekends++;
      else businessDays++;
      cur.setDate(cur.getDate() + 1);
    }

    const weeks = (totalDays / 7).toFixed(1);

    return {
      totalDays,
      businessDays,
      weekends,
      weeks,
    };
  }, [startDate, endDate, includeEndDay]);

  return (
    <div className="space-y-6">
      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          checked={includeEndDay}
          onChange={(e) => setIncludeEndDay(e.target.checked)}
          className="rounded text-indigo-600"
        />
        Include end day in calculation (adds 1 full day)
      </label>

      {/* Results */}
      {diff ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
              Total Days
            </span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
              {diff.totalDays}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
              Working Days
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {diff.businessDays}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Weekend Days
            </span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
              {diff.weekends}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Weeks
            </span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
              {diff.weeks}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
