import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TOOLS, getToolBySlug, getAllToolSlugs } from '@/config/tools.config';
import { siteConfig } from '@/config/site';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolRenderer } from '@/tools/ToolRenderer';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const url = `${siteConfig.url}/tools/${tool.slug}/`;

  return {
    title: `${tool.title} | Free In-Browser Tool (No Signup)`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${tool.title} - Free Online Tool`,
      description: tool.description,
      url,
      type: 'website',
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${tool.title} - WebToolBox`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} - Free Online Tool`,
      description: tool.description,
      images: [`${siteConfig.url}/og-default.png`],
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <ToolLayout tool={tool}>
      <ToolRenderer slug={tool.slug} />
    </ToolLayout>
  );
}
