import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogSlugs, BLOG_POSTS } from '@/lib/blog';
import { getToolBySlug, type Tool } from '@/lib/tools';
import { renderMarkdown } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import AdSlot from '@/components/AdSlot';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | ImageTools Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://imagetools.dev/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://imagetools.dev/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedTools: Tool[] = post.relatedTools
    .map((s) => getToolBySlug(s))
    .filter((t): t is Tool => Boolean(t));

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'ImageTools Editorial Team',
      url: 'https://imagetools.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ImageTools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://imagetools.dev/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://imagetools.dev/blog/${slug}`,
    },
  };

  const renderedContent = renderMarkdown(post.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {post.description}
        </p>
      </header>

      {/* Ad Placement 1 */}
      <AdSlot slot="header" />

      {/* Main Content Area */}
      <div
        className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />

      {/* Ad Placement 2 */}
      <AdSlot slot="in-content" />

      {/* Related Image Tools Section */}
      {relatedTools.length > 0 && (
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Try the Tools Mentioned in this Article
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Free, fast, and 100% private in-browser image tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Other Blog Posts */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            More Helpful Guides
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherPosts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Back Link */}
      <div className="pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
      </div>
    </article>
  );
}
