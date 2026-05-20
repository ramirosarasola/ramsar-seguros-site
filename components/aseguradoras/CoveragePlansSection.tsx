import Link from 'next/link'
import { Check, X, ShieldCheck } from 'lucide-react'
import type { Insurer, InsurerPlan } from '@/lib/strapi'

interface Props {
  insurer: Insurer
}

function PlanCard({
  plan,
  insurerSlug,
  offerSchema,
}: {
  plan: InsurerPlan
  insurerSlug: string
  offerSchema: Record<string, unknown>
}) {
  const isRec = plan.recommended

  return (
    <div
      className={[
        'relative flex flex-col rounded-xl p-6 bg-white transition-shadow duration-150',
        isRec
          ? 'border-2 border-primary-700 shadow-elevation-2 lg:scale-105'
          : 'border border-neutral-200 shadow-none',
      ].join(' ')}
    >
      {isRec && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-secondary-700 font-semibold text-xs px-4 py-1 rounded-full whitespace-nowrap">
          Más elegido
        </span>
      )}

      {/* Plan name + tagline */}
      <h3
        className={[
          'font-semibold text-lg',
          isRec ? 'text-primary-700' : 'text-neutral-700',
        ].join(' ')}
      >
        {plan.name}
      </h3>
      <p className={['text-sm mt-0.5', isRec ? 'text-primary-600' : 'text-neutral-500'].join(' ')}>
        {plan.tagline}
      </p>

      {/* Divider */}
      <hr className="border-neutral-200 my-4" />

      {/* Price */}
      <p className="font-serif text-5xl leading-none text-neutral-900 tabular-nums">
        {plan.priceFrom.replace('Desde ', '')}
      </p>
      <p className="text-xs font-mono text-neutral-500 mt-1">Precio orientativo · IVA incluido</p>

      {/* Divider */}
      <hr className="border-neutral-200 my-4" />

      {/* Coverage list */}
      <ul className="flex flex-col gap-3 flex-1" aria-label={`Coberturas del plan ${plan.name}`}>
        {plan.included.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-800">
            <Check
              size={16}
              strokeWidth={2}
              className="text-success flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
        {plan.excludedNote ? (
          <li className="flex items-start gap-2 text-sm text-success font-medium">
            <ShieldCheck
              size={16}
              strokeWidth={2}
              className="text-success flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            {plan.excludedNote}
          </li>
        ) : (
          plan.excluded?.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
              <X
                size={16}
                strokeWidth={2}
                className="text-neutral-400 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              {item}
            </li>
          ))
        )}
      </ul>

      {/* CTA */}
      <div className="mt-6">
        <Link
          href={`/seguros-de-auto/cotizar?aseguradora=${insurerSlug}&plan=${plan.id}`}
          className={[
            'flex items-center justify-center w-full rounded-lg py-3 font-semibold text-base transition-colors duration-150 no-underline',
            isRec
              ? 'bg-primary-700 text-white shadow-elevation-3 hover:bg-primary-600'
              : 'bg-transparent text-primary-700 border border-primary-700 hover:bg-primary-50',
          ].join(' ')}
        >
          Cotizar {plan.name}
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
    </div>
  )
}

export function CoveragePlansSection({ insurer }: Props) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ramsarseguros.com.ar'

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-4xl tracking-tight text-neutral-900">
            Planes de cobertura de {insurer.name}
          </h2>
          <p className="text-lg text-neutral-500 mt-3">
            {insurer.name.split(' ')[0]} ofrece tres niveles de cobertura para auto. Seleccioná el
            plan que mejor se adapta a tu vehículo y presupuesto.
          </p>
        </div>

        {/* Cards — stack vertically on mobile, 3-col on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:items-start">
          {insurer.plans.map((plan) => {
            const offerSchema = {
              '@context': 'https://schema.org',
              '@type': 'Offer',
              name: `${insurer.name} — ${plan.name}`,
              description: plan.tagline,
              url: `${siteUrl}/aseguradoras/${insurer.slug}`,
              priceCurrency: 'ARS',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: insurer.name,
              },
            }
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                insurerSlug={insurer.slug}
                offerSchema={offerSchema}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
