import Head from 'next/head';

export const FAQ = [
  {
    q: 'What is Base64?',
    a: 'Base64 is an encoding that represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, + and /). It is commonly used to embed data in JSON, HTML, emails and URLs.',
  },
  {
    q: 'Is Base64 encryption?',
    a: 'No. Base64 is reversible by anyone and offers no security. Never use it to protect secrets.',
  },
  {
    q: 'What is URL-safe Base64?',
    a: 'A variant that swaps + and / for - and _ and drops the = padding, so the result can be placed safely in URLs and file names.',
  },
  {
    q: 'Is my data uploaded?',
    a: 'No. Conversion happens entirely in your browser. Only the optional /api/base64 endpoint processes data on the server.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Base64 Workbench',
      url: 'https://base64.dcesares.dev/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

export default function About() {
  return (
    <section aria-labelledby="faq-title" className="mb-5 rounded-2xl border border-white/10 bg-white/[.03] p-4 sm:p-5">
      <h2 id="faq-title" className="mb-3 text-sm font-medium">Good to know</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {FAQ.map(({ q, a }) => (
          <div key={q}>
            <h3 className="text-sm font-medium text-zinc-200">{q}</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-400">{a}</p>
          </div>
        ))}
      </div>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
    </section>
  );
}
