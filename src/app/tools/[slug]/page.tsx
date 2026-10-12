import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { getToolBySlug, getAllSlugs, getRelatedTools } from '@/lib/tools';
import { BLOG_POSTS } from '@/lib/blog';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolInterface from '@/components/ToolInterface';
import FAQ from '@/components/FAQ';
import RelatedTools from '@/components/RelatedTools';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://imagetools.dev/tools/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
    },
    alternates: {
      canonical: `https://imagetools.dev/tools/${slug}`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(slug);

  // Find blog posts referencing this tool
  const relevantPosts = BLOG_POSTS.filter((post) => post.relatedTools.includes(slug));

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    headline: tool.headline,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any Modern Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Studio Home', href: '/' },
          { label: 'Tool Suites', href: '/#workbench' },
          { label: tool.name },
        ]}
      />

      {/* Tool Header Presentation Banner */}
      <header className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-10 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
              {tool.category} Suite
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>In-Memory Execution</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {tool.headline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.shortDesc} No uploads to remote cloud services. Fast, private, and unlimited processing directly in browser RAM.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Accepts formats:</span>
            {tool.acceptedFormats.map((fmt) => (
              <span
                key={fmt}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold uppercase text-slate-700 dark:text-slate-300"
              >
                {fmt.replace('.', '')}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Interactive Tool Workbench Area */}
      <section aria-label="Tool Transformation Workbench">
        <ToolInterface toolSlug={tool.slug} acceptedFormats={tool.acceptedFormats} />
      </section>

      {/* Two-Column Specification & Benefits Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step-by-Step Instructions */}
        <section className="p-7 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-sky-500 font-bold mb-1">
              Step-by-Step Guide
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              How to Operate {tool.name}
            </h2>
          </div>

          <ol className="space-y-4">
            {tool.howItWorks.map((step, index) => (
              <li key={index} className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-sky-500/20">
                  {index + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Benefits & Value Props */}
        <section className="p-7 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-500 font-bold mb-1">
              Technical Advantages
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Performance &amp; Privacy Benefits
            </h2>
          </div>

          <div className="space-y-3">
            {tool.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* In-Depth Technical Editorial Content */}
      <section className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
          Educational Deep Dive
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Understanding {tool.name} Architecture
        </h2>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
          {tool.intro}
        </div>
      </section>

      {/* Relevant Technical Guides Links */}
      {relevantPosts.length > 0 && (
        <section className="p-7 rounded-3xl bg-gradient-to-r from-sky-50/60 to-indigo-50/60 dark:from-slate-900 dark:to-[#111827] border border-sky-500/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Recommended Reading</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Guides Complementing {tool.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relevantPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-sky-500 transition-all shadow-sm"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-500 dark:group-hover:text-sky-400">
                  {post.title}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FAQ faqs={tool.faqs} />

      {/* Related Suite Tools */}
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
