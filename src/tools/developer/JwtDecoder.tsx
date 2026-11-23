'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, AlertCircle, ShieldCheck, Clock } from 'lucide-react';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;

    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must consist of exactly 3 parts separated by dots (header.payload.signature).');
      }

      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return JSON.parse(decodeURIComponent(escape(atob(base64))));
      };

      const header = decodeBase64Url(parts[0]);
      const payload = decodeBase64Url(parts[1]);
      const signature = parts[2];

      // Expiration check
      let isExpired = false;
      let expDate: Date | null = null;
      let iatDate: Date | null = null;

      if (payload.exp) {
        expDate = new Date(payload.exp * 1000);
        isExpired = Date.now() > expDate.getTime();
      }

      if (payload.iat) {
        iatDate = new Date(payload.iat * 1000);
      }

      return {
        header,
        payload,
        signature,
        isExpired,
        expDate,
        iatDate,
        error: null,
      };
    } catch (err: any) {
      return {
        header: null,
        payload: null,
        signature: null,
        isExpired: false,
        expDate: null,
        iatDate: null,
        error: err.message || 'Invalid JWT token string',
      };
    }
  }, [token]);

  const handleCopyPayload = () => {
    if (decoded?.payload) {
      navigator.clipboard.writeText(JSON.stringify(decoded.payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLoadSample = () => {
    setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRG9lIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhbGV4QGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.' +
      'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
  };

  return (
    <div className="space-y-6">
      {/* Token Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Encoded JWT Token
          </label>
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            Load Sample JWT
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here (eyJhbGciOi...)"
          rows={4}
          className="w-full p-4 font-mono text-xs rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-y break-all"
        />
      </div>

      {decoded?.error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Error: {decoded.error}</span>
        </div>
      )}

      {/* Decoded Sections */}
      {decoded && !decoded.error && (
        <div className="space-y-4">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Algorithm: {decoded.header?.alg || 'None'}
              </span>
            </div>

            {decoded.expDate && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    decoded.isExpired
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                  }`}
                >
                  {decoded.isExpired ? 'Token Expired' : 'Token Active'}
                </span>
                <span className="text-slate-500">
                  ({decoded.expDate.toLocaleString()})
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Header: Algorithm & Token Type
              </label>
              <pre className="p-4 font-mono text-xs rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                  Payload: Claims & Identity
                </label>
                <button
                  onClick={handleCopyPayload}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Payload</span>
                </button>
              </div>
              <pre className="p-4 font-mono text-xs rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
