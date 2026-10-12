import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Use | ImageTools Studio',
  description:
    'Terms of service and usage conditions governing ImageTools Studio client-side image processing workbench.',
  alternates: {
    canonical: 'https://imagetools.dev/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Studio Home', href: '/' }, { label: 'Terms & Conditions' }]} />

      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Last revised: October 2026
        </p>
      </header>

      <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or operating the tools provided at ImageTools Studio (imagetools.dev), you confirm your agreement to these Terms of Service. If you do not consent to these terms, you should immediately cease use of our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            2. Intellectual Property &amp; User Ownership
          </h2>
          <p>
            You retain complete ownership and copyright of all image assets and digital graphics processed through our website. Because all operations are computed locally in your web browser, ImageTools Studio acquires zero rights or licenses to your creative files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            3. Disclaimer of Warranties
          </h2>
          <p>
            ImageTools Studio is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While our client-side algorithms are thoroughly tested against standard image specifications, we do not guarantee uninterrupted availability or zero algorithmic discrepancies across all device hardware profiles.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            4. Inquiries
          </h2>
          <p>
            Direct any legal or service inquiries to{' '}
            <a href="mailto:legal@imagetools.dev" className="text-sky-500 font-mono hover:underline">
              legal@imagetools.dev
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
