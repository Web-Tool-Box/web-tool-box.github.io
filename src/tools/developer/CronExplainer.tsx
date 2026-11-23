'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Clock, Calendar } from 'lucide-react';

export default function CronExplainer() {
  const [cron, setCron] = useState('*/15 * * * *');
  const [copied, setCopied] = useState(false);

  const explainCron = (expression: string) => {
    const parts = expression.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { valid: false, message: 'Cron expression must contain exactly 5 parts (Minute Hour Day-of-Month Month Day-of-Week).' };
    }

    const [min, hour, dom, mon, dow] = parts;
    const descParts: string[] = [];

    // Minute
    if (min === '*') descParts.push('every minute');
    else if (min.startsWith('*/')) descParts.push(`every ${min.slice(2)} minutes`);
    else descParts.push(`at minute ${min}`);

    // Hour
    if (hour === '*') descParts.push('past every hour');
    else if (hour.startsWith('*/')) descParts.push(`past every ${hour.slice(2)} hours`);
    else descParts.push(`at hour ${hour}:00`);

    // Day of Month
    if (dom !== '*') descParts.push(`on day ${dom} of the month`);

    // Month
    if (mon !== '*') descParts.push(`in month ${mon}`);

    // Day of week
    if (dow !== '*') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      descParts.push(`on ${dow.split(',').map((d) => days[parseInt(d)] || d).join(', ')}`);
    }

    return {
      valid: true,
      message: `Runs ${descParts.join(', ')}.`,
      parts: { min, hour, dom, mon, dow },
    };
  };

  const parsed = useMemo(() => explainCron(cron), [cron]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: 'Every 15 Minutes', expr: '*/15 * * * *' },
    { label: 'Every Hour', expr: '0 * * * *' },
    { label: 'Every Day at Midnight', expr: '0 0 * * *' },
    { label: 'Every Monday at 9AM', expr: '0 9 * * 1' },
    { label: 'First of Every Month', expr: '0 0 1 * *' },
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-bold text-slate-500 uppercase tracking-wider">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.expr}
            onClick={() => setCron(p.expr)}
            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Cron Expression Input Bar */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-base font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/20"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Cron</span>
          </button>
        </div>

        {/* 5 Field Headers */}
        <div className="grid grid-cols-5 text-center text-[11px] font-mono font-bold text-slate-400">
          <div>Minute</div>
          <div>Hour</div>
          <div>Day (Month)</div>
          <div>Month</div>
          <div>Day (Week)</div>
        </div>
      </div>

      {/* Human Explanation Card */}
      <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Human-Readable Schedule</span>
        </div>
        <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {parsed.message}
        </p>
      </div>
    </div>
  );
}
