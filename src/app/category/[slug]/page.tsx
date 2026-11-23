import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, siteConfig } from '@/config/site';
import { getToolsByCategory } from '@/config/tools.config';
import { ToolCategory } from '@/types/tool';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORIES[params.slug as ToolCategory];
  if (!cat) return { title: 'Category Not Found' };

  const url = `${siteConfig.url}/category/${cat.slug}/`;

  return {
    title: `${cat.name} Online Tools - 100% Free & In-Browser`,
    description: `Explore our collection of free ${cat.name.toLowerCase()} tools. ${cat.description} All tools run client-side without registration.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${cat.name} Tools - WebToolBox`,
      description: cat.description,
      url,
      type: 'website',
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${cat.name} Tools`,
        },
      ],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORIES[params.slug as ToolCategory];

  if (!cat) {
    notFound();
  }

  const tools = getToolsByCategory(params.slug as ToolCategory);

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Categories', href: '/#categories' }, { label: cat.name }]} />

        {/* Category Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {cat.name} Tools
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {cat.description} Every tool is executed 100% client-side inside your browser with complete privacy.
          </p>
        </div>

        {/* Ad Slot */}
        <AdSlot variant="in-article" />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {tool.category}
                  </span>
                  {tool.isPopular && (
                    <span className="text-[10px] font-bold text-amber-500">Popular</span>
                  )}
                </div>
                <h2 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
