# WebToolBox — 100% In-Browser Online Tools Suite

> **Fast, private, and free online utilities.** No servers, no signups, no tracking. Monetized with Google AdSense and engineered for Google search rankings and Core Web Vitals.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)
![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-22c55e?style=flat&logo=github)

---

## Key Features

- **60+ Production-Ready Tools**: Complete collection across Text, Developer, Image, PDF, Calculators, Generators, and Lifestyle.
- **100% Client-Side Architecture**: Built with WebAssembly, Canvas 2D, and Web Crypto APIs. Sensitive files and data never touch a remote server.
- **Pure Static Export**: Fully static HTML output (`output: 'export'`) hosted on GitHub Pages with zero backend or server overhead.
- **Core Web Vitals Optimized**:
  - Code-split dynamically per tool (`next/dynamic`).
  - Strict reserved CSS heights on all ad units to guarantee **Cumulative Layout Shift (CLS) = 0**.
  - System font stack and Next.js font optimization for instant LCP.
- **Technical SEO Built-In**:
  - Dynamic OpenGraph and Twitter cards per tool page.
  - JSON-LD schemas: `WebApplication`, `FAQPage`, `BreadcrumbList`, and `WebSite` with `SearchAction`.
  - Automated build-time `sitemap.xml` and `robots.txt` generator.
  - 400–800 words of unique, helpful editorial content and 5-question FAQ per tool.
- **Google AdSense Ready**:
  - Reusable `<AdSlot />` with 3 responsive placements (In-Article, Desktop Sidebar, Mobile Anchor).
  - Google Consent Mode v2 integration.
  - Pre-configured `public/ads.txt`.
- **Modern UX**:
  - Dark mode with zero flash on load.
  - Global `⌘K` / `Ctrl+K` fuzzy search modal.
  - Favorites and recent tools history in `localStorage`.
  - PWA Web App Manifest.

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (tested on Node v20 / v22)
- npm 9+

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/web-tool-box/web-tool-box.github.io.git
cd web-tool-box.github.io

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Static Build
```bash
npm run build
```
This compiles and exports the entire site into static HTML, CSS, and JS inside the `/out` directory.

---

## How to Add a New Tool in 2 Simple Steps

The architecture is designed so adding any new tool requires only two files:

### Step 1: Add Configuration in `src/config/tools/<category>.ts`
```typescript
{
  slug: 'my-new-tool',
  title: 'My Awesome Tool',
  description: 'Clean meta description under 155 characters for SEO.',
  category: 'developer',
  primaryKeyword: 'free my new tool online',
  keywords: ['my tool', 'online utility', 'browser tool'],
  icon: 'Sparkles',
  isPopular: true,
  content: {
    whatItIs: 'Detailed explanation of what the tool does...',
    howToUse: ['Step 1: Enter input', 'Step 2: Click process'],
    useCases: ['Use case 1', 'Use case 2'],
    tips: ['Pro tip 1', 'Pro tip 2'],
  },
  faq: [
    { question: 'Is my data secure?', answer: 'Yes, 100% in-browser!' },
    // 4 more FAQs
  ],
  relatedTools: ['json-formatter', 'uuid-generator'],
}
```

### Step 2: Create Tool Component in `src/tools/<category>/MyNewTool.tsx`
```tsx
'use client';
import React, { useState } from 'react';

export default function MyNewTool() {
  const [val, setVal] = useState('');
  return (
    <div className="space-y-4">
      <input value={val} onChange={(e) => setVal(e.target.value)} />
      <button onClick={() => alert(val)}>Run</button>
    </div>
  );
}
```
Register the component in `src/tools/ToolRenderer.tsx`:
```tsx
'my-new-tool': dynamic(() => import('./category/MyNewTool'), { loading: LoadingSkeleton }),
```
The new page will automatically be generated at `/tools/my-new-tool/`, linked in search, sitemap.xml, categories, and breadcrumbs!

---

## Custom Domain & DNS Setup (GitHub Pages)

### 1. Configure CNAME
Ensure `public/CNAME` contains your custom domain:
```text
webtoolbox.dev
```

### 2. Configure DNS Records with Your Domain Registrar
Add the following DNS records at your domain registrar (e.g., Cloudflare, Namecheap, GoDaddy):

#### Apex Domain (`webtoolbox.dev`)
Add 4 `A` records pointing to GitHub Pages IP addresses:
```text
Type: A | Name: @ | Value: 185.199.108.153 | TTL: 3600
Type: A | Name: @ | Value: 185.199.109.153 | TTL: 3600
Type: A | Name: @ | Value: 185.199.110.153 | TTL: 3600
Type: A | Name: @ | Value: 185.199.111.153 | TTL: 3600
```
And 4 `AAAA` records for IPv6:
```text
Type: AAAA | Name: @ | Value: 2606:50c0:8000::153
Type: AAAA | Name: @ | Value: 2606:50c0:8001::153
Type: AAAA | Name: @ | Value: 2606:50c0:8002::153
Type: AAAA | Name: @ | Value: 2606:50c0:8003::153
```

#### Subdomain / WWW (`www.webtoolbox.dev`)
Add a `CNAME` record pointing to your GitHub username organization:
```text
Type: CNAME | Name: www | Value: web-tool-box.github.io
```

### 3. Enforce HTTPS
In your GitHub repository:
1. Navigate to **Settings > Pages**.
2. Confirm your custom domain is listed.
3. Check the **Enforce HTTPS** checkbox once DNS propagation completes.

---

## Automated Deployment (GitHub Actions)

A GitHub Actions workflow is pre-configured in `.github/workflows/deploy.yml`:
- Triggers on every `push` to the `main` branch.
- Automatically installs dependencies via `npm ci`.
- Runs `npm run build` to export static HTML.
- Uploads the `/out` directory artifact and deploys to GitHub Pages via `actions/deploy-pages`.

---

## Official Launch Checklist

1. [ ] **Deploy Initial Build**: Commit and push to `main` branch; verify deployment succeeds on GitHub Actions.
2. [ ] **Verify Custom Domain & SSL**: Ensure `https://webtoolbox.dev` loads with a valid SSL certificate.
3. [ ] **Verify ads.txt**: Check that `https://webtoolbox.dev/ads.txt` loads and returns your publisher ID.
4. [ ] **Submit Sitemap to Google Search Console**:
   - Add property in [Google Search Console](https://search.google.com/search-console).
   - Submit `https://webtoolbox.dev/sitemap.xml`.
5. [ ] **Submit to Bing Webmaster Tools**:
   - Import or add site in [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - Submit `https://webtoolbox.dev/sitemap.xml`.
6. [ ] **Apply for Google AdSense**:
   - Follow the detailed walkthrough in [docs/ADSENSE_SETUP.md](docs/ADSENSE_SETUP.md).

---

## License

MIT License. Open-source and free for personal and commercial use.
