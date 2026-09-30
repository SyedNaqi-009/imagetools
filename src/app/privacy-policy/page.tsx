import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy — 100% Client-Side Protection | ImageTools',
  description:
    'Read our comprehensive privacy policy. ImageTools performs 100% client-side image processing. We never store, transmit, or view your photos.',
  alternates: {
    canonical: 'https://imagetools.dev/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated: March 15, 2024
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            1. Introduction &amp; Core Architecture
          </h2>
          <p>
            At ImageTools (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we take your privacy extremely seriously. We believe that modern web applications should respect individual sovereignty over personal data. This Privacy Policy explains how our website operates, what data is collected, and why your image files remain entirely confidential.
          </p>
          <p>
            Unlike traditional web-based graphic utilities, <strong>ImageTools is built on a 100% client-side execution model</strong>. When you select, drag-and-drop, or process an image using our compressors, converters, croppers, or color tools, that file is processed strictly inside your own device&apos;s browser memory (RAM) utilizing JavaScript, HTML5 Canvas, and WebAssembly APIs. <strong>Your images are NEVER uploaded to our web servers, never written to external cloud storage, and never accessed or inspected by any human or AI algorithm.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            2. Information We Do NOT Collect
          </h2>
          <p>Because of our client-side architecture:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>We do not collect, view, or retain your source photos or output images.</li>
            <li>We do not extract, store, or sell any EXIF metadata (such as GPS coordinates, camera serial numbers, or timestamps) contained in your uploaded photographs.</li>
            <li>We do not require user accounts, passwords, email registration, phone numbers, or billing details.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            3. Information We May Collect Automatically
          </h2>
          <p>
            Like virtually all internet websites, when you access ImageTools, certain non-personally identifiable diagnostic information is collected automatically by our web hosting infrastructure (e.g., Vercel) and standard analytics tools to ensure site reliability, uptime, and security:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Browser &amp; Device Information:</strong> Browser type, operating system version, screen resolution, and language settings to ensure visual components render properly.</li>
            <li><strong>Log &amp; Request Data:</strong> Timestamps of page visits, referring URLs, HTTP status codes, and anonymized IP addresses used solely for DDoS mitigation, bot detection, and server load balancing.</li>
            <li><strong>Aggregated Usage Metrics:</strong> Aggregate page view counts and anonymous click statistics to help us determine which tools are most popular and require further performance tuning.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            4. Cookies &amp; Advertising Partners
          </h2>
          <p>
            ImageTools relies on non-intrusive banner advertising to keep all our tools completely free and maintain our hosting infrastructure. We partner with third-party advertising networks, such as Google AdSense:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Google AdSense &amp; DoubleClick Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opting Out:</strong> You may opt out of personalized advertising by visiting Google&apos;s <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Ads Settings</a>. Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">aboutads.info</a>.
            </li>
            <li>
              <strong>Local Storage:</strong> We use browser localStorage solely to persist your theme preference (Light or Dark mode). No tracking tokens or personal identifiers are stored in localStorage.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            5. GDPR Compliance Statement (European Economic Area)
          </h2>
          <p>
            For users residing within the European Economic Area (EEA), ImageTools acts in accordance with the General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;). Because our website does not collect, process, or store personal image files or user profile records on remote servers, we operate with maximum data minimization by default.
          </p>
          <p>
            Under GDPR, you retain the rights of access, rectification, erasure, restriction of processing, data portability, and objection regarding any diagnostic telemetry. To exercise any of these rights regarding server log data or analytics, please contact our Data Protection Officer at <a href="mailto:privacy@imagetools.dev" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@imagetools.dev</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            6. California Consumer Privacy Act (CCPA / CPRA)
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents are entitled to specific rights concerning their personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>We do not sell personal information or consumer image data.</li>
            <li>We do not share your private files with data brokers or marketing affiliates.</li>
            <li>You have the right to request disclosure of any web analytics categories gathered during your browsing session.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            7. Data Security
          </h2>
          <p>
            All communications between your browser and ImageTools are encrypted in transit using Transport Layer Security (TLS 1.3 / HTTPS). Because your files are rendered in temporary sandboxed browser memory and destroyed when you close or refresh the tab, there is no remote database susceptible to unauthorized breaches or data leaks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            8. Changes to this Policy
          </h2>
          <p>
            We may update our Privacy Policy periodically to reflect technological improvements, legal requirements, or new browser capabilities. Any revisions will be published on this page with an updated &ldquo;Last updated&rdquo; timestamp. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            9. Contact Information
          </h2>
          <p>
            If you have questions, comments, or concerns regarding this Privacy Policy or our client-side architecture, please reach out to us at:
          </p>
          <p className="font-mono text-sm text-slate-800 dark:text-slate-200">
            ImageTools Privacy Team<br />
            Email: privacy@imagetools.dev<br />
            Website: https://imagetools.dev/contact
          </p>
        </section>
      </div>
    </div>
  );
}
