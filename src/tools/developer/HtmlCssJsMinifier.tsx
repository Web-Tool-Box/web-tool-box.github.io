'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Download, Code, Minimize2, FileCode } from 'lucide-react';

export default function HtmlCssJsMinifier() {
  const [lang, setLang] = useState<'html' | 'css' | 'js'>('html');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const minifyCode = () => {
    if (!input.trim()) return;

    let res = input;
    if (lang === 'html') {
      res = input
        .replace(/<!--[\s\S]*?-->/g, '') // strip comments
        .replace(/\s+/g, ' ') // collapse multiple spaces
        .replace(/>\s+</g, '><') // remove spaces between tags
        .trim();
    } else if (lang === 'css') {
      res = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // strip comments
        .replace(/\s+/g, ' ') // collapse spaces
        .replace(/\s*([{}:;,])\s*/g, '$1') // remove spaces around punctuation
        .replace(/;}/g, '}') // strip trailing semicolon before closing brace
        .trim();
    } else {
      // JS simple safe minifier
      res = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // multi-line comments
        .replace(/\/\/[^\n]*/g, '') // single-line comments
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .join(' ');
    }

    setOutput(res);
  };

  const beautifyCode = () => {
    if (!input.trim()) return;

    if (lang === 'css') {
      let formatted = '';
      let indent = 0;
      const clean = input.replace(/\s+/g, ' ');
      for (let i = 0; i < clean.length; i++) {
        const char = clean[i];
        if (char === '{') {
          indent += 2;
          formatted += ' {\n' + ' '.repeat(indent);
        } else if (char === '}') {
          indent = Math.max(0, indent - 2);
          formatted += '\n' + ' '.repeat(indent) + '}\n' + ' '.repeat(indent);
        } else if (char === ';') {
          formatted += ';\n' + ' '.repeat(indent);
        } else {
          formatted += char;
        }
      }
      setOutput(formatted.trim());
    } else {
      // Simple indent formatting
      setOutput(input.trim());
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = lang === 'html' ? 'html' : lang === 'css' ? 'css' : 'js';
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minified.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    if (lang === 'html') {
      setInput(
        `<!-- Header Navigation -->\n<header class="navbar">\n  <div class="logo">\n    <h1>WebToolBox</h1>\n  </div>\n</header>`
      );
    } else if (lang === 'css') {
      setInput(
        `/* Main Button Styles */\n.btn-primary {\n  background-color: #6366f1;\n  color: #ffffff;\n  padding: 12px 24px;\n  border-radius: 8px;\n}`
      );
    } else {
      setInput(
        `// Calculate square\nfunction square(n) {\n  /* Return power of 2 */\n  return n * n;\n}\nconsole.log(square(5));`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {(['html', 'css', 'js'] as const).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setInput('');
                setOutput('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                lang === l
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={minifyCode}
            disabled={!input}
            className="px-5 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-all shadow-sm flex items-center gap-1.5"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Minify Code
          </button>
          <button
            onClick={beautifyCode}
            disabled={!input}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-40 transition-all"
          >
            Format / Beautify
          </button>
        </div>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Source Code ({lang.toUpperCase()})
            </label>
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <Sparkles className="w-3 h-3" />
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${lang.toUpperCase()} code here...`}
            rows={12}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Minified / Beautified Result
            </label>
            {input && output && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {Math.max(0, Math.round(((input.length - output.length) / input.length) * 100))}% Size Savings
              </span>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            rows={12}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!output}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-indigo-600/20"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={!output}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download .{lang}</span>
        </button>
      </div>
    </div>
  );
}
