import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ramsarseguros.com.ar";

interface InsurerBreadcrumbProps {
  insurerName: string;
  insurerSlug: string;
}

export function InsurerBreadcrumb({
  insurerName,
  insurerSlug,
}: InsurerBreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Aseguradoras",
        item: `${siteUrl}/aseguradoras`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: insurerName,
        item: `${siteUrl}/aseguradoras/${insurerSlug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <div className="bg-white py-4">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="font-sans text-sm text-neutral-500 hover:text-primary-700 hover:underline underline-offset-2 transition-colors duration-150 no-underline"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} className="text-neutral-400 shrink-0" />
              </li>
              <li>
                <Link
                  href="/aseguradoras"
                  className="font-sans text-sm text-neutral-500 hover:text-primary-700 hover:underline underline-offset-2 transition-colors duration-150 no-underline"
                >
                  Aseguradoras
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} className="text-neutral-400 shrink-0" />
              </li>
              <li>
                <span
                  className="font-sans text-sm font-medium text-neutral-900"
                  aria-current="page"
                >
                  {insurerName}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
}
