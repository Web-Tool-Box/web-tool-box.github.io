'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Sparkles, Smile } from 'lucide-react';

export default function FaviconGenerator() {
  const [emoji, setEmoji] = useState('⚡');
  const [bgColor, setBgColor] = useState('#6366f1');
  const [generatedUrls, setGeneratedUrls] = useState<Record<number, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateFavicons = () => {
    const sizes = [16, 32, 48, 180, 512];
    const urls: Record<number, string> = {};

    sizes.forEach((size) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background rounded
      ctx.fillStyle = bgColor;
      const r = size * 0.22;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, r);
      ctx.fill();

      // Emoji centered
      ctx.font = `${size * 0.65}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, size / 2, size / 2 + size * 0.05);

      urls[size] = canvas.toDataURL('image/png');
    });

    setGeneratedUrls(urls);
  };

  React.useEffect(() => {
    generateFavicons();
  }, [emoji, bgColor]);

  const downloadSize = (size: number) => {
    const url = generatedUrls[size];
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Emoji or Letter Icon
          </label>
          <input
            type="text"
            maxLength={2}
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center text-xl font-bold text-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Background Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs uppercase"
            />
          </div>
        </div>

        {/* Browser Tab Simulation Preview */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Browser Tab Preview
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
            {generatedUrls[32] && <img src={generatedUrls[32]} alt="Tab icon" className="w-4 h-4 rounded-sm" />}
            <span className="text-slate-700 dark:text-slate-300 font-medium truncate">My Awesome Website</span>
          </div>
        </div>
      </div>

      {/* Generated Sizes Grid */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Generated Favicon Sizes (PNG)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { size: 16, label: '16x16 (Classic Tab)' },
            { size: 32, label: '32x32 (Standard/Retina)' },
            { size: 180, label: '180x180 (Apple Touch)' },
            { size: 512, label: '512x512 (PWA Splash)' },
          ].map(({ size, label }) => (
            <div
              key={size}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3"
            >
              <div className="h-16 flex items-center justify-center">
                {generatedUrls[size] && (
                  <img
                    src={generatedUrls[size]}
                    alt={label}
                    className="max-h-14 max-w-14 rounded-lg shadow-sm"
                  />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                  {label}
                </span>
                <button
                  onClick={() => downloadSize(size)}
                  className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
