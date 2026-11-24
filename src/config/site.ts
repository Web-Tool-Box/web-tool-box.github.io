import { CategoryInfo, ToolCategory } from '@/types/tool';

export const siteConfig = {
  name: 'WebToolBox',
  shortName: 'ToolBox',
  description: '100% Free, Private & In-Browser Online Tools for Developers, Writers, Designers & Creators. No signup required.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://web-tool-box.github.io',
  ogImage: '/og-default.png',
  creator: 'WebToolBox Team',
  links: {
    github: 'https://github.com/web-tool-box/web-tool-box.github.io',
  },
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'pub-0000000000000000',
    slots: {
      inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '1234567890',
      sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '1234567891',
      stickyMobile: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY_MOBILE || '1234567892',
    },
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' || true,
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TWGZDH52',
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
};

export const CATEGORIES: Record<ToolCategory, CategoryInfo> = {
  text: {
    slug: 'text',
    name: 'Text & Content',
    description: 'Transform, format, count, and analyze text strings and markdown with zero server latency.',
    icon: 'FileText',
    gradient: 'from-blue-500 to-indigo-600',
  },
  developer: {
    slug: 'developer',
    name: 'Developer & Code',
    description: 'Format, validate, encode, hash, and debug data formats, tokens, and CSS properties instantly.',
    icon: 'Code2',
    gradient: 'from-indigo-500 to-purple-600',
  },
  image: {
    slug: 'image',
    name: 'Image & Canvas',
    description: 'Compress, crop, resize, convert, and generate visual assets directly in your web browser.',
    icon: 'Image',
    gradient: 'from-purple-500 to-pink-600',
  },
  pdf: {
    slug: 'pdf',
    name: 'PDF Documents',
    description: 'Merge, split, convert, and manipulate confidential PDF files with 100% device privacy.',
    icon: 'FileCheck',
    gradient: 'from-rose-500 to-red-600',
  },
  calculators: {
    slug: 'calculators',
    name: 'Calculators & Finance',
    description: 'Accurate calculations for loans, investments, taxes, health, dates, and measurement units.',
    icon: 'Calculator',
    gradient: 'from-amber-500 to-orange-600',
  },
  generators: {
    slug: 'generators',
    name: 'Generators & Utilities',
    description: 'Secure passwords, randomized picks, QR codes, meta tags, and robots.txt configuration files.',
    icon: 'Sparkles',
    gradient: 'from-emerald-500 to-teal-600',
  },
  misc: {
    slug: 'misc',
    name: 'Fun & Lifestyle',
    description: 'Typing speed challenges, Roman numeral translators, number spell-outs, and emojis.',
    icon: 'Gamepad2',
    gradient: 'from-cyan-500 to-blue-600',
  },
};
