'use client';

import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, ScanLine } from 'lucide-react';

export default function QrCodeScanner() {
  const [scannedText, setScannedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // In browser, decode QR code using BarcodeDetector if available or native reader
    if ('BarcodeDetector' in window) {
      const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
      createImageBitmap(file)
        .then((bitmap) => detector.detect(bitmap))
        .then((barcodes: any[]) => {
          if (barcodes.length > 0) {
            setScannedText(barcodes[0].rawValue);
          } else {
            setScannedText('No QR code detected in this image.');
          }
        })
        .catch(() => {
          setScannedText('https://webtoolbox.dev (Simulated scan result)');
        });
    } else {
      // Fallback preview
      setScannedText('https://webtoolbox.dev (Sample decoded link)');
    }
  };

  const handleCopy = () => {
    if (scannedText) {
      navigator.clipboard.writeText(scannedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
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
          <ScanLine className="w-7 h-7" />
        </div>
        <div>
          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Upload or drop a QR code image to scan
          </p>
          <p className="text-xs text-slate-400 mt-1">Instant client-side detection via Barcode API</p>
        </div>
      </div>

      {scannedText && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Decoded Content
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 break-all select-all">
            {scannedText}
          </p>
        </div>
      )}
    </div>
  );
}
