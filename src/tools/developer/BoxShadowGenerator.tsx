'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Box } from 'lucide-react';

export default function BoxShadowGenerator() {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(10);
  const [blur, setBlur] = useState<number>(25);
  const [spread, setSpread] = useState<number>(-5);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState<number>(15);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  // Convert hex & opacity to rgba
  const hexToRgba = (hex: string, op: number) => {
    let clean = hex.replace(/^#/, '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${(op / 100).toFixed(2)})`;
  };

  const shadowValue = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const fullRule = `box-shadow: ${shadowValue};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullRule);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual Preview Frame */}
      <div className="w-full h-56 rounded-3xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-6 border border-slate-200 dark:border-slate-800">
        <div
          className="w-48 h-32 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-center font-bold text-xs text-slate-500 uppercase tracking-wider"
          style={{ boxShadow: shadowValue }}
        >
          Box Preview
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>X Offset: {x}px</span>
          </div>
          <input
            type="range"
            min={-50}
            max={50}
            value={x}
            onChange={(e) => setX(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>Y Offset: {y}px</span>
          </div>
          <input
            type="range"
            min={-50}
            max={50}
            value={y}
            onChange={(e) => setY(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>Blur Radius: {blur}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={blur}
            onChange={(e) => setBlur(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>Spread Radius: {spread}px</span>
          </div>
          <input
            type="range"
            min={-30}
            max={50}
            value={spread}
            onChange={(e) => setSpread(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>Opacity: {opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={inset}
              onChange={(e) => setInset(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Inset Shadow
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-xs uppercase">{color}</span>
          </div>
        </div>
      </div>

      {/* Output Code */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <code className="font-mono text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 select-all break-all mr-2">
          {fullRule}
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
