'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function ImagesToPdf() {
  const [images, setImages] = useState<{ file: File; url: string; id: string }[]>([]);
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImgs = Array.from(e.target.files).map((f) => ({
        file: f,
        url: URL.createObjectURL(f),
        id: Math.random().toString(36).substring(7),
      }));
      setImages((prev) => [...prev, ...newImgs]);
      setPdfUrl(null);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfUrl(null);
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setGenerating(true);

    try {
      const pdf = await PDFDocument.create();

      for (const item of images) {
        const arrayBuffer = await item.file.arrayBuffer();
        let embeddedImage;

        if (item.file.type === 'image/jpeg' || item.file.type === 'image/jpg') {
          embeddedImage = await pdf.embedJpg(arrayBuffer);
        } else {
          // PNG fallback
          embeddedImage = await pdf.embedPng(arrayBuffer);
        }

        const page = pdf.addPage([embeddedImage.width, embeddedImage.height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      alert(`PDF conversion error: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'converted-images.pdf';
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
            accept="image/png,image/jpeg"
            onChange={handleImages}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <Upload className="w-6 h-6" />
          </div>
          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Click to upload photos or drag them in
          </p>
          <p className="text-xs text-slate-400 mt-1">Converts PNG and JPG images into a multi-page PDF</p>
        </label>
      </div>

      {/* Thumbnails Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Selected Photos ({images.length})
            </span>
            <button onClick={() => setImages([])} className="text-xs font-semibold text-rose-600 hover:underline">
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((item, idx) => (
              <div
                key={item.id}
                className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
              >
                <img src={item.url} alt="Photo" className="w-full h-24 object-cover" />
                <span className="absolute bottom-1 left-1 bg-black/60 text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                  #{idx + 1}
                </span>
                <button
                  onClick={() => removeImage(item.id)}
                  className="absolute top-1 right-1 p-1 rounded-md bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={generatePdf}
              disabled={generating}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/20"
            >
              {generating ? 'Compiling PDF...' : 'Convert to PDF'}
            </button>

            {pdfUrl && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
