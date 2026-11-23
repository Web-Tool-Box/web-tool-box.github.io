'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Download, ArrowLeftRight, AlertCircle } from 'lucide-react';

export default function JsonToCsv() {
  const [direction, setDirection] = useState<'json2csv' | 'csv2json'>('json2csv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState<',' | ';' | '\t'>(',');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convertJsonToCsv = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      if (items.length === 0) return '';

      // Collect all keys
      const headers = Array.from(
        new Set(items.flatMap((item) => (typeof item === 'object' && item !== null ? Object.keys(item) : [])))
      );

      const csvLines = [
        headers.join(delimiter),
        ...items.map((row) =>
          headers
            .map((field) => {
              const val = row[field] !== undefined ? String(row[field]) : '';
              return `"${val.replace(/"/g, '""')}"`;
            })
            .join(delimiter)
        ),
      ];

      return csvLines.join('\n');
    } catch (err: any) {
      throw new Error('Invalid JSON format. Please provide an array of objects.');
    }
  };

  const convertCsvToJson = (csvStr: string) => {
    const lines = csvStr.trim().split('\n');
    if (lines.length < 2) throw new Error('CSV must contain a header row and at least one data row.');

    const headers = lines[0].split(delimiter).map((h) => h.replace(/^["']|["']$/g, '').trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(delimiter).map((v) => v.replace(/^["']|["']$/g, '').trim());
      const obj: Record<string, any> = {};
      headers.forEach((h, idx) => {
        obj[h] = values[idx] !== undefined ? values[idx] : null;
      });
      data.push(obj);
    }

    return JSON.stringify(data, null, 2);
  };

  const handleConvert = () => {
    if (!input.trim()) return;
    try {
      if (direction === 'json2csv') {
        const res = convertJsonToCsv(input);
        setOutput(res);
      } else {
        const res = convertCsvToJson(input);
        setOutput(res);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Conversion error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = direction === 'json2csv' ? 'csv' : 'json';
    const mime = direction === 'json2csv' ? 'text/csv' : 'application/json';
    const blob = new Blob([output], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    if (direction === 'json2csv') {
      setInput(
        JSON.stringify(
          [
            { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Engineer' },
            { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'Designer' },
            { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Manager' },
          ],
          null,
          2
        )
      );
    } else {
      setInput('id,name,email,role\n1,Alice Smith,alice@example.com,Engineer\n2,Bob Jones,bob@example.com,Designer');
    }
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setDirection(direction === 'json2csv' ? 'csv2json' : 'json2csv');
              setInput('');
              setOutput('');
              setError(null);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{direction === 'json2csv' ? 'Mode: JSON → CSV' : 'Mode: CSV → JSON'}</span>
          </button>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-semibold mr-1">Delimiter:</span>
            {[',', ';', '\t'].map((d) => (
              <button
                key={d}
                onClick={() => setDelimiter(d as any)}
                className={`px-2.5 py-1 rounded-md font-mono text-xs border ${
                  delimiter === d
                    ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-400 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                }`}
              >
                {d === '\t' ? 'Tab' : d}
              </button>
            ))}
          </div>
        </div>

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
              {direction === 'json2csv' ? 'Input JSON' : 'Input CSV'}
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
            placeholder={direction === 'json2csv' ? 'Paste JSON array here...' : 'Paste CSV data here...'}
            rows={12}
            className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {direction === 'json2csv' ? 'Converted CSV Output' : 'Converted JSON Output'}
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Converted result will appear here..."
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
          <span>{copied ? 'Copied Output!' : 'Copy Converted Data'}</span>
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
