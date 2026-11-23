'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Download, Trash2, Check, Sparkles, BookOpen, Clock, AlignLeft } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200); // 200 WPM
    const speakingTime = Math.ceil(words / 130); // 130 WPM

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word-counter-export.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setText(
      'WebToolBox is a modern suite of free, 100% in-browser online tools designed for developers, creators, writers, and students. All processing occurs entirely inside your local device memory using client-side JavaScript and WebAssembly. Your text, code, images, and confidential files never leave your computer, ensuring maximum privacy and instant performance!'
    );
  };

  return (
    <div className="space-y-6">
      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
          <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.words.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Words
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="block text-2xl font-black text-slate-800 dark:text-slate-200">
            {stats.characters.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Characters
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="block text-2xl font-black text-slate-800 dark:text-slate-200">
            {stats.charactersNoSpaces.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            No Spaces
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="block text-2xl font-black text-slate-800 dark:text-slate-200">
            {stats.sentences.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Sentences
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="block text-2xl font-black text-slate-800 dark:text-slate-200">
            {stats.paragraphs.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Paragraphs
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 text-center">
          <span className="block text-2xl font-black text-amber-600 dark:text-amber-400">
            {stats.readingTime}m
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Reading
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
          <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.speakingTime}m
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Speaking
          </span>
        </div>
      </div>

      {/* Editor Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label htmlFor="text-input" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Input Text
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample
            </button>
            {text && (
              <button
                onClick={() => setText('')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to begin counting words, characters, and sentences..."
          rows={10}
          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 text-sm leading-relaxed resize-y placeholder:text-slate-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleCopy}
          disabled={!text}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={!text}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download .txt</span>
        </button>
      </div>
    </div>
  );
}
