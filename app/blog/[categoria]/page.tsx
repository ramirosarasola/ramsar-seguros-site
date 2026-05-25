import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllArticles, ALL_CATEGORIES, CATEGORY_LABELS } from "@/lib/blog";
import type { ArticleCategory } from "@/lib/blog";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";

export const revalidate = 3600;

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return ALL_CATEGORIES.map((categoria) => ({ categoria }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;

  if (!(ALL_CATEGORIES as readonly string[]).includes(categoria)) {
    return {};
  }

  const label = CATEGORY_LABELS[categoria as ArticleCategory];
  return buildMetadata({
    title: `${label} — Blog de seguros de auto`,
    description: `${label} sobre seguros de auto en Argentina. Guías, análisis y consejos para elegir la mejor cobertura para tu vehículo.`,
    canonicalPath: `/blog/${categoria}`,
  });
}

export default async function BlogCategoriaPage({ params }: Props) {
  const { categoria } = await params;

  if (!(ALL_CATEGORIES as readonly string[]).includes(categoria)) {
    redirect("/blog");
  }

  const cat = categoria as ArticleCategory;
  const label = CATEGORY_LABELS[cat];
  const articles = await getAllArticles(cat);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${label} — Blog de Ramsar Seguros`,
    description: `Artículos de ${label.toLowerCase()} sobre seguros de auto en Argentina.`,
    url: absoluteUrl(`/blog/${cat}`),
    inLanguage: "es-AR",
    publisher: {
      "@type": "Organization",
      name: "Ramsar Seguros",
      url: absoluteUrl("/"),
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      url: absoluteUrl(`/blog/${a.categoria}/${a.slug}`),
      datePublished: a.publishedAt,
      author: { "@type": "Person", name: a.author, jobTitle: a.authorRole },
      keywords: a.tags.join(", "),
    })),
  };

  return (
    <>
      <JsonLd schema={blogListSchema} />

      {/* Page header */}
      <section className="bg-neutral-50 pt-16 pb-10 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link
                href="/blog"
                className="font-mono text-[11px] tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors duration-120 no-underline"
              >
                Blog
              </Link>
              <span className="text-neutral-400 text-[11px]" aria-hidden="true">
                /
              </span>
              <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-900">
                {label}
              </span>
            </nav>

            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
                {label}
              </span>
              <h1 className="font-serif text-[40px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-3">
                {label}
              </h1>
              <p className="font-sans text-[16px] text-neutral-500 max-w-[56ch] leading-relaxed">
                Todos los artículos de {label.toLowerCase()} sobre seguros de
                auto en Argentina.
              </p>
            </div>

            <Suspense>
              <CategoryFilter active={cat} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-10 pb-20 bg-neutral-50">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          {articles.length === 0 ? (
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
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-400 mb-6">
                {articles.length}{" "}
                {articles.length === 1 ? "artículo" : "artículos"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
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
            Cotizá gratis ahora <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
