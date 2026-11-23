'use client';

import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, FileCode } from 'lucide-react';

export default function ImageToBase64() {
  const [base64, setBase64] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileType(file.type);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64((e.target?.result as string) || '');
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {!base64 ? (
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
              Select or drop an image to convert to Base64
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP, SVG supported</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Thumbnail & Stats */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <img src={base64} alt="Thumbnail" className="w-16 h-16 rounded-xl object-contain bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
            <div className="flex-1 text-xs">
              <span className="font-bold text-sm text-slate-900 dark:text-white block">{fileName}</span>
              <span className="text-slate-400">{fileType} • {(fileSize / 1024).toFixed(1)} KB</span>
            </div>
            <button
              onClick={() => setBase64('')}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Choose Another
            </button>
          </div>

          {/* Formats Copy Cards */}
          <div className="space-y-3">
            {/* Full Data URI */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Data URI Format
                </span>
                <button
                  onClick={() => handleCopy('dataUri', base64)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedKey === 'dataUri' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'dataUri' ? 'Copied!' : 'Copy Data URI'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={base64}
                rows={3}
                className="w-full p-2.5 font-mono text-[11px] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 resize-none select-all"
              />
            </div>

            {/* HTML Image Tag */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  HTML &lt;img&gt; Snippet
                </span>
                <button
                  onClick={() => handleCopy('html', `<img src="${base64}" alt="${fileName}" />`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedKey === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'html' ? 'Copied HTML!' : 'Copy HTML'}</span>
                </button>
              </div>
              <code className="block p-2.5 font-mono text-[11px] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 truncate select-all">
                &lt;img src=&quot;{base64.slice(0, 50)}...&quot; alt=&quot;{fileName}&quot; /&gt;
              </code>
            </div>

            {/* CSS background-image */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  CSS background-image Rule
                </span>
                <button
                  onClick={() => handleCopy('css', `background-image: url("${base64}");`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedKey === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'css' ? 'Copied CSS!' : 'Copy CSS'}</span>
                </button>
              </div>
              <code className="block p-2.5 font-mono text-[11px] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 truncate select-all">
                background-image: url(&quot;{base64.slice(0, 50)}...&quot;);
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
