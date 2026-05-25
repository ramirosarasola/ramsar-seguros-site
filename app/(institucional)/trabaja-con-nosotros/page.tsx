import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Trabajá con Nosotros — Ramsar Seguros",
  description:
    "Sumáte al equipo de Ramsar Seguros. Buscamos personas apasionadas por la tecnología, el asesoramiento y la industria aseguradora en Argentina.",
  canonicalPath: "/trabaja-con-nosotros",
});

const VALUES = [
  {
    title: "Trabajo remoto",
    desc: "Trabajamos en modalidad híbrida o 100% remota según el rol.",
  },
  {
    title: "Equipo chico, impacto grande",
    desc: "Cada persona tiene visibilidad real sobre los resultados del negocio.",
  },
  {
    title: "Aprendizaje continuo",
    desc: "Acceso a cursos, libros y conferencias del rubro.",
  },
  {
    title: "Cultura de feedback",
    desc: "Feedback frecuente y honesto en todas las direcciones.",
  },
];

export default function TrabajaConNosotrosPage() {
  return (
    <>
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
              Trabajá con nosotros
            </span>
          </nav>
          <div className="max-w-[56ch]">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 block mb-3">
              Equipo
            </span>
            <h1 className="font-serif text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-5">
              Construimos el futuro de los seguros de auto en Argentina
            </h1>
            <p className="font-sans text-[18px] text-neutral-600 leading-relaxed">
              Somos un equipo pequeño con un objetivo ambicioso: hacer que
              contratar un seguro de auto sea tan fácil como pedir un Uber. Si
              eso te apasiona, hablemos.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-14 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <h2 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-neutral-900 mb-8">
            Cómo trabajamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-neutral-50 border border-neutral-200 rounded-[10px] p-5"
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
      </section>

      {/* No open positions */}
      <section className="bg-neutral-50 py-14">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="max-w-[56ch]">
            <h2 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-neutral-900 mb-4">
              Posiciones abiertas
            </h2>
            <div className="bg-white border border-neutral-200 rounded-[10px] p-8 text-center">
              <p className="font-sans text-[16px] text-neutral-600 leading-relaxed mb-4">
                En este momento no tenemos posiciones abiertas, pero siempre
                estamos abiertos a conocer personas talentosas.
              </p>
              <p className="font-sans text-[15px] text-neutral-600 mb-6">
                Si creés que podés sumar valor al equipo, escribinos con tu CV y
                contanos qué rol te imaginarías teniendo.
              </p>
              <a
                href="mailto:equipo@ramsarseguros.com.ar"
                className="inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[14px] px-6 py-3 rounded-sm hover:bg-primary-600 transition-colors duration-120 no-underline"
              >
                Enviar CV espontáneo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
