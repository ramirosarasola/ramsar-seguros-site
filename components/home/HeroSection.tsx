import Link from "next/link";
import { CircleCheck, Clock, ShieldCheck } from "lucide-react";
import { CotizadorWidget } from "./CotizadorWidget";
import { LottieHeroAnimation } from "./LottieHeroAnimation";

const INSURER_NAMES = [
  "Sancor",
  "Zurich",
  "San Cristóbal",
  "La Meridional",
  "Mapfre",
  "Fed. Patronal",
  "Allianz",
  "Galicia",
];

const TRUST = [
  {
    Icon: CircleCheck,
    label: "100% gratis, sin compromiso",
    color: "text-success",
  },
  {
    Icon: Clock,
    label: "Listo en menos de 2 minutos",
    color: "text-primary-700",
  },
  {
    Icon: ShieldCheck,
    label: "+20 aseguradoras comparadas",
    color: "text-primary-700",
  },
];


export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-160 bg-[linear-gradient(90deg,#ecf4f3_0%,#f8f7f4_55%,#ffffff_100%)]">
      <div className="max-w-300 mx-auto px-6 lg:px-16 pt-24 pb-0">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.22fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col pb-10 lg:pb-20">
            <h1 className="font-serif text-[clamp(40px,6vw,68px)] leading-[1.02] tracking-tight text-neutral-900 max-w-130">
              Compará seguros de auto en Argentina y encontrá el mejor precio
            </h1>

            <p className="font-sans text-[18px] leading-[1.6] text-neutral-700 mt-5 max-w-120">
              Cotizá gratis en 2 minutos. Comparamos más de 20 aseguradoras y te
              mostramos las mejores opciones para tu auto.
            </p>

            {/* Primary + secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/seguros-de-auto/cotizar"
                className={[
                  "inline-flex items-center justify-center gap-1.5",
                  "bg-primary-700 text-white",
                  "font-sans font-semibold text-[15px]",
                  "px-6 py-3.5 rounded-sm no-underline",
                  "shadow-elevation-3",
                  "transition-colors duration-120",
                  "hover:bg-primary-600 active:bg-primary-800",
                  "text-center",
                ].join(" ")}
              >
                Cotizá ahora gratis →
              </Link>
              <a
                href="#como-funciona"
                className={[
                  "inline-flex items-center justify-center",
                  "font-sans font-semibold text-[15px] text-primary-700",
                  "px-4 py-3.5 no-underline",
                  "hover:underline hover:underline-offset-2",
                  "transition-colors duration-120",
                  "text-center",
                ].join(" ")}
              >
                ¿Cómo funciona?
              </a>
            </div>

            {/* CotizadorWidget */}
            <div className="mt-6">
              <CotizadorWidget />
            </div>

            {/* Trust micro-signals */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
              {TRUST.map(({ Icon, label, color }, i) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 font-sans font-medium text-[13px] text-neutral-700"
                >
                  {i > 0 && (
                    <span
                      className="hidden sm:inline w-px h-3.5 bg-neutral-300 mr-1"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className={color}
                    aria-hidden="true"
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — animation (desktop only) */}
          <div className="hidden lg:flex items-end justify-center lg:self-end pb-0">
            <div className="w-full aspect-square">
              <LottieHeroAnimation />
            </div>
          </div>
        </div>

        {/* Insurer logos strip */}
        <div className="border-t border-neutral-200 py-5 mt-0">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-neutral-500 text-center mb-4">
            Comparamos las principales aseguradoras del mercado
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 overflow-x-auto">
            {INSURER_NAMES.map((name) => (
              <span
                key={name}
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-400 opacity-55 hover:opacity-100 hover:text-neutral-700 transition-all duration-120 whitespace-nowrap cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
