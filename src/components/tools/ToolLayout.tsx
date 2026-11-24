'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  Share2,
  Check,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { ToolDefinition } from '@/types/tool';
import { CATEGORIES, siteConfig } from '@/config/site';
import { TOOLS } from '@/config/tools.config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PrivacyBadge } from '@/components/common/PrivacyBadge';
import { isFavorite, toggleFavorite, addRecentTool } from '@/lib/storage';

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const [favorite, setFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const category = CATEGORIES[tool.category];

  useEffect(() => {
    setFavorite(isFavorite(tool.slug));
    addRecentTool(tool.slug);
  }, [tool.slug]);

  const handleFavoriteToggle = () => {
    const newState = toggleFavorite(tool.slug);
    setFavorite(newState);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Find related tools
  const relatedToolsList = (tool.relatedTools || [])
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as ToolDefinition[];

  // Fallback to same category if not enough related tools
  const fallbackRelated =
    relatedToolsList.length < 4
      ? TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(
          0,
          4 - relatedToolsList.length
        )
      : [];
  const finalRelated = [...relatedToolsList, ...fallbackRelated].slice(0, 6);

  // Schema.org WebApplication & FAQPage JSON-LD
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    headline: tool.title,
    description: tool.description,
    url: `${siteConfig.url}/tools/${tool.slug}/`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All (In-Browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      '100% In-Browser execution',
      'No files or text sent to servers',
      'Instant processing',
      'No registration or signup required',
      'Free forever',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen py-8 lg:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Bar: Breadcrumbs & Quick Category Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: category.name, href: `/category/${category.slug}/` },
                { label: tool.title },
              ]}
            />
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleFavoriteToggle}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  favorite
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
                title={favorite ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Star className={`w-3.5 h-3.5 ${favorite ? 'fill-amber-500' : ''}`} />
                <span>{favorite ? 'Saved' : 'Favorite'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all"
                title="Copy tool link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* 1. Above-the-fold Tool Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{category.name} Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {tool.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {tool.description}
            </p>

            <PrivacyBadge variant="banner" className="mt-2" />
          </div>

          {/* 2. Interactive Tool UI (Above the fold) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800/80 transition-colors">
            {children}
          </div>

          {/* 3. Long-form Helpful SEO Content (400 - 800 words) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* What It Is */}
              <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="w-2 h-6 bg-indigo-600 rounded-full" />
                  What is the {tool.title}?
                </h2>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-3">
                  <p>{tool.content.whatItIs}</p>
                  <p>
                    Unlike many traditional web tools that transfer your sensitive inputs to third-party remote servers,
                    our <strong>{tool.title}</strong> is executed entirely inside your modern web browser using client-side JavaScript APIs and WebAssembly.
                    This guarantees maximum processing speed, works reliably even with large files, and offers unconditional privacy.
                  </p>
                </div>
              </section>

              {/* How To Use (Steps) */}
              <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-5">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="w-2 h-6 bg-indigo-600 rounded-full" />
                  How to Use {tool.title} Step-by-Step
                </h2>
                <ol className="space-y-4">
                  {tool.content.howToUse.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </span>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Use Cases & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    Key Use Cases
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {tool.content.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Pro Tips & Best Practices
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {tool.content.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5-Question FAQ Section */}
              <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                    <HelpCircle className="w-6 h-6 text-indigo-500" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Everything you need to know about using this {tool.primaryKeyword} tool.
                  </p>
                </div>

                <div className="space-y-3">
                  {tool.faq.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full px-5 py-4 text-left font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850/50"
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Sidebar with Sticky Ad & Info */}
            <div className="space-y-6">
              {/* Category Quick Card */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Category
                </span>
                <Link
                  href={`/category/${category.slug}/`}
                  className="flex items-center justify-between group"
                >
                  <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {category.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Privacy Summary */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy First Guarantee</span>
                </div>
                <p className="text-xs text-emerald-700/90 dark:text-emerald-300/80 leading-relaxed">
                  Your inputs, files, and generated files are stored in temporary browser memory and never uploaded to remote servers.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Related Tools Section (Strong Internal Linking) */}
          <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Related Online Tools
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Explore other high-performance, browser-based utilities.
                </p>
              </div>
              <Link
                href={`/category/${category.slug}/`}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View all in {category.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {finalRelated.map((relTool) => (
                <Link
                  key={relTool.slug}
                  href={`/tools/${relTool.slug}/`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all group bg-slate-50/50 dark:bg-slate-900/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {relTool.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1 line-clamp-1">
                    {relTool.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {relTool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
