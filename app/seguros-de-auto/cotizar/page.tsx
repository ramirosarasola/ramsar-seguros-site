import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CotizadorFlow } from "@/components/cotizador/CotizadorFlow";
import { getMarcaBySlug, modeloToSlug } from "@/lib/vehiculos";

export const metadata: Metadata = buildMetadata({
  title: "Cotizá tu Seguro de Auto",
  description:
    "Completá tu consulta en menos de 2 minutos y recibí las mejores opciones de seguro de auto de más de 20 aseguradoras de Argentina.",
  canonicalPath: "/seguros-de-auto/cotizar",
  robots: { index: true, follow: true },
});

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function resolveString(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string {
  const v = params[key];
  return typeof v === "string" ? v.trim() : "";
}

function normalizeMarca(raw: string): string {
  if (!raw) return "";
  // Slug (lowercase) → display name via lib/vehiculos
  const bySlug = getMarcaBySlug(raw.toLowerCase());
  if (bySlug) return bySlug.name;
  // Already a display name — return as-is if it matches a known name
  const byName = getMarcaBySlug(
    raw
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  );
  return byName?.name ?? "";
}

function normalizeModelo(marcaRaw: string, modeloRaw: string): string {
  if (!modeloRaw) return "";
  const marca = getMarcaBySlug(marcaRaw.toLowerCase());
  if (!marca) return "";
  // Find the original model name whose slug matches the incoming value
  const match = marca.models.find(
    (m) => modeloToSlug(m) === modeloRaw.toLowerCase(),
  );
  // Fall back to the raw string (already a display name, e.g. "Corolla")
  return match ?? modeloRaw;
}

export default async function CotizarPage({ searchParams }: Props) {
  const params = await searchParams;

  const rawMarca = resolveString(params, "marca");
  const rawModelo = resolveString(params, "modelo");

  const initialData = {
    marca: normalizeMarca(rawMarca),
    modelo: normalizeModelo(rawMarca, rawModelo),
    anio: resolveString(params, "anio"),
    cp: resolveString(params, "cp"),
    cobertura: resolveString(params, "cobertura"),
  };

  return <CotizadorFlow initialData={initialData} />;
}
