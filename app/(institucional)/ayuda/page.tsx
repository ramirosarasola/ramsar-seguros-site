import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Centro de Ayuda — Ramsar Seguros",
  description:
    "Centro de ayuda de Ramsar Seguros. Encontrá respuestas sobre cotización, coberturas, siniestros y contratación de seguros de auto en Argentina.",
  canonicalPath: "/ayuda",
});

const HELP_SECTIONS = [
  {
    title: "Cotización y precios",
    href: "/preguntas-frecuentes#cotizacion",
    desc: "Cómo cotizar, qué datos necesitás y cuánto tarda el proceso.",
    links: [
      {
        label: "¿Cuánto cuesta un seguro de auto?",
        href: "/preguntas-frecuentes",
      },
      {
        label: "¿Qué datos necesito para cotizar?",
        href: "/preguntas-frecuentes",
      },
      { label: "¿El servicio es gratuito?", href: "/preguntas-frecuentes" },
    ],
  },
  {
    title: "Tipos de cobertura",
    href: "/preguntas-frecuentes#coberturas",
    desc: "Diferencias entre terceros, terceros completo y todo riesgo.",
    links: [
      {
        label: "¿Cuál es la diferencia entre terceros y todo riesgo?",
        href: "/preguntas-frecuentes",
      },
      { label: "¿Qué es la franquicia?", href: "/preguntas-frecuentes" },
      { label: "¿El seguro cubre el robo?", href: "/preguntas-frecuentes" },
    ],
  },
  {
    title: "Siniestros",
    href: "/preguntas-frecuentes#siniestros",
    desc: "Qué hacer ante un accidente y cómo funciona el proceso.",
    links: [
      {
        label: "¿Qué hago si tengo un accidente?",
        href: "/preguntas-frecuentes",
      },
      { label: "¿Cuánto tarda un siniestro?", href: "/preguntas-frecuentes" },
    ],
  },
  {
    title: "Cómo funciona Ramsar",
    href: "/como-funciona",
    desc: "Todo sobre nuestra plataforma y proceso de contratación.",
    links: [
      { label: "El proceso paso a paso", href: "/como-funciona" },
      { label: "¿Quiénes somos?", href: "/sobre-ramsar" },
    ],
  },
];

export default function AyudaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-50 pt-16 pb-12 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex justify-center items-center gap-2 mb-8"
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
              Ayuda
            </span>
          </nav>
          <h1 className="font-serif text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-4">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="font-sans text-[18px] text-neutral-600 leading-relaxed max-w-[48ch] mx-auto">
            Encontrá respuestas a las preguntas más comunes o escribinos
            directamente.
          </p>
        </div>
      </section>

      {/* Help sections */}
      <section className="bg-white py-14">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HELP_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="bg-neutral-50 border border-neutral-200 rounded-[10px] p-6 flex flex-col gap-4"
              >
                <div>
                  <h2 className="font-sans font-semibold text-[17px] text-neutral-900 mb-1">
                    {section.title}
                  </h2>
                  <p className="font-sans text-[14px] text-neutral-500">
                    {section.desc}
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-[14px] text-primary-700 hover:underline no-underline"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-neutral-50 py-12 border-t border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16 text-center flex flex-col items-center gap-4">
          <h2 className="font-serif text-[26px] leading-[1.1] tracking-[-0.015em] text-neutral-900">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="font-sans text-[15px] text-neutral-600">
            Nuestro equipo responde en menos de 1 hora en horario de atención.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[14px] px-5 py-3 rounded-sm hover:bg-primary-600 transition-colors duration-120 no-underline"
            >
              Contactar a un asesor
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="inline-flex items-center gap-2 border border-primary-700 text-primary-700 font-sans font-semibold text-[14px] px-5 py-3 rounded-sm hover:bg-primary-50 transition-colors duration-120 no-underline"
            >
              Ver preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
