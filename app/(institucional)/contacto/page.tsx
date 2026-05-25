import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Contacto — Ramsar Seguros",
  description:
    "Contactate con el equipo de Ramsar Seguros. Respondemos consultas sobre seguros de auto por WhatsApp, email o formulario. Atención personalizada de lunes a sábado.",
  canonicalPath: "/contacto",
});

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto — Ramsar Seguros",
  url: absoluteUrl("/contacto"),
  mainEntity: {
    "@type": "Organization",
    name: "Ramsar Seguros",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Spanish",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      },
    ],
  },
};

const CHANNELS = [
  {
    icon: "💬",
    title: "WhatsApp",
    desc: "La forma más rápida de hablar con un asesor.",
    detail: "Respuesta en menos de 1 hora en horario de atención.",
    cta: "Escribir por WhatsApp",
    href: "https://wa.me/5491100000000",
    external: true,
    primary: true,
  },
  {
    icon: "✉️",
    title: "Email",
    desc: "Para consultas detalladas o documentación.",
    detail: "info@ramsarseguros.com.ar",
    cta: "Enviar email",
    href: "mailto:info@ramsarseguros.com.ar",
    external: true,
    primary: false,
  },
];

export default function ContactoPage() {
  return (
    <>
      <JsonLd schema={contactSchema} />

      {/* Hero */}
      <section className="bg-neutral-50 pt-16 pb-14 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
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
              Contacto
            </span>
          </nav>
          <h1 className="font-serif text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-4">
            Hablemos
          </h1>
          <p className="font-sans text-[18px] text-neutral-600 leading-relaxed max-w-[50ch]">
            Nuestro equipo de asesores está disponible para ayudarte a elegir el
            mejor seguro de auto. Sin presión, sin scripts de venta.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white py-14">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
            {/* Left: channels */}
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-[26px] leading-[1.1] tracking-[-0.01em] text-neutral-900">
                Canales de atención
              </h2>

              {CHANNELS.map((ch) => (
                <div
                  key={ch.title}
                  className="bg-neutral-50 border border-neutral-200 rounded-[10px] p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[24px]" aria-hidden="true">
                      {ch.icon}
                    </span>
                    <div>
                      <p className="font-sans font-semibold text-[16px] text-neutral-900">
                        {ch.title}
                      </p>
                      <p className="font-sans text-[13px] text-neutral-500">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-[12px] text-neutral-600">
                    {ch.detail}
                  </p>
                  <a
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noopener noreferrer" : undefined}
                    className={[
                      "inline-flex items-center gap-2 self-start font-sans font-semibold text-[14px] px-4 py-2.5 rounded-sm transition-colors duration-120 no-underline",
                      ch.primary
                        ? "bg-primary-700 text-white hover:bg-primary-600"
                        : "border border-primary-700 text-primary-700 hover:bg-primary-50",
                    ].join(" ")}
                  >
                    {ch.cta}
                  </a>
                </div>
              ))}

              {/* Hours */}
              <div className="border-t border-neutral-200 pt-5">
                <h3 className="font-sans font-semibold text-[13px] tracking-[0.08em] uppercase text-neutral-500 mb-3">
                  Horarios de atención
                </h3>
                <div className="flex flex-col gap-1.5">
                  {[
                    ["Lunes a Viernes", "9:00 — 21:00 hs"],
                    ["Sábados", "9:00 — 13:00 hs"],
                    ["Domingos y feriados", "Cerrado"],
                  ].map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex justify-between items-baseline"
                    >
                      <span className="font-sans text-[14px] text-neutral-700">
                        {day}
                      </span>
                      <span className="font-mono text-[13px] text-neutral-500">
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-[10px] p-8">
              <h2 className="font-serif text-[24px] leading-[1.1] tracking-[-0.01em] text-neutral-900 mb-6">
                Formulario de contacto
              </h2>
              <form
                action="mailto:info@ramsarseguros.com.ar"
                method="POST"
                encType="text/plain"
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="nombre"
                      className="font-sans text-[13px] font-medium text-neutral-800"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="border border-neutral-300 rounded-[6px] px-3.5 py-2.5 font-sans text-[14px] text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15 transition-colors duration-120"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="font-sans text-[13px] font-medium text-neutral-800"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="border border-neutral-300 rounded-[6px] px-3.5 py-2.5 font-sans text-[14px] text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15 transition-colors duration-120"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asunto"
                    className="font-sans text-[13px] font-medium text-neutral-800"
                  >
                    Asunto
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    className="border border-neutral-300 rounded-[6px] px-3.5 py-2.5 font-sans text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15 transition-colors duration-120"
                  >
                    <option value="cotizacion">
                      Consulta sobre cotización
                    </option>
                    <option value="poliza">Consulta sobre mi póliza</option>
                    <option value="siniestro">Consulta sobre siniestro</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mensaje"
                    className="font-sans text-[13px] font-medium text-neutral-800"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Contanos en qué podemos ayudarte..."
                    className="border border-neutral-300 rounded-[6px] px-3.5 py-2.5 font-sans text-[14px] text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15 transition-colors duration-120 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary-700 text-white font-sans font-semibold text-[14px] px-6 py-3 rounded-sm hover:bg-primary-600 active:bg-primary-800 transition-colors duration-120"
                >
                  Enviar mensaje
                </button>

                <p className="font-sans text-[12px] text-neutral-400 text-center">
                  Al enviar este formulario aceptás nuestra{" "}
                  <Link
                    href="/privacidad"
                    className="text-primary-600 hover:underline no-underline"
                  >
                    política de privacidad
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
