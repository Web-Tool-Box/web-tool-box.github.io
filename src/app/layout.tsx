import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/common/CookieConsent';
import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 60+ Free Online In-Browser Tools (No Signup)`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'online tools',
    'free online tools no signup',
    'json formatter',
    'pdf merge online',
    'image compressor',
    'developer tools',
    'word counter',
    'qr code generator',
    'base64 encode decode',
    'calculator online',
  ],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} - Free In-Browser Tools Suite`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-default.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - 100% In-Browser Tools`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Free In-Browser Tools Suite`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-default.png`],
    creator: '@webtoolbox',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: siteConfig.analytics.gscVerification || 'google-site-verification-placeholder',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Anti-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && supportDarkMode)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />

        {/* Google Consent Mode v2 Default Setup */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />

        {/* Optional GA4 placeholder */}
        {siteConfig.analytics.gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
