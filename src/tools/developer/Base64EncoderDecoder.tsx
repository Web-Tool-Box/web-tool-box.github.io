'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowLeftRight, AlertCircle } from 'lucide-react';

export default function Base64EncoderDecoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        // UTF-8 safe encode
        const encoded = btoa(unescape(encodeURIComponent(input)));
        const finalRes = urlSafe ? encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : encoded;
        setOutput(finalRes);
        setError(null);
      } else {
        // Normalize URL safe if needed
        let toDecode = input.trim();
        if (urlSafe || toDecode.includes('-') || toDecode.includes('_')) {
          toDecode = toDecode.replace(/-/g, '+').replace(/_/g, '/');
          while (toDecode.length % 4) {
            toDecode += '=';
          }
        }
        const decoded = decodeURIComponent(escape(atob(toDecode)));
        setOutput(decoded);
        setError(null);
      }
    } catch (err: any) {
      setError(mode === 'decode' ? 'Invalid Base64 sequence to decode' : 'Encoding failed');
    }
  };

  React.useEffect(() => {
    handleProcess();
  }, [input, mode, urlSafe]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput('Authorization: Bearer secret-user-token-2026!');
    } else {
      setInput('QXV0aG9yaXphdGlvbjogQmVhcmVyIHNlY3JldC11c2VyLXRva2VuLTIwMjYh');
    }
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode Controls */}
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
            Encode to Base64
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
            Decode from Base64
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="rounded text-indigo-600"
          />
          URL-Safe Mode (uses - and _)
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
              {mode === 'encode' ? 'Plaintext Input' : 'Base64 Input'}
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
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
            rows={10}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Plaintext'}
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            rows={10}
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
        <span>{copied ? 'Copied Result!' : 'Copy Result'}</span>
      </button>
    </div>
  );
}
