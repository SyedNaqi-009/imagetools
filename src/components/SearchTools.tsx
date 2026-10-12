'use client';

import { useState, useCallback } from 'react';
import { Search, X, Sparkles, Filter } from 'lucide-react';
import type { Tool, ToolCategory } from '@/lib/tools';
import ToolCard from './ToolCard';

const categories: { label: string; value: ToolCategory | 'all'; count: number }[] = [
  { label: 'All Tools', value: 'all', count: 25 },
  { label: 'Compression', value: 'compress', count: 1 },
  { label: 'Resizing', value: 'resize', count: 2 },
  { label: 'Converters', value: 'convert', count: 12 },
  { label: 'Studio Edit', value: 'edit', count: 4 },
  { label: 'EXIF Metadata', value: 'metadata', count: 2 },
  { label: 'Batch & Utilities', value: 'utility', count: 4 },
];

export default function SearchTools({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => setDebouncedQuery(value), 250);
    setTimer(newTimer);
  }, [timer]);

  const filtered = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const q = debouncedQuery.toLowerCase();
    const matchesQuery =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.shortDesc.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.acceptedFormats.some((fmt) => fmt.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Control Console */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search tools by name, format (e.g. webp, heic), or function..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/80 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setDebouncedQuery('');
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2 self-start md:self-center text-xs font-mono text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5 text-sky-500" />
            <span>Active Filtered:</span>
            <span className="font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono-numbers">
              {filtered.length} of {tools.length} Tools
            </span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                    : 'bg-slate-100/90 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Display */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <Sparkles className="w-8 h-8 mx-auto text-sky-500 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No tools match &ldquo;{debouncedQuery}&rdquo;</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try searching for generic terms like &ldquo;png&rdquo;, &ldquo;compress&rdquo;, or &ldquo;pdf&rdquo;.</p>
          <button
            onClick={() => {
              setQuery('');
              setDebouncedQuery('');
              setActiveCategory('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-semibold hover:bg-sky-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
