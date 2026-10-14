'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  X,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  Crop,
  Minimize2,
  ShieldAlert,
  Sliders,
  LayoutGrid,
  ListFilter,
  Check,
} from 'lucide-react';
import type { Tool, ToolCategory } from '@/lib/tools';
import ToolCard from './ToolCard';

interface CategoryMeta {
  id: ToolCategory;
  num: string;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderColor: string;
}

const CATEGORY_META: Record<ToolCategory, CategoryMeta> = {
  convert: {
    id: 'convert',
    num: '01',
    label: 'Format Conversion Engine',
    shortLabel: 'Converters',
    tagline: 'Lossless, high-fidelity interconversions between modern and legacy formats',
    icon: RefreshCw,
    accentColor: 'text-sky-500 bg-sky-500/10',
    borderColor: 'border-sky-500/30',
  },
  edit: {
    id: 'edit',
    num: '02',
    label: 'Studio Canvas & Edit',
    shortLabel: 'Editing',
    tagline: 'Geometric transformations, precise cropping, and instant background removal',
    icon: Crop,
    accentColor: 'text-purple-500 bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  compress: {
    id: 'compress',
    num: '03',
    label: 'Payload Compression',
    shortLabel: 'Compress',
    tagline: 'Perceptual quality preservation with up to 90% reduction in file payload',
    icon: Minimize2,
    accentColor: 'text-amber-500 bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  resize: {
    id: 'resize',
    num: '04',
    label: 'Precision Scaling',
    shortLabel: 'Resize',
    tagline: 'Exact dimension resampling with smart aspect ratio and social platform presets',
    icon: Sliders,
    accentColor: 'text-indigo-500 bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
  },
  metadata: {
    id: 'metadata',
    num: '05',
    label: 'Forensic EXIF Metadata',
    shortLabel: 'EXIF',
    tagline: 'Inspect GPS & camera telemetry or scrub privacy traces before publishing',
    icon: ShieldAlert,
    accentColor: 'text-emerald-500 bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  utility: {
    id: 'utility',
    num: '06',
    label: 'Batch Suites & Utilities',
    shortLabel: 'Utilities',
    tagline: 'Multi-image zip packages, PDF cross-compilation, and color palette sampling',
    icon: Layers,
    accentColor: 'text-rose-500 bg-rose-500/10',
    borderColor: 'border-rose-500/30',
  },
};

const CATEGORY_ORDER: ToolCategory[] = ['convert', 'edit', 'compress', 'resize', 'metadata', 'utility'];

const QUICK_FORMATS = ['ALL', 'WEBP', 'PNG', 'JPG', 'HEIC', 'AVIF', 'PDF'];

export default function SearchTools({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grouped' | 'matrix'>('grouped');

  // Filter tools based on query, category, and format
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Category check
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Format check
      if (selectedFormat !== 'ALL') {
        const fmt = selectedFormat.toLowerCase();
        const hasFormat = tool.acceptedFormats.some((f) => f.toLowerCase().includes(fmt)) ||
          tool.outputFormat?.toLowerCase().includes(fmt) ||
          tool.slug.includes(fmt);
        if (!hasFormat) return false;
      }

      // Search query check
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchDesc = tool.shortDesc.toLowerCase().includes(q);
        const matchCat = tool.category.toLowerCase().includes(q);
        const matchFormats = tool.acceptedFormats.some((f) => f.toLowerCase().includes(q));
        const matchSlug = tool.slug.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat && !matchFormats && !matchSlug) {
          return false;
        }
      }

      return true;
    });
  }, [tools, selectedCategory, selectedFormat, query]);

  // Group filtered tools by category
  const groupedTools = useMemo(() => {
    const groups: Partial<Record<ToolCategory, Tool[]>> = {};
    for (const cat of CATEGORY_ORDER) {
      const catTools = filteredTools.filter((t) => t.category === cat);
      if (catTools.length > 0) {
        groups[cat] = catTools;
      }
    }
    return groups;
  }, [filteredTools]);

  const isFiltered = query.trim() !== '' || selectedCategory !== 'all' || selectedFormat !== 'ALL';

  const resetAllFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedFormat('ALL');
  };

  return (
    <div className="space-y-8">
      {/* Search & Control Console */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm p-5 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by operation (e.g. compress, heic to jpg, exif, pdf)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/80 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Toggle & Status */}
          <div className="flex items-center gap-3 justify-between sm:justify-end shrink-0">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <button
                onClick={() => setViewMode('grouped')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'grouped'
                    ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Categorized Sections"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clusters</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Dense Matrix Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Matrix</span>
              </button>
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 pl-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono-numbers">
                {filteredTools.length}
              </span>
              <span className="text-slate-400">/{tools.length}</span>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/80'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-75 font-mono">({tools.length})</span>
          </button>

          {CATEGORY_ORDER.map((catKey) => {
            const meta = CATEGORY_META[catKey];
            const isSelected = selectedCategory === catKey;
            const count = tools.filter((t) => t.category === catKey).length;
            const Icon = meta.icon;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{meta.shortLabel}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Format Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Format:
          </span>
          {QUICK_FORMATS.map((fmt) => {
            const active = selectedFormat === fmt;
            return (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-lg border transition-all ${
                  active
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/40 ring-1 ring-sky-500/30'
                    : 'border-slate-200/70 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {fmt}
              </button>
            );
          })}

          {isFiltered && (
            <button
              onClick={resetAllFilters}
              className="text-[11px] font-mono text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline ml-auto flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Content Rendering */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
          <Sparkles className="w-10 h-10 mx-auto text-sky-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No image utility matches your selection
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search query, or clear your category and format filters to view all 25 client-side modules.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-semibold hover:bg-sky-600 shadow-md shadow-sky-500/20 transition-all"
          >
            Show All 25 Utilities
          </button>
        </div>
      ) : viewMode === 'grouped' && selectedCategory === 'all' && !query.trim() && selectedFormat === 'ALL' ? (
        /* CLUSTER BLUEPRINT VIEW (Categorized with numbered modules) */
        <div className="space-y-12">
          {CATEGORY_ORDER.map((catKey) => {
            const catTools = groupedTools[catKey];
            if (!catTools || catTools.length === 0) return null;
            const meta = CATEGORY_META[catKey];
            const Icon = meta.icon;

            return (
              <div
                key={catKey}
                id={`cat-${catKey}`}
                className="scroll-mt-28 space-y-4"
              >
                {/* Category Group Header Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white dark:from-[#111827] dark:to-[#0b0f19] border border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-black tracking-widest text-slate-400 dark:text-slate-500">
                      {meta.num}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.accentColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{meta.label}</span>
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {catTools.length} {catTools.length === 1 ? 'tool' : 'tools'}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {meta.tagline}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory(catKey)}
                    className="self-start md:self-center text-xs font-mono font-semibold text-sky-500 dark:text-sky-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Focus Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Cluster Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {catTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DENSE MATRIX OR FILTERED VIEW */
        <div className="space-y-4">
          {isFiltered && (
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  Showing {filteredTools.length} of {tools.length} modules
                </span>
                {selectedCategory !== 'all' && (
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    in {CATEGORY_META[selectedCategory].label}
                  </span>
                )}
                {selectedFormat !== 'ALL' && (
                  <span className="text-sky-500">[{selectedFormat}]</span>
                )}
              </div>
              <button
                onClick={resetAllFilters}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
