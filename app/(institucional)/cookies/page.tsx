import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Política de Cookies — Ramsar Seguros",
  description:
    "Política de cookies de Ramsar Seguros. Qué cookies utilizamos, para qué las usamos y cómo podés gestionarlas.",
  canonicalPath: "/cookies",
});

const LAST_UPDATED = "24 de mayo de 2026";

const COOKIE_TYPES = [
  {
    name: "Cookies esenciales",
    description:
      "Necesarias para el funcionamiento básico del Sitio. Incluyen cookies de sesión y seguridad. No pueden desactivarse.",
    examples: [
      "Sesión de usuario",
      "Token CSRF",
      "Preferencias de consentimiento",
    ],
    canDisable: false,
  },
  {
    name: "Cookies de analítica",
    description:
      "Nos ayudan a entender cómo se usa el Sitio para mejorarlo. Recopilan información de forma anónima o pseudónima.",
    examples: [
      "PostHog (analítica de producto)",
      "Vercel Analytics (performance)",
    ],
    canDisable: true,
  },
  {
    name: "Cookies de marketing",
    description:
      "Actualmente no utilizamos cookies de marketing ni de publicidad dirigida.",
    examples: [],
    canDisable: false,
  },
];

export default function CookiesPage() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-[720px] mx-auto px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10">
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
            Cookies
          </span>
        </nav>

        <h1 className="font-serif text-[40px] leading-[1.06] tracking-[-0.02em] text-neutral-900 mb-3">
          Política de Cookies
        </h1>
        <p className="font-mono text-[12px] text-neutral-400 mb-10">
          Última actualización: {LAST_UPDATED}
        </p>

        <div className="font-sans text-[15px] text-neutral-700 leading-relaxed">
          <Section title="¿Qué son las cookies?">
            <p>
              Las cookies son pequeños archivos de texto que los sitios web
              almacenan en tu navegador para recordar información sobre tu
              visita. Se utilizan ampliamente para hacer que los sitios
              funcionen correctamente, mejorar la experiencia de usuario y
              proporcionar información a los propietarios del sitio.
            </p>
          </Section>

          <Section title="Cookies que utilizamos">
            <div className="flex flex-col gap-5 mt-4">
              {COOKIE_TYPES.map((type) => (
                <div
                  key={type.name}
                  className="bg-neutral-50 border border-neutral-200 rounded-[10px] p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-sans font-semibold text-[15px] text-neutral-900">
                      {type.name}
                    </h3>
                    <span
                      className={[
                        "font-mono text-[10px] tracking-[0.08em] uppercase px-2 py-1 rounded-sm shrink-0",
                        type.canDisable
                          ? "bg-neutral-200 text-neutral-600"
                          : "bg-primary-50 text-primary-700",
                      ].join(" ")}
                    >
                      {type.canDisable ? "Opcional" : "Esencial"}
                    </span>
                  </div>
                  <p className="font-sans text-[14px] text-neutral-600 mb-3">
                    {type.description}
                  </p>
                  {type.examples.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 mb-1.5">
                        Ejemplos
                      </p>
                      <ul className="flex flex-col gap-1">
                        {type.examples.map((ex) => (
                          <li
                            key={ex}
                            className="font-sans text-[13px] text-neutral-600 flex items-center gap-2"
                          >
                            <span
                              className="w-1 h-1 rounded-full bg-neutral-400 shrink-0"
                              aria-hidden="true"
                            />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Cómo gestionar las cookies">
            <p>
              Podés controlar y eliminar las cookies a través de la
              configuración de tu navegador. La mayoría de los navegadores te
              permiten rechazar todas las cookies o solo las de terceros. Ten en
              cuenta que deshabilitar las cookies esenciales puede afectar el
              funcionamiento del Sitio.
            </p>
            <p>
              Para más información sobre cómo gestionar cookies según tu
              navegador:
            </p>
            <ul>
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Opciones → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Privacidad, búsqueda y servicios</li>
            </ul>
          </Section>

          <Section title="Más información">
            <p>
              Para más detalles sobre cómo tratamos tus datos personales,
              consultá nuestra{" "}
              <Link
                href="/privacidad"
                className="text-primary-700 hover:underline no-underline"
              >
                política de privacidad
              </Link>
              . Para consultas:{" "}
              <a
                href="mailto:privacidad@ramsarseguros.com.ar"
                className="text-primary-700 hover:underline"
              >
                privacidad@ramsarseguros.com.ar
              </a>
            </p>
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="font-sans font-semibold text-[18px] text-neutral-900 mb-3">
        {title}
      </h2>
      <div className="[&>p]:mb-3 [&>ul]:mb-3 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:mb-1.5">
        {children}
      </div>
    </div>
  );
}
