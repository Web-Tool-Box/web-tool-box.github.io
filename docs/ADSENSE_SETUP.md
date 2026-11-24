# Google AdSense Monetization & Approval Guide

This comprehensive guide details the configuration, compliance, and launch steps to get **WebToolBox** approved for Google AdSense and maximize advertising revenue while adhering strictly to Google Publisher Policies.

---

## 1. Pre-Application Compliance Checklist

Before submitting your site (`https://web-tool-box.github.io`) to Google AdSense:

- [x] **Substantial Original Content**: Every tool page includes 400–800 words of unique, helpful content (How it works, step-by-step instructions, use cases, pro tips, and a 5-question FAQ).
- [x] **Essential Legal Pages**:
  - `Privacy Policy` (/privacy/) with explicit Google AdSense, DoubleClick DART cookie, and cookie consent disclosures.
  - `Terms of Service` (/terms/).
  - `Disclaimer` (/disclaimer/) for financial and mathematical calculators.
  - `Contact Link`: Direct external link to author/owner profile (https://khushwinder-dev.github.io).
- [x] **User Value & Privacy**: All 60 tools execute 100% in-browser client-side, offering genuine utility with zero login walls or deceptive flows.
- [x] **Clear Navigation**: Logical category hierarchy, global search (⌘K), and footer links to all sections.
- [x] **ads.txt Configured**: `public/ads.txt` is served at the domain root with the Direct publisher declaration.
- [x] **No Placeholder / Under Construction Pages**: All 60 tool routes are fully rendered and operational.

---

## 2. Environment Variables Setup

When you configure your Google AdSense Publisher ID (`ca-pub-9193773194117466`) and ad slot IDs, configure them in your environment or GitHub Actions repository secrets:

```env
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-9193773194117466
NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_STICKY_MOBILE=1234567892
NEXT_PUBLIC_ADSENSE_ENABLED=true

# Website Base URL
NEXT_PUBLIC_SITE_URL=https://web-tool-box.github.io
```

---

## 3. ads.txt Verification

Google requires an `ads.txt` file placed at the root of your site:

File location: `https://web-tool-box.github.io/ads.txt`

Active `public/ads.txt`:

```text
google.com, pub-9193773194117466, DIRECT, f08c47fec0942fa0
```

> **Note**: Verify that visiting `https://yourdomain.com/ads.txt` in your browser returns plain text with HTTP status 200.

---

## 4. Google Consent Mode v2 & EEA/UK CMP

1. **Consent Mode v2 Integration**:
   - WebToolBox initializes `gtag('consent', 'default')` with `ad_storage`, `ad_user_data`, and `ad_personalization` set to `denied`.
   - The `<CookieConsent />` component updates consent to `granted` only when the user explicitly clicks "Accept All".
   - The AdSense script `adsbygoogle.js` is loaded **only after** consent is granted.

2. **Google-Certified CMP for EEA / UK / CH**:
   - Google requires publishers serving ads to EEA/UK/Swiss users to use a **Google-certified Consent Management Platform (CMP)** that integrates with the IAB TCF v2.2.
   - You can enable **Google Funding Choices** directly inside your AdSense dashboard under **Privacy & messaging > European regulations** to automatically show a certified CMP banner.

---

## 5. Ad Unit Layout & Core Web Vitals (CLS Prevention)

To prevent **Cumulative Layout Shift (CLS)** penalties and accidental click policy violations:

- **Strict Reserved Heights**: Every `<AdSlot />` wrapper has fixed CSS min-height (`min-h-[280px]` for in-article, `min-h-[600px]` for sidebar, `min-h-[60px]` for sticky mobile).
- **Above-The-Fold Rule**: Ad slots are placed **below the interactive tool UI** and within the long-form content. The primary tool UI is always visible immediately upon page load.
- **Accidental Click Protection**: Ads are separated from clickable buttons by adequate padding and marked with an uppercase "Advertisement" disclaimer tag.
- **Unit Limit**: Maximum of 3 ad units rendered per tool page.

---

## 6. Step-by-Step AdSense Application Flow

1. Deploy the website to your custom domain on GitHub Pages.
2. Sign in to [Google AdSense](https://www.google.com/adsense/).
3. Add your custom domain under **Sites > Add site**.
4. Set up your `public/ads.txt` and verify domain ownership.
5. In your AdSense dashboard, click **Request Review**. Review typically takes between 48 hours and 14 days.
6. Once approved, generate ad units in AdSense, populate the slot IDs in your environment secrets, and trigger a build.
