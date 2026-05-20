import Link from "next/link";
import type { ArticleCategory } from "@/lib/blog";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "@/lib/blog";

type Props = {
  active?: string;
};

export function CategoryFilter({ active }: Props) {
  const allPills: { label: string; href: string; value: string | null }[] = [
    { label: "Todos", href: "/blog", value: null },
    ...ALL_CATEGORIES.map((cat: ArticleCategory) => ({
      label: CATEGORY_LABELS[cat],
      href: `/blog?categoria=${cat}`,
      value: cat,
    })),
  ];

  return (
    <nav aria-label="Filtrar por categoría">
      <ul className="flex flex-wrap gap-2" role="list">
        {allPills.map(({ label, href, value }) => {
          const isActive = (value === null && !active) || value === active;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "inline-block font-sans font-semibold text-[13px] px-4 py-2 rounded-full border transition-colors duration-120 no-underline",
                  isActive
                    ? "bg-primary-700 text-white border-primary-700"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-primary-300 hover:text-primary-700",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
