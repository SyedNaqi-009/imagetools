import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Sparkles, Award, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { TOOLS } from '@/lib/tools';
import { getRecentBlogPosts } from '@/lib/blog';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import SearchTools from '@/components/SearchTools';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Free Online Image Tools — Compress, Resize, Convert Images',
  description:
    'Free online image tools. Compress, resize, convert, and edit images directly in your browser. Fast, 100% private with no server uploads and no limits.',
  openGraph: {
    title: 'Free Online Image Tools — Compress, Resize, Convert Images',
    description:
      'Free online image tools. Compress, resize, convert, and edit images directly in your browser. Fast, 100% private with no server uploads and no limits.',
    url: 'https://imagetools.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Tools — Compress, Resize, Convert Images',
    description:
      'Free online image tools. Compress, resize, convert, and edit images directly in your browser. Fast, 100% private with no server uploads and no limits.',
  },
  alternates: {
    canonical: 'https://imagetools.dev',
  },
};

const popularToolSlugs = [
  'image-compressor',
  'image-resizer',
  'background-remover',
  'jpg-to-png',
  'png-to-jpg',
  'webp-to-jpg',
  'heic-to-jpg',
  'image-converter',
];

const generalFaqs = [
  {
    q: 'Is ImageTools completely free to use?',
    a: 'Yes, 100% free! There are no subscriptions, hidden fees, paywalls, or feature limits. You can process as many images as you need without watermarks or forced registrations.',
  },
  {
    q: 'Are my images uploaded to any remote server or stored anywhere?',
    a: 'No, absolutely not. All image processing operations (compression, resizing, conversion, cropping, and color extraction) run locally inside your browser using HTML5 Canvas, WebAssembly, and native JavaScript APIs. Your images never leave your computer or phone.',
  },
  {
    q: 'What image formats are supported?',
    a: 'We support all major modern and legacy formats including JPEG/JPG, PNG, WebP, AVIF, HEIC/HEIF (iPhone photos), SVG, and PDF documents. You can easily convert between any of these formats.',
  },
  {
    q: 'Does compressing an image degrade its visual quality?',
    a: 'Our smart compression engine preserves perceptual quality by discarding invisible color redundancy while maintaining high visual clarity. You can also manually adjust the quality slider to find your exact desired balance between file size and sharpness.',
  },
  {
    q: 'Can I convert multiple images at once in bulk?',
    a: 'Yes! Our Bulk Image Converter allows you to drop multiple files simultaneously, convert them to your target format in batch, and download everything as a convenient, ready-to-use ZIP archive.',
  },
  {
    q: 'Does ImageTools work on smartphones and tablets?',
    a: 'Yes, ImageTools is completely responsive and optimized for mobile browsers on iOS and Android devices, including camera photos, screenshots, and HEIC files directly from your gallery.',
  },
];

export default function HomePage() {
  const popularTools = popularToolSlugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is (typeof TOOLS)[0] => Boolean(t));

  const recentPosts = getRecentBlogPosts(3);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ImageTools',
    url: 'https://imagetools.dev',
    description:
      'Free client-side image processing tools. Compress, resize, convert, and edit images without uploading them to servers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://imagetools.dev/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Lock className="w-3.5 h-3.5" /> 100% Client-Side • Private &amp; Zero Server Uploads
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 max-w-4xl mx-auto leading-tight">
          Free Online Image Tools{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Built for Privacy &amp; Speed
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Compress, resize, convert, and edit your photos right inside your browser. No file size limits, zero server uploads, and no watermarks — ever.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#tools"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-sm hover:shadow transition-all"
          >
            Explore All 25 Tools <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/tools/image-compressor"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-base transition-colors"
          >
            Quick Compress
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">No account required</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Instant browser speed</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Zero data retention</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Unlimited operations</span>
          </div>
        </div>
      </section>

      {/* Ad Placement 1 */}
      <AdSlot slot="header" />

      {/* Search and Interactive Filter */}
      <section id="tools" className="scroll-mt-20">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Search &amp; Filter Tools
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Instantly find any conversion, compression, or editing tool by name or function.
          </p>
        </div>
        <SearchTools tools={TOOLS} />
      </section>

      {/* Popular Tools Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Most Popular Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              The everyday utilities loved by web developers, designers, and creators worldwide.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-6 sm:px-10 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/60 dark:to-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Why Professionals Prefer ImageTools
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            Engineered from the ground up for privacy, performance, and simplicity without bloated software or intrusive tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">100% Private</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Files never leave your device. All calculations take place client-side in browser memory.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Instant Results</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No server queues, no upload bottlenecks. Process high-res files at local hardware speed.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Completely Free</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No credits, no subscription tiers, and no hidden file count limits. Use as much as you like.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">No Watermarks</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Export clean, professional files with pristine fidelity, original EXIF controls, and zero branding.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Placement 2 */}
      <AdSlot slot="in-content" />

      {/* Latest Blog Guides */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Latest Guides &amp; Tutorials
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Expert articles on image formats, web performance, and modern graphic optimization.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={generalFaqs} />

      {/* Ad Placement 3 */}
      <AdSlot slot="footer" />
    </div>
  );
}
