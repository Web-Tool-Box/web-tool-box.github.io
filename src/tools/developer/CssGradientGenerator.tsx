'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react';

export default function CssGradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#a855f7');
  const [copied, setCopied] = useState(false);

  const gradientCss =
    type === 'linear'
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const fullCssRule = `background: ${gradientCss};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCssRule);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'Indigo Purple', c1: '#6366f1', c2: '#a855f7' },
    { name: 'Sunset Glow', c1: '#f97316', c2: '#ec4899' },
    { name: 'Emerald Teal', c1: '#10b981', c2: '#06b6d4' },
    { name: 'Cyberpunk', c1: '#06b6d4', c2: '#f43f5e' },
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-bold text-slate-500 uppercase tracking-wider">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => {
              setColor1(p.c1);
              setColor2(p.c2);
            }}
            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Visual Canvas Preview */}
      <div
        className="w-full h-44 sm:h-56 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 flex items-center justify-center"
        style={{ background: gradientCss }}
      >
        <span className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white font-mono text-xs font-semibold">
          Preview
        </span>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Gradient Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="linear">Linear Gradient</option>
            <option value="radial">Radial Gradient</option>
          </select>
        </div>

        {type === 'linear' && (
          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span>Angle: {angle}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Color 1
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Color 2
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* Code Snippet Output */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <code className="font-mono text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 select-all break-all mr-2">
          {fullCssRule}
        </code>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied CSS!' : 'Copy CSS'}</span>
        </button>
      </div>
    </div>
  );
}
