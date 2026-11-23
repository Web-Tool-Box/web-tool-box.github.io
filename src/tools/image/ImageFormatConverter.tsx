'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw } from 'lucide-react';

export default function ImageFormatConverter() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [targetFormat, setTargetFormat] = useState<'image/webp' | 'image/png' | 'image/jpeg'>('image/webp');
  const [quality, setQuality] = useState(85);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setConvertedUrl(null);
  };

  const handleConvert = () => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill white background if converting to JPEG to avoid black transparent boxes
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setConvertedUrl(URL.createObjectURL(blob));
          }
        },
        targetFormat,
        quality / 100
      );
    };
  };

  const handleDownload = () => {
    if (!convertedUrl) return;
    const ext = targetFormat.replace('image/', '');
    const a = document.createElement('a');
    a.href = convertedUrl;
    a.download = `${fileName}.${ext}`;
    a.click();
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
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select or drop an image to convert format
            </p>
            <p className="text-xs text-slate-400 mt-1">Convert between PNG, JPG, and WebP</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Format Settings Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-end">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Target Format
              </label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="image/webp">WebP (Modern, Smallest Size)</option>
                <option value="image/png">PNG (Lossless with Transparency)</option>
                <option value="image/jpeg">JPEG / JPG (Universal)</option>
              </select>
            </div>

            {targetFormat !== 'image/png' && (
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  <span>Quality: {quality}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}

            <button
              onClick={handleConvert}
              className="py-2.5 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Convert Format
            </button>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <img
              src={convertedUrl || imageUrl}
              alt="Format preview"
              className="max-h-64 mx-auto rounded-xl object-contain shadow-sm"
            />
          </div>

          {/* Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!convertedUrl}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Converted File</span>
            </button>

            <button
              onClick={() => {
                setImageUrl(null);
                setConvertedUrl(null);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Choose New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
