import Link from 'next/link'
import { User, MapPin, Smartphone } from 'lucide-react'
import type { Insurer, PersonaCard } from '@/lib/strapi'

const ICON_MAP: Record<string, React.ElementType> = {
  User,
  MapPin,
  Smartphone,
}

function PersonaCardItem({ card }: { card: PersonaCard }) {
  const Icon = ICON_MAP[card.icon] ?? User

  return (
    <div className="bg-white rounded-xl shadow-elevation-1 p-8 flex flex-col hover:shadow-elevation-2 hover:-translate-y-0.5 transition-all duration-150">
      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-5 flex-shrink-0">
        <Icon size={20} strokeWidth={2} className="text-primary-600" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-base text-neutral-900">{card.title}</h3>
      <p className="text-base text-neutral-600 mt-3 flex-1">{card.description}</p>
      <Link
        href={card.linkHref}
        className="mt-4 text-sm font-semibold text-primary-600 hover:underline underline-offset-2 transition-colors duration-150 no-underline"
      >
        {card.linkText} →
      </Link>
    </div>
  )
}

export function BestForSection({ insurer }: { insurer: Insurer }) {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-4xl tracking-tight text-neutral-900">
            ¿Para quién es ideal {insurer.name}?
          </h2>
          <p className="text-lg text-neutral-500 mt-3">
            Identificá rápidamente si {insurer.name.split(' ')[0]} es la mejor opción para tu perfil
            de conductor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insurer.personas.map((card) => (
            <PersonaCardItem key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
