import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer — Legal Notices & Limitations | ImageTools',
  description:
    'Read the legal disclaimer for ImageTools regarding informational content, software accuracy, external links, and fair use.',
  alternates: {
    canonical: 'https://imagetools.dev/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Disclaimer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated: March 15, 2024
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            1. General Information Disclaimer
          </h2>
          <p>
            The information, software tools, blog articles, and tutorials provided on <strong>https://imagetools.dev</strong> (&ldquo;ImageTools&rdquo;) are intended solely for general informational, educational, and workflow utility purposes. All content is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>
          <p>
            Under no circumstance shall ImageTools have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information or tool outputs provided on the site. Your use of the site and your reliance on any tools or information is solely at your own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            2. Technical Accuracy &amp; File Integrity
          </h2>
          <p>
            While our client-side algorithms are built upon battle-tested web standards and libraries, image rendering and compression outputs can vary slightly depending on your browser engine (e.g., Blink, Gecko, WebKit), hardware acceleration, and operating system color profiles.
          </p>
          <p>
            Users are solely responsible for verifying the visual fidelity, resolution, metadata preservation, and color accuracy of converted or compressed files before using them in production web environments, commercial print publications, legal archives, or medical records. Always keep an untouched original backup of any critical image.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            3. External Links Disclaimer
          </h2>
          <p>
            ImageTools may contain links to external websites, articles, third-party software repositories, or services that are not provided, maintained, or in any way affiliated with ImageTools. Please note that ImageTools does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external sites.
          </p>
          <p>
            The inclusion of any external link does not imply endorsement by ImageTools of the linked site or its operators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            4. Fair Use &amp; Trademarks
          </h2>
          <p>
            All product names, logos, brands, and registered trademarks cited on ImageTools (including, but not limited to, Apple, HEIC, Google, WebP, Instagram, Facebook, Twitter/X, LinkedIn, YouTube, and Pinterest) are the property of their respective owners. Reference to any specific commercial platform, format, or process by trade name, trademark, or manufacturer does not constitute or imply endorsement, sponsorship, or recommendation by ImageTools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            5. Contact Us
          </h2>
          <p>
            If you require any more information or have questions about our site&apos;s disclaimer, please feel free to reach out via email at:
          </p>
          <p className="font-mono text-sm text-slate-800 dark:text-slate-200">
            ImageTools Inquiries<br />
            Email: contact@imagetools.dev<br />
            Website: https://imagetools.dev/contact
          </p>
        </section>
      </div>
    </div>
  );
}
