'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Scissors, FileText } from 'lucide-react';

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('1');
  const [splitting, setSplitting] = useState(false);
  const [splitBlobUrl, setSplitBlobUrl] = useState<string | null>(null);

  const handleFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setSplitBlobUrl(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setTotalPages(count);
      setPageRange(`1-${count}`);
    } catch {
      alert('Failed to parse PDF document.');
    }
  };

  const executeSplit = async () => {
    if (!file || totalPages === 0) return;
    setSplitting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Parse range string (e.g. "1-3, 5")
      const targetIndices: number[] = [];
      const parts = pageRange.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) targetIndices.push(i - 1);
            }
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            targetIndices.push(pageNum - 1);
          }
        }
      }

      const uniqueIndices = Array.from(new Set(targetIndices));
      if (uniqueIndices.length === 0) {
        alert('Please enter a valid page number or range.');
        setSplitting(false);
        return;
      }

      const copiedPages = await newPdf.copyPages(sourcePdf, uniqueIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes], { type: 'application/pdf' });
      setSplitBlobUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      alert(`Split error: ${err.message}`);
    } finally {
      setSplitting(false);
    }
  };

  const handleDownload = () => {
    if (!splitBlobUrl) return;
    const a = document.createElement('a');
    a.href = splitBlobUrl;
    a.download = `extracted-pages-${pageRange.replace(/[^0-9-]/g, '_')}.pdf`;
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
              <Scissors className="w-7 h-7" />
            </div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select or drop a PDF file to split pages
            </p>
            <p className="text-xs text-slate-400 mt-1">100% private in-browser page extraction</p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-500" />
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">{file.name}</span>
                <span className="text-xs text-slate-500">Total pages: {totalPages}</span>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="text-xs font-semibold text-rose-600 hover:underline">
              Choose Another
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Enter Pages to Extract (e.g. 1-3, 5)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g. 1-2, 5"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
              />
              <button
                onClick={executeSplit}
                disabled={splitting}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
              >
                {splitting ? 'Extracting...' : 'Extract Pages'}
              </button>
            </div>
          </div>

          {splitBlobUrl && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                Extracted PDF is ready!
              </span>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Extracted PDF</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
