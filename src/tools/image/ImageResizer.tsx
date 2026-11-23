'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Check, Sparkles, Lock, Unlock } from 'lucide-react';

export default function ImageResizer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
    };
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (lockAspect && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setTargetHeight(Math.round(w * ratio));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (lockAspect && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setTargetWidth(Math.round(h * ratio));
    }
  };

  const executeResize = () => {
    if (!imageUrl || targetWidth <= 0 || targetHeight <= 0) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob((blob) => {
        if (blob) {
          setResizedUrl(URL.createObjectURL(blob));
        }
      }, originalFile?.type || 'image/png');
    };
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    const a = document.createElement('a');
    a.href = resizedUrl;
    a.download = `resized-${targetWidth}x${targetHeight}-${originalFile?.name || 'image.png'}`;
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
              Select or drop an image to resize
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP supported</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dimension Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-end">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Width (Pixels)
              </label>
              <input
                type="number"
                min={1}
                value={targetWidth}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Height (Pixels)
              </label>
              <input
                type="number"
                min={1}
                value={targetHeight}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="flex items-center gap-3 pb-1">
              <button
                onClick={() => setLockAspect(!lockAspect)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  lockAspect
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/50 dark:border-indigo-800'
                    : 'bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-700'
                }`}
              >
                {lockAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span>{lockAspect ? 'Locked Aspect' : 'Free Aspect'}</span>
              </button>

              <button
                onClick={executeResize}
                className="flex-1 py-2 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
              >
                Apply Resize
              </button>
            </div>
          </div>

          {/* Preview Box */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Preview (Target: {targetWidth} × {targetHeight}px)
            </span>
            <img
              src={resizedUrl || imageUrl}
              alt="Resized preview"
              className="max-h-64 mx-auto rounded-xl object-contain shadow-sm"
            />
          </div>

          {/* Download Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!resizedUrl}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Resized Image</span>
            </button>

            <button
              onClick={() => {
                setImageUrl(null);
                setResizedUrl(null);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
