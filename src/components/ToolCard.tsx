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
  ArrowUpRight,
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

const categoryBadgeColors: Record<string, string> = {
  compress: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
  resize: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  convert: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20',
  edit: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
  metadata: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  utility: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = iconMap[tool.icon] || Wrench;
  const badgeStyle = categoryBadgeColors[tool.category] || 'text-slate-500 bg-slate-500/10 border-slate-500/20';

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827]/70 hover:bg-slate-50/80 dark:hover:bg-[#151f33] shadow-sm hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-sky-500/40 group-hover:bg-sky-500/10 transition-all duration-300">
            <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" />
          </div>
          <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle} capitalize`}>
            {tool.category}
          </span>
        </div>

        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors flex items-center justify-between">
          <span>{tool.name}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-sky-500 transition-all duration-200" />
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {tool.shortDesc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
        <span className="truncate max-w-[170px]">
          {tool.acceptedFormats.slice(0, 3).join(' ')} {tool.acceptedFormats.length > 3 ? `+${tool.acceptedFormats.length - 3}` : ''}
        </span>
        <span className="text-sky-500 dark:text-sky-400 font-semibold group-hover:underline">Launch &rarr;</span>
      </div>
    </Link>
  );
}
