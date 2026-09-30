import Link from 'next/link';

const toolLinks = [
  { name: 'Image Compressor', href: '/tools/image-compressor' },
  { name: 'Image Resizer', href: '/tools/image-resizer' },
  { name: 'Background Remover', href: '/tools/background-remover' },
  { name: 'JPG to PNG', href: '/tools/jpg-to-png' },
  { name: 'PNG to JPG', href: '/tools/png-to-jpg' },
  { name: 'WebP to JPG', href: '/tools/webp-to-jpg' },
  { name: 'HEIC to JPG', href: '/tools/heic-to-jpg' },
  { name: 'Image to PDF', href: '/tools/image-to-pdf' },
];

const resourceLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'How to Compress Images', href: '/blog/how-to-compress-images-without-losing-quality' },
  { name: 'Best Image Formats', href: '/blog/best-image-format-for-websites' },
  { name: 'Social Media Sizes', href: '/blog/how-to-resize-images-for-social-media' },
  { name: 'About Us', href: '/about' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Disclaimer', href: '/disclaimer' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold text-blue-600">ImageTools</Link>
            <p className="mt-3 text-sm leading-relaxed">100% free online image tools. All processing happens in your browser — no images are ever uploaded to our servers. Your files stay private.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">Popular Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ImageTools. All rights reserved.</p>
          <p>Built for speed &amp; privacy. All processing happens in your browser.</p>
        </div>
      </div>
    </footer>
  );
}
