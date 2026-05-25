import Link from "next/link";
import Image from "next/image";
import type { BlogArticle } from "@/lib/blog";
import { CATEGORY_LABELS, CATEGORY_STYLES, formatDate } from "@/lib/blog";

type Props = { article: BlogArticle };

export function ArticleCard({ article }: Props) {
  const href = `/blog/${article.categoria}/${article.slug}`;
  const cat = CATEGORY_STYLES[article.categoria];
  const label = CATEGORY_LABELS[article.categoria];

  return (
    <Link
      href={href}
      className="block bg-white border border-neutral-200 rounded-[10px] overflow-hidden no-underline group transition-shadow duration-120 hover:shadow-elevation-3"
    >
      {/* Image - usando next/image con fallback al placeholder */}
      <div className="aspect-video relative shrink-0">
        {article.coverUrl ? (
          <Image
            src={article.coverUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder cuando no hay imagen */
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(45deg,#e2e0d8 0,#e2e0d8 6px,#efeee9 6px,#efeee9 12px)",
            }}
          />
        )}
        <span
          className={[
            "absolute bottom-2 left-2 font-sans font-semibold text-[10.5px] px-2 py-0.5 rounded-full z-10",
            cat.bg,
            cat.text,
          ].join(" ")}
        >
          {label}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-sans font-semibold text-[15px] leading-[1.28] text-neutral-900 group-hover:text-primary-700 transition-colors duration-120">
          {article.title}
        </h3>
        <p className="font-sans text-[13px] text-neutral-600 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <div
            className="w-5 h-5 rounded-full bg-neutral-200 shrink-0"
            aria-hidden="true"
          />
          <span className="font-mono text-[10.5px] text-neutral-500">
            {article.author} · {formatDate(article.publishedAt)} ·{" "}
            {article.readMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
