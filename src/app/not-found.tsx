import Link from 'next/link';
import { Home, Wrench, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          404 Error
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The page or image tool you are looking for doesn&apos;t exist, has been moved, or the link may be outdated.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/#tools"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors"
        >
          <Wrench className="w-4 h-4" /> Browse All Tools
        </Link>
      </div>
    </div>
  );
}
