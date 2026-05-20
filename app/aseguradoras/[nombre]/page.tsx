import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllAseguradoras, getInsurer } from '@/lib/strapi'
import { JsonLd } from '@/components/seo/JsonLd'
import { InsurerBreadcrumb } from '@/components/aseguradoras/InsurerBreadcrumb'
import { InsurerHero } from '@/components/aseguradoras/InsurerHero'
import { CoveragePlansSection } from '@/components/aseguradoras/CoveragePlansSection'
import { CoverageComparisonTable } from '@/components/aseguradoras/CoverageComparisonTable'
import { ProsConsSection } from '@/components/aseguradoras/ProsConsSection'
import { BestForSection } from '@/components/aseguradoras/BestForSection'
import { ReviewsSection } from '@/components/aseguradoras/ReviewsSection'
import { RelatedVehiclesSection } from '@/components/aseguradoras/RelatedVehiclesSection'
import { StickyCta } from '@/components/aseguradoras/StickyCta'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

type Props = { params: Promise<{ nombre: string }> }

export async function generateStaticParams() {
  const slugs = await getAllAseguradoras()
  return slugs.map(({ slug }) => ({ nombre: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nombre } = await params
  const insurer = await getInsurer(nombre)
  if (!insurer) return {}

  const title = `${insurer.name}: coberturas, precios y opiniones 2026`
  const description = `Analizamos ${insurer.name} en profundidad: planes de cobertura, precios actualizados, opiniones reales de asegurados y comparativa con el resto del mercado argentino.`
  const canonicalUrl = `${siteUrl}/aseguradoras/${insurer.slug}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function InsurerPage({ params }: Props) {
  const { nombre } = await params
  const insurer = await getInsurer(nombre)
  if (!insurer) notFound()

  const pageUrl = `${siteUrl}/aseguradoras/${insurer.slug}`

  const insuranceAgencySchema = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: insurer.name,
    url: pageUrl,
    foundingDate: String(insurer.foundedYear),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: insurer.rating,
      reviewCount: insurer.reviewCount,
      bestRating: 5,
    },
  }

  return (
    <>
      <JsonLd schema={insuranceAgencySchema} />

      <InsurerBreadcrumb insurerName={insurer.name} insurerSlug={insurer.slug} />
      <InsurerHero insurer={insurer} />
      <CoveragePlansSection insurer={insurer} />
      <CoverageComparisonTable insurer={insurer} />
      <ProsConsSection insurer={insurer} />
      <BestForSection insurer={insurer} />
      <ReviewsSection insurer={insurer} />
      <RelatedVehiclesSection insurer={insurer} />

      <StickyCta
        insurerSlug={insurer.slug}
        insurerShortName={insurer.name.split(' ')[0]}
      />
    </>
  )
}
