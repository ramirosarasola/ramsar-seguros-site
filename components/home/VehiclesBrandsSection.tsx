"use client";

import Link from "next/link";
import Image from "next/image";
import { capture } from "@/lib/analytics";
import { MARCAS } from "@/lib/vehiculos";

const half = Math.ceil(MARCAS.length / 2);
const row1 = MARCAS.slice(0, half);   // first 8 brands
const row2 = MARCAS.slice(half);      // last 7 brands

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BrandItem({
  brand,
  tabIndex = 0,
}: {
  brand: (typeof MARCAS)[0];
  tabIndex?: number;
}) {
  return (
    <Link
      href={`/vehiculos/${brand.slug}`}
      tabIndex={tabIndex}
      onClick={() =>
        capture("vehicle_brand_clicked", {
          brand_slug: brand.slug,
          brand_name: brand.name,
        })
      }
      className="group relative flex items-center justify-center w-32 h-20 bg-white border border-neutral-200 rounded-xl p-3 shrink-0 overflow-hidden hover:border-primary-300 hover:shadow-sm transition-all duration-120 no-underline"
    >
      {brand.img ? (
        <div className="relative w-full h-full">
          <Image
            src={brand.img}
            alt={brand.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-120"
            sizes="128px"
          />
        </div>
      ) : (
        <span className="font-mono text-[12px] text-neutral-400 group-hover:text-primary-600 transition-colors duration-120">
          {initials(brand.name)}
        </span>
      )}
    </Link>
  );
}

export function VehiclesBrandsSection() {
  return (
    <section id="vehiculos" className="bg-white py-20">
      {/* Header */}
      <div className="max-w-300 mx-auto px-6 lg:px-16 mb-10">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary-500 block mb-2">
          Por vehículo
        </span>
        <h2 className="font-serif text-[36px] leading-[1.06] tracking-[-0.015em] text-neutral-900 max-w-[20ch]">
          Seguros de auto por marca y modelo
        </h2>
        <p className="font-sans text-[16px] text-neutral-500 mt-2 max-w-150">
          Encontrá el seguro ideal según tu vehículo. Cada marca y modelo tiene
          características que afectan el precio y las coberturas disponibles.
        </p>
      </div>

      {/* Marquee — constrained to content max-width */}
      <div className="max-w-300 mx-auto overflow-hidden">
        <div className="flex flex-col gap-4">

          {/* Row 1 — scrolls left, brands 1–8 */}
          <div
            className="mask-fade-x overflow-hidden"
            aria-label="Marcas de autos — primera fila"
            role="region"
          >
            <div className="flex gap-4 w-max animate-marquee-left hover:paused focus-within:paused">
              {row1.map((brand) => (
                <BrandItem key={`r1-${brand.slug}`} brand={brand} />
              ))}
              <div aria-hidden="true" className="contents">
                {row1.map((brand) => (
                  <BrandItem
                    key={`r1-dup-${brand.slug}`}
                    brand={brand}
                    tabIndex={-1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — scrolls right, brands 9–15 */}
          {/* [dup][original] structure → -50%→0 = rightward motion */}
          <div
            className="mask-fade-x overflow-hidden"
            aria-label="Marcas de autos — segunda fila"
            role="region"
          >
            <div className="flex gap-4 w-max animate-marquee-right hover:paused focus-within:paused">
              <div aria-hidden="true" className="contents">
                {row2.map((brand) => (
                  <BrandItem
                    key={`r2-dup-${brand.slug}`}
                    brand={brand}
                    tabIndex={-1}
                  />
                ))}
              </div>
              {row2.map((brand) => (
                <BrandItem key={`r2-${brand.slug}`} brand={brand} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SEO copy */}
      <div className="max-w-300 mx-auto px-6 lg:px-16 mt-12 pt-6 border-t border-neutral-200">
        <div className="max-w-160">
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
