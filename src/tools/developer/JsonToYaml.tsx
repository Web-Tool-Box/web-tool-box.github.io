'use client';

import React, { useState } from 'react';
import yaml from 'js-yaml';
import { Copy, Check, Sparkles, Download, ArrowLeftRight, AlertCircle } from 'lucide-react';

export default function JsonToYaml() {
  const [direction, setDirection] = useState<'json2yaml' | 'yaml2json'>('json2yaml');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) return;
    try {
      if (direction === 'json2yaml') {
        const parsed = JSON.parse(input);
        const yamlStr = yaml.dump(parsed, { indent: 2 });
        setOutput(yamlStr);
      } else {
        const loaded = yaml.load(input);
        setOutput(JSON.stringify(loaded, null, 2));
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Syntax error parsing data');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = direction === 'json2yaml' ? 'yaml' : 'json';
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `config.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    if (direction === 'json2yaml') {
      setInput(
        JSON.stringify(
          {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { name: 'webtoolbox-app' },
            spec: {
              replicas: 3,
              template: {
                spec: {
                  containers: [{ name: 'web', image: 'nginx:latest', ports: [{ containerPort: 80 }] }],
                },
              },
            },
          },
          null,
          2
        )
      );
    } else {
      setInput(
        `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: webtoolbox-app\nspec:\n  replicas: 3`
      );
    }
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            setDirection(direction === 'json2yaml' ? 'yaml2json' : 'json2yaml');
            setInput('');
            setOutput('');
            setError(null);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>{direction === 'json2yaml' ? 'Mode: JSON → YAML' : 'Mode: YAML → JSON'}</span>
        </button>

        <button
          onClick={handleConvert}
          disabled={!input}
          className="px-5 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-all shadow-sm"
        >
          Convert Now
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {direction === 'json2yaml' ? 'Input JSON' : 'Input YAML'}
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
            placeholder={direction === 'json2yaml' ? 'Paste JSON here...' : 'Paste YAML here...'}
            rows={12}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {direction === 'json2yaml' ? 'YAML Output' : 'JSON Output'}
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Converted output..."
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
          <span>{copied ? 'Copied!' : 'Copy Converted Code'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={!output}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download File</span>
        </button>
      </div>
    </div>
  );
}
