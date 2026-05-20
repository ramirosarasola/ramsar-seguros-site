'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TocHeading } from '@/lib/blog'

type Props = { headings: TocHeading[] }

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 },
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Tabla de contenidos">
      <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-neutral-500 mb-3">
        En este artículo
      </h3>
      <ol className="flex flex-col gap-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                'block font-sans text-[13px] leading-snug py-1.5 pl-3 border-l-2 transition-colors duration-120 no-underline',
                h.level === 3 && 'pl-6 text-[12px]',
                activeId === h.id
                  ? 'border-primary-600 text-primary-700 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
