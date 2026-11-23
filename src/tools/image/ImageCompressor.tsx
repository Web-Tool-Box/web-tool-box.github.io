'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Check, Sparkles, Image as ImageIcon, Sliders } from 'lucide-react';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setOriginalFile(file);
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    compressImage(file, quality);
  };

  const compressImage = (file: File, q: number) => {
    setCompressing(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      // Compress via Canvas toBlob
      const mime = file.type === 'image/png' ? 'image/jpeg' : file.type;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const compUrl = URL.createObjectURL(blob);
            setCompressedUrl(compUrl);
          }
          setCompressing(false);
        },
        mime,
        q / 100
      );
    };
  };

  const handleQualityChange = (newQ: number) => {
    setQuality(newQ);
    if (originalFile) {
      compressImage(originalFile, newQ);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${originalFile?.name || 'image.jpg'}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Drop Zone */}
      {!originalUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-3xl p-10 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-950/50 space-y-3"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Click to upload or drag & drop an image
            </p>
            <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, and WebP (up to 50MB)</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quality Slider & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-center">
            <div className="sm:col-span-2 space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Compression Quality</span>
                <span className="text-indigo-600 dark:text-indigo-400">{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="text-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Reduction</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {originalSize > 0
                  ? `${Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))}%`
                  : '0%'}
              </span>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Original ({formatBytes(originalSize)})
              </span>
              <img
                src={originalUrl}
                alt="Original preview"
                className="max-h-56 mx-auto rounded-xl object-contain"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Compressed ({formatBytes(compressedSize)})
              </span>
              {compressedUrl && (
                <img
                  src={compressedUrl}
                  alt="Compressed preview"
                  className="max-h-56 mx-auto rounded-xl object-contain"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!compressedUrl || compressing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Compressed Image</span>
            </button>

            <button
              onClick={() => {
                setOriginalFile(null);
                setOriginalUrl(null);
                setCompressedUrl(null);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Compress Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
