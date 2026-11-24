'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  Layers,
  Code2,
  FileText,
  Image as ImageIcon,
  FileCheck,
  Calculator,
  Compass,
  Gamepad2,
} from 'lucide-react';
import { siteConfig, CATEGORIES } from '@/config/site';
import { TOOLS, getPopularTools } from '@/config/tools.config';
import { ToolCategory, ToolDefinition } from '@/types/tool';
import { SearchModal } from '@/components/common/SearchModal';
import { getFavorites, getRecentTools } from '@/lib/storage';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const popularTools = useMemo(() => getPopularTools(), []);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchCat = selectedCategory === 'all' || tool.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org WebSite JSON-LD
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />

      <div className="min-h-screen py-10 sm:py-16 space-y-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% In-Browser Privacy • Zero Server Uploads</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Fast, Private & Free <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Online Tools Suite
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Over 60 high-performance web utilities for developers, writers, designers, and students.
            No signup, no tracking, and no paywalls.
          </p>

          {/* Big Search Input Trigger */}
          <div className="max-w-xl mx-auto pt-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-indigo-500 transition-all text-slate-400 group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Search 60+ free tools (e.g. JSON, QR, PDF, EMI)...</span>
              </div>
              <kbd className="hidden sm:inline-flex text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-center text-xs">
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-2xl font-black text-slate-900 dark:text-white">60+</span>
              <span className="text-slate-500 font-medium">Free Tools</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-2xl font-black text-slate-900 dark:text-white">100%</span>
              <span className="text-slate-500 font-medium">Client-Side Private</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-2xl font-black text-slate-900 dark:text-white">0ms</span>
              <span className="text-slate-500 font-medium">Server Latency</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-2xl font-black text-slate-900 dark:text-white">Free</span>
              <span className="text-slate-500 font-medium">Forever • No Signup</span>
            </div>
          </div>
        </section>

        {/* Popular Tools Carousel / Grid */}
        <section id="popular" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Most Popular Online Tools
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Trusted daily by thousands of engineers, marketers, and creators worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.slice(0, 8).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tool.category}
                    </span>
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories & Full Directory Section */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Browse All 60+ Free Online Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Filter by category or search instantly across the entire catalog.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              All Tools ({TOOLS.length})
            </button>
            {Object.values(CATEGORIES).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tool.category}
                    </span>
                    {tool.isPopular && (
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <span>Use Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Search Modal */}
        <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      </div>
    </>
  );
}
