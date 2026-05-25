import type { MetadataRoute } from 'next'
import { getAllAseguradoras } from '@/lib/strapi'
import { getAllArticleSlugs, ALL_CATEGORIES } from '@/lib/blog'
import { MARCAS } from '@/lib/vehiculos'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

export const revalidate = 86400

// Hardcoded fallback slugs so the sitemap stays complete even when Strapi is down
const INSURER_SLUGS_FALLBACK = [
  'sancor-seguros',
  'zurich',
  'federacion-patronal',
  'la-meridional',
  'san-cristobal',
  'mapfre',
  'allianz',
  'galicia-seguros',
  'triunfo-seguros',
  'bbva-seguros',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [strapiAseguradoras, articleSlugs] = await Promise.all([
    getAllAseguradoras(),
    getAllArticleSlugs(),
  ])

  // Use Strapi slugs when available; fall back to hardcoded list
  const insurerSlugs =
    strapiAseguradoras.length > 0
      ? strapiAseguradoras.map((a) => a.slug)
      : INSURER_SLUGS_FALLBACK

  // ─── Priority guide ───────────────────────────────────────────────────────
  // 1.0  Home
  // 0.95 Primary SEO landing (seguros-de-auto)
  // 0.85 Conversion entry point (cotizar)
  // 0.80 Major listing pages (aseguradoras, vehiculos, blog)
  // 0.75 Individual insurer pages, blog categories
  // 0.70 Brand pages, blog articles
  // 0.60 Informational institutional (como-funciona, preguntas-frecuentes, sobre-ramsar)
  // 0.50 Support pages (contacto, ayuda)
  // 0.30 Legal / secondary pages (privacidad, terminos, cookies, trabaja-con-nosotros)

  const staticPages: MetadataRoute.Sitemap = [
    // ── Tier 1: home ─────────────────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // ── Tier 2: primary SEO / conversion ─────────────────────────────────────
    {
      url: `${BASE_URL}/seguros-de-auto`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/seguros-de-auto/cotizar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // ── Tier 3: major listing pages ───────────────────────────────────────────
    {
      url: `${BASE_URL}/aseguradoras`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vehiculos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // ── Tier 4: informational institutional ──────────────────────────────────
    {
      url: `${BASE_URL}/como-funciona`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/preguntas-frecuentes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sobre-ramsar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.55,
    },

    // ── Tier 5: support ───────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/ayuda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // ── Tier 6: legal / secondary ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/trabaja-con-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // ── Blog category pages ───────────────────────────────────────────────────
  const blogCategoryPages: MetadataRoute.Sitemap = ALL_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/blog/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // ── Insurer detail pages ──────────────────────────────────────────────────
  const insurerPages: MetadataRoute.Sitemap = insurerSlugs.map((slug) => ({
    url: `${BASE_URL}/aseguradoras/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // ── Vehicle brand pages ───────────────────────────────────────────────────
  const vehiclePages: MetadataRoute.Sitemap = MARCAS.map(({ slug }) => ({
    url: `${BASE_URL}/vehiculos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // ── Blog article pages ────────────────────────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = articleSlugs.map(({ categoria, slug }) => ({
    url: `${BASE_URL}/blog/${categoria}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [
    ...staticPages,
    ...blogCategoryPages,
    ...insurerPages,
    ...vehiclePages,
    ...articlePages,
  ]
}
