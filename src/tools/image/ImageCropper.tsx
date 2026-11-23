'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Crop as CropIcon } from 'lucide-react';

export default function ImageCropper() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [aspect, setAspect] = useState<'free' | '1:1' | '16:9' | '4:3'>('1:1');
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCroppedUrl(null);
  };

  const handleCrop = () => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let cropWidth = img.naturalWidth;
      let cropHeight = img.naturalHeight;
      let startX = 0;
      let startY = 0;

      if (aspect === '1:1') {
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        cropWidth = size;
        cropHeight = size;
        startX = (img.naturalWidth - size) / 2;
        startY = (img.naturalHeight - size) / 2;
      } else if (aspect === '16:9') {
        cropWidth = img.naturalWidth;
        cropHeight = (img.naturalWidth * 9) / 16;
        if (cropHeight > img.naturalHeight) {
          cropHeight = img.naturalHeight;
          cropWidth = (img.naturalHeight * 16) / 9;
        }
        startX = (img.naturalWidth - cropWidth) / 2;
        startY = (img.naturalHeight - cropHeight) / 2;
      } else if (aspect === '4:3') {
        cropWidth = img.naturalWidth;
        cropHeight = (img.naturalWidth * 3) / 4;
        if (cropHeight > img.naturalHeight) {
          cropHeight = img.naturalHeight;
          cropWidth = (img.naturalHeight * 4) / 3;
        }
        startX = (img.naturalWidth - cropWidth) / 2;
        startY = (img.naturalHeight - cropHeight) / 2;
      }

      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, startX, startY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      canvas.toBlob((blob) => {
        if (blob) {
          setCroppedUrl(URL.createObjectURL(blob));
        }
      }, 'image/png');
    };
  };

  const handleDownload = () => {
    if (!croppedUrl) return;
    const a = document.createElement('a');
    a.href = croppedUrl;
    a.download = `cropped-${aspect}.png`;
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
              Select or drop an image to crop
            </p>
            <p className="text-xs text-slate-400 mt-1">Preset ratios: Square 1:1, 16:9, 4:3</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Ratio Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
                Aspect Ratio:
              </span>
              {(['1:1', '16:9', '4:3', 'free'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setAspect(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    aspect === r
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {r === '1:1' ? 'Square (1:1)' : r}
                </button>
              ))}
            </div>

            <button
              onClick={handleCrop}
              className="px-5 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center gap-1.5"
            >
              <CropIcon className="w-3.5 h-3.5" />
              Apply Crop
            </button>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <img
              src={croppedUrl || imageUrl}
              alt="Crop preview"
              className="max-h-72 mx-auto rounded-xl object-contain shadow-sm"
            />
          </div>

          {/* Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!croppedUrl}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Cropped Photo</span>
            </button>

            <button
              onClick={() => {
                setImageUrl(null);
                setCroppedUrl(null);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Choose New Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
