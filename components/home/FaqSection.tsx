import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";

const FAQS = [
  {
    q: "¿Cuánto cuesta un seguro de auto en Argentina?",
    a: "El precio varía según la marca, modelo, año del vehículo, zona geográfica y tipo de cobertura elegida. En promedio, un seguro de terceros completos para un auto mediano en el Gran Buenos Aires ronda entre $35.000 y $80.000 mensuales en 2026. La mejor forma de saberlo con precisión es cotizando, ya que cada situación es diferente.",
  },
  {
    q: "¿Cuál es la diferencia entre terceros y todo riesgo?",
    a: "El seguro de terceros cubre los daños que le causás a terceros (personas, vehículos, propiedades) pero no cubre daños a tu propio auto. El todo riesgo, en cambio, también cubre los daños de tu vehículo por accidente, robo parcial o total, y fenómenos meteorológicos. Es más caro pero ofrece protección completa.",
  },
  {
    q: "¿Es obligatorio tener seguro de auto en Argentina?",
    a: "Sí. La Ley 24.449 de Tránsito establece que todo vehículo que circule en vía pública debe contar como mínimo con seguro de responsabilidad civil hacia terceros. Circular sin seguro puede implicar multas, retención del vehículo y responsabilidad civil ilimitada en caso de accidente.",
  },
  {
    q: "¿Cómo elijo la mejor aseguradora para mi auto?",
    a: "Considerá tres factores principales: precio (cotizá en varias aseguradoras para comparar), cobertura (verificá qué incluye cada plan y qué queda excluido) y reputación de siniestros (cómo responde la aseguradora cuando necesitás usarla). En Ramsar Seguros comparamos todos estos factores en un solo lugar.",
  },
  {
    q: "¿Puedo cambiar de aseguradora en cualquier momento?",
    a: "Sí. Podés cambiar de aseguradora al vencimiento de tu póliza o en cualquier momento comunicando la rescisión con el preaviso establecido en tu contrato (generalmente 30 días). No existe penalidad por cambiar de compañía.",
  },
  {
    q: "¿Qué necesito para cotizar mi seguro de auto?",
    a: "Solo necesitás tener a mano la marca, modelo, año de tu vehículo y tu código postal. No es necesario el DNI ni los datos de la patente para obtener una cotización orientativa. Si decidís contratar, ahí sí se te solicitará la documentación completa.",
  },
  {
    q: "¿El seguro cubre el robo total del auto?",
    a: "Depende del tipo de cobertura. Los seguros de terceros generalmente no cubren robo del propio vehículo. Las coberturas de terceros plus y todo riesgo sí incluyen robo total, y algunas también cubren robo parcial de partes. Siempre verificá las condiciones particulares de cada póliza.",
  },
  {
    q: "¿Ramsar Seguros cobra algo por comparar o cotizar?",
    a: "No. El servicio de comparación y cotización es completamente gratuito para el usuario. Ramsar Seguros es un corredor de seguros matriculado ante la SSN (Superintendencia de Seguros de la Nación) y recibe comisión de las aseguradoras, no del asegurado.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function FaqSection() {
  return (
    <>
      <JsonLd schema={faqSchema} />
      <section id="faq" className="bg-neutral-100 py-20">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          {/* Centered header */}
          <div className="flex flex-col items-center text-center mb-10">
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 mb-3">
              Preguntas frecuentes
            </span>
            <h2 className="font-serif text-[36px] leading-[1.06] tracking-[-0.015em] text-neutral-900">
              Todo lo que querés saber sobre seguros de auto
            </h2>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
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

          {/* Closing helper */}
          <p className="text-center font-sans text-[16px] text-neutral-600 mt-8">
            ¿Tenés más preguntas?{" "}
            <Link
              href="/ayuda"
              className="font-semibold text-[13px] text-primary-700 no-underline hover:underline hover:underline-offset-2"
            >
              Visitá nuestro centro de ayuda →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
