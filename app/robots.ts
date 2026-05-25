import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // Server-side API routes — never public
        ],
        // NOTE: Do NOT disallow /_next/ — crawlers need render-critical CSS/JS
        // NOTE: /seguros-de-auto/cotizar is intentionally indexed (captures "cotizar seguro auto" queries)
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
