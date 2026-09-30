import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions — User Agreement | ImageTools',
  description:
    'Review the terms and conditions governing the use of ImageTools online image conversion and compression platform.',
  alternates: {
    canonical: 'https://imagetools.dev/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last revised: March 15, 2024
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or utilizing the website located at <strong>https://imagetools.dev</strong> (hereinafter referred to as &ldquo;ImageTools,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;), along with our Privacy Policy. If you do not agree to these Terms, you must discontinue your use of ImageTools immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            2. Description of Service
          </h2>
          <p>
            ImageTools provides free, web-based digital image utilities, including image compression, file format conversion, resizing, cropping, rotation, metadata inspection, and palette extraction.
          </p>
          <p>
            All image processing operations are performed on the client-side within the user&apos;s own web browser. ImageTools does not host, upload, or retain your files on remote servers. We reserve the right to modify, enhance, update, or discontinue any feature, tool, or aspect of the service at any time without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            3. User Intellectual Property &amp; Content Rights
          </h2>
          <p>
            <strong>You retain 100% ownership and copyright</strong> of all files, photographs, vectors, and artwork that you process using ImageTools. Because files are processed entirely in client-side memory, ImageTools acquires zero ownership, license, distribution rights, or intellectual property claims over your images.
          </p>
          <p>
            You represent and warrant that you possess all necessary rights, licenses, or permissions to process any image you import into our tools, and that your use does not violate any third-party intellectual property rights, trademarks, or privacy rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            4. ImageTools Intellectual Property
          </h2>
          <p>
            All text, site design, logos, user interfaces, source code, tutorials, and compilations contained on ImageTools (excluding your personal image files) are the exclusive intellectual property of ImageTools and are protected by international copyright, trademark, and unfair competition laws. You may not scrape, frame, reverse engineer, or redistribute our website code without our explicit written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            5. Disclaimer of Warranties
          </h2>
          <p>
            ImageTools is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or freedom from computer viruses or algorithmic errors.
          </p>
          <p>
            While we strive for high precision, we make no representation or warranty that image transformations, color readings, or compression outputs will always be error-free or that the website will operate without interruption.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall ImageTools, its operators, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including, without limitation, loss of data, loss of business profits, interruption of business, or corruption of local files) arising out of or in connection with your use or inability to use this website.
          </p>
          <p>
            Users are advised to always maintain backup copies of critical image assets before performing any destructive editing or irreversible batch conversions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            7. Prohibited Uses
          </h2>
          <p>You agree not to use ImageTools to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Attempt to interfere with or compromise the system integrity, bandwidth, or security of our web servers.</li>
            <li>Use automated scripts, bots, or crawlers to overload or scrape our web assets.</li>
            <li>Violate any applicable federal, state, local, or international law or regulation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            8. Governing Law &amp; Severability
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ImageTools operates, without giving effect to any principles of conflicts of law. If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            9. Contact Information
          </h2>
          <p>
            For questions or legal inquiries regarding these Terms and Conditions, please contact us at:
          </p>
          <p className="font-mono text-sm text-slate-800 dark:text-slate-200">
            ImageTools Legal Department<br />
            Email: legal@imagetools.dev<br />
            Website: https://imagetools.dev/contact
          </p>
        </section>
      </div>
    </div>
  );
}
