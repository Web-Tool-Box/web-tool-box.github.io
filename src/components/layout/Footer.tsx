import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Github } from 'lucide-react';
import { CATEGORIES, siteConfig } from '@/config/site';
import { Logo } from '@/components/common/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="WebToolBox Home">
              <Logo size="md" />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Your all-in-one suite of 60+ fast, modern, and 100% private online tools.
              Engineered with WebAssembly and client-side JavaScript so your confidential files and text never leave your machine.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero server logging • No signup required</span>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {Object.values(CATEGORIES).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}/`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Tools Column */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Top Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/json-formatter/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-merge/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Merge PDF Files
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/word-counter/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-code-generator/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/emi-calculator/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  EMI Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info Column */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <a
                  href="https://khushwinder-dev.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} WebToolBox. All rights reserved. Free & Open online utility suite.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built for speed & privacy
            </span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
