import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { getToolBySlug, getAllSlugs, getRelatedTools } from '@/lib/tools';
import { BLOG_POSTS } from '@/lib/blog';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolInterface from '@/components/ToolInterface';
import FAQ from '@/components/FAQ';
import RelatedTools from '@/components/RelatedTools';
import AdSlot from '@/components/AdSlot';

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
  const relevantPosts = BLOG_POSTS.filter((post) =>
    post.relatedTools.includes(slug)
  );

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    headline: tool.headline,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/#tools' },
          { label: tool.name },
        ]}
      />

      {/* Tool Header */}
      <header className="space-y-3">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold capitalize tracking-wide">
          {tool.category} Utility
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {tool.headline}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {tool.shortDesc} All operations are 100% client-side — your photos stay private and never hit external servers.
        </p>
      </header>

      {/* Ad Placement 1 */}
      <AdSlot slot="header" />

      {/* Main Interactive Tool UI */}
      <section aria-label="Tool Processing Area">
        <ToolInterface toolSlug={tool.slug} acceptedFormats={tool.acceptedFormats} />
      </section>

      {/* How to Use Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          How to Use the {tool.name}
        </h2>
        <ol className="space-y-4">
          {tool.howItWorks.map((step, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Benefits Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Key Benefits &amp; Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Placement 2 */}
      <AdSlot slot="in-content" />

      {/* Detailed SEO Educational Content */}
      <section className="prose dark:prose-invert max-w-none border-t border-slate-200 dark:border-slate-800 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          About {tool.name}
        </h2>
        <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
          {tool.intro}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={tool.faqs} />

      {/* Relevant Blog Posts Link */}
      {relevantPosts.length > 0 && (
        <section className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            Related Guides &amp; Tutorials
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Learn more about optimizing images with our deep-dive tutorials:
          </p>
          <div className="space-y-2">
            {relevantPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-colors"
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools Grid */}
      <RelatedTools tools={relatedTools} />
    </article>
  );
}
