import Link from "next/link";
import { CircleCheck, Clock, ShieldCheck } from "lucide-react";
import { CotizadorWidget } from "@/components/home/CotizadorWidget";

const TRUST = [
  { Icon: CircleCheck, label: "100% gratis, sin compromiso" },
  { Icon: Clock, label: "Listo en 2 minutos" },
  { Icon: ShieldCheck, label: "+20 aseguradoras" },
];

export function HeroSegurosAuto() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-200 py-16 md:py-20">
      <div className="max-w-300 mx-auto px-6 lg:px-16 text-center">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex justify-center items-center gap-2 mb-6"
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
            Seguros de Auto
          </span>
        </nav>

        {/* H1 */}
        <h1 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-neutral-900 max-w-[22ch] mx-auto">
          Seguros de Auto en Argentina
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-[18px] leading-[1.6] text-neutral-600 mt-4 max-w-[52ch] mx-auto">
          Comparamos más de 20 aseguradoras para que elijas la cobertura
          adecuada a tu auto y presupuesto. Sin intermediarios, sin llamados.
        </p>

        {/* Cotizador widget */}
        <div className="mt-8 max-w-[720px] mx-auto">
          <CotizadorWidget />
        </div>

        {/* Trust micro-row */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-5">
          {TRUST.map(({ Icon, label }, i) => (
            <span
              key={label}
              className="flex items-center gap-1.5 font-sans font-medium text-[13px] text-neutral-600"
            >
              {i > 0 && (
                <span
                  className="hidden sm:inline w-px h-3.5 bg-neutral-300 mr-1"
                  aria-hidden="true"
                />
              )}
              <Icon
                size={14}
                strokeWidth={2}
                className="text-primary-600"
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
