const STRAPI_URL = process.env.STRAPI_URL ?? ''
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? ''

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleCategory = 'guias' | 'comparativas' | 'consejos' | 'novedades'

export type BlogArticle = {
  slug: string
  categoria: ArticleCategory
  title: string
  excerpt: string
  author: string
  authorRole: string
  publishedAt: string // ISO date: "2026-05-12"
  readMinutes: number
  featured: boolean
  tags: string[]
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  guias: 'Guías',
  comparativas: 'Comparativas',
  consejos: 'Consejos',
  novedades: 'Novedades',
}

export const CATEGORY_STYLES: Record<ArticleCategory, { bg: string; text: string }> = {
  guias: { bg: 'bg-green-700', text: 'text-white' },
  comparativas: { bg: 'bg-accent-300', text: 'text-accent-700' },
  consejos: { bg: 'bg-primary-50', text: 'text-primary-700' },
  novedades: { bg: 'bg-neutral-200', text: 'text-neutral-700' },
}

export const ALL_CATEGORIES: ArticleCategory[] = ['guias', 'comparativas', 'consejos', 'novedades']

// ─── Strapi v5 Client ─────────────────────────────────────────────────────────

async function strapiGet<T>(path: string, revalidate = 3600): Promise<T | null> {
  if (!STRAPI_URL) return null
  const url = `${STRAPI_URL}/api/${path}`
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data ?? null) as T
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(raw: Record<string, any>): BlogArticle {
  return {
    slug: raw.slug,
    categoria: raw.categoria as ArticleCategory,
    title: raw.title,
    excerpt: raw.excerpt ?? '',
    author: raw.author ?? '',
    authorRole: raw.authorRole ?? '',
    publishedAt: raw.publishedAt ?? raw.createdAt ?? '',
    readMinutes: raw.readMinutes ?? 5,
    featured: raw.featured ?? false,
    tags: raw.tags ?? [],
  }
}

// ─── Static Seed Data ─────────────────────────────────────────────────────────

