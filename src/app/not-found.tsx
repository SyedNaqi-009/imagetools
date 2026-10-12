import Link from 'next/link';
import { Cpu, ArrowRight, Home, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 mx-auto shadow-inner">
        <Cpu className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-bold">
          404 — Routine Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
          Module Missing
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          The requested tool module or article route cannot be located in the current client registry.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
        >
          <Home className="w-4 h-4" /> Studio Home
        </Link>
        <Link
          href="/#workbench"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <Layers className="w-4 h-4" /> Tool Directory
        </Link>
      </div>
    </div>
  );
}
