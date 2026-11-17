import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/mukta/devanagari-400.css';
import '@fontsource/mukta/devanagari-600.css';
import '@fontsource/mukta/devanagari-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './globals.css';
import { agency, contact, faqs, org, site } from '@/content/site';

const SITE = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Samridhi.si: Samridhi tabhi sachchi hai, jab woh sabki ho',
  description:
    'Samridhi brings knowledge, technology and opportunity to the people and places that have been left out. A CSR initiative of FAB5, launching soon.',
  authors: [{ name: `${agency.name}, ${agency.legalName}`, url: agency.url }],
  creator: agency.name,
  publisher: org.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: site.name,
    title: 'Samridhi tabhi sachchi hai, jab woh sabki ho',
    description: 'Because progress means more when we grow together. A CSR initiative of FAB5, launching soon.',
    // JPG, not WebP: some link-preview systems (older WhatsApp, LinkedIn) handle it more reliably.
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Samridhi tabhi sachchi hai, jab woh sabki ho. A CSR initiative of FAB5.' }],
    locale: 'en_IN'
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFFFFF'
};

const address = { '@type': 'PostalAddress', streetAddress: 'A-60, Sector 2', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', postalCode: '201301', addressCountry: 'IN' };

// Organization (FAB5, which runs Samridhi), WebSite (crediting DIV as creator) and FAQPage.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#fab5`,
      name: org.name,
      alternateName: org.short,
      email: contact.email,
      address
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#samridhi`,
      name: 'Samridhi',
      alternateName: site.name,
      url: `${SITE}/`,
      logo: `${SITE}/icon-512.png`,
      description: 'A CSR initiative of FAB5 that brings knowledge, technology and opportunity to people and places that have been left out.',
      email: contact.email,
      address,
      parentOrganization: { '@id': `${SITE}/#fab5` }
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: site.name,
      url: `${SITE}/`,
      inLanguage: ['en', 'hi'],
      publisher: { '@id': `${SITE}/#samridhi` },
      creator: {
        '@type': 'Organization',
        name: agency.name,
        legalName: agency.legalName,
        url: agency.url,
        address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' }
      }
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/#faq`,
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
