import Link from "next/link";
import { CircleCheck, Clock, ShieldCheck } from "lucide-react";
import { CotizadorWidget } from "./CotizadorWidget";

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

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-[480px] h-auto mx-auto"
    >
      {/* Ground shadow */}
      <ellipse
        cx="200"
        cy="344"
        rx="175"
        ry="14"
        fill="#9ec5bf"
        opacity="0.2"
      />

      {/* Car body */}
      <rect x="72" y="218" width="256" height="96" rx="14" fill="#cac7bc" />

      {/* Car cabin */}
      <path
        d="M128 218 C128 218 154 152 178 144 L222 144 C246 152 272 218 272 218Z"
        fill="#9ec5bf"
      />
      {/* Windows */}
      <path
        d="M142 213 C147 213 161 162 180 156 L220 156 C239 162 253 213 258 213Z"
        fill="#418c82"
        opacity="0.75"
      />
      {/* B-pillar */}
      <rect x="198" y="156" width="5" height="57" fill="#9ec5bf" />

      {/* Headlight */}
      <rect x="308" y="242" width="24" height="11" rx="5.5" fill="#f4c98a" />
      {/* Tail light */}
      <rect
        x="68"
        y="242"
        width="24"
        height="11"
        rx="5.5"
        fill="#f4c98a"
        opacity="0.7"
      />

      {/* Front bumper */}
      <rect x="304" y="254" width="24" height="36" rx="4" fill="#9ec5bf" />
      {/* Rear bumper */}
      <rect x="72" y="254" width="24" height="36" rx="4" fill="#9ec5bf" />

      {/* Door crease */}
      <line
        x1="200"
        y1="218"
        x2="200"
        y2="314"
        stroke="#a8a496"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Door handles */}
      <rect x="158" y="264" width="20" height="7" rx="3.5" fill="#9ec5bf" />
      <rect x="222" y="264" width="20" height="7" rx="3.5" fill="#9ec5bf" />

      {/* Wheel L */}
      <circle cx="148" cy="316" r="32" fill="#292723" />
      <circle cx="148" cy="316" r="21" fill="#807c6e" />
      <circle cx="148" cy="316" r="11" fill="#cac7bc" />

      {/* Wheel R */}
      <circle cx="252" cy="316" r="32" fill="#292723" />
      <circle cx="252" cy="316" r="21" fill="#807c6e" />
      <circle cx="252" cy="316" r="11" fill="#cac7bc" />

      {/* Person 1 — right side, holding phone */}
      <rect x="328" y="202" width="38" height="106" rx="10" fill="#418c82" />
      <circle cx="347" cy="188" r="27" fill="#f4c98a" />
      {/* Hair */}
      <path d="M320 182 Q347 160 374 182" fill="#9ec5bf" opacity="0.65" />
      {/* Arm */}
      <rect x="306" y="246" width="26" height="14" rx="5" fill="#418c82" />
      {/* Phone body */}
      <rect x="282" y="228" width="28" height="46" rx="5" fill="#181612" />
      {/* Screen */}
      <rect x="286" y="233" width="20" height="36" rx="3" fill="#0e433f" />
      {/* Checkmark on screen */}
      <path
        d="M290 251 L295 257 L306 242"
        stroke="#e8a451"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Person 2 — left side */}
      <rect x="34" y="208" width="34" height="100" rx="10" fill="#f4c98a" />
      {/* Jacket */}
      <rect x="36" y="224" width="30" height="56" rx="8" fill="#9ec5bf" />
      <circle cx="51" cy="195" r="25" fill="#f4c98a" />
      {/* Hair */}
      <path d="M26 190 Q51 168 76 190" fill="#418c82" opacity="0.55" />

      {/* Check badge — top right */}
      <circle cx="368" cy="76" r="40" fill="#0e433f" />
      <circle cx="368" cy="76" r="36" fill="#1f6f66" />
      <path
        d="M350 76 L361 88 L388 62"
        stroke="#e8a451"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Decorative accents */}
      <circle cx="20" cy="126" r="5" fill="#f4c98a" />
      <circle cx="8" cy="152" r="3" fill="#9ec5bf" />
      <circle cx="380" cy="148" r="3" fill="#9ec5bf" opacity="0.6" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #ecf4f3 0%, #f8f7f4 55%, #ffffff 100%)",
        minHeight: "640px",
      }}
    >
      <div className="max-w-300 mx-auto px-6 lg:px-16 pt-24 pb-0">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.22fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col pb-10 lg:pb-20">
            <h1 className="font-serif text-[clamp(40px,6vw,68px)] leading-[1.02] tracking-[-0.025em] text-neutral-900 max-w-[520px]">
              Compará seguros de auto en Argentina y encontrá el mejor precio
            </h1>

            <p className="font-sans text-[18px] leading-[1.6] text-neutral-700 mt-5 max-w-[480px]">
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
            <div className="mt-6 max-w-[560px]">
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

          {/* Right column — illustration (always visible, scaled on mobile) */}
          <div className="flex items-end justify-center lg:self-end order-first lg:order-last pb-0">
            <div className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-full">
              <HeroIllustration />
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
