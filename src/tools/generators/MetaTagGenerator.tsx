'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('My Online Tools - 100% Free & Private');
  const [description, setDescription] = useState('Discover fast, free, in-browser online tools with zero server processing and no registration.');
  const [url, setUrl] = useState('https://web-tool-box.github.io');
  const [ogImage, setOgImage] = useState('https://web-tool-box.github.io/og-default.png');
  const [author, setAuthor] = useState('WebToolBox Team');
  const [copied, setCopied] = useState(false);

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="author" content="${author}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${ogImage}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-1">
              <span>Page Title</span>
              <span className={title.length > 60 ? 'text-amber-500' : 'text-slate-400'}>{title.length}/60</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-sm font-semibold"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-1">
              <span>Meta Description</span>
              <span className={description.length > 155 ? 'text-amber-500' : 'text-slate-400'}>{description.length}/155</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border text-xs resize-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Canonical URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-1">OG Image URL (1200x630)</label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Generated HTML Code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Generated HTML &lt;head&gt; Code
          </label>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied HTML!' : 'Copy Tags'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-200">
          {generatedHtml}
        </pre>
      </div>
    </div>
  );
}
