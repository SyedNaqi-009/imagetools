import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  Cpu,
  Layers,
  FileCheck,
  HardDrive,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';
import { TOOLS } from '@/lib/tools';
import { getRecentBlogPosts } from '@/lib/blog';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import SearchTools from '@/components/SearchTools';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'ImageTools Studio — Client-Side Image Transformation Workbench',
  description:
    'Free, high-performance in-browser image tools. Compress, resize, convert, and inspect images with zero server uploads, unlimited processing, and studio-grade fidelity.',
  openGraph: {
    title: 'ImageTools Studio — Client-Side Image Transformation Workbench',
    description:
      'Free, high-performance in-browser image tools. Compress, resize, convert, and inspect images with zero server uploads, unlimited processing, and studio-grade fidelity.',
    url: 'https://imagetools.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageTools Studio — Client-Side Image Transformation Workbench',
    description:
      'Free, high-performance in-browser image tools. Compress, resize, convert, and inspect images with zero server uploads, unlimited processing, and studio-grade fidelity.',
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
    q: 'How does client-side image processing work without a server?',
    a: 'ImageTools executes image compression, resizing, and format decoding locally in your browser using HTML5 Canvas, WebAssembly (Wasm), and Web Workers. When you drag an image onto the workbench, it is buffered into your device RAM. The math is computed by your local CPU/GPU, eliminating network lag and server-side storage risks completely.',
  },
  {
    q: 'Are any of my images, EXIF GPS tags, or filenames uploaded or logged?',
    a: 'Zero bytes leave your computer or phone. We do not maintain any cloud processing queue or backend storage bucket. When you close or refresh your browser tab, all allocated image buffers are instantly freed from your computer RAM.',
  },
  {
    q: 'What makes ImageTools different from traditional converter websites?',
    a: 'Traditional services upload your images to remote cloud servers, which presents privacy hazards, bandwidth limits, wait queues, and file size caps. ImageTools operates as a standalone web workstation—instant, unlimited, free, completely private, and free of disruptive watermarks.',
  },
  {
    q: 'Does compressing images degrade their visible quality?',
    a: 'Our smart compression engine strips non-essential metadata and calculates optimal color quantization matrices to reduce file sizes by 50-80% while keeping visual fidelity virtually indistinguishable from the source.',
  },
  {
    q: 'Can I batch-convert multiple images at once into a ZIP archive?',
    a: 'Yes! The Bulk Image Converter tool allows you to queue multiple files simultaneously, transcode them to WebP, JPG, or PNG in parallel, and package the results into a single clean ZIP archive with zero quality loss.',
  },
  {
    q: 'Is ImageTools compatible with Apple iPhone HEIC/HEIF photos?',
    a: 'Yes. Our specialized HEIC converters decode Apple high-efficiency format images directly in modern browsers and convert them to standard JPG or PNG for seamless cross-platform sharing.',
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
    name: 'ImageTools Studio',
    url: 'https://imagetools.dev',
    description:
      'Client-side image processing studio. Compress, resize, convert, and edit images without uploading to remote servers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://imagetools.dev/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section — Asymmetric Studio Workbench Presentation */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-[#0f172a] dark:via-[#0b0f19] dark:to-[#0b0f19] p-8 sm:p-12 lg:p-16 shadow-sm">
        {/* Technical decorative grid background */}
        <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Security & Runtime Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-semibold tracking-wide">
            <Cpu className="w-3.5 h-3.5" />
            <span>Client-Side Engine • 100% In-Browser Execution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-[1.12]">
            High-Performance Image Studio{' '}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
              Without Server Queues
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Compress, resize, convert, crop, and strip metadata with hardware-accelerated WebAssembly. Zero uploads, zero telemetry, and zero watermark restrictions.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#workbench"
              className="px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2"
            >
              <span>Explore All 25 Suites</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/tools/image-compressor"
              className="px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-sm transition-colors"
            >
              Launch Smart Compressor
            </Link>
          </div>

          {/* Technical Telemetry Ribbon */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sky-500 text-xs font-mono font-bold">
                <HardDrive className="w-4 h-4" /> RAM Buffering
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Zero disk writes to cloud servers
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-500 text-xs font-mono font-bold">
                <Zap className="w-4 h-4" /> Near-Instant Speed
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Local multicore CPU acceleration
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4" /> 0% File Degradation
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Preserves lossless chroma profiles
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-teal-500 text-xs font-mono font-bold">
                <FileCheck className="w-4 h-4" /> 25 Free Modules
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unrestricted batch operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Search & Filter Workbench Section */}
      <section id="workbench" className="scroll-mt-24 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Full Studio Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              Select an Image Utility
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            All modules compile with client-side Wasm
          </p>
        </div>

        <SearchTools tools={TOOLS} />
      </section>

      {/* Featured / Popular Suite Showcase */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
            <Activity className="w-4 h-4" />
            <span>High-Demand Workflows</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Most Frequently Launched Suites
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Essential transformations for designers, developers, and photographers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Technical Architecture & Trust Comparison Section */}
      <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 overflow-hidden shadow-sm">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
            Engineering Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Why In-Browser Processing Outperforms Cloud Services
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            By shifting algorithmic calculations from remote data centers to client hardware threads, ImageTools solves the privacy and latency issues inherent in standard web tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Zero Cloud Uploads</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Traditional tools transmit your confidential photos over unverified networks. ImageTools runs entirely in browser memory. Sensitive documents and ID scans remain untouched on your machine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Bypasses Bandwidth Caps</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Never wait for large 50MB files to upload on mobile connections. Browser-native JavaScript reads pixel arrays instantly, executes transformation matrices, and renders results directly to your disk.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Forever Free &amp; Uncapped</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Because client devices execute the workload, we incur zero server compute overhead. We pass that freedom directly to you with zero subscriptions, zero watermarks, and unlimited conversions.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Editorial Guides */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Technical Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              Optimization Guides &amp; Format Benchmarks
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold text-sky-500 dark:text-sky-400 hover:underline flex items-center gap-1 font-mono"
          >
            Browse All 10 Guides &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <FAQ faqs={generalFaqs} />
    </div>
  );
}
