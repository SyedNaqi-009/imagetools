import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical & Legal Disclaimer | ImageTools Studio',
  description:
    'Legal disclaimers, trademark attributions, and accuracy disclosures for ImageTools Studio.',
  alternates: {
    canonical: 'https://imagetools.dev/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Studio Home', href: '/' }, { label: 'Disclaimer' }]} />

      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Notice &amp; Disclosures</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Legal &amp; Technical Disclaimer
        </h1>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Effective: October 2026
        </p>
      </header>

      <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            1. General Informational Utility
          </h2>
          <p>
            The tools, educational guides, and technical benchmarks provided on ImageTools Studio are intended solely for graphic workflow enhancement and educational purposes. We advise users to retain original master copies of important assets before executing lossy compression or resizing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            2. Trademarks &amp; Attribution
          </h2>
          <p>
            All cited formats, standards, and brand names (including WebP, AVIF, Apple HEIC, PDF, Instagram, Facebook, and YouTube) remain the registered trademarks of their respective owners. Mention of these formats does not indicate affiliation or endorsement.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            3. Questions
          </h2>
          <p>
            Questions regarding our technical disclosures can be sent to{' '}
            <a href="mailto:contact@imagetools.dev" className="text-sky-500 font-mono hover:underline">
              contact@imagetools.dev
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
