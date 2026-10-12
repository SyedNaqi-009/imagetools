import type { Tool } from '@/lib/tools';
import ToolCard from './ToolCard';
import { Layers } from 'lucide-react';

export default function RelatedTools({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) return null;
  return (
    <section className="my-14 pt-8 border-t border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
        <Layers className="w-4 h-4" />
        <span>Complementary Workflow</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Related Image Utilities
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Pair this tool with other browser-native modules in the studio pipeline.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
