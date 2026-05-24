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
  coverUrl?: string
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

// ─── Strapi v5 populate helpers ──────────────────────────────────────────────
// DynamicZones require the `on` fragment per component — `populate[blocks]=*` is invalid.

const BLOCKS_POPULATE = [
  'populate[blocks][on][blog.content-heading][fields][0]=level',
  'populate[blocks][on][blog.content-heading][fields][1]=anchorId',
  'populate[blocks][on][blog.content-heading][fields][2]=text',
  'populate[blocks][on][blog.content-paragraph][fields][0]=text',
  'populate[blocks][on][blog.content-list][fields][0]=listType',
  'populate[blocks][on][blog.content-list][fields][1]=items',
  'populate[blocks][on][blog.content-callout][fields][0]=variant',
  'populate[blocks][on][blog.content-callout][fields][1]=title',
  'populate[blocks][on][blog.content-callout][fields][2]=body',
  'populate[blocks][on][blog.content-image][fields][0]=alt',
  'populate[blocks][on][blog.content-image][fields][1]=caption',
  'populate[blocks][on][blog.content-image][populate][image][fields][0]=url',
  'populate[blocks][on][blog.content-table][fields][0]=caption',
  'populate[blocks][on][blog.content-table][fields][1]=headers',
  'populate[blocks][on][blog.content-table][fields][2]=rows',
].join('&')

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
      next: process.env.NODE_ENV === 'development'
        ? { revalidate: 0 }
        : { revalidate },
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
  // author comes as a populated relation object from Strapi, or a plain string from static data
  const authorRel = raw.author && typeof raw.author === 'object' ? raw.author : null
  const coverUrl: string | undefined = raw.cover?.url
    ? `${process.env.STRAPI_URL ?? ''}${raw.cover.url}`
    : undefined

  return {
    slug: raw.slug,
    categoria: raw.categoria as ArticleCategory,
    title: raw.title,
    excerpt: raw.excerpt ?? '',
    author: authorRel?.name ?? (typeof raw.author === 'string' ? raw.author : ''),
    authorRole: authorRel?.role ?? raw.authorRole ?? '',
    ...(coverUrl && { coverUrl }),
    publishedAt: raw.publishedAt ?? raw.createdAt ?? '',
    readMinutes: raw.readMinutes ?? 5,
    featured: raw.featured ?? false,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlocks(raw: Record<string, any>[]): ContentBlock[] {
  return raw.flatMap((block): ContentBlock[] => {
    switch (block.__component) {
      case 'blog.content-heading':
        return [{ type: block.level as 'h2' | 'h3', id: block.anchorId, text: block.text }]
      case 'blog.content-paragraph':
        return [{ type: 'p', text: block.text }]
      case 'blog.content-list':
        return [{ type: block.listType as 'ul' | 'ol', items: Array.isArray(block.items) ? block.items : [] }]
      case 'blog.content-callout':
        return [{ type: 'callout', variant: block.variant as 'tip' | 'warning' | 'info', title: block.title, body: block.body }]
      case 'blog.content-image':
        return [{ type: 'image', url: block.image?.url ?? '', alt: block.alt ?? '', caption: block.caption }]
      case 'blog.content-table':
        return [{ type: 'table', headers: block.headers ?? [], rows: block.rows ?? [] }]
      case 'blog.content-divider':
        return [{ type: 'hr' }]
      default:
        return []
    }
  })
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllArticles(categoria?: string): Promise<BlogArticle[]> {
  const categoryFilter = categoria
    ? `&filters[categoria][$eq]=${encodeURIComponent(categoria)}`
    : ''

  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    `articulos?sort=publishedAt:desc&pagination[pageSize]=50${categoryFilter}&populate[author][fields][0]=name&populate[author][fields][1]=role&populate[cover][fields][0]=url`,
    3600,
  )

  return remote ? remote.map(mapArticle) : []
}

export async function getFeaturedArticle(): Promise<BlogArticle | null> {
  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    'articulos?filters[featured][$eq]=true&sort=publishedAt:desc&pagination[pageSize]=1&populate[author][fields][0]=name&populate[author][fields][1]=role&populate[cover][fields][0]=url',
    3600,
  )
  return remote?.[0] ? mapArticle(remote[0]) : null
}

export async function getAllArticleSlugs(): Promise<{ categoria: string; slug: string }[]> {
  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    'articulos?fields[0]=slug&fields[1]=categoria&pagination[pageSize]=200',
    86400,
  )
  return remote ? remote.map((r) => ({ categoria: String(r.categoria), slug: String(r.slug) })) : []
}

/** Format ISO date string to human-readable Spanish short date */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// ─── Article Post Types ───────────────────────────────────────────────────────

export type ContentBlock =
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; title: string; body: string }
  | { type: 'image'; url: string; alt: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'hr' }

export type TocHeading = { id: string; text: string; level: 2 | 3 }

export type BlogPost = BlogArticle & {
  content: ContentBlock[]
  authorBio: string
}

export function extractTocHeadings(content: ContentBlock[]): TocHeading[] {
  return content
    .filter((b): b is Extract<ContentBlock, { type: 'h2' | 'h3' }> =>
      b.type === 'h2' || b.type === 'h3',
    )
    .map((b) => ({ id: b.id, text: b.text, level: b.type === 'h2' ? 2 : 3 }))
}

export async function getArticleBySlug(
  categoria: string,
  slug: string,
): Promise<BlogPost | null> {
  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    `articulos?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[categoria][$eq]=${encodeURIComponent(categoria)}&pagination[pageSize]=1&populate[author][fields][0]=name&populate[author][fields][1]=role&populate[author][fields][2]=bio&populate[cover][fields][0]=url&${BLOCKS_POPULATE}`,
    86400,
  )
  if (!remote?.[0]) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = remote[0] as Record<string, any>
  const base = mapArticle(raw)
  const authorRel = raw.author && typeof raw.author === 'object' ? raw.author : null
  return {
    ...base,
    authorBio: authorRel?.bio ?? `${base.author} es especialista en seguros automotor con experiencia en el mercado argentino.`,
    content: mapBlocks(Array.isArray(raw.blocks) ? raw.blocks : []),
  }
}

export async function getRelatedArticles(
  categoria: string,
  currentSlug: string,
  limit = 3,
): Promise<BlogArticle[]> {
  const all = await getAllArticles(categoria)
  return all.filter((a) => a.slug !== currentSlug).slice(0, limit)
}
