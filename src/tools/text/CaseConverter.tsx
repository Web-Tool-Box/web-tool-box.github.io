'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Trash2, ArrowRight } from 'lucide-react';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const conversions = {
    uppercase: () => text.toUpperCase(),
    lowercase: () => text.toLowerCase(),
    titleCase: () => {
      const minorWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
      return text
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
          if (index > 0 && minorWords.test(word)) {
            return word;
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    },
    sentenceCase: () => {
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    },
    camelCase: () => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
          if (+match === 0) return '';
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        })
        .replace(/[^a-zA-Z0-9]/g, '');
    },
    pascalCase: () => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
          if (+match === 0) return '';
          return match.toUpperCase();
        })
        .replace(/[^a-zA-Z0-9]/g, '');
    },
    snakeCase: () => {
      return text
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, '_');
    },
    kebabCase: () => {
      return text
        .trim()
        .toLowerCase()
        .replace(/[\s\W_]+/g, '-');
    },
    constantCase: () => {
      return text
        .trim()
        .toUpperCase()
        .replace(/[\s\W-]+/g, '_');
    },
  };

  const handleConvert = (type: keyof typeof conversions) => {
    setText(conversions[type]());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    setText('Next.js in-browser tools with zero server processing');
  };

  return (
    <div className="space-y-6">
      {/* Transformation Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Transform Case:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <button
            onClick={() => handleConvert('uppercase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => handleConvert('lowercase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            lowercase
          </button>
          <button
            onClick={() => handleConvert('titleCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            Title Case
          </button>
          <button
            onClick={() => handleConvert('sentenceCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            Sentence case
          </button>
          <button
            onClick={() => handleConvert('camelCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            camelCase
          </button>
          <button
            onClick={() => handleConvert('pascalCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            PascalCase
          </button>
          <button
            onClick={() => handleConvert('snakeCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            snake_case
          </button>
          <button
            onClick={() => handleConvert('kebabCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            kebab-case
          </button>
          <button
            onClick={() => handleConvert('constantCase')}
            disabled={!text}
            className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 disabled:opacity-40 transition-colors text-left"
          >
            CONSTANT_CASE
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="case-input" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Editor Text
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
          id="case-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write text here to convert into any case format..."
          rows={8}
          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 text-sm leading-relaxed resize-y placeholder:text-slate-400"
        />
      </div>

      {/* Copy Action */}
      <button
        onClick={handleCopy}
        disabled={!text}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied Output!' : 'Copy Converted Text'}</span>
      </button>
    </div>
  );
}
