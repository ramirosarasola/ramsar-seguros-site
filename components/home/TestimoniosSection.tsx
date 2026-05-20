import { JsonLd } from "@/components/seo/JsonLd";

const TESTIMONIALS = [
  {
    stars: 5,
    quote:
      "Cotizé en 2 minutos y ahorré $8.000 por mes comparado con lo que pagaba antes. Increíble lo fácil que fue.",
    author: "Martín G.",
    vehicle: "Volkswagen Gol 2020 · CABA",
  },
  {
    stars: 5,
    quote:
      "Siempre le huía a los seguros porque me parecía complicado. Acá comparé tres opciones claras y elegí sin dramas. Re recomendable.",
    author: "Laura P.",
    vehicle: "Toyota Corolla 2022 · Córdoba",
  },
  {
    stars: 4,
    quote:
      "La plataforma es muy clara. Me explicó las diferencias entre coberturas de forma simple. Buen servicio.",
    author: "Diego F.",
    vehicle: "Chevrolet Cruze 2019 · Rosario",
  },
];

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Ramsar Seguros",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.8,
    reviewCount: 2400,
    bestRating: 5,
    worstRating: 1,
  },
};

function StarRow({ count }: { count: number }) {
  return (
    <span
      className="font-mono text-[12px] text-accent-500"
      aria-label={`${count} de 5 estrellas`}
    >
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export function TestimoniosSection() {
  return (
    <>
      <JsonLd schema={aggregateRatingSchema} />
      <section id="opiniones" className="bg-white py-20">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          {/* Centered header + aggregate rating */}
          <div className="flex flex-col items-center text-center mb-10">
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 mb-3">
              Opiniones
            </span>
            <h2 className="font-serif text-[36px] leading-[1.06] tracking-[-0.015em] text-neutral-900">
              Lo que dicen nuestros usuarios
            </h2>

            {/* Aggregate rating cluster */}
            <div className="flex flex-col items-center gap-1 mt-4">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-[56px] leading-none tracking-[-0.02em] text-primary-600">
                  4.8
                </span>
                <span className="font-sans text-[20px] text-neutral-400">
                  /5
                </span>
              </div>
              <span className="font-mono text-[16px] text-accent-500 tracking-[0.08em]">
                ★ ★ ★ ★ ★
              </span>
              <span className="font-sans text-[14px] text-neutral-500">
                <span className="text-neutral-700 font-medium">+2.400</span>{" "}
                opiniones verificadas
              </span>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.author}
                className="bg-white border border-neutral-100 rounded-[12px] p-6 shadow-elevation-1 flex flex-col gap-4"
              >
                {/* Opening quote */}
                <span
                  className="font-serif text-[48px] leading-none text-accent-300 self-start -mb-2 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <StarRow count={t.stars} />

                <blockquote className="font-serif text-[17px] leading-[1.42] text-neutral-900 flex-1 m-0">
                  {t.quote}
                </blockquote>

                <footer className="flex items-center gap-2.5 pt-3 border-t border-neutral-200">
                  <div
                    className="w-9 h-9 rounded-full bg-neutral-200 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-sans font-semibold text-[13px] text-neutral-900 m-0">
                      {t.author}
                    </p>
                    <p className="font-mono text-[11px] text-neutral-500 m-0">
                      {t.vehicle}
                    </p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
