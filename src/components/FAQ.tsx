import { HelpCircle, ChevronDown } from 'lucide-react';

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
    <section className="my-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-sky-500 font-bold">
        <HelpCircle className="w-4 h-4" />
        <span>Frequently Clarified Topics</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
        Common Questions &amp; Technical Clarifications
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
        Transparent technical explanations regarding in-browser processing, memory footprints, format boundaries, and security.
      </p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827] overflow-hidden transition-all duration-200 open:border-sky-500/40 dark:open:border-sky-500/40 open:shadow-md"
          >
            <summary className="flex items-center justify-between cursor-pointer px-6 py-4.5 text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors select-none text-sm sm:text-base">
              <span>{faq.q}</span>
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 ml-4 group-open:bg-sky-500/10 group-open:text-sky-500 transition-colors">
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 group-open:text-sky-500 transition-transform duration-200" />
              </div>
            </summary>
            <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100/60 dark:border-slate-800/60">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
