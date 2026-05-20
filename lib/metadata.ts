import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

export const baseMetadata: Metadata = {
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
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface BuildMetadataOptions extends Omit<Metadata, 'alternates'> {
  /**
   * Path used to generate the canonical URL.
   * Pass the route without the base URL, e.g. "/seguros-de-auto/cotizar".
   * Defaults to "/" for root pages.
   */
  canonicalPath?: string
}

/**
 * Merge per-route metadata with site defaults.
 * Always generates a canonical URL from NEXT_PUBLIC_SITE_URL + canonicalPath.
 *
 * Usage:
 *   export const metadata = buildMetadata({
 *     title: 'Sancor Seguros — Cobertura y precios',
 *     description: '...',
 *     canonicalPath: '/aseguradoras/sancor-seguros',
 *   })
 */
export function buildMetadata({
  canonicalPath = '/',
  ...overrides
}: BuildMetadataOptions = {}): Metadata {
  const canonical = canonicalPath.startsWith('/')
    ? canonicalPath
    : `/${canonicalPath}`

  return {
    ...baseMetadata,
    ...overrides,
    alternates: {
      canonical,
    },
    openGraph: {
      ...(baseMetadata.openGraph as object),
      ...(overrides.openGraph as object | undefined),
      ...(overrides.title ? { title: overrides.title as string } : {}),
      ...(overrides.description ? { description: overrides.description } : {}),
    },
    twitter: {
      ...(baseMetadata.twitter as object),
      ...(overrides.twitter as object | undefined),
      ...(overrides.title ? { title: overrides.title as string } : {}),
      ...(overrides.description ? { description: overrides.description } : {}),
    },
  }
}

/** Returns the absolute URL for a given path. */
export function absoluteUrl(path: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const normalised = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalised}`
}
