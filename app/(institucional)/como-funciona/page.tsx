import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Cómo funciona Ramsar Seguros",
  description:
    "Cotizá tu seguro de auto en 3 pasos simples. Completás el formulario, comparamos las mejores aseguradoras y elegís la cobertura que más te conviene. Sin llamados ni papeles.",
  canonicalPath: "/como-funciona",
});

const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo contratar un seguro de auto con Ramsar Seguros",
  description:
    "Guía paso a paso para cotizar y contratar tu seguro de auto en Argentina con Ramsar Seguros.",
  url: absoluteUrl("/como-funciona"),
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Completás el formulario",
      text: "Ingresás la marca, modelo, año de tu vehículo y tu código postal. Solo lleva 2 minutos.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Comparamos por vos",
      text: "Accedés a las propuestas de las principales aseguradoras de Argentina, organizadas y explicadas en lenguaje claro.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Elegís y contratás",
      text: "Seleccionás la cobertura que más te conviene y completás el trámite 100% online. Recibís la póliza por email.",
    },
  ],
};

const STEPS = [
  {
    number: "01",
    title: "Completás el formulario",
    desc: "Ingresás la marca, modelo y año de tu vehículo, más tu código postal. Sin datos personales innecesarios, sin registro previo.",
    detail: [
      "Marca y modelo del vehículo",
      "Año de fabricación",
      "Código postal donde circula",
      "Tipo de uso (particular o comercial)",
    ],
    cta: null,
  },
  {
    number: "02",
    title: "Comparamos por vos",
    desc: "Nuestro sistema consulta las propuestas de las principales aseguradoras de Argentina y las organiza de forma clara para que puedas comparar coberturas.",
    detail: [
      "Propuestas de 14+ aseguradoras",
      "Coberturas explicadas sin tecnicismos",
      "Condiciones de cada plan visibles",
      "Comparativa honesta y sin sesgos",
    ],
    cta: null,
  },
  {
    number: "03",
    title: "Elegís y contratás",
    desc: "Seleccionás la cobertura que más te conviene y completás el trámite 100% online. Recibís la documentación por email el mismo día.",
    detail: [
      "Proceso de contratación digital",
      "Firma electrónica incluida",
      "Póliza enviada por email",
      "Sin visitas ni turnos",
    ],
    cta: "/seguros-de-auto/cotizar",
  },
];

const FAQS_PROCESO = [
  {
    q: "¿Es realmente gratis cotizar?",
    a: "Sí. La comparación y cotización no tienen ningún costo para el usuario. Ramsar Seguros es un corredor matriculado ante la SSN y recibe comisión de las aseguradoras, no del asegurado.",
  },
  {
    q: "¿Qué pasa si quiero hablar con alguien?",
    a: "Podés contactarnos por WhatsApp en cualquier momento del proceso. Nuestros asesores responden en menos de 1 hora en horario de atención.",
  },
  {
    q: "¿Los datos que ingreso son seguros?",
    a: "Sí. Tu información se transmite por conexión SSL encriptada y no la compartimos con terceros sin tu consentimiento. Podés ver todos los detalles en nuestra política de privacidad.",
  },
  {
    q: "¿Puedo contratar para un auto usado?",
    a: "Sí, podés cotizar y contratar seguros tanto para autos 0km como para vehículos usados de cualquier año.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <JsonLd schema={howItWorksSchema} />

      {/* Hero */}
      <section className="bg-neutral-50 pt-16 pb-14 border-b border-neutral-200">
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
              Cómo funciona
            </span>
          </nav>
          <h1 className="font-serif text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-5 max-w-[18ch] mx-auto">
            Tu seguro de auto en 3 pasos simples
          </h1>
          <p className="font-sans text-[18px] text-neutral-600 leading-relaxed max-w-[52ch] mx-auto mb-8">
            Cotizar y contratar un seguro nunca fue tan fácil. Sin llamados, sin
            papeles, sin esperas. Todo desde tu celular o computadora.
          </p>
          <Link
            href="/seguros-de-auto/cotizar"
            className="inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[15px] px-6 py-3.5 rounded-sm hover:bg-primary-600 transition-colors duration-120 no-underline"
          >
            Empezar ahora →
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-16">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={[
                  "grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-16 py-14",
                  i < STEPS.length - 1 ? "border-b border-neutral-200" : "",
                ].join(" ")}
              >
                {/* Step number */}
                <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                  <span className="font-serif text-[72px] leading-none tracking-[-0.03em] text-primary-100 select-none">
                    {step.number}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-serif text-[30px] leading-[1.1] tracking-[-0.015em] text-neutral-900 mb-3">
                    {step.title}
                  </h2>
                  <p className="font-sans text-[16px] text-neutral-600 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  {step.cta && (
                    <Link
                      href={step.cta}
                      className="inline-flex items-center gap-2 bg-accent-500 text-secondary-700 font-sans font-semibold text-[14px] px-5 py-3 rounded-sm hover:bg-accent-600 transition-colors duration-120 no-underline"
                    >
                      Cotizá ahora →
                    </Link>
                  )}
                </div>

                {/* Detail bullets */}
                <ul className="flex flex-col gap-2.5 self-center">
                  {step.detail.map((d) => (
                    <li key={d} className="flex items-center gap-3">
                      <span
                        className="text-primary-700 font-bold text-[14px] shrink-0"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="font-sans text-[15px] text-neutral-700">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-primary-50 border-y border-primary-100 py-10">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              ["SSL", "Datos encriptados"],
              ["SSN", "Corredor matriculado"],
              ["14+", "Aseguradoras comparadas"],
              ["2 min", "Para obtener tu cotización"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-serif text-[32px] leading-none text-primary-700">
                  {value}
                </span>
                <span className="font-sans text-[13px] text-neutral-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process FAQs */}
      <section className="bg-white py-16 border-t border-neutral-200">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-[32px] leading-[1.08] tracking-[-0.015em] text-neutral-900 mb-8 text-center">
            Preguntas sobre el proceso
          </h2>
          <div className="flex flex-col divide-y divide-neutral-200">
            {FAQS_PROCESO.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="font-sans font-semibold text-[16px] text-neutral-900 mb-2">
                  {faq.q}
                </h3>
                <p className="font-sans text-[15px] text-neutral-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/preguntas-frecuentes"
              className="font-sans font-semibold text-[14px] text-primary-700 hover:underline no-underline"
            >
              Ver todas las preguntas frecuentes →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
