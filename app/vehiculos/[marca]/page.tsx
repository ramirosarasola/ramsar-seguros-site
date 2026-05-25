import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";
import {
  MARCAS,
  getMarcaBySlug,
  modeloToSlug,
  ALL_MARCA_SLUGS,
} from "@/lib/vehiculos";
import { CtaBanner } from "@/components/home/CtaBanner";

export const revalidate = 86400;

type Props = { params: Promise<{ marca: string }> };

export function generateStaticParams() {
  return ALL_MARCA_SLUGS.map((marca) => ({ marca }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marca: slug } = await params;
  const marca = getMarcaBySlug(slug);
  if (!marca) return {};

  return buildMetadata({
    title: `Seguros de Auto ${marca.name} en Argentina`,
    description: `Cotizá el seguro de tu ${marca.name} con las principales aseguradoras de Argentina. Comparamos coberturas para todos los modelos: ${marca.models.slice(0, 4).join(", ")} y más.`,
    canonicalPath: `/vehiculos/${slug}`,
    keywords: [
      `seguro ${marca.name} Argentina`,
      `cotizar seguro ${marca.name}`,
      `seguro auto ${marca.name}`,
      ...marca.models.slice(0, 3).map((m) => `seguro ${marca.name} ${m}`),
    ],
  });
}

const COVERAGE_BULLETS = [
  "Responsabilidad Civil obligatoria",
  "Cobertura contra terceros",
  "Granizo, incendio y robo",
  "Todo riesgo con/sin franquicia",
];

const BENEFITS = [
  {
    title: "Comparamos por vos",
    desc: "Accedés a las mejores propuestas del mercado en un solo lugar, sin tener que llamar a cada aseguradora.",
  },
  {
    title: "Sin surpresas",
    desc: "Te explicamos cada cobertura en lenguaje claro antes de que decidas. Nada de letra chica.",
  },
  {
    title: "Trámite 100% digital",
    desc: "Emitís tu póliza online en minutos. Sin papeles, sin visitas, sin esperas.",
  },
];

export default async function MarcaPage({ params }: Props) {
  const { marca: slug } = await params;
  const marca = getMarcaBySlug(slug);

  if (!marca) {
    redirect("/vehiculos");
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Seguro de Auto ${marca.name}`,
    description: marca.description,
    provider: {
      "@type": "Organization",
      name: "Ramsar Seguros",
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    url: absoluteUrl(`/vehiculos/${slug}`),
    serviceType: "Seguro de Automóvil",
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />

      {/* Page header */}
      <section className="bg-neutral-50 pt-16 pb-10 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link
                href="/vehiculos"
                className="font-mono text-[11px] tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors duration-120 no-underline"
              >
                Por marca
              </Link>
              <span className="text-neutral-400 text-[11px]" aria-hidden="true">
                /
              </span>
              <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-900">
                {marca.name}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                {marca.img && (
                  <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-5 overflow-hidden">
                    <Image
                      src={marca.img}
                      alt={`Logo ${marca.name}`}
                      width={56}
                      height={56}
                      className="object-contain p-1.5"
                      sizes="56px"
                      priority
                    />
                  </div>
                )}
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
                  Seguros por marca
                </span>
                <h1 className="font-serif text-[40px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-3">
                  Seguros de Auto {marca.name}
                </h1>
                <p className="font-sans text-[16px] text-neutral-500 max-w-[60ch] leading-relaxed">
                  {marca.description}
                </p>
              </div>

              <Link
                href={`/seguros-de-auto/cotizar?marca=${slug}`}
                className="inline-flex items-center gap-2 bg-accent-500 text-secondary-700 font-sans font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-md hover:bg-accent-600 transition-colors duration-120 no-underline whitespace-nowrap"
              >
                Cotizar seguro {marca.name} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Models grid */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <h2 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-neutral-900 mb-2">
            Modelos {marca.name}
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 mb-6">
            Seleccioná tu modelo para cotizar directamente con las coberturas
            disponibles.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {marca.models.map((modelo) => (
              <Link
                key={modelo}
                href={`/seguros-de-auto/cotizar?marca=${slug}&modelo=${modeloToSlug(modelo)}`}
                className={[
                  "group flex items-center justify-between gap-3 px-4 py-3.5",
                  "bg-white border border-neutral-200 rounded-xl no-underline",
                  "hover:border-primary-300 hover:bg-primary-50",
                  "transition-all duration-120",
                ].join(" ")}
              >
                <span className="font-sans font-medium text-[14px] text-neutral-800 group-hover:text-primary-700 transition-colors duration-120">
                  {modelo}
                </span>
                <span
                  className="text-neutral-400 group-hover:text-primary-500 transition-colors duration-120 text-[14px]"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-neutral-400 mt-5">
            {marca.models.length} modelos · Al hacer clic accedés al cotizador
            pre-cargado
          </p>
        </div>
      </section>

      {/* Coverage types */}
      <section className="bg-white py-12 border-t border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
                Coberturas disponibles
              </span>
              <h2 className="font-serif text-[32px] leading-[1.08] tracking-[-0.015em] text-neutral-900 mb-4">
                ¿Qué coberturas existen para tu {marca.name}?
              </h2>
              <p className="font-sans text-[16px] text-neutral-600 leading-relaxed mb-6">
                Las aseguradoras ofrecen distintos niveles de protección según
                el valor y el uso de tu vehículo. En Ramsar comparamos todas las
                opciones para que elijas con información completa.
              </p>
              <ul className="flex flex-col gap-3">
                {COVERAGE_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span
                      className="text-primary-700 font-bold text-[16px]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="font-sans text-[15px] text-neutral-700">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={`/seguros-de-auto/cotizar?marca=${slug}`}
                  className="inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[14px] px-6 py-3 rounded-sm hover:bg-primary-600 transition-colors duration-120 no-underline"
                >
                  Comparar coberturas para mi {marca.name}
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-5">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="bg-neutral-50 border border-neutral-200 rounded-[10px] p-5"
                >
                  <h3 className="font-sans font-semibold text-[16px] text-neutral-900 mb-1">
                    {b.title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO copy */}
      <section className="bg-neutral-50 py-14 border-t border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="max-w-[70ch]">
            <h2 className="font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-neutral-900 mb-4">
              Todo sobre el seguro de auto {marca.name} en Argentina
            </h2>
            <p className="font-sans text-[15px] text-neutral-700 leading-relaxed mb-4">
              Asegurar un {marca.name} en Argentina implica considerar múltiples
              factores: el valor de mercado del modelo, la disponibilidad de
              repuestos, el historial de siniestralidad de la marca y la zona
              donde circula el vehículo.
            </p>
            <p className="font-sans text-[15px] text-neutral-700 leading-relaxed mb-4">
              Las aseguradoras calculan la prima en función de todos estos
              elementos, por eso es fundamental comparar antes de contratar. Un
              mismo modelo puede tener valores muy diferentes según la
              aseguradora y la cobertura elegida.
            </p>
            <p className="font-sans text-[15px] text-neutral-700 leading-relaxed">
              En Ramsar Seguros trabajamos con las principales compañías del
              mercado argentino para que puedas encontrar la cobertura que mejor
              se adapta a tu uso diario, al valor de tu {marca.name} y a tu
              presupuesto.
            </p>
          </div>
        </div>
      </section>

      {/* Other brands */}
      <section className="bg-white py-10 border-t border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <h2 className="font-sans font-semibold text-[13px] tracking-widest uppercase text-neutral-500 mb-5">
            Otras marcas
          </h2>
          <div className="flex flex-wrap gap-2">
            {MARCAS.filter((m) => m.slug !== slug)
              .slice(0, 10)
              .map((m) => (
                <Link
                  key={m.slug}
                  href={`/vehiculos/${m.slug}`}
                  className="font-sans text-[14px] text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full hover:border-primary-300 hover:text-primary-700 transition-colors duration-120 no-underline"
                >
                  {m.name}
                </Link>
              ))}
            <Link
              href="/vehiculos"
              className="font-sans text-[14px] text-primary-700 border border-primary-200 px-3 py-1.5 rounded-full hover:bg-primary-50 transition-colors duration-120 no-underline"
            >
              Ver todas →
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
