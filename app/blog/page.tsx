import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  getAllArticles,
  getFeaturedArticle,
  CATEGORY_LABELS,
} from "@/lib/blog";
import type { ArticleCategory } from "@/lib/blog";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";

// ─── Rendering strategy ───────────────────────────────────────────────────────
// Blog content changes a few times per week — 1h ISR is the right balance.
export const revalidate = 3600;

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { categoria } = await searchParams;

  if (categoria && categoria in CATEGORY_LABELS) {
    const label = CATEGORY_LABELS[categoria as ArticleCategory];
    return buildMetadata({
      title: `${label} — Blog de seguros de auto`,
      description: `${label} sobre seguros de auto en Argentina. Guías, consejos y análisis para elegir la mejor cobertura para tu vehículo.`,
      canonicalPath: `/blog?categoria=${categoria}`,
    });
  }

  return buildMetadata({
    title: "Blog de seguros de auto — Guías, consejos y comparativas",
    description:
      "Guías completas, comparativas de aseguradoras y consejos prácticos sobre seguros de auto en Argentina. Todo lo que necesitás saber para elegir bien.",
    canonicalPath: "/blog",
  });
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

function buildBlogSchema(
  articles: Awaited<ReturnType<typeof getAllArticles>>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de Ramsar Seguros",
    description:
      "Guías, comparativas y consejos sobre seguros de auto en Argentina.",
    url: absoluteUrl("/blog"),
    inLanguage: "es-AR",
    publisher: {
      "@type": "Organization",
      name: "Ramsar Seguros",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      url: absoluteUrl(`/blog/${a.categoria}/${a.slug}`),
      datePublished: a.publishedAt,
      author: {
        "@type": "Person",
        name: a.author,
        jobTitle: a.authorRole,
      },
      keywords: a.tags.join(", "),
    })),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const validCategoria =
    categoria && categoria in CATEGORY_LABELS
      ? (categoria as ArticleCategory)
      : undefined;

  const [featuredArticle, articles] = await Promise.all([
    getFeaturedArticle(),
    getAllArticles(validCategoria),
  ]);

  // On filtered views, exclude the featured article from the grid to avoid duplicate
  const gridArticles =
    !validCategoria && featuredArticle
      ? articles.filter((a) => a.slug !== featuredArticle.slug)
      : articles;

  const blogSchema = buildBlogSchema(articles);

  return (
    <>
      <JsonLd schema={blogSchema} />

      {/* ── Page header ── */}
      <section className="bg-neutral-50 pt-16 pb-10 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
                Blog
              </span>
              <h1 className="font-serif text-[40px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-3">
                {validCategoria
                  ? CATEGORY_LABELS[validCategoria]
                  : "Guías y consejos sobre seguros de auto"}
              </h1>
              <p className="font-sans text-[16px] text-neutral-500 max-w-[56ch] leading-relaxed">
                {validCategoria
                  ? `Todos los artículos de ${CATEGORY_LABELS[validCategoria].toLowerCase()} sobre seguros de auto en Argentina.`
                  : "Todo lo que necesitás saber para elegir el seguro ideal para tu auto en Argentina."}
              </p>
            </div>

            <Suspense>
              <CategoryFilter active={validCategoria} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Featured article (all-articles view only) ── */}
      {!validCategoria && featuredArticle && (
        <section className="py-10 bg-neutral-50">
          <div className="max-w-300 mx-auto px-6 lg:px-16">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </section>
      )}

      {/* ── Article grid ── */}
      <section className="py-10 pb-20 bg-neutral-50">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          {gridArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-[24px] text-neutral-500 mb-4">
                No hay artículos en esta categoría todavía.
              </p>
              <Link
                href="/blog"
                className="font-sans font-semibold text-[14px] text-primary-700 hover:underline no-underline"
              >
                Ver todos los artículos →
              </Link>
            </div>
          ) : (
            <>
              {validCategoria && (
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-400 mb-6">
                  {gridArticles.length}{" "}
                  {gridArticles.length === 1 ? "artículo" : "artículos"}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-primary-700 py-16">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-[32px] lg:text-[40px] leading-[1.08] tracking-[-0.02em] text-white">
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
  );
}
