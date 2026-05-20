import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

/* ── Fonts (next/font — no external network requests at runtime) ── */

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

/* ── Viewport (must be separate export — not inside metadata) ── */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f8f7f4',
}

/* ── Root Metadata defaults ── */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ramsar Seguros — Comparador de Seguros de Auto en Argentina',
    template: '%s | Ramsar Seguros',
  },
  description:
    'Compará seguros de auto de las 14 mejores aseguradoras de Argentina en 2 minutos. Cotizá gratis, sin llamados, con firma digital.',
  keywords: [
    'seguros de auto Argentina',
    'comparador de seguros de auto',
    'cotizar seguro de auto',
    'mejor seguro de auto Argentina',
    'seguro automotor',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Ramsar Seguros',
    title: 'Ramsar Seguros — Comparador de Seguros de Auto',
    description:
      'Compará seguros de auto de las 14 mejores aseguradoras de Argentina en 2 minutos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ramsar Seguros — Comparador de Seguros de Auto en Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramsar Seguros — Comparador de Seguros de Auto',
    description:
      'Compará seguros de auto de las 14 mejores aseguradoras de Argentina en 2 minutos.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* ── InsuranceAgency JSON-LD — site-level schema ── */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Ramsar Seguros',
  description:
    'Comparador de seguros de auto en Argentina. Comparamos las mejores aseguradoras para que elijas con información real.',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
  serviceType: 'Seguro de Automóvil',
  knowsLanguage: 'es-AR',
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={[
        geist.variable,
        geistMono.variable,
        instrumentSerif.variable,
        'h-full',
      ].join(' ')}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}
