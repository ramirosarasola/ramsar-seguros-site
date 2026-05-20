import Link from 'next/link'
import { BadgeCheck, ArrowRight } from 'lucide-react'
import { RatingHistogram } from './RatingHistogram'
import type { Insurer, InsurerReview } from '@/lib/strapi'

function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${stars} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= stars ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-4 h-4 text-accent-500"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ))}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function ReviewCard({
  review,
  insurerName,
}: {
  review: InsurerReview
  insurerName: string
}) {
  return (
    <blockquote className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col h-full">
      <StarRow stars={review.stars} />

      <p className="text-base text-neutral-700 mt-4 flex-1 line-clamp-6 italic">
        "{review.quote}"
      </p>

      <footer className="mt-auto pt-5 border-t border-neutral-100 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-neutral-600">{initials(review.authorName)}</span>
        </div>
        <cite className="not-italic flex flex-col flex-1 min-w-0">
          <span className="text-sm font-semibold text-neutral-900 leading-tight">
            {review.authorName}
          </span>
          <span className="text-xs text-neutral-500 leading-tight">{review.vehicle}</span>
        </cite>
        <span className="flex items-center gap-1 flex-shrink-0">
          <BadgeCheck size={14} strokeWidth={2} className="text-primary-500" aria-hidden="true" />
          <span className="text-xs font-semibold text-primary-600">Verificado</span>
        </span>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: review.stars,
              bestRating: 5,
            },
            author: {
              '@type': 'Person',
              name: review.authorName,
            },
            reviewBody: review.quote,
            itemReviewed: {
              '@type': 'Organization',
              name: insurerName,
            },
          }),
        }}
      />
    </blockquote>
  )
}

export function ReviewsSection({ insurer }: { insurer: Insurer }) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl tracking-tight text-neutral-900">
            Opiniones de asegurados con {insurer.name}
          </h2>
        </div>

        {/* Rating summary */}
        <div className="flex justify-center mb-10">
          <RatingHistogram
            breakdown={insurer.ratingBreakdown}
            rating={insurer.rating}
            reviewCount={insurer.reviewCount}
          />
        </div>

        {/* AggregateRating schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AggregateRating',
              ratingValue: insurer.rating,
              reviewCount: insurer.reviewCount,
              bestRating: 5,
              itemReviewed: {
                '@type': 'Organization',
                name: insurer.name,
              },
            }),
          }}
        />

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insurer.reviews.map((review) => (
            <ReviewCard key={review.authorName} review={review} insurerName={insurer.name} />
          ))}
        </div>

        {/* Footer link */}
        <div className="flex justify-center mt-8">
          <Link
            href={`/aseguradoras/${insurer.slug}/opiniones`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline underline-offset-2 no-underline transition-colors duration-150"
          >
            Ver todas las {insurer.reviewCount.toLocaleString('es-AR')} opiniones
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
