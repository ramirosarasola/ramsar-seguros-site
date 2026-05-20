import { ThumbsUp, AlertTriangle, Check, Minus } from "lucide-react";
import type { Insurer } from "@/lib/strapi";

export function ProsConsSection({ insurer }: { insurer: Insurer }) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Section header — spans both columns */}
        <div className="mb-10">
          <h2 className="font-serif text-4xl tracking-tight text-neutral-900">
            Ventajas y desventajas de {insurer.name}
          </h2>
          <p className="text-base text-neutral-500 mt-3 max-w-prose">
            Análisis editorial independiente basado en pólizas reales, opiniones
            de asegurados y datos públicos de la Superintendencia de Seguros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pros */}
          <div className="bg-white border-l-4 border-success rounded-xl shadow-elevation-1 p-8">
            <div className="flex items-center gap-3 mb-6">
              <ThumbsUp
                size={20}
                strokeWidth={2}
                className="text-success shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-base text-success">
                Lo que nos gusta
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {insurer.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-3">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="text-success shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-base text-neutral-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-white border-l-4 border-warning rounded-xl shadow-elevation-1 p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle
                size={20}
                strokeWidth={2}
                className="text-warning shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-base text-warning">
                Lo que podría mejorar
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {insurer.cons.map((con) => (
                <li key={con} className="flex items-start gap-3">
                  <Minus
                    size={16}
                    strokeWidth={2}
                    className="text-warning shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-base text-neutral-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
