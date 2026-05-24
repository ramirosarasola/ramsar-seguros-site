"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import posthog from "posthog-js";

const INSURERS = [
  {
    slug: "sancor-seguros",
    name: "Sancor Seguros",
    rating: 4.4,
    reviews: 312,
    bullets: [
      "Granizo + robo total",
      "Auxilio 24 h en todo el país",
      "Sin franquicia en luneta",
    ],
    price: "Desde $34.800/mes",
    popular: true,
  },
  {
    slug: "zurich",
    name: "Zurich Argentina",
    rating: 4.7,
    reviews: 541,
    bullets: [
      "Cobertura nacional + MERCOSUR",
      "Cotización 100% digital",
      "App con denuncia online",
    ],
    price: "Desde $41.200/mes",
    popular: false,
  },
  {
    slug: "san-cristobal",
    name: "San Cristóbal Seguros",
    rating: 4.3,
    reviews: 248,
    bullets: ["100+ sucursales", "Atención presencial", "Cobertura nacional"],
    price: "Desde $32.500/mes",
    popular: false,
  },
  {
    slug: "la-meridional",
    name: "La Meridional",
    rating: 4.5,
    reviews: 187,
    bullets: [
      "Especialista en alta gama",
      "Tasación con app",
      "Servicio premium",
    ],
    price: "Desde $48.900/mes",
    popular: false,
  },
  {
    slug: "mapfre",
    name: "Mapfre",
    rating: 4.2,
    reviews: 296,
    bullets: [
      "Grupo internacional",
      "Cobertura todo riesgo flexible",
      "Atención telefónica 24/7",
    ],
    price: "Desde $38.400/mes",
    popular: false,
  },
  {
    slug: "federacion-patronal",
    name: "Federación Patronal",
    rating: 4.6,
    reviews: 412,
    bullets: [
      "Cooperativa argentina",
      "Sin sorpresas en la prima",
      "Tasa de siniestros baja",
    ],
    price: "Desde $33.700/mes",
    popular: false,
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <span
      className="font-mono text-[12px] text-accent-500 flex items-center gap-0.5"
      aria-label={`${value} estrellas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          fill={i < Math.floor(value) ? "currentColor" : "none"}
          strokeWidth={i < Math.floor(value) ? 0 : 1.5}
          className={
            i < Math.floor(value) ? "text-accent-500" : "text-neutral-300"
          }
        />
      ))}
    </span>
  );
}

export function AseguradorasGrid() {
  return (
    <section id="aseguradoras" className="bg-neutral-100 py-20">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 block mb-2">
              Aseguradoras
            </span>
            <h2 className="font-serif text-[36px] leading-[1.06] tracking-[-0.015em] text-neutral-900 max-w-[18ch]">
              Las mejores aseguradoras de autos en Argentina
            </h2>
            <p className="font-sans text-[16px] text-neutral-500 mt-2 max-w-[56ch]">
              Comparamos precios, coberturas y opiniones reales para que tomes
              la mejor decisión.
            </p>
          </div>
          <Link
            href="/aseguradoras"
            className="font-sans font-semibold text-[14px] text-primary-700 no-underline hover:underline hover:underline-offset-2 shrink-0"
          >
            Ver todas las aseguradoras →
          </Link>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSURERS.map((ins) => (
            <Link
              key={ins.slug}
              href={`/aseguradoras/${ins.slug}`}
              onClick={() =>
                posthog.capture("insurer_card_clicked", {
                  insurer_slug: ins.slug,
                  insurer_name: ins.name,
                  is_popular: ins.popular,
                  rating: ins.rating,
                })
              }
              className={[
                "block bg-white rounded-[10px] p-5 no-underline group relative",
                "transition-shadow duration-120",
                "hover:shadow-elevation-3",
                ins.popular
                  ? "border-[1.5px] border-accent-500"
                  : "border border-neutral-200",
              ].join(" ")}
            >
              {ins.popular && (
                <span className="absolute -top-2.5 right-3 bg-accent-500 text-secondary-700 font-sans font-bold text-[10.5px] px-2.5 py-0.75 rounded-full">
                  ★ Más popular
                </span>
              )}

              {/* Logo placeholder */}
              <div className="h-9 bg-neutral-100 rounded flex items-center justify-center font-mono text-[10px] text-neutral-500 tracking-widest mb-3 uppercase">
                {ins.name.split(" ")[0]}
              </div>

              <h3 className="font-sans font-semibold text-[15px] text-neutral-900 group-hover:text-primary-700 transition-colors duration-120">
                {ins.name}
              </h3>

              <div className="flex items-center gap-1.5 my-1.5">
                <StarRating value={ins.rating} />
                <span className="font-mono text-[11px] text-neutral-500">
                  {ins.rating} ({ins.reviews})
                </span>
              </div>

              <ul
                className="flex flex-col gap-1 mb-3"
                aria-label={`Características de ${ins.name}`}
              >
                {ins.bullets.map((b) => (
                  <li
                    key={b}
                    className="font-sans text-[13px] text-neutral-600 flex items-start gap-1.5"
                  >
                    <span className="text-primary-700 font-bold shrink-0 mt-px">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <p className="font-mono text-[13px] text-neutral-900 font-medium">
                {ins.price}
              </p>
            </Link>
          ))}
        </div>

        {/* Closing helper */}
        <p className="text-center font-sans text-[16px] text-neutral-500 mt-8">
          ¿No encontrás tu aseguradora?{" "}
          <Link
            href="/aseguradoras"
            className="font-semibold text-[13px] text-primary-700 no-underline hover:underline hover:underline-offset-2"
          >
            Ver todas las aseguradoras disponibles →
          </Link>
        </p>
      </div>
    </section>
  );
}
