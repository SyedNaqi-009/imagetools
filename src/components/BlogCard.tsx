import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827]/70 hover:bg-slate-50/80 dark:hover:bg-[#151f33] hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <time dateTime={post.date} className="font-mono">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
        <span className="inline-flex items-center gap-1 text-sky-500 dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          Read Guide <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
