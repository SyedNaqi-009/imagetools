import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, ArrowLeft, Terminal, BookOpen, Layers } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogSlugs, BLOG_POSTS } from '@/lib/blog';
import { getToolBySlug, type Tool } from '@/lib/tools';
import { renderMarkdown } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';

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
    title: `${post.title} | ImageTools Studio`,
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
      name: 'ImageTools Studio',
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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Studio Home', href: '/' },
          { label: 'Knowledge Base', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Article Header Card */}
      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
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

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Main Formatted Markdown Content */}
      <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <div
          className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </div>

      {/* Direct Interactive Tools Launchpad */}
      {relatedTools.length > 0 && (
        <section className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
            <Layers className="w-4 h-4" />
            <span>Integrated Studio Utilities</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Launch Tools Featured in This Article
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
            Test the techniques discussed above with zero installations or server uploads:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* More Guides Navigation */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Further Technical Reading
          </h2>
          <Link
            href="/blog"
            className="text-xs font-mono font-semibold text-sky-500 hover:underline flex items-center gap-1"
          >
            All Articles &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherPosts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Back to Listing */}
      <div className="pt-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-sky-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Knowledge Base
        </Link>
      </div>
    </article>
  );
}
