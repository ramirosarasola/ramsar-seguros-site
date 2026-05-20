import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { HeroSection } from '@/components/home/HeroSection'
import { SocialProofBar } from '@/components/home/SocialProofBar'
import { BeneficiosSection } from '@/components/home/BeneficiosSection'
import { AseguradorasGrid } from '@/components/home/AseguradorasGrid'
import { VehiclesBrandsSection } from '@/components/home/VehiclesBrandsSection'
import { BlogSection } from '@/components/home/BlogSection'
import { TestimoniosSection } from '@/components/home/TestimoniosSection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaBanner } from '@/components/home/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Comparador de Seguros de Auto en Argentina',
  description:
    'Compará seguros de auto de las mejores aseguradoras de Argentina en 2 minutos. Cotizá gratis, sin llamados, con firma digital.',
  canonicalPath: '/',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ramsar Seguros',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/seguros-de-auto/cotizar?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const insuranceAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Ramsar Seguros',
  url: siteUrl,
  description:
    'Comparador de seguros de auto en Argentina. Cotizá gratis entre las mejores aseguradoras.',
  areaServed: { '@type': 'Country', name: 'Argentina', sameAs: 'https://www.wikidata.org/wiki/Q414' },
  serviceType: 'Seguro de Automóvil',
  knowsLanguage: 'es-AR',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 2400,
    bestRating: 5,
    worstRating: 1,
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={[websiteSchema, insuranceAgencySchema]} />

      <HeroSection />

      <SocialProofBar />

      <Suspense>
        <BeneficiosSection />
      </Suspense>

      <Suspense>
        <AseguradorasGrid />
      </Suspense>

      <Suspense>
        <VehiclesBrandsSection />
      </Suspense>

      <Suspense>
        <BlogSection />
      </Suspense>

      <Suspense>
        <TestimoniosSection />
      </Suspense>

      <Suspense>
        <FaqSection />
      </Suspense>

      <CtaBanner />
    </>
  )
}
