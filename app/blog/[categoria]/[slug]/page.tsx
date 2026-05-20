import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { ArticleBody } from '@/components/blog/ArticleBody'
import { ArticleSidebar } from '@/components/blog/ArticleSidebar'
import { ArticleAuthorCard } from '@/components/blog/ArticleAuthorCard'
import { ArticleCard } from '@/components/blog/ArticleCard'
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  extractTocHeadings,
  CATEGORY_LABELS,
} from '@/lib/blog'
import { buildMetadata, absoluteUrl } from '@/lib/metadata'
import type { BlogPost } from '@/lib/blog'

// ─── Rendering strategy ───────────────────────────────────────────────────────
// Articles are static by nature. ISR ensures edits via Strapi propagate daily.
export const revalidate = 86400

type Props = {
  params: Promise<{ categoria: string; slug: string }>
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(({ categoria, slug }) => ({ categoria, slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params
  const post = await getArticleBySlug(categoria, slug)
  if (!post) return {}

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${categoria}/${slug}`,
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      section: CATEGORY_LABELS[post.categoria],
    },
  })
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function buildArticleSchema(post: BlogPost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.categoria}/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: 'es-AR',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      description: post.authorBio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ramsar Seguros',
      url: absoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    keywords: post.tags.join(', '),
    articleSection: CATEGORY_LABELS[post.categoria],
    timeRequired: `PT${post.readMinutes}M`,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { categoria, slug } = await params

  const [post, related] = await Promise.all([
    getArticleBySlug(categoria, slug),
    getRelatedArticles(categoria, slug),
  ])

  if (!post) notFound()

  const headings = extractTocHeadings(post.content)

  return (
    <>
      <JsonLd schema={buildArticleSchema(post)} />

      {/* Article header */}
      <ArticleHeader post={post} />

      {/* Main content + sidebar */}
      <div className="bg-white">
        <div className="max-w-300 mx-auto px-6 lg:px-16 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-16">
            {/* Body */}
            <div>
              <ArticleBody content={post.content} />
              <ArticleAuthorCard post={post} />

              {/* Mobile: related articles */}
              {related.length > 0 && (
                <section className="mt-12 pt-8 border-t border-neutral-200 lg:hidden">
                  <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-neutral-500 mb-5">
                    Artículos relacionados
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.slice(0, 2).map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky sidebar — desktop only */}
            <ArticleSidebar
              headings={headings}
              post={post}
              related={related}
            />
          </div>
        </div>
      </div>

      {/* Related articles — full grid at bottom (desktop) */}
      {related.length > 0 && (
        <section className="hidden lg:block bg-neutral-50 border-t border-neutral-200 py-16">
          <div className="max-w-300 mx-auto px-6 lg:px-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-neutral-900">
                También te puede interesar
              </h2>
              <Link
                href="/blog"
                className="font-sans font-semibold text-[13px] text-primary-700 hover:underline no-underline"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {related.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-primary-700 py-16">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-[28px] lg:text-[36px] leading-[1.1] tracking-[-0.02em] text-white">
            ¿Listo para cotizar tu seguro?
          </h2>
          <p className="font-sans text-[15px] text-primary-200 max-w-[44ch] leading-relaxed">
            Compará las mejores aseguradoras de Argentina en 2 minutos. Sin
            llamados, sin papeles.
          </p>
          <Link
            href="/seguros-de-auto/cotizar"
            className="inline-flex items-center gap-2 bg-accent-500 text-secondary-700 font-sans font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-elevation-3 hover:bg-accent-600 transition-colors duration-120 no-underline"
          >
            Cotizá gratis ahora
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
