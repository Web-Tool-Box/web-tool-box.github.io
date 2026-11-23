'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [componentMode, setComponentMode] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (!input) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        const res = componentMode ? encodeURIComponent(input) : encodeURI(input);
        setOutput(res);
        setError(null);
      } else {
        const res = componentMode ? decodeURIComponent(input) : decodeURI(input);
        setOutput(res);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Malformed URI sequence');
    }
  };

  React.useEffect(() => {
    handleProcess();
  }, [input, mode, componentMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput('https://example.com/search?query=hello world & category=developer tools');
    } else {
      setInput('https%3A%2F%2Fexample.com%2Fsearch%3Fquery%3Dhello%20world%20%26%20category%3Ddeveloper%20tools');
    }
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('encode');
              setInput('');
              setOutput('');
              setError(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              mode === 'encode'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Encode URL
          </button>
          <button
            onClick={() => {
              setMode('decode');
              setInput('');
              setOutput('');
              setError(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              mode === 'decode'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Decode URL
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={componentMode}
            onChange={(e) => setComponentMode(e.target.checked)}
            className="rounded text-indigo-600"
          />
          Encode/Decode Component (encodes slashes & question marks)
        </label>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {mode === 'encode' ? 'Raw URL / String' : 'Encoded URL'}
            </label>
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <Sparkles className="w-3 h-3" />
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Paste encoded URL to decode...'}
            rows={8}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {mode === 'encode' ? 'Encoded Output' : 'Decoded URL'}
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Result..."
            rows={8}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={handleCopy}
        disabled={!output}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied URL!' : 'Copy Converted String'}</span>
      </button>
    </div>
  );
}
