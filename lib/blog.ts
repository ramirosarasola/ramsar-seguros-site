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

// ─── Article Post Types ───────────────────────────────────────────────────────

export type ContentBlock =
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; title: string; body: string }
  | { type: 'image'; alt: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'hr' }

export type TocHeading = { id: string; text: string; level: 2 | 3 }

export type BlogPost = BlogArticle & {
  content: ContentBlock[]
  authorBio: string
}

// ─── Mock Full Posts ──────────────────────────────────────────────────────────

const STATIC_POSTS: Record<string, BlogPost> = {
  'terceros-plus-todo-riesgo-comparativa': {
    slug: 'terceros-plus-todo-riesgo-comparativa',
    categoria: 'guias',
    title: 'Terceros, Terceros Plus o Todo Riesgo: ¿cuál conviene en 2026?',
    excerpt:
      'Entendé las diferencias reales entre cada tipo de cobertura y descubrí cuál se adapta mejor a tu auto y tu presupuesto.',
    author: 'Lucía Andrade',
    authorRole: 'Experta en seguros automotor',
    authorBio:
      'Lucía Andrade es especialista en seguros automotor con más de 12 años de experiencia en el mercado argentino. Asesora a conductores y empresas en la selección de coberturas y análisis de pólizas.',
    publishedAt: '2026-05-12',
    readMinutes: 8,
    featured: true,
    tags: ['coberturas', 'terceros', 'todo riesgo'],
    content: [
      {
        type: 'p',
        text: 'En Argentina, todos los conductores están obligados por ley a contar con un seguro automotor vigente. Pero dentro de esa obligación existe un abanico de opciones que va desde la cobertura mínima legal hasta la protección total del vehículo. Entender las diferencias reales es clave para no pagar de más ni quedar descubierto cuando más lo necesitás.',
      },
      {
        type: 'h2',
        id: 'coberturas',
        text: '¿Qué cubre cada tipo de póliza?',
      },
      {
        type: 'p',
        text: 'Las tres categorías de cobertura más comunes en Argentina difieren en qué riesgos cubren y, en consecuencia, en su costo mensual. No se trata solo de precio: cada tipo refleja un nivel distinto de exposición al riesgo que decidís asumir.',
      },
      {
        type: 'h3',
        id: 'terceros-basico',
        text: 'Responsabilidad civil obligatoria (Terceros básico)',
      },
      {
        type: 'p',
        text: 'La cobertura de Responsabilidad Civil cubre exclusivamente los daños que tu vehículo le cause a terceros: personas, otros autos o bienes materiales. No cubre tu propio auto bajo ninguna circunstancia. Es el seguro más económico del mercado y el mínimo que exige la Ley Nacional de Tránsito. Su prima es baja, pero resulta insuficiente en muchos escenarios cotidianos: si chocás solo, si te roban el auto o si graniza, quedás sin cobertura.',
      },
      {
        type: 'h3',
        id: 'terceros-plus',
        text: 'Terceros Plus',
      },
      {
        type: 'p',
        text: 'El Terceros Plus amplía la cobertura básica incorporando protección para tu propio vehículo en casos específicos: incendio total o parcial, robo o hurto total, y en muchas pólizas daños por fenómenos meteorológicos como granizo. El costo es moderadamente mayor al básico, pero la relación precio-protección suele ser muy conveniente para autos de valor medio o para quienes quieren protegerse del robo sin pagar una prima de Todo Riesgo.',
      },
      {
        type: 'h3',
        id: 'todo-riesgo',
        text: 'Todo Riesgo',
      },
      {
        type: 'p',
        text: 'La póliza Todo Riesgo es la cobertura más completa del mercado. Cubre los daños a terceros y también los daños propios del vehículo en cualquier circunstancia: accidentes, colisiones, vuelcos, actos vandálicos y más. En la práctica es la única cobertura que te protege si chocás solo, si alguien te raya el auto en el estacionamiento o si sufrís un siniestro parcial. La diferencia clave respecto al Terceros Plus es la cobertura de daños parciales propios.',
      },
      {
        type: 'table',
        headers: ['Cobertura', 'Básico', 'Terceros Plus', 'Todo Riesgo'],
        rows: [
          ['Daños a terceros', '✓', '✓', '✓'],
          ['Incendio (total/parcial)', '—', '✓', '✓'],
          ['Robo o hurto total', '—', '✓', '✓'],
          ['Daños propios por accidente', '—', '—', '✓'],
          ['Granizo y fenómenos climáticos', '—', 'Varía', '✓'],
          ['Daños parciales propios', '—', '—', '✓'],
          ['Cristales y accesorios', '—', '—', 'Opcional'],
        ],
      },
      {
        type: 'h2',
        id: 'como-elegir',
        text: '¿Cómo elegir según tu situación?',
      },
      {
        type: 'p',
        text: 'La elección correcta depende de tres variables principales: el valor actual de mercado de tu auto, tu perfil como conductor y tu capacidad real de absorber un gasto imprevisto de reparación sin afectar tu economía.',
      },
      {
        type: 'ul',
        items: [
          'Autos de más de 10 años con valor residual bajo: el Terceros Plus suele ser la opción más racional. El Todo Riesgo puede costarte más anualmente de lo que recuperarías en un siniestro total.',
          'Autos de 3 a 10 años o de valor medio-alto: el Todo Riesgo se justifica económicamente y eliminás la incertidumbre ante cualquier siniestro.',
          'Autos nuevos o de alta gama: el Todo Riesgo es prácticamente obligatorio. Un golpe de playa de estacionamiento puede costar más que varios meses de diferencia en la prima.',
          'Conductores con alta exposición vial (muchos km diarios, tráfico intenso, zonas de riesgo): priorizá el Todo Riesgo independientemente del valor del auto.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Regla práctica para decidir',
        body: 'Si el costo anual del Todo Riesgo supera el 15% del valor actual de mercado de tu auto, evaluá el Terceros Plus. Si es menor al 10%, el Todo Riesgo casi siempre conviene: es más barato que pagar una reparación mayor de tu bolsillo.',
      },
      {
        type: 'h2',
        id: 'precios-2026',
        text: 'El impacto de la inflación en las primas de 2026',
      },
      {
        type: 'p',
        text: 'En el primer semestre de 2026, las primas de seguros de auto registraron un incremento promedio del 68% interanual según datos del mercado asegurador argentino. Esta realidad cambió la ecuación precio-valor de algunas coberturas y llevó a muchos asegurados a reconsiderar su plan.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Dato de mercado 2026',
        body: 'Las aseguradoras que menos aumentaron sus primas en el primer semestre de 2026 son aquellas con carteras más diversificadas y menor siniestralidad acumulada. Consultá nuestra comparativa de precios actualizada para ver los valores reales por aseguradora y modelo.',
      },
      {
        type: 'p',
        text: 'Ante esta presión inflacionaria, muchos conductores optaron por bajar de Todo Riesgo a Terceros Plus para reducir el gasto mensual. No siempre es la decisión correcta: en autos de valor medio o alto, el ahorro mensual puede quedar anulado por un solo siniestro sin cobertura.',
      },
      {
        type: 'h2',
        id: 'conclusion',
        text: 'Conclusión: la cobertura perfecta no existe en abstracto',
      },
      {
        type: 'p',
        text: 'No existe una cobertura universalmente ideal: existe la cobertura ideal para tu auto, tu perfil de conductor y tu situación financiera. Lo que sí existe es una metodología para decidir bien y no lamentarlo después:',
      },
      {
        type: 'ol',
        items: [
          'Determiná el valor actual de mercado de tu auto (usá referencias como Mercado Libre o la guía de precios de tu aseguradora).',
          'Cotizá los tres tipos de cobertura con al menos tres aseguradoras distintas para tener precios reales.',
          'Calculá cuántos meses de diferencia de prima cubren el costo de reparación promedio para tu modelo.',
          'Evaluá tu exposición real al riesgo: km diarios, zona de circulación y tu historial de siniestros.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Tip Ramsar',
        body: 'Usá nuestro cotizador para comparar las coberturas y precios de las 14 principales aseguradoras de Argentina en menos de 2 minutos. Sin llamados, sin papeles, con firma digital.',
      },
    ],
  },

  'como-dar-parte-siniestro-argentina': {
    slug: 'como-dar-parte-siniestro-argentina',
    categoria: 'guias',
    title: 'Cómo dar el parte de un siniestro: guía paso a paso 2026',
    excerpt:
      'Tuviste un accidente o te robaron el auto. Estos son los pasos exactos para que tu aseguradora te responda sin problemas.',
    author: 'Martín Rey',
    authorRole: 'Asesor de seguros',
    authorBio:
      'Martín Rey es asesor de seguros automotor con más de 8 años de experiencia en el sector. Especialista en resolución de siniestros y gestión de pólizas para el mercado argentino.',
    publishedAt: '2026-05-08',
    readMinutes: 6,
    featured: false,
    tags: ['siniestros', 'parte', 'accidente'],
    content: [
      {
        type: 'p',
        text: 'Un accidente de tránsito o el robo del auto son situaciones de alto estrés. Sin embargo, lo que hagás en las primeras horas después del siniestro determina en gran medida si tu aseguradora te responde de forma rápida o si el trámite se complica innecesariamente. Esta guía te explica exactamente qué hacer, paso a paso.',
      },
      {
        type: 'h2',
        id: 'primeros-minutos',
        text: 'Qué hacer en los primeros minutos',
      },
      {
        type: 'p',
        text: 'Los primeros minutos tras un siniestro son críticos. Las acciones que tomés en ese momento van a definir la calidad de la documentación que puedas presentar a tu aseguradora.',
      },
      {
        type: 'h3',
        id: 'lesionados',
        text: 'Si hay personas lesionadas',
      },
      {
        type: 'ol',
        items: [
          'Llamá al SAME (107 en CABA) o al servicio de emergencias médicas de tu localidad.',
          'No mováis los vehículos hasta que llegue la policía, salvo que sea indispensable para liberar a heridos.',
          'Llamá al 911 para que quede un registro policial del hecho.',
          'Contactá a tu aseguradora para notificar el siniestro y pedir instrucciones específicas.',
        ],
      },
      {
        type: 'h3',
        id: 'solo-danos',
        text: 'Si solo hay daños materiales',
      },
      {
        type: 'p',
        text: 'Si el accidente es leve y no hay heridos, el procedimiento simplificado es posible en muchos casos. Igualmente, documentar bien el hecho acelera el proceso con la aseguradora.',
      },
      {
        type: 'ul',
        items: [
          'Tomá fotos de todos los vehículos involucrados, los daños visibles, las patentes y la escena completa.',
          'Intercambiá datos con el otro conductor: nombre, DNI, patente, aseguradora y número de póliza.',
          'Si es posible, completá el Formulario de Constatación de Accidente de Tránsito (FCAT) junto con el otro conductor.',
          'No firmes ningún documento de eximición de responsabilidad en el lugar.',
        ],
      },
      {
        type: 'h2',
        id: 'documentacion',
        text: 'Documentación que necesitás reunir',
      },
      {
        type: 'p',
        text: 'Para dar el parte de manera completa, tu aseguradora va a necesitar la siguiente documentación. Tenerla lista evita demoras:',
      },
      {
        type: 'ul',
        items: [
          'Número de póliza y datos del asegurado.',
          'DNI del conductor al momento del accidente.',
          'Cédula verde del vehículo (o cédula azul si es de terceros).',
          'Registro de conducir vigente.',
          'Fotos del lugar del hecho y los daños.',
          'Datos completos del tercero involucrado (si aplica).',
          'Número del expediente policial o acta de constatación (si existe).',
        ],
      },
      {
        type: 'h2',
        id: 'notificacion',
        text: 'Cómo notificar a tu aseguradora',
      },
      {
        type: 'p',
        text: 'La mayoría de las aseguradoras permite notificar el siniestro por teléfono, a través de su app o mediante el portal web. Independientemente del canal, la notificación debe hacerse dentro del plazo indicado en tu póliza.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Plazos legales: no los pierdas',
        body: 'La Ley 17.418 (Ley de Seguros) establece que el asegurado debe dar aviso del siniestro dentro de los 3 días de conocerlo, salvo que la póliza establezca un plazo mayor. Pasado ese plazo, la aseguradora puede rechazar el siniestro. Notificá siempre dentro de las 24 horas para mayor seguridad.',
      },
      {
        type: 'h2',
        id: 'errores-comunes',
        text: 'Errores que pueden invalidar tu parte',
      },
      {
        type: 'ul',
        items: [
          'Mover el vehículo antes de documentar la escena con fotos.',
          'No llamar a la policía cuando hay heridos o cuando el monto de los daños supera los $100.000.',
          'Firmar documentos que impliquen asumir responsabilidad en el lugar del hecho.',
          'Demorar más de 72 horas en notificar a la aseguradora.',
          'No conservar todos los recibos de gastos realizados a raíz del siniestro (grúa, hotel, etc.).',
          'Efectuar reparaciones antes de que el perito de la aseguradora evalúe los daños.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Guardá este artículo en favoritos',
        body: 'Nadie espera tener un accidente. Guardá este artículo en favoritos o compartilo con alguien de confianza para tenerlo disponible cuando lo necesites, sin tener que buscarlo bajo presión.',
      },
    ],
  },
}

function makeGenericPost(article: BlogArticle): BlogPost {
  return {
    ...article,
    authorBio: `${article.author} es especialista en seguros automotor con experiencia en el mercado argentino.`,
    content: [
      { type: 'p', text: article.excerpt },
      {
        type: 'callout',
        variant: 'info',
        title: 'Contenido completo próximamente',
        body: 'Estamos trabajando en el contenido detallado de este artículo. Mientras tanto, podés usar nuestro cotizador para comparar las mejores aseguradoras de Argentina en minutos.',
      },
    ],
  }
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
    `articulos?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[categoria][$eq]=${encodeURIComponent(categoria)}&pagination[pageSize]=1&populate=*`,
    86400,
  )
  if (remote?.[0]) {
    const base = mapArticle(remote[0])
    return makeGenericPost(base)
  }

  if (STATIC_POSTS[slug]) return STATIC_POSTS[slug]

  const base = STATIC_ARTICLES.find(
    (a) => a.slug === slug && a.categoria === categoria,
  )
  return base ? makeGenericPost(base) : null
}

export async function getRelatedArticles(
  categoria: string,
  currentSlug: string,
  limit = 3,
): Promise<BlogArticle[]> {
  const all = await getAllArticles(categoria)
  return all.filter((a) => a.slug !== currentSlug).slice(0, limit)
}
