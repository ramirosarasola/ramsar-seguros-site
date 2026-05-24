import Link from "next/link";
import { CarFront, RefreshCw, CircleCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

const STEPS = [
  {
    num: "01",
    Icon: CarFront,
    iconColor: "text-primary-700",
    bgColor: "bg-primary-100",
    title: "Ingresá los datos de tu auto",
    description:
      "Marca, modelo, año y tu código postal. Solo lo esencial, nada más.",
  },
  {
    num: "02",
    Icon: RefreshCw,
    iconColor: "text-primary-700",
    bgColor: "bg-primary-100",
    title: "Comparamos por vos",
    description:
      "Consultamos en tiempo real las aseguradoras más elegidas y ordenamos los resultados por precio y cobertura.",
  },
  {
    num: "03",
    Icon: CircleCheck,
    iconColor: "text-primary-700",
    bgColor: "bg-primary-100",
    title: "Elegís el que más te conviene",
    description:
      "Seleccionás la cobertura ideal y contratás directo desde nuestra plataforma.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo cotizar tu seguro de auto en 3 pasos",
  description: "Sin papeles, sin llamadas, sin complicaciones.",
  totalTime: "PT2M",
  step: STEPS.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description,
  })),
};

export function BeneficiosSection() {
  return (
    <>
      <JsonLd schema={howToSchema} />
      <section id="como-funciona" className="bg-neutral-50 py-20 md:py-20">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-500 mb-3">
              Proceso simple
            </span>
            <h2 className="font-serif text-[36px] leading-[1.08] tracking-[-0.015em] text-neutral-900 max-w-[22ch]">
              Cotizá tu seguro en 3 pasos simples
            </h2>
            <p className="font-sans text-[16px] text-neutral-500 mt-3">
              Sin papeles, sin llamadas, sin complicaciones.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Dashed connectors — desktop only */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-18 left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] h-[1.5px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#9ec5bf 0,#9ec5bf 6px,transparent 6px,transparent 10px)",
              }}
            />

            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center text-center md:items-start md:text-left relative"
              >
                {/* Decorative number */}
                <span
                  className="font-serif text-[72px] leading-none text-primary-200 select-none absolute -top-6 left-0 z-0"
                  aria-hidden="true"
                >
                  {step.num}
                </span>

                {/* Icon circle */}
                <div
                  className={[
                    "relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mt-10",
                    step.bgColor,
                  ].join(" ")}
                >
                  <step.Icon
                    size={28}
                    strokeWidth={1.75}
                    className={step.iconColor}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-sans font-semibold text-[18px] text-neutral-900 mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="font-sans text-[14px] text-neutral-600 leading-relaxed max-w-[240px] relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trailing CTA */}
          <div className="flex flex-col items-center mt-10 gap-2">
            <p className="font-sans text-[16px] text-neutral-600">
              ¿Listo para empezar?
            </p>
            <Link
              href="/seguros-de-auto/cotizar"
              className="inline-flex items-center gap-1.5 bg-primary-700 text-white font-sans font-semibold text-[14px] px-6 py-3 rounded-sm no-underline hover:bg-primary-600 active:bg-primary-800 transition-colors duration-120 shadow-elevation-1"
            >
              Cotizá gratis ahora →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
