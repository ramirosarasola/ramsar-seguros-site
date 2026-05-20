import Link from "next/link";

const ARTICLES = [
  {
    href: "/blog/guias/terceros-plus-todo-riesgo-comparativa",
    category: "Guías",
    categoryBg: "bg-green-700",
    categoryText: "text-white",
    title: "Terceros, Terceros Plus o Todo Riesgo: ¿cuál conviene en 2025?",
    excerpt:
      "Entendé las diferencias reales entre cada tipo de cobertura y descubrí cuál se adapta mejor a tu auto y tu presupuesto.",
    author: "Lucía Andrade",
    date: "12 may 2026",
    readTime: "8 min",
  },
  {
    href: "/blog/comparativas/sancor-vs-zurich-2026",
    category: "Comparativas",
    categoryBg: "bg-accent-300",
    categoryText: "text-accent-700",
    title: "Sancor vs Zurich: comparativa completa de precios y coberturas",
    excerpt:
      "Analizamos en detalle las dos aseguradoras más consultadas en Argentina para que puedas decidir con información real.",
    author: "Martín Rey",
    date: "6 may 2026",
    readTime: "10 min",
  },
  {
    href: "/blog/consejos/seguro-auto-0km-argentina",
    category: "Consejos",
    categoryBg: "bg-primary-50",
    categoryText: "text-primary-700",
    title: "¿Cuánto cuesta el seguro de un auto 0 km en Argentina?",
    excerpt:
      "Los autos nuevos tienen particularidades que afectan el precio del seguro. Te explicamos todo antes de que contrates.",
    author: "Lucía Andrade",
    date: "28 abr 2026",
    readTime: "6 min",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-neutral-100 py-20">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 block mb-2">
              Blog
            </span>
            <h2 className="font-serif text-[36px] leading-[1.06] tracking-[-0.015em] text-neutral-900">
              Guías y consejos sobre seguros de auto
            </h2>
            <p className="font-sans text-[16px] text-neutral-500 mt-2">
              Todo lo que necesitás saber para elegir bien.
            </p>
          </div>
          <Link
            href="/blog"
            className="font-sans font-semibold text-[14px] text-primary-700 no-underline hover:underline hover:underline-offset-2 shrink-0"
          >
            Ver todos los artículos →
          </Link>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, i) => (
            <Link
              key={article.href}
              href={article.href}
              className={[
                "block bg-white border border-neutral-200 rounded-[10px] overflow-hidden no-underline group",
                "transition-shadow duration-120 hover:shadow-elevation-3",
                /* mobile: hide 3rd article */
                i === 2 ? "hidden md:block" : "",
              ].join(" ")}
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-neutral-200 relative shrink-0">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg,#e2e0d8 0,#e2e0d8 6px,#efeee9 6px,#efeee9 12px)",
                  }}
                />
                <span
                  className={[
                    "absolute bottom-2 left-2 font-sans font-semibold text-[10.5px] px-2 py-0.5 rounded-full",
                    article.categoryBg,
                    article.categoryText,
                  ].join(" ")}
                >
                  {article.category}
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
                    {article.author} · {article.date} · {article.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Mobile: show link to hidden 3rd article */}
          <div className="md:hidden">
            <Link
              href="/blog"
              className="block w-full text-center font-sans font-semibold text-[14px] text-primary-700 no-underline hover:underline py-2"
            >
              Ver más artículos →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
