import Link from 'next/link'
import { ShieldCheck, RefreshCw, Users, ArrowRight } from 'lucide-react'
import type { Insurer } from '@/lib/strapi'

interface Props {
  insurer: Insurer
}

function TrustItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="flex items-center gap-2 text-sm text-neutral-700">
      <Icon size={16} strokeWidth={2} className="text-primary-600 flex-shrink-0" aria-hidden="true" />
      {label}
    </span>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-neutral-500 mb-1">{label}</p>
      <p className="text-xl font-semibold text-neutral-900">{value}</p>
    </div>
  )
}

export function InsurerHero({ insurer }: Props) {
  const shortName = insurer.name.split(' ')[0]

  return (
    <section className="bg-neutral-50 pt-12 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-start">

          {/* Left column */}
          <div>
            <div
              className="h-14 bg-neutral-200 rounded-lg inline-flex items-center justify-center px-6 font-mono text-xs text-neutral-500 tracking-widest uppercase mb-4"
              aria-hidden="true"
            >
              [{shortName} LOGO]
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl leading-none tracking-tight text-neutral-900">
              {insurer.name}: coberturas, precios y opiniones 2026
            </h1>

            <p className="text-lg leading-relaxed text-neutral-600 mt-4 max-w-2xl">
              {insurer.description}
            </p>

            <div className="flex flex-wrap gap-5 mt-6">
              <TrustItem icon={ShieldCheck} label="Datos verificados" />
              <TrustItem icon={RefreshCw} label={`Actualizado: ${insurer.updatedMonth}`} />
              <TrustItem
                icon={Users}
                label={`${insurer.reviewCount.toLocaleString('es-AR')} opiniones`}
              />
            </div>
          </div>

          {/* Right column — stats card */}
          <div className="bg-white shadow-elevation-1 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-y-5 gap-x-6">
              <StatCell label="Fundada en" value={String(insurer.foundedYear)} />
              <StatCell label="Calificación" value={`${insurer.rating} ★`} />
              <StatCell label="Precio promedio" value={insurer.priceFrom} />
              <StatCell label="Siniestros" value={insurer.sinisterResponse} />
            </div>

            <div className="mt-6">
              <Link
                id="hero-cta"
                href={`/seguros-de-auto/cotizar?aseguradora=${insurer.slug}`}
                className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white font-semibold text-base rounded-lg py-3 shadow-elevation-3 hover:bg-primary-600 active:bg-primary-800 transition-colors duration-150 no-underline"
              >
                Cotizar con {shortName}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <p className="text-xs text-neutral-500 text-center mt-2">
                Cotización gratuita en 2 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
