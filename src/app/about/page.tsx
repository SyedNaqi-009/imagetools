import type { Metadata } from 'next';
import Link from 'next/link';
import { Cpu, ShieldCheck, Zap, HardDrive, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Engineering Manifesto & Architecture | ImageTools Studio',
  description:
    'Learn how ImageTools executes client-side WebAssembly image processing with zero cloud uploads, extreme memory isolation, and instant hardware acceleration.',
  alternates: {
    canonical: 'https://imagetools.dev/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Studio Home', href: '/' }, { label: 'Architecture & About' }]} />

      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
          <Terminal className="w-3.5 h-3.5" />
          <span>Core Engineering Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Client-Side Media Engineering
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Why we built an image manipulation workbench where zero bytes ever touch an external server.
        </p>
      </header>

      {/* The Problem with Cloud Tools */}
      <section className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          The Problem with Traditional Web Converters
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Most online utilities operate on an outdated model: you upload confidential images, personal photos, or proprietary mockups to an anonymous remote server. Once uploaded, your files pass through unknown network caches and disk storage systems before you receive a download link.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          This architecture introduces fundamental vulnerabilities: exposure of sensitive EXIF location metadata, artificial file-size throttles, lengthy upload queues over mobile data, and intrusive subscription paywalls.
        </p>
      </section>

      {/* Architectural Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Our Three Architectural Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Local RAM Buffering</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              When an image is loaded, it is read directly into your device’s volatile memory. Processing occurs via HTML5 Canvas and WebAssembly. No bytes are sent over the internet.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Hardware Threading</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Transformations take advantage of your device’s CPU and GPU threads. Web Workers process operations in background threads, keeping your UI responsive.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Zero Commercial Traps</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Without cloud server compute costs for every byte converted, we offer all 25 modules completely free—unlimited, water-mark free, and without registration barriers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-teal-500/10 border border-sky-500/20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Experience Private Media Transformation
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
          Start compressing, converting, and editing directly in your web browser.
        </p>
        <Link
          href="/#workbench"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all"
        >
          Open Tool Directory <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
