import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { AseguradorasListing } from "@/components/aseguradoras/AseguradorasListing";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "Aseguradoras de Seguros de Auto en Argentina",
  description:
    "Comparamos las principales aseguradoras de autos de Argentina: coberturas, opiniones reales y condiciones actualizadas. Elegí la que mejor se adapta a tu auto.",
  canonicalPath: "/aseguradoras",
  keywords: [
    "aseguradoras de auto Argentina",
    "compañías de seguros de auto",
    "mejores aseguradoras Argentina",
    "comparar aseguradoras",
  ],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ramsarseguros.com.ar";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Aseguradoras de seguros de auto en Argentina",
  description:
    "Listado de las principales aseguradoras de autos comparadas por Ramsar Seguros",
  url: `${siteUrl}/aseguradoras`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Sancor Seguros",
      url: `${siteUrl}/aseguradoras/sancor-seguros`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Zurich Argentina",
      url: `${siteUrl}/aseguradoras/zurich`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Federación Patronal",
      url: `${siteUrl}/aseguradoras/federacion-patronal`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "La Meridional",
      url: `${siteUrl}/aseguradoras/la-meridional`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "San Cristóbal Seguros",
      url: `${siteUrl}/aseguradoras/san-cristobal`,
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Mapfre",
      url: `${siteUrl}/aseguradoras/mapfre`,
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Allianz Argentina",
      url: `${siteUrl}/aseguradoras/allianz`,
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Galicia Seguros",
      url: `${siteUrl}/aseguradoras/galicia-seguros`,
    },
    {
      "@type": "ListItem",
      position: 9,
      name: "Triunfo Seguros",
      url: `${siteUrl}/aseguradoras/triunfo-seguros`,
    },
    {
      "@type": "ListItem",
      position: 10,
      name: "BBVA Seguros",
      url: `${siteUrl}/aseguradoras/bbva-seguros`,
    },
  ],
};

export default function AseguradorasPage() {
  return (
    <>
      <JsonLd schema={itemListSchema} />

      {/* Hero */}
      <section className="bg-white border-b border-neutral-200 py-14 md:py-18">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex justify-center items-center gap-2 mb-6"
          >
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors duration-120 no-underline"
            >
              Inicio
            </Link>
            <span className="text-neutral-400 text-[11px]" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-900">
              Aseguradoras
            </span>
          </nav>

          <h1 className="font-serif text-[clamp(32px,4.5vw,54px)] leading-[1.06] tracking-tight text-neutral-900 max-w-[22ch] mx-auto">
            Aseguradoras de Seguros de Auto en Argentina
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-neutral-600 mt-4 max-w-[52ch] mx-auto">
            Comparamos coberturas, condiciones y opiniones reales de las
            principales compañías del mercado para que elijas con información
            completa.
          </p>
          <div className="mt-6">
            <Link
              href="/seguros-de-auto/cotizar"
              className={[
                "inline-flex items-center gap-2",
                "bg-primary-700 text-white",
                "font-sans font-semibold text-[14px]",
                "px-6 py-3 rounded-sm no-underline",
                "hover:bg-primary-600 active:bg-primary-800",
                "transition-colors duration-120",
              ].join(" ")}
            >
              Cotizá con todas las aseguradoras →
            </Link>
          </div>
        </div>
      </section>

      <AseguradorasListing />
      <CtaBanner />
    </>
  );
}
