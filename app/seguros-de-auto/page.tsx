import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSegurosAuto } from "@/components/seguros/HeroSegurosAuto";
import { TiposDeCobertura } from "@/components/seguros/TiposDeCobertura";
import { AseguradorasGrid } from "@/components/home/AseguradorasGrid";
import { TestimoniosSection } from "@/components/home/TestimoniosSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "Seguros de Auto en Argentina — Comparador 2026",
  description:
    "Comparamos más de 20 aseguradoras de seguros de auto en Argentina. Conocé los tipos de cobertura, precios y contratá 100% online en 2 minutos.",
  canonicalPath: "/seguros-de-auto",
  keywords: [
    "seguros de auto Argentina",
    "seguro automotor",
    "cotizar seguro de auto",
    "tipos de cobertura seguro auto",
    "responsabilidad civil",
    "terceros completo",
    "todo riesgo",
  ],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ramsarseguros.com.ar";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Comparador de Seguros de Auto en Argentina",
  serviceType: "Seguro de Automóvil",
  provider: {
    "@type": "InsuranceAgency",
    name: "Ramsar Seguros",
    url: siteUrl,
  },
  areaServed: {
    "@type": "Country",
    name: "Argentina",
    sameAs: "https://www.wikidata.org/wiki/Q414",
  },
  description:
    "Comparamos más de 20 aseguradoras de Argentina para que encontrés el mejor seguro de auto según tu vehículo y presupuesto.",
  url: `${siteUrl}/seguros-de-auto`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tipos de cobertura de seguro de auto",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Responsabilidad Civil",
        description: "Cobertura mínima obligatoria por ley",
      },
      {
        "@type": "Offer",
        name: "Terceros",
        description: "RC + daños accidentales al propio vehículo",
      },
      {
        "@type": "Offer",
        name: "Terceros Completo",
        description: "Incluye robo total, granizo e incendio",
      },
      {
        "@type": "Offer",
        name: "Todo Riesgo",
        description: "Protección completa para el vehículo",
      },
    ],
  },
};

export default function SegurosDeAutoPage() {
  return (
    <>
      <JsonLd schema={serviceSchema} />
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSegurosAuto />
        <TiposDeCobertura />
        <AseguradorasGrid />
        <TestimoniosSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
