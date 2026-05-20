import Link from 'next/link'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ArticleCard } from '@/components/blog/ArticleCard'
import type { BlogArticle, BlogPost, TocHeading } from '@/lib/blog'

type Props = {
  headings: TocHeading[]
  post: BlogPost
  related: BlogArticle[]
}

export function ArticleSidebar({ headings, related }: Props) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 flex flex-col gap-6">
        {/* Table of contents */}
        {headings.length > 0 && (
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-elevation-1">
            <TableOfContents headings={headings} />
          </div>
        )}

        {/* CTA card */}
        <div className="bg-primary-700 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-accent-500/20"
          />
          <p className="font-serif text-[19px] leading-tight text-white relative">
            ¿Querés comparar coberturas?
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-primary-200 relative">
            Cotizá las 14 principales aseguradoras en 2 minutos. Sin llamados.
          </p>
          <Link
            href="/seguros-de-auto/cotizar"
            className="mt-1 inline-flex items-center justify-center gap-2 bg-accent-500 text-secondary-700 font-sans font-semibold text-[13px] px-4 py-2.5 rounded-lg shadow-elevation-2 hover:bg-accent-600 transition-colors duration-120 no-underline relative"
          >
            Cotizá gratis
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-neutral-500">
              Artículos relacionados
            </h3>
            <div className="flex flex-col gap-3">
              {related.slice(0, 2).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
