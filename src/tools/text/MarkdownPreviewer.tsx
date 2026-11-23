'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Download, Eye, Code } from 'lucide-react';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);

  // Client-side lightweight markdown parser
  const htmlOutput = useMemo(() => {
    if (!markdown) return '';

    let html = markdown
      // Escape HTML entities
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold my-2 text-indigo-500">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold my-3 text-indigo-600">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black my-4 text-slate-900 dark:text-white">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 italic my-2 text-slate-600 dark:text-slate-400">$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Inline code
      .replace(/`(.*?)`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs text-rose-500">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 underline font-semibold">$1</a>')
      // Unordered lists
      .replace(/^\s*\-\s(.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>')
      // Newlines to linebreaks
      .replace(/\n$/gim, '<br />');

    return html;
  }, [markdown]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setMarkdown(
      `# Welcome to WebToolBox Markdown Editor\n\n` +
      `This is a **live client-side previewer** supporting GitHub Flavored Markdown.\n\n` +
      `## Key Features\n` +
      `- Zero server transmission: *100% private*\n` +
      `- Instant live rendered HTML\n` +
      `- Clean \`inline code\` and typography styling\n\n` +
      `> "Privacy is not an afterthought, it is the fundamental architecture."\n\n` +
      `Visit [WebToolBox Homepage](https://webtoolbox.dev) to explore 60+ tools!`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load Sample Markdown
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            disabled={!htmlOutput}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
            <span>Copy HTML</span>
          </button>
          <button
            onClick={handleDownloadMd}
            disabled={!markdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Markdown Source
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here (# Heading, **bold**, - list item)..."
            rows={14}
            className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Rendered Live Preview
          </label>
          <div
            dangerouslySetInnerHTML={{ __html: htmlOutput || '<p class="text-slate-400 italic">Preview will render here...</p>' }}
            className="w-full p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 min-h-[300px] max-h-[460px] overflow-y-auto leading-relaxed text-sm prose dark:prose-invert"
          />
        </div>
      </div>
    </div>
  );
}
