import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://imagetools.dev${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />}
            {i === 0 && item.href && (
              <Link
                href={item.href}
                className="hover:text-sky-500 dark:hover:text-sky-400 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            )}
            {i > 0 && item.href ? (
              <Link
                href={item.href}
                className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : i > 0 ? (
              <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[220px] sm:max-w-none">
                {item.label}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
