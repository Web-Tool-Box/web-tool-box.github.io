'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Trash2, ArrowUp, ArrowDown, FileText, CheckCircle2 } from 'lucide-react';

export default function PdfMerge() {
  const [files, setFiles] = useState<{ file: File; id: string }[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        file: f,
        id: Math.random().toString(36).substring(7),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      setMergedBlobUrl(null);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setFiles(updated);
    setMergedBlobUrl(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedBlobUrl(null);
  };

  const executeMerge = async () => {
    if (files.length < 2) return;
    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      setMergedBlobUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      alert(`Error merging PDFs: ${err.message}`);
    } finally {
      setMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlobUrl) return;
    const a = document.createElement('a');
    a.href = mergedBlobUrl;
    a.download = 'merged-document.pdf';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-3xl p-8 text-center transition-colors bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
        <label className="cursor-pointer block">
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFiles}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <Upload className="w-6 h-6" />
          </div>
          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Click to add PDF files or drag them in
          </p>
          <p className="text-xs text-slate-400 mt-1">Select 2 or more PDF documents to merge</p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Documents to Combine ({files.length})
            </span>
            <button
              onClick={() => setFiles([])}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {item.file.name}
                  </span>
                  <span className="text-slate-400 shrink-0">
                    ({(item.file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={() => moveFile(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Merge & Download Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={executeMerge}
              disabled={files.length < 2 || merging}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
            >
              {merging ? 'Merging in Browser...' : 'Merge PDF Documents'}
            </button>

            {mergedBlobUrl && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20 animate-in fade-in"
              >
                <Download className="w-4 h-4" />
                <span>Download Merged PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
