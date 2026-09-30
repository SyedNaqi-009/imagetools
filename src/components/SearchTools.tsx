'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import type { Tool, ToolCategory } from '@/lib/tools';
import ToolCard from './ToolCard';

const categories: { label: string; value: ToolCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Compress', value: 'compress' },
  { label: 'Resize', value: 'resize' },
  { label: 'Convert', value: 'convert' },
  { label: 'Edit', value: 'edit' },
  { label: 'Metadata', value: 'metadata' },
  { label: 'Utility', value: 'utility' },
];

export default function SearchTools({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => setDebouncedQuery(value), 300);
    setTimer(newTimer);
  }, [timer]);

  const filtered = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const q = debouncedQuery.toLowerCase();
    const matchesQuery = !q || tool.name.toLowerCase().includes(q) || tool.shortDesc.toLowerCase().includes(q) || tool.category.includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
          {query && (
            <button onClick={() => { setQuery(''); setDebouncedQuery(''); }} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Clear search">
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-500 mb-4">{filtered.length} tool{filtered.length !== 1 ? 's' : ''} found</p>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <p className="mb-2">No tools found matching your search.</p>
          <button onClick={() => { setQuery(''); setDebouncedQuery(''); setActiveCategory('all'); }} className="text-blue-600 hover:underline text-sm">Reset filters</button>
        </div>
      )}
    </div>
  );
}
