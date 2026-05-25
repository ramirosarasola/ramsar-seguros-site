import Link from "next/link";
import { Star } from "lucide-react";

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
    popular: false,
  },
  {
    slug: "federacion-patronal",
    name: "Federación Patronal",
    rating: 4.6,
    reviews: 412,
    bullets: [
      "Cooperativa argentina",
      "Sin sorpresas en la renovación",
      "Tasa de siniestros baja",
    ],
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
      "Atención premium",
    ],
    popular: false,
  },
  {
    slug: "san-cristobal",
    name: "San Cristóbal Seguros",
    rating: 4.3,
    reviews: 248,
    bullets: [
      "100+ sucursales en todo el país",
      "Atención presencial garantizada",
      "Cobertura nacional",
    ],
    popular: false,
  },
  {
    slug: "mapfre",
    name: "Mapfre",
    rating: 4.2,
    reviews: 296,
    bullets: [
      "Grupo asegurador internacional",
      "Todo riesgo con franquicia flexible",
      "Atención telefónica 24/7",
    ],
    popular: false,
  },
  {
    slug: "allianz",
    name: "Allianz Argentina",
    rating: 4.4,
    reviews: 203,
    bullets: [
      "Respaldo global",
      "Gestor de siniestros dedicado",
      "Cobertura en el exterior",
    ],
    popular: false,
  },
  {
    slug: "galicia-seguros",
    name: "Galicia Seguros",
    rating: 4.1,
    reviews: 178,
    bullets: [
      "Integrado con Banco Galicia",
      "Débito automático sin gestión",
      "Bonificación por buen conductor",
    ],
    popular: false,
  },
  {
    slug: "triunfo-seguros",
    name: "Triunfo Seguros",
    rating: 4.0,
    reviews: 134,
    bullets: [
      "Empresa 100% argentina",
      "Amplia red de talleres",
      "Asistencia al viajero incluida",
    ],
    popular: false,
  },
  {
    slug: "bbva-seguros",
    name: "BBVA Seguros",
    rating: 4.2,
    reviews: 156,
    bullets: [
      "Integrado con BBVA Argentina",
      "Alta online en minutos",
      "Cobertura todo riesgo accesible",
    ],
    popular: false,
  },
];

function StarRating({ value, reviews }: { value: number; reviews: number }) {
  return (
    <div
      role="img"
      aria-label={`Calificación: ${value} de 5 estrellas, ${reviews} reseñas`}
      className="flex items-center gap-1.5"
    >
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            fill={i < Math.floor(value) ? "currentColor" : "none"}
            strokeWidth={i < Math.floor(value) ? 0 : 1.5}
            className={
              i < Math.floor(value) ? "text-accent-500" : "text-neutral-300"
            }
          />
        ))}
      </span>
      <span className="font-mono text-[12px] text-neutral-700 font-medium tabular-nums">
        {value}
      </span>
      <span className="font-mono text-[11px] text-neutral-400 tabular-nums">
        ({reviews})
      </span>
    </div>
  );
}

export function AseguradorasListing() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Count header */}
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-6">
          {INSURERS.length} aseguradoras comparadas
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSURERS.map((ins) => (
            <article
              key={ins.slug}
              aria-labelledby={`insurer-${ins.slug}`}
              className={[
                "relative flex flex-col bg-white rounded-[10px] p-5",
                "transition-shadow duration-120 hover:shadow-elevation-2",
                ins.popular
                  ? "border-[1.5px] border-accent-500"
                  : "border border-neutral-200 shadow-elevation-1",
              ].join(" ")}
            >
              {ins.popular && (
                <span className="absolute -top-2.5 right-3 bg-accent-500 text-secondary-700 font-sans font-semibold text-[10.5px] px-2.5 py-0.5 rounded-full">
                  ★ Más popular
                </span>
              )}

              {/* Logo placeholder */}
              <div
                className="h-11 bg-neutral-100 rounded-sm flex items-center justify-center font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-3"
                aria-hidden="true"
              >
                {ins.name.split(" ")[0]}
              </div>

              {/* Name */}
              <h2
                id={`insurer-${ins.slug}`}
                className="font-sans font-semibold text-[16px] text-neutral-900 mb-1"
              >
                <Link
                  href={`/aseguradoras/${ins.slug}`}
                  className="no-underline hover:underline hover:underline-offset-2 hover:text-primary-700 transition-colors duration-120"
                >
                  {ins.name}
                </Link>
              </h2>

              {/* Rating */}
              <StarRating value={ins.rating} reviews={ins.reviews} />

              {/* Bullets */}
              <ul
                className="flex flex-col gap-1.5 mt-3 mb-4 flex-1"
                aria-label={`Características de ${ins.name}`}
              >
                {ins.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-1.5 font-sans text-[13.5px] text-neutral-600"
                  >
                    <span
                      className="text-primary-700 font-bold shrink-0 mt-px leading-none"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href={`/aseguradoras/${ins.slug}`}
                  className={[
                    "inline-flex items-center justify-center",
                    "w-full py-2.5 rounded-sm",
                    "font-sans font-semibold text-[14px]",
                    "bg-primary-700 text-white",
                    "no-underline hover:bg-primary-600 active:bg-primary-800",
                    "transition-colors duration-120",
                  ].join(" ")}
                >
                  Ver coberturas
                </Link>
                <Link
                  href={`/seguros-de-auto/cotizar?aseguradora=${ins.slug}`}
                  className={[
                    "inline-flex items-center justify-center",
                    "w-full py-2.5 rounded-sm",
                    "font-sans font-semibold text-[14px]",
                    "border border-primary-700 text-primary-700",
                    "no-underline hover:bg-primary-50 active:bg-primary-100",
                    "transition-colors duration-120",
                  ].join(" ")}
                >
                  Cotizar con {ins.name.split(" ")[0]}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom helper */}
        <p className="text-center font-sans text-[15px] text-neutral-500 mt-10">
          ¿No encontrás tu aseguradora?{" "}
          <Link
            href="/seguros-de-auto/cotizar"
            className="font-semibold text-primary-700 no-underline hover:underline hover:underline-offset-2"
          >
            Cotizá igual — comparamos más de 20 compañías →
          </Link>
        </p>
      </div>
    </section>
  );
}
