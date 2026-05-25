import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildMetadata, absoluteUrl } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { MARCAS, type VehiculoMarca } from '@/lib/vehiculos'
import { CtaBanner } from '@/components/home/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Seguros de Auto por Marca en Argentina',
  description:
    'Cotizá el seguro de tu auto según la marca y modelo. Comparamos coberturas de Toyota, Volkswagen, Ford, Chevrolet, Renault y más aseguradoras de Argentina.',
  canonicalPath: '/vehiculos',
  keywords: [
    'seguro de auto por marca',
    'seguro Toyota Argentina',
    'seguro Volkswagen Argentina',
    'seguro auto por modelo',
    'cotizar seguro auto Argentina',
  ],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Seguros de auto por marca en Argentina',
  description: 'Marcas de autos con comparativas de seguros en Ramsar Seguros',
  url: absoluteUrl('/vehiculos'),
  itemListElement: MARCAS.map((marca, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: marca.name,
    url: `${siteUrl}/vehiculos/${marca.slug}`,
  })),
}

function BrandCard({ marca, priority = false }: { marca: VehiculoMarca; priority?: boolean }) {
  const initials = marca.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

  return (
    <article className="bg-white border border-neutral-200 rounded-[10px] p-6 flex flex-col gap-4 hover:border-primary-200 hover:shadow-sm transition-all duration-120">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200 overflow-hidden">
          {marca.img ? (
            <Image
              src={marca.img}
              alt={`Logo ${marca.name}`}
              width={48}
              height={48}
              className="object-contain p-1"
              sizes="48px"
              priority={priority}
            />
          ) : (
            <span className="font-mono text-[12px] text-neutral-500">{initials}</span>
          )}
        </div>
        <div>
          <h2 className="font-sans font-semibold text-[18px] text-neutral-900 leading-tight">
            {marca.name}
          </h2>
          <p className="font-mono text-[11px] text-neutral-500 mt-0.5">
            {marca.models.length} modelos disponibles
          </p>
        </div>
      </div>
      <p className="font-sans text-[14px] text-neutral-600 leading-relaxed line-clamp-2">
        {marca.description}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <Link
          href={`/vehiculos/${marca.slug}`}
          className="flex-1 text-center bg-primary-700 text-white font-sans font-semibold text-[13px] px-4 py-2.5 rounded-sm hover:bg-primary-600 transition-colors duration-120 no-underline"
        >
          Ver modelos
        </Link>
        <Link
          href={`/seguros-de-auto/cotizar?marca=${marca.slug}`}
          className="flex-1 text-center border border-primary-700 text-primary-700 font-sans font-semibold text-[13px] px-4 py-2.5 rounded-sm hover:bg-primary-50 transition-colors duration-120 no-underline"
        >
          Cotizar seguro
        </Link>
      </div>
    </article>
  )
}

export default function VehiculosPage() {
  return (
    <>
      <JsonLd schema={itemListSchema} />

      {/* Hero */}
      <section className="bg-white border-b border-neutral-200 py-14 md:py-18">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex justify-center items-center gap-2 mb-6"
          >
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors duration-120 no-underline"
            >
              Inicio
            </Link>
            <span className="text-neutral-400 text-[11px]" aria-hidden="true">/</span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-900">
              Por marca
            </span>
          </nav>

          <h1 className="font-serif text-[clamp(32px,4.5vw,54px)] leading-[1.06] tracking-tight text-neutral-900 max-w-[22ch] mx-auto">
            Seguros de Auto por Marca en Argentina
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-neutral-600 mt-4 max-w-[52ch] mx-auto">
            Encontrá el seguro ideal para tu auto. Cada marca tiene características que
            influyen en el costo y las coberturas disponibles.
          </p>
          <div className="mt-6">
            <Link
              href="/seguros-de-auto/cotizar"
              className={[
                'inline-flex items-center gap-2',
                'bg-primary-700 text-white',
                'font-sans font-semibold text-[14px]',
                'px-6 py-3 rounded-sm no-underline',
                'hover:bg-primary-600 active:bg-primary-800',
                'transition-colors duration-120',
              ].join(' ')}
            >
              Cotizá con todas las marcas →
            </Link>
          </div>
        </div>
      </section>

      {/* Brand grid */}
      <section className="bg-neutral-50 py-12 pb-20">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-400 mb-6">
            {MARCAS.length} marcas disponibles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MARCAS.map((marca, i) => (
              <BrandCard key={marca.slug} marca={marca} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO copy */}
      <section className="bg-white py-16 border-t border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="max-w-[70ch]">
            <h2 className="font-serif text-[30px] leading-[1.1] tracking-[-0.015em] text-neutral-900 mb-4">
              ¿Por qué el seguro varía según la marca del auto?
            </h2>
            <p className="font-sans text-[16px] text-neutral-700 leading-relaxed mb-4">
              El costo de un seguro de auto depende directamente de las características del
              vehículo: su valor de mercado, el costo de reparación, la disponibilidad de
              repuestos en Argentina y el historial de siniestralidad de la marca.
            </p>
            <p className="font-sans text-[16px] text-neutral-700 leading-relaxed mb-4">
              Por eso, un Chevrolet Onix y un Toyota Hilux tienen coberturas y condiciones
              completamente distintas, incluso en la misma aseguradora. En Ramsar podés
              comparar las opciones específicas para tu vehículo en menos de 2 minutos.
            </p>
            <p className="font-sans text-[16px] text-neutral-700 leading-relaxed">
              Trabajamos con las principales aseguradoras de Argentina — Sancor, Zurich,
              Federación Patronal, Mapfre y más — para que siempre tengas la comparativa
              más completa del mercado.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
