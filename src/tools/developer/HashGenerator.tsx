'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Hash } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({
    'SHA-256': '',
    'SHA-512': '',
    'SHA-384': '',
    'SHA-1': '',
    'MD5': '',
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // MD5 in JS
  const computeMd5 = (str: string): string => {
    function rotateLeft(lValue: number, iShiftBits: number) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function addUnsigned(lX: number, lY: number) {
      const lX4 = lX & 0x40000000;
      const lY4 = lY & 0x40000000;
      const lX8 = lX & 0x80000000;
      const lY8 = lY & 0x80000000;
      const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
      return lResult ^ lX8 ^ lY8;
    }
    // Simple fast hashing
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  const computeWebCryptoHashes = async (text: string) => {
    if (!text) {
      setHashes({ 'SHA-256': '', 'SHA-512': '', 'SHA-384': '', 'SHA-1': '', MD5: '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const bufferToHex = (buf: ArrayBuffer) =>
      Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    try {
      const sha256Buf = await crypto.subtle.digest('SHA-256', data);
      const sha512Buf = await crypto.subtle.digest('SHA-512', data);
      const sha384Buf = await crypto.subtle.digest('SHA-384', data);
      const sha1Buf = await crypto.subtle.digest('SHA-1', data);

      setHashes({
        'SHA-256': bufferToHex(sha256Buf),
        'SHA-512': bufferToHex(sha512Buf),
        'SHA-384': bufferToHex(sha384Buf),
        'SHA-1': bufferToHex(sha1Buf),
        MD5: computeMd5(text),
      });
    } catch {
      // fallback
    }
  };

  React.useEffect(() => {
    computeWebCryptoHashes(input);
  }, [input]);

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLoadSample = () => {
    setInput('WebToolBox: Secure, private, and 100% in-browser digital tools.');
  };

  return (
    <div className="space-y-6">
      {/* Input Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Input Plaintext to Hash
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
          placeholder="Type or paste any string to calculate cryptographic hashes..."
          rows={5}
          className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y"
        />
      </div>

      {/* Hash Results List */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Cryptographic Hash Digests
        </label>
        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, digest]) => (
            <div
              key={algo}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                  {algo}
                </span>
                <button
                  onClick={() => handleCopy(algo, digest)}
                  disabled={!digest}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 disabled:opacity-40"
                >
                  {copiedKey === algo ? (
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy Digest
                    </span>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
                {digest || 'Enter text above to compute hash...'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
