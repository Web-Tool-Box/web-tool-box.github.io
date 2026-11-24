'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false, u: false });
  const [testString, setTestString] = useState(
    'Contact our support at support@web-tool-box.github.io or team@example.org for quick assistance!'
  );
  const [error, setError] = useState<string | null>(null);

  const flagString = Object.entries(flags)
    .filter(([_, active]) => active)
    .map(([k]) => k)
    .join('');

  const matches = useMemo(() => {
    if (!pattern || !testString) {
      setError(null);
      return [];
    }

    try {
      const regex = new RegExp(pattern, flagString);
      setError(null);
      const results: { match: string; index: number; groups: string[] }[] = [];

      if (flags.g) {
        let m;
        while ((m = regex.exec(testString)) !== null) {
          if (m.index === regex.lastIndex) regex.lastIndex++;
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      } else {
        const m = regex.exec(testString);
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }
      return results;
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  }, [pattern, flagString, testString]);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const handleLoadPreset = (preset: string) => {
    if (preset === 'email') {
      setPattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
      setTestString('Reach us at support@web-tool-box.github.io or sales@domain.com');
    } else if (preset === 'url') {
      setPattern('https?:\\/\\/[\\w\\-\\.]+(?:\\:[0-9]+)?(?:\\/[\\w\\/\\.\\#\\?\\=\\&\\%]*)?');
      setTestString('Visit https://web-tool-box.github.io or https://google.com/search?q=regex');
    } else if (preset === 'ipv4') {
      setPattern('\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b');
      setTestString('Server addresses: 192.168.1.1 and 10.0.0.254');
    } else if (preset === 'hex') {
      setPattern('#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b');
      setTestString('Brand palette: #6366f1, #ffffff, #1e293b, and #ef4444');
    }
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-bold text-slate-500 uppercase tracking-wider">Presets:</span>
        <button
          onClick={() => handleLoadPreset('email')}
          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
        >
          Email
        </button>
        <button
          onClick={() => handleLoadPreset('url')}
          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
        >
          URL
        </button>
        <button
          onClick={() => handleLoadPreset('ipv4')}
          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
        >
          IPv4
        </button>
        <button
          onClick={() => handleLoadPreset('hex')}
          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
        >
          Hex Color
        </button>
      </div>

      {/* Pattern & Flags Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-base font-bold select-none">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Regular expression pattern..."
            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-slate-400 font-mono text-base font-bold select-none">/{flagString}</span>
        </div>

        {/* Flag Toggles */}
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <span className="font-bold text-slate-500">Flags:</span>
          {(['g', 'i', 'm', 's', 'u'] as const).map((f) => (
            <label key={f} className="flex items-center gap-1.5 cursor-pointer font-mono font-bold">
              <input
                type="checkbox"
                checked={flags[f]}
                onChange={() => toggleFlag(f)}
                className="rounded text-indigo-600"
              />
              <span className={flags[f] ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}>
                {f} ({f === 'g' ? 'global' : f === 'i' ? 'ignore case' : f === 'm' ? 'multiline' : f === 's' ? 'dotAll' : 'unicode'})
              </span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Regex Error: {error}</span>
        </div>
      )}

      {/* Test String */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Paste sample text to test regular expression against..."
          rows={6}
          className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
        />
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Detected Matches ({matches.length})
          </span>
          {matches.length > 0 && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Pattern Valid & Matching
            </span>
          )}
        </div>

        {matches.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
            No matches found for current pattern and test string.
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {matches.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {m.match}
                  </span>
                  <span className="text-slate-400">at index {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-indigo-500 font-mono">
                      Groups: [{m.groups.join(', ')}]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
