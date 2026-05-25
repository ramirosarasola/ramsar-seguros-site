import Link from "next/link";
import { Shield, ShieldCheck, ShieldPlus, Star, Check, X } from "lucide-react";

const COBERTURAS = [
  {
    slug: "responsabilidad-civil",
    name: "Responsabilidad Civil",
    badge: "Obligatorio por ley",
    badgeCls: "bg-warning/10 text-warning border border-warning/30",
    icon: Shield,
    iconBg: "bg-neutral-100",
    iconColor: "text-neutral-500",
    description:
      "La cobertura mínima exigida por la Ley de Tránsito 24.449. Protege a terceros si causás un accidente, pero no cubre daños a tu propio vehículo.",
    includes: [
      "Daños materiales a terceros",
      "Lesiones a personas",
      "Daños a propiedades ajenas",
    ],
    notIncludes: [
      "Daños al propio vehículo",
      "Robo o incendio",
      "Granizo e inundación",
    ],
    idealFor:
      "Autos con más de 10 años donde el costo de reparación supera el valor del vehículo.",
    popular: false,
  },
  {
    slug: "terceros",
    name: "Terceros",
    badge: "Cobertura básica",
    badgeCls: "bg-primary-50 text-primary-700 border border-primary-200",
    icon: ShieldCheck,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-700",
    description:
      "Suma a la RC la protección por daños accidentales a tu propio vehículo y asistencia en ruta incluida.",
    includes: [
      "Todo lo del RC básico",
      "Daños accidentales al propio auto",
      "Asistencia en ruta 24 h",
    ],
    notIncludes: ["Robo total del vehículo", "Granizo e inundación"],
    idealFor:
      "Autos de gama media donde querés protección básica sin contratar todo riesgo.",
    popular: false,
  },
  {
    slug: "terceros-completo",
    name: "Terceros Completo",
    badge: "Más elegido",
    badgeCls: "bg-accent-300/30 text-accent-700 border border-accent-500/40",
    icon: ShieldPlus,
    iconBg: "bg-accent-300/20",
    iconColor: "text-accent-600",
    description:
      "El equilibrio perfecto entre protección y cobertura. Incluye robo total, granizo e incendio además de los daños a terceros.",
    includes: [
      "Todo lo del Terceros",
      "Robo total del vehículo",
      "Granizo e inundación",
      "Incendio total",
    ],
    notIncludes: ["Robo parcial de piezas"],
    idealFor:
      "Autos de 3 a 8 años. El punto dulce entre cobertura y amplitud de protección.",
    popular: true,
  },
  {
    slug: "todo-riesgo",
    name: "Todo Riesgo",
    badge: "Protección máxima",
    badgeCls: "bg-primary-50 text-primary-700 border border-primary-200",
    icon: Star,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-700",
    description:
      "La cobertura más completa. Tu auto protegido frente a cualquier eventualidad: accidentes, robo, granizo, inundación y más.",
    includes: [
      "Todo lo del Terceros Completo",
      "Daños propios por accidente",
      "Robo parcial de piezas",
      "Vehículo de reemplazo",
      "Cobertura en el MERCOSUR",
    ],
    notIncludes: [],
    idealFor:
      "Autos 0 km o de hasta 5 años, vehículos de alta gama, o si usás el auto para trabajar.",
    popular: false,
  },
] as const;

export function TiposDeCobertura() {
  return (
    <section className="py-20 bg-white" id="coberturas">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-[52ch] mx-auto mb-12">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-600 block mb-3">
            Tipos de cobertura
          </span>
          <h2 className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.06] tracking-tight text-neutral-900">
            ¿Qué tipo de seguro necesitás?
          </h2>
          <p className="font-sans text-[17px] text-neutral-600 mt-3 leading-[1.6]">
            Hay cuatro niveles de cobertura. Elegí según el valor de tu auto y
            tu tolerancia al riesgo.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {COBERTURAS.map(
            ({
              slug,
              name,
              badge,
              badgeCls,
              icon: Icon,
              iconBg,
              iconColor,
              description,
              includes,
              notIncludes,
              idealFor,
              popular,
            }) => (
              <article
                key={slug}
                className={[
                  "flex flex-col bg-white rounded-xl p-6",
                  "border transition-shadow duration-150",
                  popular
                    ? "border-accent-500 shadow-elevation-3 ring-1 ring-accent-500/30 relative"
                    : "border-neutral-200 shadow-elevation-1 hover:shadow-elevation-2",
                ].join(" ")}
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent-500 text-secondary-700 font-sans font-semibold text-[11px] px-3 py-1 rounded-full whitespace-nowrap">
                      ★ Más elegido
                    </span>
                  </div>
                )}

                {/* Icon + Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className={iconColor}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`font-mono text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 rounded-full ${badgeCls}`}
                  >
                    {badge}
                  </span>
                </div>

                {/* Name + description */}
                <h3 className="font-serif text-[22px] leading-[1.1] text-neutral-900 mb-2">
                  {name}
                </h3>
                <p className="font-sans text-[13.5px] text-neutral-600 leading-[1.55] mb-5">
                  {description}
                </p>

                {/* Includes / not-includes */}
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[13px] text-neutral-700"
                    >
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="text-success mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                  {notIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[13px] text-neutral-400"
                    >
                      <X
                        size={14}
                        strokeWidth={2.5}
                        className="text-neutral-300 mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Ideal for */}
                <p className="font-mono text-[11px] leading-normal text-neutral-500 mb-5 border-t border-neutral-100 pt-4">
                  {idealFor}
                </p>

                {/* CTA */}
                <Link
                  href={`/seguros-de-auto/cotizar?cobertura=${slug}`}
                  className={[
                    "inline-flex items-center justify-center",
                    "w-full py-3 rounded-sm",
                    "font-sans font-semibold text-[14px]",
                    "no-underline transition-colors duration-120",
                    popular
                      ? "bg-accent-500 text-secondary-700 hover:bg-accent-600 active:bg-accent-700"
                      : "bg-primary-700 text-white hover:bg-primary-600 active:bg-primary-800",
                  ].join(" ")}
                >
                  Cotizar {name} →
                </Link>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
