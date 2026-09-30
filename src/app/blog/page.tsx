import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Blog — Image Tools Tips & Guides | ImageTools',
  description:
    'Read expert guides, format comparisons, and tutorials on image compression, next-gen WebP/AVIF formats, and social media image optimization.',
  openGraph: {
    title: 'Blog — Image Tools Tips & Guides | ImageTools',
    description:
      'Read expert guides, format comparisons, and tutorials on image compression, next-gen WebP/AVIF formats, and social media image optimization.',
    url: 'https://imagetools.dev/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Image Tools Tips & Guides | ImageTools',
    description:
      'Read expert guides, format comparisons, and tutorials on image compression, next-gen WebP/AVIF formats, and social media image optimization.',
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
    name: 'Image Tools Blog — Tips, Guides & Comparisons',
    description:
      'Collection of articles on digital image formats, compression benchmarks, and media workflow optimization.',
    url: 'https://imagetools.dev/blog',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Image Tools Blog — Tips, Guides &amp; Comparisons
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Deep-dive tutorials, benchmarks, and best practices for web performance, digital imaging formats, and modern graphic design workflows.
        </p>
      </header>

      {/* Grid of Blog Posts */}
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
