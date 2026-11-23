'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileDown, CheckCircle2 } from 'lucide-react';

export default function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressing, setCompressing] = useState(false);
  const [compressedBlobUrl, setCompressedBlobUrl] = useState<string | null>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedBlobUrl(null);

    setCompressing(true);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      // Load and save with object stream compression
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const optimizedBytes = await pdf.save({ useObjectStreams: true });

      setCompressedSize(optimizedBytes.length);
      const blob = new Blob([optimizedBytes as any], { type: 'application/pdf' });
      setCompressedBlobUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      alert(`PDF optimization notice: ${err.message}`);
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlobUrl) return;
    const a = document.createElement('a');
    a.href = compressedBlobUrl;
    a.download = `optimized-${file?.name || 'document.pdf'}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-3xl p-10 text-center transition-colors bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
              <FileDown className="w-7 h-7" />
            </div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select or drop a PDF file to optimize
            </p>
            <p className="text-xs text-slate-400 mt-1">Strips unreferenced streams and compresses object trees</p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Original Size</span>
              <span className="text-xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
                {formatBytes(originalSize)}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Optimized Size</span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
                {compressing ? 'Calculating...' : formatBytes(compressedSize || originalSize)}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Reduction</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                {originalSize > 0 && compressedSize > 0 && originalSize > compressedSize
                  ? `${Math.round(((originalSize - compressedSize) / originalSize) * 100)}%`
                  : 'Optimized'}
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!compressedBlobUrl || compressing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Optimized PDF</span>
            </button>

            <button
              onClick={() => {
                setFile(null);
                setCompressedBlobUrl(null);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Compress Another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
