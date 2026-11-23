'use client';

import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Pipette } from 'lucide-react';

export default function ColorPickerImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      // Extract quick sample palette from canvas
      const colors: string[] = [];
      const stepX = Math.floor(img.naturalWidth / 6);
      const stepY = Math.floor(img.naturalHeight / 6);
      for (let i = 1; i <= 5; i++) {
        const pixel = ctx.getImageData(i * stepX, i * stepY, 1, 1).data;
        const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
        if (!colors.includes(hex)) colors.push(hex);
      }
      setPalette(colors);
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;

    setPickedColor({ hex, rgb, hsl: 'hsl(...)' });
  };

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {!imageUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-3xl p-10 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-950/50 space-y-3"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Pipette className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select or drop an image to pick colors
            </p>
            <p className="text-xs text-slate-400 mt-1">Click anywhere on the image to sample pixel color</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Picked Color Card */}
          {pickedColor && (
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div
                className="w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner shrink-0"
                style={{ backgroundColor: pickedColor.hex }}
              />
              <div className="flex-1 font-mono text-xs space-y-1">
                <span className="font-bold text-sm text-slate-900 dark:text-white block uppercase">
                  {pickedColor.hex}
                </span>
                <span className="text-slate-500">{pickedColor.rgb}</span>
              </div>
              <button
                onClick={() => handleCopy('hex', pickedColor.hex)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
              >
                {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hex' ? 'Copied HEX' : 'Copy HEX'}</span>
              </button>
            </div>
          )}

          {/* Interactive Canvas */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center overflow-hidden">
            <p className="text-xs text-slate-400 mb-2 font-medium">Click on any pixel in the photo:</p>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="max-h-80 mx-auto rounded-xl cursor-crosshair shadow-sm max-w-full"
            />
          </div>

          {/* Auto Palette */}
          {palette.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Extracted Sample Palette:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {palette.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCopy(c, c)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105 transition-transform"
                  >
                    <span className="w-6 h-6 rounded-lg shadow-inner" style={{ backgroundColor: c }} />
                    <span className="font-mono text-xs uppercase text-slate-700 dark:text-slate-300">{c}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
