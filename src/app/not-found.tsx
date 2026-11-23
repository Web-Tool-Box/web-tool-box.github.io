import React from 'react';
import Link from 'next/link';
import { Home, Search, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            404
          </span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Page or Tool Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The tool or page you are looking for doesn&apos;t exist or has moved. Explore our catalog of 60+ free tools!
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/20"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
