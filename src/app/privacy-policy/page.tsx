import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Manifesto & Data Security Policy | ImageTools Studio',
  description:
    'Comprehensive privacy documentation for ImageTools Studio. 100% in-browser processing, zero server uploads, GDPR and CCPA compliant.',
  alternates: {
    canonical: 'https://imagetools.dev/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Studio Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Zero-Server Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Privacy Policy &amp; Architecture
        </h1>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Effective Date: October 2026 • Verified Browser Isolation
        </p>
      </header>

      <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-500" />
            1. Fundamental In-Browser Processing Guarantee
          </h2>
          <p>
            ImageTools Studio is built on a client-side execution philosophy. When you process an image using any of our tools (including compression, cropping, format conversion, or EXIF viewing), the binary payload is loaded exclusively into your browser’s volatile memory via HTML5 File APIs.
          </p>
          <p>
            <strong>Your image files never leave your computer or phone.</strong> No image data is transmitted to our servers, stored on cloud disks, or shared with third-party networks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            2. Data We Explicitly Do Not Collect
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>We do not collect or archive source or transformed images.</li>
            <li>We do not read, transmit, or record EXIF location data, camera metadata, or device models.</li>
            <li>We do not require user accounts, email registrations, or authentication credentials.</li>
            <li>We do not operate tracking pixels or cross-site tracking scripts.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            3. Local Browser Storage
          </h2>
          <p>
            We use your browser’s <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">localStorage</code> strictly for theme preferences (Light Mode or Dark Mode). No personal data or user identifiers are stored.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            4. GDPR &amp; CCPA Compliance
          </h2>
          <p>
            Because ImageTools does not harvest, store, or process personal user records on remote infrastructure, our service inherently meets the highest data minimization standards outlined by the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            5. Inquiries &amp; Contact
          </h2>
          <p>
            If you have security questions regarding our client-side architecture, contact us directly at{' '}
            <a href="mailto:privacy@imagetools.dev" className="text-sky-500 font-mono hover:underline">
              privacy@imagetools.dev
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
