import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, absoluteUrl } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = buildMetadata({
  title: "Preguntas Frecuentes sobre Seguros de Auto",
  description:
    "Respondemos las preguntas más comunes sobre seguros de auto en Argentina: coberturas, precios, cómo cotizar, siniestros y más. Todo explicado en lenguaje claro.",
  canonicalPath: "/preguntas-frecuentes",
});

const FAQ_SECTIONS = [
  {
    category: "Cotización y contratación",
    faqs: [
      {
        q: "¿Cuánto cuesta un seguro de auto en Argentina?",
        a: "El costo depende de varios factores: marca, modelo, año del vehículo, zona geográfica, tipo de cobertura y si tenés antecedentes de siniestros. La única forma de saberlo con precisión es cotizando, ya que cada situación es diferente. Con Ramsar lo hacés en 2 minutos.",
      },
      {
        q: "¿Qué datos necesito para cotizar?",
        a: "Solo necesitás la marca, modelo y año de tu vehículo, más tu código postal. No se requiere DNI ni patente para obtener una cotización orientativa. Si luego decidís contratar, ahí se solicita la documentación completa.",
      },
      {
        q: "¿El servicio de cotización tiene algún costo?",
        a: "No. Cotizar y comparar es completamente gratuito. Ramsar Seguros es un corredor matriculado ante la SSN y recibe comisión de las aseguradoras, no del asegurado.",
      },
      {
        q: "¿Puedo contratar para un auto usado?",
        a: "Sí. Podés cotizar y contratar para autos de cualquier año, tanto 0km como usados.",
      },
      {
        q: "¿Cuánto tiempo lleva el proceso completo?",
        a: "Obtener la cotización lleva 2 minutos. Si decidís contratar, el proceso completo de emisión de póliza toma entre 5 y 15 minutos dependiendo de la aseguradora elegida.",
      },
    ],
  },
  {
    category: "Tipos de cobertura",
    faqs: [
      {
        q: "¿Es obligatorio tener seguro de auto?",
        a: "Sí. La Ley 24.449 establece que todo vehículo en vía pública debe contar como mínimo con seguro de responsabilidad civil. Circular sin seguro puede implicar multas, retención del vehículo y responsabilidad civil ilimitada ante accidentes.",
      },
      {
        q: "¿Cuál es la diferencia entre terceros y todo riesgo?",
        a: "El seguro de terceros cubre los daños que le causás a otros (personas, vehículos, propiedades) pero no cubre daños a tu propio auto. El todo riesgo también cubre tu vehículo por accidente, granizo, incendio y robo. Es más caro pero ofrece protección completa.",
      },
      {
        q: "¿Qué es el seguro de terceros completo?",
        a: "Es una cobertura intermedia entre terceros básico y todo riesgo. Cubre responsabilidad civil más granizo, incendio total y robo total del vehículo. Es una opción muy elegida por su relación cobertura-precio.",
      },
      {
        q: "¿El seguro cubre el robo del auto?",
        a: "Depende de la cobertura. Los seguros de terceros básico generalmente no cubren robo del propio vehículo. Las coberturas de terceros completo y todo riesgo sí incluyen robo total, y algunas incluyen robo parcial. Siempre verificá las condiciones de tu póliza.",
      },
      {
        q: "¿Qué es la franquicia?",
        a: "La franquicia es el monto que vos abonás antes de que la aseguradora cubra el resto del siniestro. Por ejemplo, con una franquicia de $500.000, si el daño es de $800.000, vos pagás $500.000 y la aseguradora cubre $300.000. Las pólizas con franquicia suelen ser más económicas.",
      },
    ],
  },
  {
    category: "Siniestros",
    faqs: [
      {
        q: "¿Qué hago si tengo un accidente?",
        a: "Primero asegurate de que todos estén bien. Luego intercambiá datos con el otro conductor (nombre, DNI, patente, aseguradora). Tomá fotos del siniestro y denunciá a tu aseguradora dentro de las 72 horas. Tu póliza incluye el teléfono de siniestros.",
      },
      {
        q: "¿Cuánto tarda en resolverse un siniestro?",
        a: "Depende del tipo de siniestro y la aseguradora. Los siniestros simples (daños menores) pueden resolverse en 5 a 10 días hábiles. Los siniestros complejos o con terceros involucrados pueden extenderse más. Cada aseguradora tiene sus plazos.",
      },
      {
        q: "¿Puedo cambiar de aseguradora si no estoy conforme con el servicio?",
        a: "Sí. Podés rescindir tu póliza en cualquier momento comunicando el preaviso indicado en el contrato (generalmente 30 días). No hay penalidad por cambiar de compañía.",
      },
    ],
  },
  {
    category: "Sobre Ramsar Seguros",
    faqs: [
      {
        q: "¿Ramsar Seguros es una aseguradora?",
        a: "No. Somos un corredor de seguros matriculado ante la Superintendencia de Seguros de la Nación (SSN). Eso significa que representamos los intereses del asegurado, no de las compañías. Comparamos y asesoramos de forma independiente.",
      },
      {
        q: "¿Cómo gana dinero Ramsar si el servicio es gratis?",
        a: "Como corredor matriculado, recibimos una comisión de la aseguradora cuando se emite una póliza a través de nuestra plataforma. Esa comisión está incluida en el precio que paga el asegurado — no pagás nada extra por usarnos.",
      },
      {
        q: "¿Mis datos están seguros?",
        a: "Sí. Tu información se transmite por conexión SSL encriptada. No vendemos ni compartimos tus datos personales con terceros sin tu consentimiento. Podés leer todos los detalles en nuestra política de privacidad.",
      },
    ],
  },
];

const allFaqs = FAQ_SECTIONS.flatMap((s) => s.faqs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: absoluteUrl("/preguntas-frecuentes"),
  mainEntity: allFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <JsonLd schema={faqSchema} />

      {/* Hero */}
      <section className="bg-neutral-50 pt-16 pb-12 border-b border-neutral-200">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
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
              Preguntas frecuentes
            </span>
          </nav>
          <h1 className="font-serif text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.02em] text-neutral-900 mb-4">
            Preguntas frecuentes
          </h1>
          <p className="font-sans text-[18px] text-neutral-600 leading-relaxed">
            Todo lo que necesitás saber sobre seguros de auto en Argentina,
            explicado en lenguaje claro y sin tecnicismos.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-white py-14">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-14">
            {FAQ_SECTIONS.map((section) => (
              <div key={section.category}>
                <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 mb-6">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${section.category}-${i}`}
                      className="border-b border-neutral-200 last:border-b-0"
                    >
                      <AccordionTrigger
                        className={[
                          "font-sans font-medium text-[16px] text-neutral-900 text-left py-4 px-0",
                          "hover:no-underline hover:text-primary-700",
                          "data-[state=open]:text-primary-700",
                          "transition-colors duration-120",
                        ].join(" ")}
                      >
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="font-sans text-[15px] text-neutral-700 leading-relaxed pb-4 px-0">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 pt-10 border-t border-neutral-200 text-center flex flex-col items-center gap-4">
            <p className="font-sans text-[16px] text-neutral-600">
              ¿No encontraste la respuesta que buscabas?
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[14px] px-6 py-3 rounded-sm hover:bg-primary-600 transition-colors duration-120 no-underline"
            >
              Contactar a un asesor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
