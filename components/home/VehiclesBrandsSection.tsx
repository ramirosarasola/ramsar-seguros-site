import Link from "next/link";

const BRANDS = [
  { slug: "volkswagen", name: "Volkswagen", models: 9 },
  { slug: "toyota", name: "Toyota", models: 12 },
  { slug: "chevrolet", name: "Chevrolet", models: 10 },
  { slug: "ford", name: "Ford", models: 11 },
  { slug: "renault", name: "Renault", models: 8 },
  { slug: "peugeot", name: "Peugeot", models: 7 },
  { slug: "fiat", name: "Fiat", models: 9 },
  { slug: "citroen", name: "Citroën", models: 6 },
  { slug: "nissan", name: "Nissan", models: 5 },
  { slug: "honda", name: "Honda", models: 6 },
  { slug: "jeep", name: "Jeep", models: 4 },
  { slug: "hyundai", name: "Hyundai", models: 7 },
  { slug: "kia", name: "Kia", models: 6 },
  { slug: "dodge", name: "Dodge", models: 3 },
  { slug: "suzuki", name: "Suzuki", models: 4 },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function VehiclesBrandsSection() {
  return (
    <section id="vehiculos" className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 block mb-2">
            Por vehículo
          </span>
          <h2 className="font-serif text-[36px] leading-[1.06] tracking-[-0.015em] text-neutral-900 max-w-[20ch]">
            Seguros de auto por marca y modelo
          </h2>
          <p className="font-sans text-[16px] text-neutral-500 mt-2 max-w-[600px]">
            Encontrá el seguro ideal según tu vehículo. Cada marca y modelo
            tiene características que afectan el precio y las coberturas
            disponibles.
          </p>
        </div>

        {/* Brand grid — 6 cols desktop, 4 tablet, 3 mobile */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/vehiculos/${brand.slug}`}
              className={[
                "aspect-square flex flex-col items-center justify-center gap-1.5 p-3",
                "bg-neutral-50 border border-neutral-200 rounded-[10px] no-underline",
                "transition-all duration-120",
                "hover:bg-primary-50 hover:border-primary-200",
                "group",
              ].join(" ")}
            >
              {/* Brand logo placeholder */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-mono text-[10px] text-neutral-500 shrink-0 border border-neutral-100">
                {initials(brand.name)}
              </div>
              <span className="font-sans font-semibold text-[11px] text-neutral-900 text-center leading-tight group-hover:text-primary-700 transition-colors duration-120">
                {brand.name}
              </span>
              <span className="font-mono text-[9.5px] text-neutral-500">
                {brand.models} modelos
              </span>
            </Link>
          ))}
        </div>

        {/* SEO copy block */}
        <div className="mt-12 pt-6 border-t border-neutral-200 max-w-[640px]">
          <h3 className="font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-neutral-900 mb-3">
            ¿Por qué el seguro varía según la marca del auto?
          </h3>
          <p className="font-sans text-[15px] text-neutral-700 leading-relaxed mb-3">
            El precio y las coberturas de un seguro de auto dependen de varios
            factores relacionados con el vehículo: su valor de mercado, la
            disponibilidad de repuestos, el índice de siniestralidad de la marca
            y el costo de reparación.
          </p>
          <p className="font-sans text-[15px] text-neutral-700 leading-relaxed">
            Por eso, un seguro para un Toyota Corolla no cuesta lo mismo que uno
            para un Volkswagen Gol. En Ramsar Seguros podés cotizar por marca y
            modelo para obtener el precio más preciso.
          </p>
        </div>
      </div>
    </section>
  );
}
