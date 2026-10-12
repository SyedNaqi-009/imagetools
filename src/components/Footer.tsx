import Link from 'next/link';
import { Cpu, ShieldCheck, Zap, Lock, Terminal, Globe, Heart } from 'lucide-react';

const suites = [
  { name: 'Image Compressor', href: '/tools/image-compressor', tag: 'WebP / AVIF' },
  { name: 'Bulk Image Converter', href: '/tools/bulk-image-converter', tag: 'ZIP Batch' },
  { name: 'Image Resizer', href: '/tools/image-resizer', tag: 'Ratio Lock' },
  { name: 'Background Remover', href: '/tools/background-remover', tag: 'Auto Corner' },
  { name: 'HEIC to JPG Converter', href: '/tools/heic-to-jpg', tag: 'Apple RAW' },
  { name: 'Image to PDF Engine', href: '/tools/image-to-pdf', tag: 'Multi-Page' },
  { name: 'EXIF Metadata Stripper', href: '/tools/exif-metadata-remover', tag: 'Privacy Fix' },
  { name: 'Color Palette Extractor', href: '/tools/color-picker-from-image', tag: 'HEX Samples' },
];

const knowledgeGuides = [
  { name: 'Compress Without Loss', href: '/blog/how-to-compress-images-without-losing-quality' },
  { name: 'WebP vs AVIF Comparison', href: '/blog/avif-vs-webp-next-gen-formats' },
  { name: 'Social Media Canvas Sizes', href: '/blog/how-to-resize-images-for-social-media' },
  { name: 'JPG vs PNG Web Guide', href: '/blog/png-vs-jpg-which-format-to-use' },
  { name: 'HEIC Format Deep Dive', href: '/blog/heic-vs-jpg-format-comparison' },
];

const legalAndMeta = [
  { name: 'Privacy Manifesto', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-and-conditions' },
  { name: 'Legal Disclaimer', href: '/disclaimer' },
  { name: 'Architecture & About', href: '/about' },
  { name: 'Direct Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-[#070a11] text-slate-400 border-t border-slate-800">
      {/* Top Architecture Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">100% In-Browser Isolation</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Images never leave your RAM. Zero server uploads, zero external telemetry, zero storage logs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Hardware Thread Acceleration</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Powered by native WebAssembly, Web Workers, and HTML5 Canvas for near-instant offline speed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Zero Watermark Restrictions</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Completely unlimited free usage without paywalls, sign-up requirements, or loss of metadata.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-slate-950 font-black">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Image<span className="text-sky-400">Tools</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An open-web client-side media workstation. We reject bloated cloud subscriptions in favor of high-performance, private, browser-native image manipulation utilities.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Next.js 16 • Turbopack • WebAssembly</span>
            </div>
          </div>

          {/* Quick Tool Suites */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">
              Core Image Suites
            </h3>
            <ul className="space-y-2 text-sm">
              {suites.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:bg-sky-500/10 group-hover:text-sky-400 transition-colors">
                      {s.tag}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge & Guides */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">
              Format &amp; Tech Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              {knowledgeGuides.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="hover:text-sky-400 transition-colors block line-clamp-1 text-slate-400"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
                >
                  View All 10 Technical Articles &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">
              Governance
            </h3>
            <ul className="space-y-2 text-sm">
              {legalAndMeta.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-sky-400 transition-colors text-slate-400">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ImageTools Studio. Engineered for absolute privacy.
          </div>
          <div className="flex items-center gap-3">
            <span>Client Execution Guaranteed</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
