import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidad — Ramsar Seguros",
  description:
    "Política de privacidad de Ramsar Seguros. Cómo recolectamos, usamos y protegemos tus datos personales conforme a la Ley 25.326 de Protección de Datos Personales de Argentina.",
  canonicalPath: "/privacidad",
});

const LAST_UPDATED = "24 de mayo de 2026";

export default function PrivacidadPage() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-[720px] mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
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
            Privacidad
          </span>
        </nav>

        <h1 className="font-serif text-[40px] leading-[1.06] tracking-[-0.02em] text-neutral-900 mb-3">
          Política de Privacidad
        </h1>
        <p className="font-mono text-[12px] text-neutral-400 mb-10">
          Última actualización: {LAST_UPDATED}
        </p>

        <div className="prose-legal">
          <Section title="1. Responsable del tratamiento">
            <p>
              Ramsar Seguros (en adelante, "Ramsar", "nosotros" o "la empresa")
              es el responsable del tratamiento de los datos personales
              recolectados a través del sitio web ramsarseguros.com.ar (en
              adelante, "el Sitio").
            </p>
            <p>
              Ramsar Seguros es un corredor de seguros matriculado ante la
              Superintendencia de Seguros de la Nación (SSN), con domicilio en
              Argentina.
            </p>
          </Section>

          <Section title="2. Datos que recolectamos">
            <p>Recolectamos los siguientes tipos de datos personales:</p>
            <ul>
              <li>
                <strong>Datos de cotización:</strong> marca, modelo y año del
                vehículo, código postal, tipo de uso.
              </li>
              <li>
                <strong>Datos de contacto:</strong> nombre, dirección de email,
                número de teléfono (cuando se proveen voluntariamente).
              </li>
              <li>
                <strong>Datos de navegación:</strong> dirección IP, tipo de
                navegador, páginas visitadas, tiempo de sesión, a través de
                cookies y herramientas de analítica.
              </li>
            </ul>
          </Section>

          <Section title="3. Finalidades del tratamiento">
            <p>Utilizamos tus datos para:</p>
            <ul>
              <li>Brindarte cotizaciones de seguros de auto.</li>
              <li>Asesorarte en la selección y contratación de coberturas.</li>
              <li>
                Enviarte comunicaciones relacionadas con tu cotización o póliza.
              </li>
              <li>Mejorar la experiencia de uso del Sitio.</li>
              <li>
                Cumplir con obligaciones legales y regulatorias ante la SSN y
                organismos competentes.
              </li>
            </ul>
          </Section>

          <Section title="4. Base legal del tratamiento">
            <p>
              El tratamiento de tus datos se realiza bajo las siguientes bases
              legales, conforme a la Ley 25.326 de Protección de Datos
              Personales:
            </p>
            <ul>
              <li>Tu consentimiento explícito al utilizar el Sitio.</li>
              <li>
                La ejecución de una relación contractual (cotización o póliza de
                seguro).
              </li>
              <li>El cumplimiento de obligaciones legales.</li>
              <li>Nuestro interés legítimo en mejorar el servicio.</li>
            </ul>
          </Section>

          <Section title="5. Compartición de datos">
            <p>Tus datos personales pueden ser compartidos con:</p>
            <ul>
              <li>
                <strong>Aseguradoras:</strong> para la generación de
                cotizaciones y emisión de pólizas. Solo compartimos los datos
                estrictamente necesarios.
              </li>
              <li>
                <strong>Proveedores de servicios tecnológicos:</strong> que nos
                ayudan a operar el Sitio (hosting, analítica, email). Estos
                proveedores están contractualmente obligados a mantener la
                confidencialidad.
              </li>
              <li>
                <strong>Organismos regulatorios:</strong> cuando así lo requiera
                la ley o la SSN.
              </li>
            </ul>
            <p>No vendemos ni alquilamos tus datos personales a terceros.</p>
          </Section>

          <Section title="6. Retención de datos">
            <p>
              Conservamos tus datos durante el tiempo necesario para los fines
              descritos en esta política y para cumplir con las obligaciones
              legales aplicables. En general, los datos de cotización se
              conservan por 5 años; los datos de pólizas activas, por el plazo
              de vigencia de la póliza más 10 años.
            </p>
          </Section>

          <Section title="7. Tus derechos">
            <p>Conforme a la Ley 25.326, tenés derecho a:</p>
            <ul>
              <li>Acceder a los datos personales que tenemos sobre vos.</li>
              <li>Rectificar datos inexactos o incompletos.</li>
              <li>
                Solicitar la supresión de tus datos cuando ya no sean
                necesarios.
              </li>
              <li>
                Oponerte al tratamiento de tus datos con fines de marketing
                directo.
              </li>
            </ul>
            <p>
              Para ejercer estos derechos, escribinos a{" "}
              <a
                href="mailto:privacidad@ramsarseguros.com.ar"
                className="text-primary-700 hover:underline"
              >
                privacidad@ramsarseguros.com.ar
              </a>
              .
            </p>
          </Section>

          <Section title="8. Seguridad">
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus
              datos contra acceso no autorizado, pérdida o alteración. La
              transmisión de datos al Sitio se realiza mediante conexión SSL/TLS
              encriptada.
            </p>
          </Section>

          <Section title="9. Cookies">
            <p>
              Utilizamos cookies propias y de terceros para mejorar la
              experiencia de navegación y analizar el uso del Sitio. Podés
              consultar nuestra{" "}
              <Link
                href="/cookies"
                className="text-primary-700 hover:underline no-underline"
              >
                política de cookies
              </Link>{" "}
              para más detalles.
            </p>
          </Section>

          <Section title="10. Cambios a esta política">
            <p>
              Podemos actualizar esta política periódicamente. La fecha de
              última actualización se indica al comienzo del documento. Te
              recomendamos revisarla regularmente.
            </p>
          </Section>

          <Section title="11. Contacto">
            <p>
              Para consultas sobre privacidad o el ejercicio de tus derechos,
              contactanos en:{" "}
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
      <div className="font-sans text-[15px] text-neutral-700 leading-relaxed [&>p]:mb-3 [&>ul]:mb-3 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:mb-1.5">
        {children}
      </div>
    </div>
  );
}
