import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";
import { CATEGORY_LABELS, CATEGORY_STYLES, formatDate } from "@/lib/blog";

type Props = { article: BlogArticle };

export function FeaturedArticle({ article }: Props) {
  const href = `/blog/${article.categoria}/${article.slug}`;
  const cat = CATEGORY_STYLES[article.categoria];
  const label = CATEGORY_LABELS[article.categoria];

  return (
    <article className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-elevation-1">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        {/* Content */}
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
          <span
            className={[
              "self-start font-sans font-semibold text-[10.5px] px-2.5 py-1 rounded-full",
              cat.bg,
              cat.text,
            ].join(" ")}
          >
            {label}
          </span>

          <div className="flex flex-col gap-3">
            <h2 className="font-serif text-[28px] lg:text-[36px] leading-[1.08] tracking-[-0.02em] text-neutral-900">
              {article.title}
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] text-neutral-600 leading-relaxed max-w-[52ch]">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-neutral-200 shrink-0"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-[13px] text-neutral-800">
                {article.author}
              </span>
              <span className="font-mono text-[10.5px] text-neutral-500">
                {formatDate(article.publishedAt)} · {article.readMinutes} min de
                lectura
              </span>
            </div>
          </div>

          <Link
            href={href}
            className="self-start inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[14px] px-5 py-3 rounded-lg shadow-elevation-2 hover:bg-primary-800 transition-colors duration-120 no-underline"
          >
            Leer artículo
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Image placeholder — replace with next/image + priority when Strapi is connected */}
        <div
          className="hidden lg:flex items-center justify-center min-h-80 relative"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(135deg,#cee2df 0,#cee2df 14px,#ecf4f3 14px,#ecf4f3 28px)",
            }}
          />
          <span className="relative font-mono text-[10px] tracking-[0.18em] uppercase text-primary-500">
            Imagen del artículo
          </span>
        </div>
      </div>
    </article>
  );
}
