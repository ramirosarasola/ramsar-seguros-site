import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Términos de Uso — Ramsar Seguros",
  description:
    "Términos y condiciones de uso del sitio web de Ramsar Seguros. Condiciones de acceso, responsabilidades y limitaciones del servicio.",
  canonicalPath: "/terminos",
});

const LAST_UPDATED = "24 de mayo de 2026";

export default function TerminosPage() {
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
            Términos
          </span>
        </nav>

        <h1 className="font-serif text-[40px] leading-[1.06] tracking-[-0.02em] text-neutral-900 mb-3">
          Términos de Uso
        </h1>
        <p className="font-mono text-[12px] text-neutral-400 mb-10">
          Última actualización: {LAST_UPDATED}
        </p>

        <div>
          <Section title="1. Aceptación de los términos">
            <p>
              Al acceder y utilizar el sitio web ramsarseguros.com.ar (el
              "Sitio"), aceptás los presentes Términos de Uso. Si no estás de
              acuerdo con alguno de estos términos, te pedimos que no utilices
              el Sitio.
            </p>
          </Section>

          <Section title="2. Naturaleza del servicio">
            <p>
              Ramsar Seguros es un corredor de seguros matriculado ante la
              Superintendencia de Seguros de la Nación (SSN). El Sitio funciona
              como plataforma de comparación y asesoramiento en seguros de auto
              para el mercado argentino.
            </p>
            <p>
              Ramsar Seguros actúa como intermediario entre el usuario y las
              aseguradoras. Las pólizas son emitidas por las aseguradoras
              habilitadas por la SSN, no por Ramsar Seguros.
            </p>
          </Section>

          <Section title="3. Uso del sitio">
            <p>El usuario se compromete a:</p>
            <ul>
              <li>
                Utilizar el Sitio únicamente para fines lícitos y conforme a su
                finalidad.
              </li>
              <li>
                Proporcionar información veraz y actualizada al completar
                formularios de cotización.
              </li>
              <li>
                No intentar interferir con el funcionamiento del Sitio ni sus
                sistemas.
              </li>
              <li>
                No reproducir, distribuir ni modificar el contenido del Sitio
                sin autorización.
              </li>
            </ul>
          </Section>

          <Section title="4. Exactitud de la información">
            <p>
              Las cotizaciones y comparativas de seguros presentadas en el Sitio
              son orientativas y pueden variar al momento de la emisión efectiva
              de la póliza, según las condiciones particulares de cada
              aseguradora y la situación específica del usuario.
            </p>
            <p>
              Ramsar Seguros hace su mejor esfuerzo para mantener la información
              actualizada pero no garantiza la exactitud absoluta ni la
              disponibilidad ininterrumpida del Sitio.
            </p>
          </Section>

          <Section title="5. Propiedad intelectual">
            <p>
              Todo el contenido del Sitio —incluyendo textos, imágenes, diseño,
              código fuente, logotipos y marcas— es propiedad de Ramsar Seguros
              o de sus licenciantes y está protegido por las leyes de propiedad
              intelectual de Argentina.
            </p>
          </Section>

          <Section title="6. Limitación de responsabilidad">
            <p>
              Ramsar Seguros no será responsable por daños directos o indirectos
              derivados del uso o la imposibilidad de uso del Sitio, ni por
              decisiones de contratación tomadas en base a la información
              presentada.
            </p>
            <p>
              La responsabilidad de Ramsar Seguros como corredor de seguros está
              limitada a lo establecido por la normativa de la SSN y la Ley
              17.418 de Seguros.
            </p>
          </Section>

          <Section title="7. Modificaciones">
            <p>
              Ramsar Seguros se reserva el derecho de modificar estos Términos
              en cualquier momento. Las modificaciones entran en vigencia desde
              su publicación en el Sitio. El uso continuado del Sitio implica la
              aceptación de los términos actualizados.
            </p>
          </Section>

          <Section title="8. Ley aplicable">
            <p>
              Estos Términos se rigen por las leyes de la República Argentina.
              Para cualquier controversia, las partes se someten a la
              jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de
              Buenos Aires.
            </p>
          </Section>

          <Section title="9. Contacto">
            <p>
              Para consultas sobre estos Términos:{" "}
              <a
                href="mailto:legal@ramsarseguros.com.ar"
                className="text-primary-700 hover:underline"
              >
                legal@ramsarseguros.com.ar
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
      <div className="font-sans text-[15px] text-neutral-700 leading-relaxed [&>p]:mb-3 [&>ul]:mb-3 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:mb-1.5">
        {children}
      </div>
    </div>
  );
}
