'use client'

import { useEffect, useRef, useState } from 'react'
import type { RatingBreakdown } from '@/lib/strapi'

const BARS: { key: keyof RatingBreakdown; label: string }[] = [
  { key: 'five', label: '5★' },
  { key: 'four', label: '4★' },
  { key: 'three', label: '3★' },
  { key: 'two', label: '2★' },
  { key: 'one', label: '1★' },
]

export function RatingHistogram({
  breakdown,
  rating,
  reviewCount,
}: {
  breakdown: RatingBreakdown
  rating: number
  reviewCount: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      {/* Score */}
      <div className="flex flex-col items-center">
        <span className="font-serif text-6xl leading-none text-neutral-900 tabular-nums">
          {rating}
        </span>
        <div className="flex gap-1 mt-2" aria-label={`${rating} de 5 estrellas`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={i <= Math.floor(rating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5 text-accent-500"
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
        <p className="text-sm text-neutral-500 mt-1 font-mono">
          Basado en {reviewCount.toLocaleString('es-AR')} reseñas verificadas
        </p>
      </div>

      {/* Bars */}
      <div className="w-full max-w-xs flex flex-col gap-1.5">
        {BARS.map(({ key, label }, idx) => {
          const pct = breakdown[key]
          return (
            <div key={key} className="grid grid-cols-[28px_1fr_32px] items-center gap-2">
              <span className="font-mono text-xs text-neutral-600 text-right">{label}</span>
              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-500 rounded-full transition-[width] ease-out"
                  style={{
                    width: animated ? `${pct}%` : '0%',
                    transitionDuration: animated ? '360ms' : '0ms',
                    transitionDelay: animated ? `${idx * 100}ms` : '0ms',
                  }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${label}: ${pct}%`}
                />
              </div>
              <span className="font-mono text-xs text-neutral-600">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
