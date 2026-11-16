import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/mukta/devanagari-400.css';
import '@fontsource/mukta/devanagari-600.css';
import '@fontsource/mukta/devanagari-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './globals.css';
import { agency, org } from '@/content/site';

const SITE = 'https://samridhi.si';

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
    siteName: 'Samridhi.si',
    title: 'Samridhi tabhi sachchi hai, jab woh sabki ho',
    description: 'Because progress means more when we grow together. A CSR initiative of FAB5, launching soon.',
    images: [{ url: '/images/v2/schoolgirls-laptop.webp', width: 1200, height: 779, alt: 'Two schoolgirls sharing a laptop' }],
    locale: 'en_IN'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFFFFF'
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Samridhi.si',
  url: `${SITE}/`,
  inLanguage: ['en', 'hi'],
  publisher: { '@type': 'Organization', name: org.name, alternateName: org.short },
  creator: {
    '@type': 'Organization',
    name: agency.name,
    legalName: agency.legalName,
    url: agency.url,
    address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
