import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'WebToolBox Disclaimer regarding financial calculators, mathematical tools, health indicators, and legal information.',
  alternates: {
    canonical: `${siteConfig.url}/disclaimer/`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Disclaimer
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 2026
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Financial Calculations Disclaimer</h2>
            <p>
              Calculators such as the Loan EMI Calculator, SIP Calculator, Compound Interest Calculator, and GST Calculator are intended solely for general illustrative and educational purposes. Actual lending terms, mutual fund returns, and tax liabilities depend on financial institutions and applicable legal codes. Always consult a licensed certified financial advisor before executing financial commitments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Health & Medical Information Disclaimer</h2>
            <p>
              The Body Mass Index (BMI) Calculator is a general screening indicator and does not constitute medical advice or clinical diagnosis. Consult a qualified healthcare professional regarding individualized diet, fitness, and health management.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