const STATIC_ARTICLES: BlogArticle[] = [
  {
    slug: 'terceros-plus-todo-riesgo-comparativa',
    categoria: 'guias',
    title: 'Terceros, Terceros Plus o Todo Riesgo: ¿cuál conviene en 2026?',
    excerpt:
      'Entendé las diferencias reales entre cada tipo de cobertura y descubrí cuál se adapta mejor a tu auto y tu presupuesto.',
    author: 'Lucía Andrade',
    authorRole: 'Experta en seguros automotor',
    publishedAt: '2026-05-12',
    readMinutes: 8,
    featured: true,
    tags: ['coberturas', 'terceros', 'todo riesgo'],
  },
  {
    slug: 'como-dar-parte-siniestro-argentina',
    categoria: 'guias',
    title: 'Cómo dar el parte de un siniestro: guía paso a paso 2026',
    excerpt:
      'Tuviste un accidente o te robaron el auto. Estos son los pasos exactos para que tu aseguradora te responda sin problemas.',
    author: 'Martín Rey',
    authorRole: 'Asesor de seguros',
    publishedAt: '2026-05-08',
    readMinutes: 6,
    featured: false,
    tags: ['siniestros', 'parte', 'accidente'],
  },
  {
    slug: 'que-es-la-franquicia-seguro-auto',
    categoria: 'guias',
    title: '¿Qué es la franquicia en un seguro de auto y cómo elegirla?',
    excerpt:
      'La franquicia impacta directamente en tu prima mensual y en lo que pagás si tenés un siniestro. Te explicamos todo antes de que firmes.',
    author: 'Lucía Andrade',
    authorRole: 'Experta en seguros automotor',
    publishedAt: '2026-04-24',
    readMinutes: 5,
    featured: false,
    tags: ['franquicia', 'prima', 'conceptos'],
  },
  {
    slug: 'sancor-vs-zurich-2026',
    categoria: 'comparativas',
    title: 'Sancor vs Zurich: comparativa completa de precios y coberturas',
    excerpt:
      'Analizamos en detalle las dos aseguradoras más consultadas en Argentina para que puedas decidir con información real.',
    author: 'Martín Rey',
    authorRole: 'Asesor de seguros',
    publishedAt: '2026-05-06',
    readMinutes: 10,
    featured: false,
    tags: ['sancor', 'zurich', 'comparativa'],
  },
  {
    slug: 'mejores-aseguradoras-auto-argentina-2026',
    categoria: 'comparativas',
    title: 'Las 5 mejores aseguradoras de auto en Argentina según opiniones reales',
    excerpt:
      'Analizamos más de 4.000 reseñas de asegurados para determinar cuáles tienen mejor relación precio-calidad en 2026.',
    author: 'Lucía Andrade',
    authorRole: 'Experta en seguros automotor',
    publishedAt: '2026-04-30',
    readMinutes: 12,
    featured: false,
    tags: ['ranking', 'mejores aseguradoras', 'opiniones'],
  },
  {
    slug: 'atlantida-vs-federacion-patronal',
    categoria: 'comparativas',
    title: 'Atlántida vs Federación Patronal: ¿cuál es mejor para el interior?',
    excerpt:
      'Dos grandes aseguradoras nacionales con fuerte presencia en el interior del país. Te mostramos cuál gana en cada dimensión.',
    author: 'Martín Rey',
    authorRole: 'Asesor de seguros',
    publishedAt: '2026-04-15',
    readMinutes: 9,
    featured: false,
    tags: ['atlántida', 'federación patronal', 'comparativa'],
  },
  {
    slug: 'seguro-auto-0km-argentina',
    categoria: 'consejos',
    title: '¿Cuánto cuesta el seguro de un auto 0 km en Argentina?',
    excerpt:
      'Los autos nuevos tienen particularidades que afectan el precio del seguro. Te explicamos todo antes de que contrates.',
    author: 'Lucía Andrade',
    authorRole: 'Experta en seguros automotor',
    publishedAt: '2026-04-28',
    readMinutes: 6,
    featured: false,
    tags: ['auto 0km', 'precio seguro'],
  },
  {
    slug: '7-errores-contratar-seguro-auto',
    categoria: 'consejos',
    title: '7 errores que cometés al contratar un seguro de auto',
    excerpt:
      'Desde elegir solo por precio hasta no declarar modificaciones: los errores más comunes que terminan en siniestros sin cobertura.',
    author: 'Martín Rey',
    authorRole: 'Asesor de seguros',
    publishedAt: '2026-04-10',
    readMinutes: 7,
    featured: false,
    tags: ['errores', 'consejos', 'contratación'],
  },
  {
    slug: 'precios-seguros-auto-2026',
    categoria: 'novedades',
    title: 'Seguros de auto en Argentina: cómo evolucionaron los precios en 2026',
    excerpt:
      'Primer semestre de 2026: los seguros aumentaron un promedio del 68% interanual. Te mostramos qué aseguradoras aumentaron menos.',
    author: 'Lucía Andrade',
    authorRole: 'Experta en seguros automotor',
    publishedAt: '2026-05-01',
    readMinutes: 5,
    featured: false,
    tags: ['precios', 'inflación', 'mercado'],
  },
]

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllArticles(categoria?: string): Promise<BlogArticle[]> {
  const categoryFilter = categoria
    ? `&filters[categoria][$eq]=${encodeURIComponent(categoria)}`
    : ''

  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    `articulos?sort=publishedAt:desc&pagination[pageSize]=50${categoryFilter}&populate=*`,
    3600,
  )

  if (remote) return remote.map(mapArticle)

  if (categoria) {
    return STATIC_ARTICLES.filter((a) => a.categoria === categoria)
  }
  return STATIC_ARTICLES
}

export async function getFeaturedArticle(): Promise<BlogArticle | null> {
  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    'articulos?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[pageSize]=1&populate=*',
    3600,
  )
  if (remote?.[0]) return mapArticle(remote[0])
  return STATIC_ARTICLES.find((a) => a.featured) ?? null
}

export async function getAllArticleSlugs(): Promise<{ categoria: string; slug: string }[]> {
  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    'articulos?fields[0]=slug&fields[1]=categoria&pagination[pageSize]=200',
    86400,
  )
  if (remote) {
    return remote.map((r) => ({ categoria: String(r.categoria), slug: String(r.slug) }))
  }
  return STATIC_ARTICLES.map(({ categoria, slug }) => ({ categoria, slug }))
}

/** Format ISO date string to human-readable Spanish short date */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${day} ${months[month - 1]} ${year}`
}
