import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock, Send, ShieldCheck, Terminal } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Direct Engineering Contact & Inquiries | ImageTools Studio',
  description:
    'Contact the ImageTools development team for feature feedback, algorithmic enhancements, and technical inquiries.',
  alternates: {
    canonical: 'https://imagetools.dev/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Studio Home', href: '/' }, { label: 'Contact' }]} />

      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
          <Terminal className="w-3.5 h-3.5" />
          <span>Communications Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Direct Developer Support
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Questions about browser compatibility, suggestions for new image algorithms, or general feedback? Send us a message.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Electronic Mail</h3>
                <a
                  href="mailto:contact@imagetools.dev"
                  className="text-xs font-mono text-sky-500 hover:underline"
                >
                  contact@imagetools.dev
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Response Window</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Within 24 to 48 hours</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Security Inquiries</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Disclosures reviewed promptly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <form action="/api/contact-placeholder" method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
              >
                Name / Handle
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Alex Developer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900 text-sm outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="alex@domain.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900 text-sm outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
              >
                Inquiry Topic
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="Bug report, algorithm proposal, or partnership"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900 text-sm outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
              >
                Detailed Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Please describe your experience or proposal in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900 text-sm outline-none focus:border-sky-500 transition-colors resize-y"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
