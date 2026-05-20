import type { MetadataRoute } from 'next'
import { getAllAseguradoras } from '@/lib/strapi'
import { getAllArticleSlugs } from '@/lib/blog'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

export const revalidate = 86400 // Rebuild sitemap daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [aseguradoras, articleSlugs] = await Promise.all([
    getAllAseguradoras(),
    getAllArticleSlugs(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seguros-de-auto/cotizar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const insurerPages: MetadataRoute.Sitemap = aseguradoras.map(({ slug }) => ({
    url: `${BASE_URL}/aseguradoras/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articleSlugs.map(({ categoria, slug }) => ({
    url: `${BASE_URL}/blog/${categoria}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...insurerPages, ...articlePages]
}
