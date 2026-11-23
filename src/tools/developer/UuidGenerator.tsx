'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Download } from 'lucide-react';

export default function UuidGenerator() {
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUuidV4 = () => {
    // Cryptographically secure random UUID v4
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateUuidV1 = () => {
    // Timestamp-based pseudo v1
    const now = Date.now();
    const hexTime = now.toString(16).padStart(12, '0');
    return `${hexTime.slice(0, 8)}-${hexTime.slice(8, 12)}-1${hexTime.slice(9, 12)}-8${Math.floor(
      Math.random() * 4095
    ).toString(16).padStart(3, '0')}-${Math.floor(Math.random() * 281474976710655)
      .toString(16)
      .padStart(12, '0')}`;
  };

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let id = version === 'v4' ? generateUuidV4() : generateUuidV1();
      if (!hyphens) {
        id = id.replace(/-/g, '');
      }
      if (uppercase) {
        id = id.toUpperCase();
      }
      list.push(id);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    handleGenerate();
  }, [version, quantity, uppercase, hyphens]);

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            UUID Version
          </label>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="v4">Version 4 (Random CSPRNG)</option>
            <option value="v1">Version 1 (Timestamp)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Quantity: {quantity}
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="flex flex-col justify-center space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Include Hyphens
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Uppercase Letters
          </label>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            className="w-full py-2 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Generated List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Generated UUID List ({uuids.length})
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied All!' : 'Copy All'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 max-h-80 overflow-y-auto select-all">
          {uuids.map((id, idx) => (
            <div key={idx} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
              {id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
