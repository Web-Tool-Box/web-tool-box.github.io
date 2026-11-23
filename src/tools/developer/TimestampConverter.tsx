'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Calendar, RefreshCw } from 'lucide-react';

export default function TimestampConverter() {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 19));
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parse epoch input to date
  const parsedFromEpoch = React.useMemo(() => {
    const num = parseInt(epochInput.trim());
    if (isNaN(num)) return null;

    // Check if seconds or milliseconds
    const ms = num > 1e11 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;

    return {
      utc: d.toUTCString(),
      iso: d.toISOString(),
      local: d.toLocaleString(),
      relative: getRelativeTimeString(d),
    };
  }, [epochInput]);

  // Parse date input to epoch
  const parsedFromDate = React.useMemo(() => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;

    const ms = d.getTime();
    const sec = Math.floor(ms / 1000);
    return {
      seconds: sec,
      milliseconds: ms,
    };
  }, [dateInput]);

  function getRelativeTimeString(date: Date) {
    const diff = Math.floor((date.getTime() - Date.now()) / 1000);
    const abs = Math.abs(diff);
    let str = '';
    if (abs < 60) str = `${abs} seconds`;
    else if (abs < 3600) str = `${Math.floor(abs / 60)} minutes`;
    else if (abs < 86400) str = `${Math.floor(abs / 3600)} hours`;
    else str = `${Math.floor(abs / 86400)} days`;

    return diff >= 0 ? `in ${str}` : `${str} ago`;
  }

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Epoch Clock */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Unix Epoch Time
            </span>
            <div className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {currentEpoch}
            </div>
          </div>
        </div>

        <button
          onClick={() => setEpochInput(String(currentEpoch))}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 transition-colors"
        >
          Use Current Time
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Epoch to Date */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            Unix Epoch to Human Date
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Epoch Timestamp (sec or ms)
            </label>
            <input
              type="text"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
              placeholder="e.g. 1700000000"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm text-slate-800 dark:text-slate-200"
            />
          </div>

          {parsedFromEpoch ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">UTC</span>
                  <span className="text-slate-800 dark:text-slate-200">{parsedFromEpoch.utc}</span>
                </div>
                <button
                  onClick={() => handleCopy('utc', parsedFromEpoch.utc)}
                  className="text-slate-400 hover:text-indigo-600"
                >
                  {copiedKey === 'utc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Local Time</span>
                  <span className="text-slate-800 dark:text-slate-200">{parsedFromEpoch.local}</span>
                </div>
                <button
                  onClick={() => handleCopy('local', parsedFromEpoch.local)}
                  className="text-slate-400 hover:text-indigo-600"
                >
                  {copiedKey === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Relative</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{parsedFromEpoch.relative}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-500">Invalid timestamp number</p>
          )}
        </div>

        {/* Date to Epoch */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            Human Date to Unix Epoch
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200"
            />
          </div>

          {parsedFromDate ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Seconds</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{parsedFromDate.seconds}</span>
                </div>
                <button
                  onClick={() => handleCopy('sec', String(parsedFromDate.seconds))}
                  className="text-slate-400 hover:text-indigo-600"
                >
                  {copiedKey === 'sec' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Milliseconds</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-sm">{parsedFromDate.milliseconds}</span>
                </div>
                <button
                  onClick={() => handleCopy('ms', String(parsedFromDate.milliseconds))}
                  className="text-slate-400 hover:text-indigo-600"
                >
                  {copiedKey === 'ms' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-500">Invalid date format</p>
          )}
        </div>
      </div>
    </div>
  );
}
