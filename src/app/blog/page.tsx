import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BookOpen, Terminal, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Imaging Knowledge Base & Guides | ImageTools',
  description:
    'Comprehensive benchmarks and guides on image compression mathematics, next-gen WebP/AVIF formats, alpha transparency, and web performance optimization.',
  openGraph: {
    title: 'Technical Imaging Knowledge Base & Guides | ImageTools',
    description:
      'Comprehensive benchmarks and guides on image compression mathematics, next-gen WebP/AVIF formats, alpha transparency, and web performance optimization.',
    url: 'https://imagetools.dev/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Imaging Knowledge Base & Guides | ImageTools',
    description:
      'Comprehensive benchmarks and guides on image compression mathematics, next-gen WebP/AVIF formats, alpha transparency, and web performance optimization.',
  },
  alternates: {
    canonical: 'https://imagetools.dev/blog',
  },
};

export default function BlogListingPage() {
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Technical Imaging Knowledge Base & Guides',
    description:
      'Comprehensive benchmarks and guides on image compression mathematics, next-gen WebP/AVIF formats, alpha transparency, and web performance optimization.',
    url: 'https://imagetools.dev/blog',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Studio Home', href: '/' }, { label: 'Knowledge Base' }]} />

      {/* Header Banner */}
      <header className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider border border-sky-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research &amp; Engineering Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Image Engineering &amp; Optimization Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Deep-dive tutorials, algorithmic benchmarks, and format specifications designed to help developers and designers optimize digital assets for modern browsers.
        </p>
      </header>

      {/* Articles Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
