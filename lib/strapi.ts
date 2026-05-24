const STRAPI_URL = process.env.STRAPI_URL ?? ''
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? ''

// ─── Types ───────────────────────────────────────────────────────────────────

export type InsurerPlan = {
  id: 'terceros' | 'terceros-plus' | 'todo-riesgo'
  name: string
  tagline: string
  priceFrom: string
  recommended: boolean
  included: string[]
  excluded: string[] | null
  excludedNote?: string
}

export type InsurerReview = {
  stars: 1 | 2 | 3 | 4 | 5
  quote: string
  authorName: string
  vehicle: string
}

// Percentages 0-100, not raw counts
export type RatingBreakdown = {
  five: number
  four: number
  three: number
  two: number
  one: number
}

export type PersonaCard = {
  icon: string
  title: string
  description: string
  linkText: string
  linkHref: string
}

export type CoverageRow = {
  feature: string
  terceros: 'yes' | 'no' | 'partial' | string
  tercerosPlus: 'yes' | 'no' | 'partial' | string
  todoRiesgo: 'yes' | 'no' | 'partial' | string
  tooltip?: string
}

export type Insurer = {
  slug: string
  name: string
  tagline: string
  foundedYear: number
  rating: number
  reviewCount: number
  priceFrom: string
  sinisterResponse: string
  description: string
  updatedMonth: string
  ratingBreakdown: RatingBreakdown
  plans: [InsurerPlan, InsurerPlan, InsurerPlan]
  comparisonRows: CoverageRow[]
  pros: string[]
  cons: string[]
  personas: PersonaCard[]
  reviews: InsurerReview[]
}

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
    if (!res.ok) {
      console.error(`[strapi] ${res.status} ${res.statusText} → ${url}`)
      return null
    }
    const json = await res.json()
    const data = json.data ?? null
    console.log(`[strapi] OK → ${url} | data:`, Array.isArray(data) ? `array[${data.length}]` : data)
    return data as T
  } catch (err) {
    console.error(`[strapi] fetch error → ${url}`, err)
    return null
  }
}

// Strapi v5 returns flat objects — no `attributes` wrapper.
// Components embed `id` and `__component`. We strip those in the mapper.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapInsurer(raw: Record<string, any>): Insurer {
  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline ?? '',
    foundedYear: raw.foundedYear,
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    priceFrom: raw.priceFrom,
    sinisterResponse: raw.sinisterResponse,
    description: raw.description ?? '',
    updatedMonth: raw.updatedMonth ?? '',
    ratingBreakdown: {
      five: raw.ratingBreakdown?.five ?? 0,
      four: raw.ratingBreakdown?.four ?? 0,
      three: raw.ratingBreakdown?.three ?? 0,
      two: raw.ratingBreakdown?.two ?? 0,
      one: raw.ratingBreakdown?.one ?? 0,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plans: (raw.plans ?? []).map((p: any) => ({
      id: p.planId as InsurerPlan['id'],
      name: p.name,
      tagline: p.tagline ?? '',
      priceFrom: p.priceFrom,
      recommended: p.recommended ?? false,
      included: p.included ?? [],
      excluded: p.excluded ?? null,
      excludedNote: p.excludedNote,
    })) as [InsurerPlan, InsurerPlan, InsurerPlan],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comparisonRows: (raw.comparisonRows ?? []).map((r: any) => ({
      feature: r.feature,
      terceros: r.terceros,
      tercerosPlus: r.tercerosPlus,
      todoRiesgo: r.todoRiesgo,
      tooltip: r.tooltip,
    })),
    pros: raw.pros ?? [],
    cons: raw.cons ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    personas: (raw.personas ?? []).map((p: any) => ({
      icon: p.icon,
      title: p.title,
      description: p.description,
      linkText: p.linkText,
      linkHref: p.linkHref,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: (raw.reviews ?? []).map((r: any) => ({
      stars: r.stars as InsurerReview['stars'],
      quote: r.quote,
      authorName: r.authorName,
      vehicle: r.vehicle,
    })),
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllAseguradoras(): Promise<{ slug: string }[]> {
  const remote = await strapiGet<{ slug: string }[]>(
    'aseguradoras?fields[0]=slug&pagination[pageSize]=100',
    86400,
  )
  return remote ?? []
}

export async function getInsurer(slug: string): Promise<Insurer | null> {
  type StrapiItem = Record<string, unknown>
  const remote = await strapiGet<StrapiItem[]>(
    `aseguradoras?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    3600,
  )
  return remote?.[0] ? mapInsurer(remote[0]) : null
}
