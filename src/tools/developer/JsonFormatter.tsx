'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Trash2, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setInput(
      JSON.stringify(
        {
          name: 'WebToolBox',
          version: '1.0.0',
          private: true,
          features: [
            '100% In-Browser Execution',
            'No Server Latency',
            'Zero Tracking',
          ],
          metrics: { toolsCount: 60, speedMs: 0 },
        },
        null,
        indent
      )
    );
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Indent:
          </label>
          <div className="flex items-center gap-1.5">
            {[2, 4].map((spaces) => (
              <button
                key={spaces}
                onClick={() => setIndent(spaces)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  indent === spaces
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {spaces} Spaces
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFormat}
            disabled={!input}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-all shadow-sm"
          >
            Format / Beautify
          </button>
          <button
            onClick={handleMinify}
            disabled={!input}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-40 transition-all"
          >
            Minify / Compact
          </button>
        </div>
      </div>

      {/* Error / Success Status */}
      {error ? (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Error: {error}</span>
        </div>
      ) : input ? (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Valid JSON</span>
        </div>
      ) : null}

      {/* Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            JSON Document
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <Sparkles className="w-3 h-3" />
              Load Sample
            </button>
            {input && (
              <button
                onClick={() => {
                  setInput('');
                  setError(null);
                }}
                className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder="Paste raw or minified JSON here..."
          rows={14}
          className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!input}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={!input}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download .json</span>
        </button>
      </div>
    </div>
  );
}
