import Link from 'next/link';
import {
  FileImage,
  Minimize2,
  Maximize2,
  Crop,
  Eraser,
  RotateCw,
  FlipHorizontal,
  Info,
  ShieldOff,
  Pipette,
  FileText,
  Image as ImageIcon,
  FolderOpen,
  Share2,
  RefreshCw,
  PenTool,
  Smartphone,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import type { Tool } from '@/lib/tools';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Minimize2,
  Maximize2,
  Crop,
  Eraser,
  FileImage,
  RotateCw,
  FlipHorizontal,
  Info,
  ShieldOff,
  Pipette,
  FileText,
  Image: ImageIcon,
  FolderOpen,
  Share2,
  RefreshCw,
  PenTool,
  Smartphone,
};

const categoryTheme: Record<string, { badge: string; accent: string; iconBg: string }> = {
  compress: {
    badge: 'text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/30',
    accent: 'group-hover:border-amber-500/50',
    iconBg: 'group-hover:bg-amber-500/10 group-hover:text-amber-500',
  },
  resize: {
    badge: 'text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/30',
    accent: 'group-hover:border-indigo-500/50',
    iconBg: 'group-hover:bg-indigo-500/10 group-hover:text-indigo-500',
  },
  convert: {
    badge: 'text-sky-700 dark:text-sky-300 bg-sky-500/10 border-sky-500/30',
    accent: 'group-hover:border-sky-500/50',
    iconBg: 'group-hover:bg-sky-500/10 group-hover:text-sky-500',
  },
  edit: {
    badge: 'text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/30',
    accent: 'group-hover:border-purple-500/50',
    iconBg: 'group-hover:bg-purple-500/10 group-hover:text-purple-500',
  },
  metadata: {
    badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    accent: 'group-hover:border-emerald-500/50',
    iconBg: 'group-hover:bg-emerald-500/10 group-hover:text-emerald-500',
  },
  utility: {
    badge: 'text-rose-700 dark:text-rose-300 bg-rose-500/10 border-rose-500/30',
    accent: 'group-hover:border-rose-500/50',
    iconBg: 'group-hover:bg-rose-500/10 group-hover:text-rose-500',
  },
};

export default function ToolCard({
  tool,
  compact = false,
}: {
  tool: Tool;
  compact?: boolean;
}) {
  const Icon = iconMap[tool.icon] || Wrench;
  const theme = categoryTheme[tool.category] || {
    badge: 'text-slate-600 bg-slate-500/10 border-slate-500/30',
    accent: 'group-hover:border-sky-500/50',
    iconBg: 'group-hover:bg-sky-500/10 group-hover:text-sky-500',
  };

  if (compact) {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className={`group relative flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827]/70 hover:bg-slate-50 dark:hover:bg-[#151f33] ${theme.accent} transition-all duration-200 shadow-sm hover:shadow-md`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-center shrink-0 transition-colors ${theme.iconBg}`}>
            <Icon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
              {tool.name}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {tool.shortDesc}
            </p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 shrink-0 ml-2 transition-all duration-200" />
      </Link>
    );
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827]/70 hover:bg-slate-50/80 dark:hover:bg-[#151f33] shadow-sm hover:shadow-xl hover:shadow-sky-500/5 ${theme.accent} transition-all duration-300`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300 ${theme.iconBg}`}>
            <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300 transition-colors" />
          </div>
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${theme.badge} uppercase tracking-wider`}>
            {tool.category}
          </span>
        </div>

        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors flex items-center justify-between gap-1">
          <span>{tool.name}</span>
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-sky-500 transition-all duration-200 shrink-0" />
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {tool.shortDesc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
        <span className="truncate max-w-[160px] font-mono-numbers">
          {tool.acceptedFormats.slice(0, 3).join(' ')} {tool.acceptedFormats.length > 3 ? `+${tool.acceptedFormats.length - 3}` : ''}
        </span>
        <span className="text-sky-500 dark:text-sky-400 font-semibold group-hover:underline flex items-center gap-1">
          Open &rarr;
        </span>
      </div>
    </Link>
  );
}
