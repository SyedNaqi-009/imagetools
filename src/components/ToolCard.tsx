import Link from 'next/link';
import { FileImage, Minimize2, Maximize2, Crop, Eraser, RotateCw, FlipHorizontal, Info, ShieldOff, Pipette, FileText, Image, FolderOpen, Share2, RefreshCw, PenTool, Smartphone, Wrench } from 'lucide-react';
import type { Tool } from '@/lib/tools';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Minimize2, Maximize2, Crop, Eraser, FileImage, RotateCw, FlipHorizontal, Info, ShieldOff, Pipette, FileText, Image, FolderOpen, Share2, RefreshCw, PenTool, Smartphone,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = iconMap[tool.icon] || Wrench;
  return (
    <Link href={`/tools/${tool.slug}`} className="group block p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{tool.shortDesc}</p>
          <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 capitalize">{tool.category}</span>
        </div>
      </div>
    </Link>
  );
}
