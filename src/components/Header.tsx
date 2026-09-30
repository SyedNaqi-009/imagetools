'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, ImageIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const categories = [
  { name: 'Compress', href: '/tools/image-compressor' },
  { name: 'Resize', href: '/tools/image-resizer' },
  { name: 'Convert', href: '/tools/image-converter' },
  { name: 'Edit', href: '/tools/image-cropper' },
  { name: 'Metadata', href: '/tools/exif-metadata-viewer' },
  { name: 'Utility', href: '/tools/image-to-pdf' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <ImageIcon className="w-6 h-6" />
          ImageTools
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {link.name}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onBlur={() => setTimeout(() => setToolsOpen(false), 200)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Tools <ChevronDown className="w-3 h-3" />
            </button>
            {toolsOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50">
                {categories.map((cat) => (
                  <Link key={cat.href} href={cat.href} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {link.name}
            </Link>
          ))}
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tools</div>
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
