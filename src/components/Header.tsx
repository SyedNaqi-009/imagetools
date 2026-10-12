'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Cpu, Sparkles, ShieldCheck, Layers } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const categories = [
  { name: 'Compression', desc: 'Lossless & high-ratio', href: '/tools/image-compressor', count: '1 Tool' },
  { name: 'Dimension & Crop', desc: 'Aspect locks & presets', href: '/tools/image-resizer', count: '3 Tools' },
  { name: 'Format Converters', desc: 'WebP, AVIF, PNG, JPG, SVG', href: '/tools/image-converter', count: '12 Tools' },
  { name: 'Studio Editing', desc: 'Background, rotate, flip', href: '/tools/background-remover', count: '3 Tools' },
  { name: 'EXIF & Security', desc: 'GPS scrubber & inspector', href: '/tools/exif-metadata-viewer', count: '2 Tools' },
  { name: 'Batch & Utilities', desc: 'PDF, bulk ZIP, color pipette', href: '/tools/bulk-image-converter', count: '4 Tools' },
];

const navLinks = [
  { name: 'Studio Home', href: '/' },
  { name: 'Technical Guides', href: '/blog' },
  { name: 'Engine Specs', href: '/about' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#0b0f19]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-teal-400 p-[1.5px] shadow-sm shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow">
            <div className="w-full h-full bg-white dark:bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sky-500 dark:text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-slate-100">
                Image<span className="text-sky-500 dark:text-sky-400">Tools</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wider uppercase">
              Client-Side Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all"
            >
              {link.name}
            </Link>
          ))}

          {/* Tools Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onBlur={() => setTimeout(() => setToolsOpen(false), 250)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all"
            >
              <Layers className="w-4 h-4 text-sky-500" />
              <span>Tool Suites</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5">
                  Browse by Capability
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-500 dark:group-hover:text-sky-400">
                          {cat.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {cat.desc}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

          {/* Privacy Signal Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>0% Server Logs</span>
          </div>

          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f19] px-4 py-5 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
              Featured Suites
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-sky-500"
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{cat.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{cat.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
