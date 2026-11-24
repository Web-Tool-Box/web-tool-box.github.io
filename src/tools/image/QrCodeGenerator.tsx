'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Sparkles, QrCode } from 'lucide-react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://web-tool-box.github.io');
  const [type, setType] = useState<'url' | 'text' | 'wifi'>('url');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiAuth, setWifiAuth] = useState('WPA');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPayload = () => {
    if (type === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiAuth};P:${wifiPass};;`;
    }
    return text;
  };

  const generateCode = async () => {
    const payload = getPayload();
    if (!payload.trim()) return;

    try {
      const url = await QRCode.toDataURL(payload, {
        width: 400,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setQrDataUrl(url);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    generateCode();
  }, [text, type, wifiSsid, wifiPass, wifiAuth, fgColor, bgColor]);

  const handleDownload = (format: 'png' | 'svg') => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode.${format}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {(['url', 'text', 'wifi'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              type === t
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {t === 'url' ? 'Website URL' : t === 'text' ? 'Plain Text' : 'WiFi Network'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Inputs */}
        <div className="md:col-span-2 space-y-4">
          {type === 'wifi' ? (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Network SSID (WiFi Name)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Home_WiFi_5G"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  WiFi Password
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="e.g. MySecretPassword123"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {type === 'url' ? 'Destination URL' : 'Plain Text Content'}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text to encode..."
                rows={4}
                className="w-full p-4 text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-none"
              />
            </div>
          )}

          {/* Color Customization */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                QR Color (Dark)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-xs">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Background (Light)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-xs">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Preview & Download */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-4 text-center">
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="Generated QR Code"
              className="w-48 h-48 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 bg-white p-2"
            />
          )}

          <div className="w-full space-y-2">
            <button
              onClick={() => handleDownload('png')}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download High-Res PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
