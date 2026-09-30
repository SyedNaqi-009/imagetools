import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Lock, Heart, Award } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us — Mission, Privacy & Technology | ImageTools',
  description:
    'Learn how ImageTools delivers private, lightning-fast client-side image processing without server uploads. Discover our mission, values, and technology.',
  alternates: {
    canonical: 'https://imagetools.dev/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          About ImageTools
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Empowering creators, developers, photographers, and businesses worldwide with free, uncompromisingly private image processing tools that run entirely in your web browser.
        </p>
      </header>

      {/* Our Mission */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Our Mission: Privacy First by Design
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For years, online image converters and compressors have forced users into an unacceptable trade-off: upload your personal photographs, sensitive client mockups, or private documents to unknown third-party servers just to change a file extension or reduce an image size. Once uploaded, users have no real guarantee of where their files are stored, who can see them, or how long they linger on remote hard drives.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          At ImageTools, we set out to build a modern alternative. Leveraging the cutting-edge capabilities of modern web browsers—including the HTML5 Canvas API, WebAssembly, Web Workers, and client-side JavaScript—we run 100% of our image transformation algorithms locally on your computer, tablet, or smartphone.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          When you use ImageTools, your images are never sent over the wire to our servers. They are never logged, never cached in an external database, and never used to train machine learning models. You enjoy the speed of local hardware execution alongside the convenience of a web utility accessible from anywhere.
        </p>
      </section>

      {/* Core Principles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Our Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Absolute Privacy
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Your data belongs to you. By eliminating server-side uploads entirely, we ensure that confidential business contracts, family portraits, and ID scans remain securely in your local memory.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Instant Hardware Speed
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Why wait for gigabyte uploads on slow broadband? Local browser threads compress, convert, and crop images at the speed of your device&apos;s processor, eliminating network bottlenecks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Truly Free for Everyone
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              No artificial batch limits, no intrusive watermarks, and no surprise paywalls. We believe essential productivity tools should be freely accessible to students, freelancers, and enterprises alike.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Pristine Fidelity
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We provide fine-grained controls over compression ratios, color palettes, and dimensions so you always achieve professional studio-grade visual outputs.
            </p>
          </div>
        </div>
      </section>

      {/* The Team Vision */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Built by Developers for Creators
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          ImageTools was founded by a passionate group of frontend engineers, designers, and open-source contributors who were tired of bloated utility websites filled with deceptive download buttons, invasive trackers, and subscription traps.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          We maintain a lean, modern stack built on Next.js, TypeScript, and modern browser standards. Our monetization strategy relies exclusively on tasteful, non-intrusive banner advertising that supports our hosting and domain maintenance costs without degrading your workflow or reading experience.
        </p>
        <div className="pt-4 flex items-center gap-4">
          <Link
            href="/#tools"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            Explore Free Tools
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
