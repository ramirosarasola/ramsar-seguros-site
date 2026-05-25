import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Ramsar Seguros",
  description:
    "Conocé quiénes somos. Ramsar Seguros es un corredor de seguros matriculado ante la SSN, dedicado a ayudarte a comparar y contratar el mejor seguro de auto en Argentina.",
  canonicalPath: "/sobre-ramsar",
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ramsar Seguros",
  description:
    "Comparador y corredor de seguros de auto en Argentina. Matriculado ante la SSN.",
  url: absoluteUrl("/"),
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "Argentina" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
};

const STATS = [
  { value: "50.000+", label: "Cotizaciones realizadas" },
  { value: "14", label: "Aseguradoras comparadas" },
  { value: "2 min", label: "Tiempo promedio de cotización" },
  { value: "100%", label: "Digital, sin papeles" },
];

const VALUES = [
  {
    title: "Transparencia",
    desc: "Te mostramos todas las condiciones antes de que decidas. Sin letra chica, sin sorpresas.",
  },
  {
    title: "Independencia",
    desc: "No somos agentes de ninguna aseguradora en particular. Trabajamos para que vos elijas lo mejor.",
  },
  {
    title: "Simplicidad",
    desc: "Convertimos procesos complejos en pasos simples. Cotizás en 2 minutos, contratás en 5.",
  },
  {
    title: "Asesoramiento real",
    desc: "Nuestro equipo explica cada cobertura en lenguaje claro. Somos el amigo informado que todos necesitan.",
  },
];

export default function SobreRamsarPage() {
  return (
    <>
      <JsonLd schema={orgSchema} />

      {/* Hero */}
      <section className="bg-neutral-50 pt-16 pb-14 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
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
              Sobre Ramsar
            </span>
          </nav>

          <div className="max-w-[64ch]">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
              Quiénes somos
            </span>
            <h1 className="font-serif text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-5">
              El amigo informado que te ayuda a elegir tu seguro
            </h1>
            <p className="font-sans text-[18px] text-neutral-600 leading-relaxed mb-4">
              Ramsar Seguros nació con una convicción: contratar un seguro de
              auto en Argentina no debería ser confuso, caro ni eterno. Somos un
              corredor de seguros matriculado ante la SSN que compara las
              principales aseguradoras del mercado para que vos elijas con
              información completa.
            </p>
            <p className="font-sans text-[16px] text-neutral-500 leading-relaxed">
              No vendemos un seguro en particular — te mostramos todos y te
              ayudamos a entender cada cobertura antes de decidir.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-neutral-200 py-10">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-serif text-[40px] leading-none tracking-[-0.02em] text-primary-700">
                  {stat.value}
                </span>
                <span className="font-sans text-[13px] text-neutral-500 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-neutral-50 py-16 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
                Nuestra misión
              </span>
              <h2 className="font-serif text-[32px] leading-[1.08] tracking-[-0.015em] text-neutral-900 mb-5">
                Democratizar el acceso a seguros de calidad
              </h2>
              <p className="font-sans text-[16px] text-neutral-700 leading-relaxed mb-4">
                En Argentina, la mayoría de los conductores contrata el seguro
                que le recomienda un conocido o directamente el más barato — sin
                comparar ni entender qué están comprando. Eso nos lleva a
                situaciones en las que, cuando más se necesita la cobertura, no
                aparece.
              </p>
              <p className="font-sans text-[16px] text-neutral-700 leading-relaxed mb-4">
                Nuestra misión es cambiar eso. Queremos que cada conductor
                argentino tome la decisión de su seguro con información real,
                comparativas honestas y asesoramiento sin presión de venta.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <span className="font-mono text-[11px] tracking-[0.06em] text-accent-600 border border-accent-500/50 px-3 py-1.5 rounded-sm">
                  SSN · Corredor matriculado
                </span>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="bg-white border border-neutral-200 rounded-[10px] p-5"
                >
                  <h3 className="font-sans font-semibold text-[15px] text-neutral-900 mb-1">
                    {v.title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 py-14">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-[32px] lg:text-[40px] leading-[1.08] tracking-[-0.02em] text-white">
            ¿Listo para encontrar tu seguro ideal?
          </h2>
          <p className="font-sans text-[15px] text-primary-200 max-w-[44ch] leading-relaxed">
            Comparamos las mejores aseguradoras de Argentina en 2 minutos. Sin
            llamados, sin papeles.
          </p>
          <Link
            href="/seguros-de-auto/cotizar"
            className="inline-flex items-center gap-2 bg-accent-500 text-secondary-700 font-sans font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-md hover:bg-accent-600 transition-colors duration-120 no-underline"
          >
            Cotizá gratis ahora →
          </Link>
        </div>
      </section>
    </>
  );
}
