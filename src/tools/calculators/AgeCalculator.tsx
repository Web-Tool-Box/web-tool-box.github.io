'use client';

import React, { useState, useMemo } from 'react';
import { Cake, Calendar } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().slice(0, 10));

  const stats = useMemo(() => {
    const b = new Date(birthDate);
    const t = new Date(targetDate);
    if (isNaN(b.getTime()) || isNaN(t.getTime()) || b > t) return null;

    let years = t.getFullYear() - b.getFullYear();
    let months = t.getMonth() - b.getMonth();
    let days = t.getDate() - b.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(t.getFullYear(), t.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = t.getTime() - b.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;

    // Next birthday
    const nextBday = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (nextBday < t) {
      nextBday.setFullYear(t.getFullYear() + 1);
    }
    const daysUntilNext = Math.ceil((nextBday.getTime() - t.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      daysUntilNext,
      bornDay: b.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  }, [birthDate, targetDate]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Age as of Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
          />
        </div>
      </div>

      {stats ? (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
              Exact Age
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {stats.years} <span className="text-base text-slate-500 font-semibold">years,</span>{' '}
              {stats.months} <span className="text-base text-slate-500 font-semibold">months,</span>{' '}
              {stats.days} <span className="text-base text-slate-500 font-semibold">days</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block">Total Days Lived</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.totalDays.toLocaleString()}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block">Total Hours</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.totalHours.toLocaleString()}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block">Next Birthday</span>
              <span className="text-lg font-bold text-indigo-500">{stats.daysUntilNext} days</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block">Born on a</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.bornDay}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs text-rose-500">Birth date cannot be later than target date.</p>
      )}
    </div>
  );
}
