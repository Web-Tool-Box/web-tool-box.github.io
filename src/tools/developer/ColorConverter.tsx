'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Palette } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Conversion math
  const conversions = useMemo(() => {
    let cleanHex = hex.trim().replace(/^#/, '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((c) => c + c).join('');
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      return null;
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    const hDeg = Math.round(h * 360);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);

    // RGB to CMYK
    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : Math.round(((1 - rNorm - k) / (1 - k)) * 100);
    const m = k === 1 ? 0 : Math.round(((1 - gNorm - k) / (1 - k)) * 100);
    const y = k === 1 ? 0 : Math.round(((1 - bNorm - k) / (1 - k)) * 100);
    const kPct = Math.round(k * 100);

    return {
      hex: `#${cleanHex.toUpperCase()}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      rgba: `rgba(${r}, ${g}, ${b}, 1)`,
      hsl: `hsl(${hDeg}, ${sPct}%, ${lPct}%)`,
      cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${kPct}%)`,
    };
  }, [hex]);

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual Color Picker */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div
          className="w-24 h-24 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 shrink-0"
          style={{ backgroundColor: conversions?.hex || '#6366f1' }}
        />

        <div className="space-y-2 flex-1 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pick or Enter HEX Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={conversions?.hex || '#6366F1'}
              onChange={(e) => setHex(e.target.value)}
              className="w-12 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#6366f1"
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-800 dark:text-slate-200 uppercase"
            />
          </div>
        </div>
      </div>

      {/* Formatted Output Grid */}
      {conversions ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(conversions).map(([format, value]) => (
            <div
              key={format}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {format}
                </span>
                <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {value}
                </span>
              </div>
              <button
                onClick={() => handleCopy(format, value)}
                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {copiedKey === format ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-rose-500">Invalid 6-digit hexadecimal color string</p>
      )}
    </div>
  );
}
