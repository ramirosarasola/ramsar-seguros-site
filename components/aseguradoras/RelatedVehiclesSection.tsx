import Link from "next/link";
import { Car } from "lucide-react";
import type { Insurer } from "@/lib/strapi";

const VEHICLES: { label: string; href: string }[] = [
  { label: "Toyota Corolla", href: "/seguros-de-auto/toyota/corolla" },
  { label: "VW Gol", href: "/seguros-de-auto/vw/gol" },
  { label: "Ford Ranger", href: "/seguros-de-auto/ford/ranger" },
  { label: "Chevrolet Cruze", href: "/seguros-de-auto/chevrolet/cruze" },
  { label: "Renault Kwid", href: "/seguros-de-auto/renault/kwid" },
  { label: "Peugeot 208", href: "/seguros-de-auto/peugeot/208" },
  { label: "Fiat Cronos", href: "/seguros-de-auto/fiat/cronos" },
  { label: "Toyota Hilux", href: "/seguros-de-auto/toyota/hilux" },
  { label: "VW Amarok", href: "/seguros-de-auto/vw/amarok" },
  { label: "Renault Sandero", href: "/seguros-de-auto/renault/sandero" },
  { label: "Citroën C3", href: "/seguros-de-auto/citroen/c3" },
  { label: "Ford EcoSport", href: "/seguros-de-auto/ford/ecosport" },
];

export function RelatedVehiclesSection({ insurer }: { insurer: Insurer }) {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <h3 className="font-serif text-3xl tracking-tight text-neutral-900">
            Seguros {insurer.name.split(" ")[0]} por modelo de auto
          </h3>
          <p className="text-lg text-neutral-500 mt-3">
            Cotizá {insurer.name} según tu vehículo específico para obtener un
            precio más preciso.
          </p>
        </div>

        {/* Chip grid */}
        <div className="flex flex-wrap gap-3">
          {VEHICLES.map(({ label, href }) => (
            <Link
              key={label}
              href={`${href}?aseguradora=${insurer.slug}`}
              className={[
                "inline-flex items-center gap-2 px-5 py-3 rounded-full",
                "bg-white border border-neutral-300 text-sm font-medium text-neutral-800",
                "hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                "transition-colors duration-150 no-underline",
                "min-h-11",
              ].join(" ")}
            >
              <Car
                size={14}
                strokeWidth={2}
                className="text-neutral-500 group-hover:text-primary-600 shrink-0"
                aria-hidden="true"
              />
              {label}
            </Link>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-6">
          <Link
            href={`/seguros-de-auto?aseguradora=${insurer.slug}`}
            className="text-sm font-semibold text-primary-600 hover:underline underline-offset-2 no-underline transition-colors duration-150"
          >
            Ver todos los modelos →
          </Link>
        </div>
      </div>
    </section>
  );
}
