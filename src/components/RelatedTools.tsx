import type { Tool } from '@/lib/tools';
import ToolCard from './ToolCard';

export default function RelatedTools({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) return null;
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Related Image Tools</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Discover more tools that work great together.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
