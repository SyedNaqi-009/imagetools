interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section className="my-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-left font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {faq.q}
              <span className="ml-2 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
