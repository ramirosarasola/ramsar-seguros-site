"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { capture } from "@/lib/analytics";

const MARCAS = [
  "Volkswagen",
  "Toyota",
  "Chevrolet",
  "Ford",
  "Renault",
  "Peugeot",
  "Fiat",
  "Citroën",
  "Nissan",
  "Honda",
  "Jeep",
  "Hyundai",
  "Kia",
  "Dodge",
  "Suzuki",
  "Otra",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 16 }, (_, i) => currentYear - i);

export function CotizadorWidget() {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [cp, setCp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (marca) params.set("marca", marca);
    if (anio) params.set("anio", anio);
    if (cp) params.set("cp", cp);
    capture("cotizador_submitted", {
      marca: marca || null,
      anio: anio ? Number(anio) : null,
      has_cp: !!cp,
    });
    router.push(`/seguros-de-auto/cotizar?${params.toString()}`);
  };

  const selectBase = [
    "h-12 px-3 bg-white border border-neutral-300 rounded-sm",
    "font-sans text-base text-neutral-900",
    "focus:outline-none focus:ring-2 focus:ring-primary-700/30 focus:border-primary-700",
    "transition-colors duration-120",
    "cursor-pointer appearance-none",
    "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23807c6e' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_10px_center]",
    "pr-8",
  ].join(" ");

  const inputBase = [
    "h-12 px-3 bg-white border border-neutral-300 rounded-sm",
    "font-sans text-base text-neutral-900 placeholder:text-neutral-400",
    "focus:outline-none focus:ring-2 focus:ring-primary-700/30 focus:border-primary-700",
    "transition-colors duration-120",
  ].join(" ");

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Cotizador rápido de seguro de auto"
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Marca */}
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className={`${selectBase} w-full sm:flex-1 sm:min-w-0`}
          aria-label="Marca del vehículo"
        >
          <option value="" disabled>
            Marca del auto
          </option>
          {MARCAS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Año */}
        <select
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          className={`${selectBase} w-full sm:w-30`}
          aria-label="Año del vehículo"
        >
          <option value="" disabled>
            Año
          </option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Código postal */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          placeholder="Código postal"
          value={cp}
          onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))}
          className={`${inputBase} w-full sm:w-37.5`}
          aria-label="Código postal"
        />

        {/* Submit */}
        <button
          type="submit"
          className={[
            "h-12 px-5 rounded-sm",
            "bg-accent-500 text-secondary-700",
            "font-sans font-semibold text-[14px]",
            "w-full sm:w-auto shrink-0 whitespace-nowrap",
            "transition-colors duration-120",
            "hover:bg-accent-600 active:bg-accent-700",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/50",
          ].join(" ")}
        >
          Ver precios →
        </button>
      </div>

      <p className="font-mono text-[10.5px] text-neutral-400 tracking-[0.04em] mt-2 text-center sm:text-left">
        Sin registro · Sin compromiso · 100% gratis
      </p>
    </form>
  );
}
