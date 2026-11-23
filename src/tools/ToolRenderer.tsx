'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Loading fallback
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4 py-8">
    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
    <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3"></div>
  </div>
);

// Dynamic imports for all 60 tools (Code-splitting per tool)
const TOOL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // Text
  'word-counter': dynamic(() => import('./text/WordCounter'), { loading: LoadingSkeleton }),
  'case-converter': dynamic(() => import('./text/CaseConverter'), { loading: LoadingSkeleton }),
  'text-diff-checker': dynamic(() => import('./text/TextDiffChecker'), { loading: LoadingSkeleton }),
  'lorem-ipsum-generator': dynamic(() => import('./text/LoremIpsumGenerator'), { loading: LoadingSkeleton }),
  'remove-duplicate-lines': dynamic(() => import('./text/RemoveDuplicateLines'), { loading: LoadingSkeleton }),
  'text-sorter': dynamic(() => import('./text/TextSorter'), { loading: LoadingSkeleton }),
  'slug-generator': dynamic(() => import('./text/SlugGenerator'), { loading: LoadingSkeleton }),
  'find-and-replace': dynamic(() => import('./text/FindAndReplace'), { loading: LoadingSkeleton }),
  'markdown-previewer': dynamic(() => import('./text/MarkdownPreviewer'), { loading: LoadingSkeleton }),
  'text-to-speech': dynamic(() => import('./text/TextToSpeech'), { loading: LoadingSkeleton }),

  // Developer
  'json-formatter': dynamic(() => import('./developer/JsonFormatter'), { loading: LoadingSkeleton }),
  'json-to-csv': dynamic(() => import('./developer/JsonToCsv'), { loading: LoadingSkeleton }),
  'json-to-yaml': dynamic(() => import('./developer/JsonToYaml'), { loading: LoadingSkeleton }),
  'base64-encoder-decoder': dynamic(() => import('./developer/Base64EncoderDecoder'), { loading: LoadingSkeleton }),
  'url-encoder-decoder': dynamic(() => import('./developer/UrlEncoderDecoder'), { loading: LoadingSkeleton }),
  'html-css-js-minifier': dynamic(() => import('./developer/HtmlCssJsMinifier'), { loading: LoadingSkeleton }),
  'regex-tester': dynamic(() => import('./developer/RegexTester'), { loading: LoadingSkeleton }),
  'jwt-decoder': dynamic(() => import('./developer/JwtDecoder'), { loading: LoadingSkeleton }),
  'uuid-generator': dynamic(() => import('./developer/UuidGenerator'), { loading: LoadingSkeleton }),
  'hash-generator': dynamic(() => import('./developer/HashGenerator'), { loading: LoadingSkeleton }),
  'timestamp-converter': dynamic(() => import('./developer/TimestampConverter'), { loading: LoadingSkeleton }),
  'cron-expression-explainer': dynamic(() => import('./developer/CronExplainer'), { loading: LoadingSkeleton }),
  'color-converter': dynamic(() => import('./developer/ColorConverter'), { loading: LoadingSkeleton }),
  'css-gradient-generator': dynamic(() => import('./developer/CssGradientGenerator'), { loading: LoadingSkeleton }),
  'box-shadow-generator': dynamic(() => import('./developer/BoxShadowGenerator'), { loading: LoadingSkeleton }),

  // Image
  'image-compressor': dynamic(() => import('./image/ImageCompressor'), { loading: LoadingSkeleton }),
  'image-resizer': dynamic(() => import('./image/ImageResizer'), { loading: LoadingSkeleton }),
  'image-cropper': dynamic(() => import('./image/ImageCropper'), { loading: LoadingSkeleton }),
  'image-format-converter': dynamic(() => import('./image/ImageFormatConverter'), { loading: LoadingSkeleton }),
  'image-to-base64': dynamic(() => import('./image/ImageToBase64'), { loading: LoadingSkeleton }),
  'color-picker-image': dynamic(() => import('./image/ColorPickerImage'), { loading: LoadingSkeleton }),
  'favicon-generator': dynamic(() => import('./image/FaviconGenerator'), { loading: LoadingSkeleton }),
  'qr-code-generator': dynamic(() => import('./image/QrCodeGenerator'), { loading: LoadingSkeleton }),

  // PDF
  'pdf-merge': dynamic(() => import('./pdf/PdfMerge'), { loading: LoadingSkeleton }),
  'pdf-split': dynamic(() => import('./pdf/PdfSplit'), { loading: LoadingSkeleton }),
  'images-to-pdf': dynamic(() => import('./pdf/ImagesToPdf'), { loading: LoadingSkeleton }),
  'pdf-compress': dynamic(() => import('./pdf/PdfCompress'), { loading: LoadingSkeleton }),

  // Calculators
  'emi-calculator': dynamic(() => import('./calculators/EmiCalculator'), { loading: LoadingSkeleton }),
  'sip-calculator': dynamic(() => import('./calculators/SipCalculator'), { loading: LoadingSkeleton }),
  'compound-interest-calculator': dynamic(() => import('./calculators/CompoundInterestCalculator'), { loading: LoadingSkeleton }),
  'gst-calculator': dynamic(() => import('./calculators/GstCalculator'), { loading: LoadingSkeleton }),
  'percentage-calculator': dynamic(() => import('./calculators/PercentageCalculator'), { loading: LoadingSkeleton }),
  'age-calculator': dynamic(() => import('./calculators/AgeCalculator'), { loading: LoadingSkeleton }),
  'bmi-calculator': dynamic(() => import('./calculators/BmiCalculator'), { loading: LoadingSkeleton }),
  'date-difference-calculator': dynamic(() => import('./calculators/DateDifferenceCalculator'), { loading: LoadingSkeleton }),
  'unit-converter': dynamic(() => import('./calculators/UnitConverter'), { loading: LoadingSkeleton }),
  'currency-formatter': dynamic(() => import('./calculators/CurrencyFormatter'), { loading: LoadingSkeleton }),
  'tip-calculator': dynamic(() => import('./calculators/TipCalculator'), { loading: LoadingSkeleton }),

  // Generators / Utilities
  'password-generator': dynamic(() => import('./generators/PasswordGenerator'), { loading: LoadingSkeleton }),
  'random-number-picker': dynamic(() => import('./generators/RandomNumberPicker'), { loading: LoadingSkeleton }),
  'stopwatch-timer': dynamic(() => import('./generators/StopwatchTimer'), { loading: LoadingSkeleton }),
  'qr-code-scanner': dynamic(() => import('./generators/QrCodeScanner'), { loading: LoadingSkeleton }),
  'meta-tag-generator': dynamic(() => import('./generators/MetaTagGenerator'), { loading: LoadingSkeleton }),
  'open-graph-preview': dynamic(() => import('./generators/OpenGraphPreview'), { loading: LoadingSkeleton }),
  'robots-txt-generator': dynamic(() => import('./generators/RobotsTxtGenerator'), { loading: LoadingSkeleton }),
  'utm-link-builder': dynamic(() => import('./generators/UtmLinkBuilder'), { loading: LoadingSkeleton }),

  // Misc / Fun
  'roman-numeral-converter': dynamic(() => import('./misc/RomanNumeralConverter'), { loading: LoadingSkeleton }),
  'number-to-words': dynamic(() => import('./misc/NumberToWords'), { loading: LoadingSkeleton }),
  'emoji-picker': dynamic(() => import('./misc/EmojiPicker'), { loading: LoadingSkeleton }),
  'typing-speed-test': dynamic(() => import('./misc/TypingSpeedTest'), { loading: LoadingSkeleton }),
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = TOOL_COMPONENTS[slug];
  if (!Component) {
    return (
      <div className="p-8 text-center text-slate-500">
        Tool component for &quot;{slug}&quot; is loading or not found.
      </div>
    );
  }
  return <Component />;
}
