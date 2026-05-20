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

// ─── Strapi Client ────────────────────────────────────────────────────────────

async function strapiRequest<T>(path: string, revalidate = 3600): Promise<T | null> {
  if (!STRAPI_URL) return null
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}?populate=*`, {
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

// ─── Static Seed Data ─────────────────────────────────────────────────────────

const STANDARD_ROWS: CoverageRow[] = [
  { feature: 'Responsabilidad civil', terceros: 'yes', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  { feature: 'Robo total', terceros: 'yes', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  { feature: 'Incendio total', terceros: 'yes', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  { feature: 'Asistencia en ruta', terceros: 'Básica', tercerosPlus: 'Completa', todoRiesgo: 'Premium' },
  { feature: 'Robo parcial', terceros: 'no', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  { feature: 'Granizo', terceros: 'no', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  { feature: 'Cristales', terceros: 'no', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  {
    feature: 'Daños por accidente',
    terceros: 'no',
    tercerosPlus: 'Parcial',
    todoRiesgo: 'Total',
    tooltip: 'Cobertura parcial cubre daños hasta el 70% del valor del vehículo',
  },
  { feature: 'Incendio parcial', terceros: 'no', tercerosPlus: 'yes', todoRiesgo: 'yes' },
  {
    feature: 'Inundación',
    terceros: 'no',
    tercerosPlus: 'partial',
    todoRiesgo: 'yes',
    tooltip: 'En Terceros Plus disponible como cobertura adicional con costo extra',
  },
  { feature: 'Auto de reemplazo', terceros: 'no', tercerosPlus: 'no', todoRiesgo: 'yes' },
  { feature: 'Cobertura en MERCOSUR', terceros: 'no', tercerosPlus: 'yes', todoRiesgo: 'yes' },
]

function makePlans(p1: string, p2: string, p3: string): [InsurerPlan, InsurerPlan, InsurerPlan] {
  return [
    {
      id: 'terceros',
      name: 'Terceros',
      tagline: 'Cobertura básica obligatoria',
      priceFrom: p1,
      recommended: false,
      included: [
        'Responsabilidad civil hasta $50M',
        'Incendio total del vehículo',
        'Robo total del vehículo',
        'Asistencia en ruta básica',
      ],
      excluded: ['Daños propios', 'Robo parcial', 'Granizo', 'Cristales'],
    },
    {
      id: 'terceros-plus',
      name: 'Terceros Plus',
      tagline: 'El más elegido',
      priceFrom: p2,
      recommended: true,
      included: [
        'Todo lo incluido en Terceros',
        'Daños parciales por accidente',
        'Robo parcial',
        'Granizo',
        'Cristales (parabrisas y laterales)',
        'Asistencia 24hs completa',
      ],
      excluded: ['Daños por inundación (cobertura adicional disponible)'],
    },
    {
      id: 'todo-riesgo',
      name: 'Todo Riesgo',
      tagline: 'Máxima protección',
      priceFrom: p3,
      recommended: false,
      included: [
        'Cobertura completa para tu auto',
        'Daños propios totales y parciales',
        'Robo total y parcial',
        'Fenómenos meteorológicos (granizo, inundación)',
        'Cristales y luminotecnia',
        'Asistencia premium con auto de reemplazo',
      ],
      excluded: null,
      excludedNote: 'Sin exclusiones principales',
    },
  ]
}

const STATIC_INSURERS: Insurer[] = [
  {
    slug: 'atlantida-seguros',
    name: 'Atlántida Seguros',
    tagline: 'Seguros de auto con más de 75 años en el mercado argentino',
    foundedYear: 1945,
    rating: 4.7,
    reviewCount: 1847,
    priceFrom: 'Desde $42.000/mes',
    sinisterResponse: 'Respuesta en 24hs',
    updatedMonth: 'mayo 2026',
    description:
      'Todo lo que necesitás saber sobre Atlántida Seguros para decidir si es la aseguradora ideal para tu auto. Coberturas, precios actualizados, opiniones reales y comparativa con el resto del mercado.',
    ratingBreakdown: { five: 1440, four: 277, three: 74, two: 37, one: 19 },
    plans: makePlans('Desde $35.000/mes', 'Desde $52.000/mes', 'Desde $78.000/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: [
      'Una de las aseguradoras más grandes de Argentina con más de 75 años de trayectoria en el mercado.',
      'Excelente red de talleres propios en todo el país, incluyendo provincias del NOA y Patagonia.',
      'Aplicación móvil bien calificada (4.5★ en Play Store) para denuncia y seguimiento de siniestros.',
      'Precios competitivos en el segmento Terceros Plus, generalmente entre 10% y 15% por debajo del promedio del mercado.',
      'Atención al cliente telefónica disponible las 24 horas, todos los días del año.',
    ],
    cons: [
      'Los tiempos de resolución de siniestros pueden extenderse hasta 15-20 días hábiles en épocas de alta demanda (temporada de granizo, fin de año).',
      'El plan Todo Riesgo tiene un precio elevado comparado con competidores directos del mismo segmento.',
      'Algunas coberturas adicionales (auto de reemplazo premium, cobertura internacional) solo están disponibles en pólizas contratadas en CABA y GBA.',
    ],
    personas: [
      {
        icon: 'User',
        title: 'Conductores con autos de valor medio',
        description:
          'Si tu auto vale entre $8 y $20 millones, el Terceros Plus de Atlántida ofrece la mejor relación precio-cobertura del mercado argentino para este segmento.',
        linkText: 'Ver Terceros Plus →',
        linkHref: '/seguros-de-auto/cotizar?aseguradora=atlantida-seguros&plan=terceros-plus',
      },
      {
        icon: 'MapPin',
        title: 'Usuarios del interior del país',
        description:
          'La red de talleres propios de Atlántida tiene fuerte presencia en Mendoza, Córdoba, Tucumán y Patagonia, donde otras aseguradoras dependen de talleres tercerizados con tiempos más largos.',
        linkText: 'Ver cobertura por región →',
        linkHref: '/aseguradoras/atlantida-seguros#cobertura-regional',
      },
      {
        icon: 'Smartphone',
        title: 'Conductores que prefieren gestión digital',
        description:
          'La app de Atlántida permite denunciar siniestros con fotos, gestionar el pago de tu póliza y solicitar asistencia en ruta sin llamar por teléfono ni esperar en línea.',
        linkText: 'Ver funciones de la app →',
        linkHref: '/aseguradoras/atlantida-seguros#app',
      },
    ],
    reviews: [
      {
        stars: 5,
        quote:
          'Tuve un siniestro el año pasado en Ruta 2 y la resolución fue muy rápida. El perito vino en 48hs y me liquidaron el pago en una semana. Muy conforme con la respuesta y el trato del operador telefónico.',
        authorName: 'Sebastián R.',
        vehicle: 'VW Gol Trend 2021',
      },
      {
        stars: 4,
        quote:
          'Buena aseguradora en general. El precio subió bastante este año (cerca de 18%) pero está en línea con lo que aumentó todo el mercado. La app funciona muy bien y nunca tuve que llamar para nada.',
        authorName: 'Valeria M.',
        vehicle: 'Renault Sandero 2020',
      },
      {
        stars: 5,
        quote:
          'Aseguro mi camioneta hace 4 años con Atlántida. Nunca tuve problemas con los pagos automáticos ni con la atención. Hice dos siniestros menores y los dos se resolvieron sin complicaciones. La recomendaría sin dudarlo.',
        authorName: 'Carlos T.',
        vehicle: 'Toyota Hilux 2019',
      },
    ],
  },
  {
    slug: 'sancor-seguros',
    name: 'Sancor Seguros',
    tagline: 'Cooperativa argentina de seguros con presencia nacional',
    foundedYear: 1945,
    rating: 4.4,
    reviewCount: 312,
    priceFrom: 'Desde $34.800/mes',
    sinisterResponse: 'Respuesta en 48hs',
    updatedMonth: 'mayo 2026',
    description:
      'Coberturas, precios y opiniones de Sancor Seguros para autos en Argentina. Comparativa actualizada con el resto del mercado.',
    ratingBreakdown: { five: 172, four: 78, three: 37, two: 16, one: 9 },
    plans: makePlans('Desde $24.800/mes', 'Desde $36.400/mes', 'Desde $54.900/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: [
      'Cooperativa argentina con más de 75 años en el mercado, sin fines de lucro.',
      'Amplia red de sucursales y talleres propios en todo el país.',
      'Precios competitivos para el segmento Terceros y Terceros Plus.',
      'Atención personalizada en sucursales físicas en todas las provincias.',
      'Baja tasa de cancelación de pólizas — indicador de satisfacción del cliente.',
    ],
    cons: [
      'App móvil con funcionalidades más limitadas que competidores digitales como Zurich.',
      'Tiempos de respuesta en siniestros variables según la provincia.',
      'Proceso de cotización online menos ágil que otras aseguradoras.',
    ],
    personas: [
      { icon: 'User', title: 'Conductores que valoran el servicio presencial', description: 'Con sucursales en todo el país, Sancor es ideal para quienes prefieren resolver trámites en persona o necesitan atención cara a cara.', linkText: 'Ver Terceros Plus →', linkHref: '/seguros-de-auto/cotizar?aseguradora=sancor-seguros&plan=terceros-plus' },
      { icon: 'Shield', title: 'Quienes buscan granizo incluido', description: 'El plan Terceros Plus de Sancor incluye granizo sin franquicia, una de las coberturas más buscadas en Argentina.', linkText: 'Ver coberturas →', linkHref: '/aseguradoras/sancor-seguros#coberturas' },
      { icon: 'MapPin', title: 'Conductores del interior profundo', description: 'La red cooperativa de Sancor tiene presencia en localidades donde otras aseguradoras no tienen talleres propios.', linkText: 'Ver red de talleres →', linkHref: '/aseguradoras/sancor-seguros#talleres' },
    ],
    reviews: [
      { stars: 5, quote: 'Llevo 6 años con Sancor y nunca tuve problemas. Atención excelente en la sucursal de Córdoba.', authorName: 'Roberto G.', vehicle: 'Chevrolet Onix 2020' },
      { stars: 4, quote: 'Buen precio para Terceros Plus. La app podría mejorar pero la atención telefónica es buena.', authorName: 'Sandra P.', vehicle: 'Fiat Cronos 2022' },
      { stars: 5, quote: 'Tuve un granizo y me pagaron sin problemas. Todo muy rápido y sin papelerío.', authorName: 'Diego F.', vehicle: 'Peugeot 208 2021' },
    ],
  },
  {
    slug: 'zurich',
    name: 'Zurich Argentina',
    tagline: 'Seguros de auto con tecnología digital y cobertura MERCOSUR',
    foundedYear: 1872,
    rating: 4.7,
    reviewCount: 541,
    priceFrom: 'Desde $41.200/mes',
    sinisterResponse: 'Respuesta en 24hs',
    updatedMonth: 'mayo 2026',
    description:
      'Coberturas, precios y opiniones de Zurich Argentina para autos. Aseguradora internacional con fuerte presencia digital.',
    ratingBreakdown: { five: 325, four: 108, three: 65, two: 32, one: 11 },
    plans: makePlans('Desde $31.000/mes', 'Desde $45.000/mes', 'Desde $68.000/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: [
      'Grupo internacional con más de 150 años de trayectoria global.',
      'App y portal digital líderes del mercado para gestión de pólizas y siniestros.',
      'Cobertura MERCOSUR incluida en todos los planes desde Terceros Plus.',
      'Proceso de cotización 100% digital en menos de 3 minutos.',
      'Alta tasa de resolución de siniestros en primeras 24 horas.',
    ],
    cons: [
      'Precios superiores al promedio del mercado en el segmento Todo Riesgo.',
      'Red de talleres propios más reducida que cooperativas nacionales.',
      'Atención presencial limitada — principalmente digital y telefónica.',
    ],
    personas: [
      { icon: 'Smartphone', title: 'Conductores digitales', description: 'Si preferís gestionar todo desde el celular, Zurich tiene la mejor app del mercado para denuncia de siniestros, pagos y asistencia.', linkText: 'Ver funciones digitales →', linkHref: '/aseguradoras/zurich#digital' },
      { icon: 'Globe', title: 'Viajeros frecuentes al exterior', description: 'La cobertura MERCOSUR de Zurich incluye Argentina, Uruguay, Paraguay, Brasil y Chile sin costo adicional.', linkText: 'Ver cobertura MERCOSUR →', linkHref: '/aseguradoras/zurich#mercosur' },
      { icon: 'Car', title: 'Autos de alta gama', description: 'Los planes Todo Riesgo de Zurich son ideales para vehículos de alta gama por la cobertura integral sin límites de valor.', linkText: 'Ver Todo Riesgo →', linkHref: '/seguros-de-auto/cotizar?aseguradora=zurich&plan=todo-riesgo' },
    ],
    reviews: [
      { stars: 5, quote: 'La app es increíble. Hice la denuncia del siniestro en 5 minutos desde el celular y en 48hs estaba resuelto.', authorName: 'Martín L.', vehicle: 'Toyota RAV4 2023' },
      { stars: 4, quote: 'Muy buena cobertura. Un poco cara pero el servicio justifica el precio.', authorName: 'Florencia R.', vehicle: 'VW Tiguan 2022' },
      { stars: 5, quote: 'Viajé a Uruguay y necesité asistencia. Zurich respondió perfecto con la cobertura MERCOSUR.', authorName: 'Pablo M.', vehicle: 'Ford Ranger 2021' },
    ],
  },
  {
    slug: 'san-cristobal',
    name: 'San Cristóbal Seguros',
    tagline: 'Atención presencial y cobertura en todo el país',
    foundedYear: 1940,
    rating: 4.3,
    reviewCount: 248,
    priceFrom: 'Desde $32.500/mes',
    sinisterResponse: 'Respuesta en 48hs',
    updatedMonth: 'mayo 2026',
    description:
      'Coberturas, precios y opiniones de San Cristóbal Seguros para autos en Argentina. Atención personalizada en más de 100 sucursales.',
    ratingBreakdown: { five: 124, four: 62, three: 37, two: 15, one: 10 },
    plans: makePlans('Desde $24.000/mes', 'Desde $35.500/mes', 'Desde $52.000/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: ['Más de 100 sucursales en todo el país para atención presencial.', 'Precios accesibles en el segmento Terceros.', 'Buen servicio de asistencia en ruta a nivel nacional.', 'Atención en español nativo sin derivaciones al exterior.', 'Amplia experiencia en el mercado argentino — más de 80 años.'],
    cons: ['Plataforma digital limitada comparada con competidores internacionales.', 'Tiempos de resolución de siniestros mayores al promedio del mercado.', 'Pocos talleres propios fuera de las ciudades principales.'],
    personas: [
      { icon: 'User', title: 'Conductores mayores', description: 'San Cristóbal es ideal para quienes prefieren resolver todo en persona con un asesor de confianza en su ciudad.', linkText: 'Ver planes →', linkHref: '/seguros-de-auto/cotizar?aseguradora=san-cristobal' },
      { icon: 'MapPin', title: 'Regiones con presencia fuerte', description: 'En el interior del país, San Cristóbal tiene una red de sucursales muy superior al promedio del mercado.', linkText: 'Ver red de sucursales →', linkHref: '/aseguradoras/san-cristobal#sucursales' },
      { icon: 'Shield', title: 'Presupuesto ajustado', description: 'Con los precios más bajos del segmento Terceros, San Cristóbal es una opción sólida para quienes buscan cobertura básica a buen precio.', linkText: 'Ver Terceros →', linkHref: '/seguros-de-auto/cotizar?aseguradora=san-cristobal&plan=terceros' },
    ],
    reviews: [
      { stars: 4, quote: 'Buen trato en la sucursal. El precio es competitivo y la cobertura básica cumple con lo que necesito.', authorName: 'Graciela T.', vehicle: 'Renault Kwid 2021' },
      { stars: 5, quote: 'Asistencia en ruta excelente. Me quedé sin batería en la ruta y en 40 minutos estaban ahí.', authorName: 'Jorge P.', vehicle: 'Fiat Cronos 2020' },
      { stars: 4, quote: 'Buena relación precio-calidad para el básico. La app tiene que mejorar.', authorName: 'María L.', vehicle: 'Citroën C3 2022' },
    ],
  },
  {
    slug: 'la-meridional',
    name: 'La Meridional',
    tagline: 'Especialista en seguros premium para vehículos de alta gama',
    foundedYear: 1958,
    rating: 4.5,
    reviewCount: 187,
    priceFrom: 'Desde $48.900/mes',
    sinisterResponse: 'Respuesta en 24hs',
    updatedMonth: 'mayo 2026',
    description:
      'Coberturas, precios y opiniones de La Meridional para autos en Argentina. Especialistas en vehículos de gama media-alta y premium.',
    ratingBreakdown: { five: 102, four: 47, three: 20, two: 11, one: 7 },
    plans: makePlans('Desde $38.000/mes', 'Desde $56.000/mes', 'Desde $82.000/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: ['Especialistas en vehículos de alta gama con tasación a valor de mercado.', 'Tasación del vehículo mediante app para reclamaciones más justas.', 'Servicio premium con gestores dedicados para pólizas Todo Riesgo.', 'Cobertura internacional incluida en planes premium.', 'App con valuación instantánea del vehículo para reclamaciones.'],
    cons: ['Precios superiores al promedio del mercado en todos los segmentos.', 'No recomendable para autos de valor bajo — los planes no son competitivos.', 'Red de sucursales más reducida que competidores nacionales.'],
    personas: [
      { icon: 'Car', title: 'Propietarios de autos premium', description: 'Si tu vehículo vale más de $25 millones, la tasación a valor real de La Meridional puede significar miles de dólares de diferencia en una reclamación.', linkText: 'Ver Todo Riesgo →', linkHref: '/seguros-de-auto/cotizar?aseguradora=la-meridional&plan=todo-riesgo' },
      { icon: 'Globe', title: 'Viajeros frecuentes', description: 'Los planes premium de La Meridional incluyen cobertura internacional completa, no solo MERCOSUR.', linkText: 'Ver cobertura internacional →', linkHref: '/aseguradoras/la-meridional#internacional' },
      { icon: 'Smartphone', title: 'Usuarios de la app de tasación', description: 'La app de La Meridional permite valuar tu vehículo con fotos antes de un siniestro, evitando tasaciones inferiores al valor real.', linkText: 'Ver funciones de la app →', linkHref: '/aseguradoras/la-meridional#app' },
    ],
    reviews: [
      { stars: 5, quote: 'Me tasaron el auto al valor real del mercado, no al de la guía. Eso es lo que diferencia a La Meridional del resto.', authorName: 'Ricardo S.', vehicle: 'BMW Serie 3 2022' },
      { stars: 4, quote: 'Excelente servicio. Un poco más caro que las demás pero el trato es completamente diferente.', authorName: 'Claudia R.', vehicle: 'Toyota Corolla Cross 2023' },
      { stars: 5, quote: 'Tuve un robo total y en 15 días hábiles ya tenía el pago. Todo al valor actualizado del mercado.', authorName: 'Fernando A.', vehicle: 'VW Vento 2021' },
    ],
  },
  {
    slug: 'mapfre',
    name: 'Mapfre',
    tagline: 'Grupo internacional con cobertura todo riesgo flexible',
    foundedYear: 1933,
    rating: 4.2,
    reviewCount: 296,
    priceFrom: 'Desde $38.400/mes',
    sinisterResponse: 'Respuesta en 48hs',
    updatedMonth: 'mayo 2026',
    description:
      'Coberturas, precios y opiniones de Mapfre para autos en Argentina. Grupo internacional con más de 90 años de historia global.',
    ratingBreakdown: { five: 148, four: 74, three: 44, two: 20, one: 10 },
    plans: makePlans('Desde $28.000/mes', 'Desde $41.000/mes', 'Desde $62.000/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: ['Grupo internacional con respaldo global y más de 90 años de experiencia.', 'Cobertura todo riesgo flexible con franquicias configurables.', 'Atención telefónica disponible 24/7 los 365 días del año.', 'Amplia red de talleres concertados en todo el país.', 'Planes adaptables a distintos perfiles de conductor y uso del vehículo.'],
    cons: ['Tiempos de respuesta en siniestros más lentos que la media del mercado.', 'Proceso de denuncia online con más pasos que competidores digitales.', 'Precios del plan Todo Riesgo elevados sin diferencias claras respecto a Zurich.'],
    personas: [
      { icon: 'Shield', title: 'Conductores que buscan flexibilidad', description: 'Mapfre permite configurar la franquicia del Todo Riesgo según tu presupuesto, ajustando el precio mensual a lo que podés pagar.', linkText: 'Ver Todo Riesgo flexible →', linkHref: '/seguros-de-auto/cotizar?aseguradora=mapfre&plan=todo-riesgo' },
      { icon: 'Phone', title: 'Usuarios que priorizan atención 24/7', description: 'El centro de atención de Mapfre está disponible las 24 horas con operadores reales, sin sistemas de voz automáticos.', linkText: 'Ver atención al cliente →', linkHref: '/aseguradoras/mapfre#atencion' },
      { icon: 'User', title: 'Conductores con historial limpio', description: 'Mapfre ofrece descuentos por buen historial de conducción que pueden reducir la prima hasta un 20% anual.', linkText: 'Ver descuentos →', linkHref: '/aseguradoras/mapfre#descuentos' },
    ],
    reviews: [
      { stars: 4, quote: 'Atención telefónica excelente. El proceso de denuncia online podría ser más simple pero el resultado fue bueno.', authorName: 'Laura B.', vehicle: 'Peugeot 208 2020' },
      { stars: 4, quote: 'Buena aseguradora. Tuve un problema con la cerradura y en 2 horas vino el mecánico.', authorName: 'Nicolás P.', vehicle: 'Chevrolet Cruze 2021' },
      { stars: 5, quote: 'El precio del Todo Riesgo con franquicia alta me quedó justo en el presupuesto. Muy buena opción.', authorName: 'Valentina C.', vehicle: 'Jeep Compass 2022' },
    ],
  },
  {
    slug: 'federacion-patronal',
    name: 'Federación Patronal',
    tagline: 'Cooperativa argentina de seguros con la tasa de siniestros más baja',
    foundedYear: 1919,
    rating: 4.6,
    reviewCount: 412,
    priceFrom: 'Desde $33.700/mes',
    sinisterResponse: 'Respuesta en 24hs',
    updatedMonth: 'mayo 2026',
    description:
      'Coberturas, precios y opiniones de Federación Patronal para autos en Argentina. Cooperativa con más de 100 años de historia.',
    ratingBreakdown: { five: 247, four: 103, three: 41, two: 14, one: 7 },
    plans: makePlans('Desde $25.500/mes', 'Desde $38.000/mes', 'Desde $56.000/mes'),
    comparisonRows: STANDARD_ROWS,
    pros: ['Cooperativa argentina con más de 100 años de historia — la más antigua del país.', 'Tasa de siniestros más baja del mercado según datos de la Superintendencia.', 'Precios estables con aumentos por debajo del promedio del sector.', 'Sin letra chica — pólizas redactadas en lenguaje claro y sencillo.', 'Atención personalizada con ejecutivos de cuenta dedicados.'],
    cons: ['Red de talleres propios más limitada que aseguradoras de mayor tamaño.', 'Proceso de cotización online menos ágil que competidores digitales.', 'App móvil básica sin funcionalidades avanzadas de gestión de siniestros.'],
    personas: [
      { icon: 'Shield', title: 'Conductores que valoran la transparencia', description: 'Las pólizas de Federación Patronal están escritas en lenguaje claro y sin cláusulas confusas. Sabés exactamente qué cobertura tenés.', linkText: 'Ver planes →', linkHref: '/seguros-de-auto/cotizar?aseguradora=federacion-patronal' },
      { icon: 'User', title: 'Clientes de largo plazo', description: 'La cooperativa premia la fidelidad con descuentos acumulativos que pueden llegar al 15% anual después de 5 años sin siniestros.', linkText: 'Ver beneficios de fidelidad →', linkHref: '/aseguradoras/federacion-patronal#fidelidad' },
      { icon: 'MapPin', title: 'Conductores de Buenos Aires y alrededores', description: 'La red de talleres y sucursales de Federación Patronal es especialmente fuerte en el AMBA y la Provincia de Buenos Aires.', linkText: 'Ver red de talleres →', linkHref: '/aseguradoras/federacion-patronal#talleres' },
    ],
    reviews: [
      { stars: 5, quote: 'Llevo 8 años con Federación y nunca tuve sorpresas. La prima sube menos que en otras aseguradoras y el servicio es excelente.', authorName: 'Héctor M.', vehicle: 'Ford Ka 2019' },
      { stars: 4, quote: 'Muy transparente. La póliza dice exactamente lo que cubre y el ejecutivo explicó todo con detalle.', authorName: 'Ana G.', vehicle: 'Volkswagen Polo 2022' },
      { stars: 5, quote: 'Tuve un choque leve y la resolución fue en 10 días hábiles. Sin problemas, sin letra chica.', authorName: 'Gustavo R.', vehicle: 'Chevrolet Tracker 2021' },
    ],
  },
]

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllAseguradoras(): Promise<{ slug: string }[]> {
  const remote = await strapiRequest<{ slug: string }[]>('aseguradoras?fields[0]=slug', 86400)
  if (remote) return remote
  return STATIC_INSURERS.map((i) => ({ slug: i.slug }))
}

export async function getInsurer(slug: string): Promise<Insurer | null> {
  const remote = await strapiRequest<Insurer>(`aseguradoras/${slug}`, 3600)
  if (remote) return remote
  return STATIC_INSURERS.find((i) => i.slug === slug) ?? null
}
