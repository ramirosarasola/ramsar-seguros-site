"use client";

import { useState } from "react";
import { Check, Minus, X, ChevronDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CoverageRow, Insurer } from "@/lib/strapi";

const VISIBLE_ROWS = 8;

type CellValue = CoverageRow["terceros"];

function DataCell({ value, tooltip }: { value: CellValue; tooltip?: string }) {
  const content = (() => {
    if (value === "yes") {
      return (
        <>
          <Check
            size={20}
            strokeWidth={2}
            className="text-success mx-auto"
            aria-hidden="true"
          />
          <span className="sr-only">Incluido</span>
        </>
      );
    }
    if (value === "no") {
      return (
        <>
          <Minus
            size={20}
            strokeWidth={2}
            className="text-neutral-300 mx-auto"
            aria-hidden="true"
          />
          <span className="sr-only">No incluido</span>
        </>
      );
    }
    if (value === "partial") {
      return (
        <>
          <Minus
            size={20}
            strokeWidth={2}
            className="text-warning mx-auto"
            aria-hidden="true"
          />
          <span className="sr-only">Cobertura parcial</span>
        </>
      );
    }
    return (
      <span className="font-mono text-sm font-medium text-neutral-900 tabular-nums">
        {value}
      </span>
    );
  })();

  if (!tooltip) {
    return (
      <div className="flex items-center justify-center py-3 px-4">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-3 px-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            aria-label={`Ver detalles: ${tooltip}`}
          >
            {content}
            {(value === "partial" || typeof value === "string") && (
              <Info
                size={12}
                className="text-neutral-400 hover:text-primary-700 transition-colors duration-150"
                aria-hidden="true"
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-72 text-xs text-left">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function CoverageComparisonTable({ insurer }: { insurer: Insurer }) {
  const [expanded, setExpanded] = useState(false);
  const rows = insurer.comparisonRows;
  const visibleRows = expanded ? rows : rows.slice(0, VISIBLE_ROWS);
  const hiddenCount = rows.length - VISIBLE_ROWS;

  const planNames = ["Terceros", "Terceros Plus", "Todo Riesgo"];

  return (
    <section className="bg-neutral-50 py-16">
      <div className="max-w-300 mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl tracking-tight text-neutral-900">
            Comparativa detallada de coberturas {insurer.name}
          </h2>
          <p className="text-lg text-neutral-500 mt-3">
            Revisá exactamente qué incluye y qué no incluye cada plan antes de
            cotizar.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-elevation-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <caption className="sr-only">
                Comparación de coberturas de {insurer.name}
              </caption>
              <thead>
                <tr className="bg-neutral-100">
                  <th
                    scope="col"
                    className="text-left py-4 px-5 text-sm font-mono font-medium text-neutral-700 w-2/5"
                  >
                    Cobertura
                  </th>
                  {planNames.map((name, i) => (
                    <th
                      key={name}
                      scope="col"
                      className={[
                        "text-center py-4 px-4 text-sm font-semibold text-neutral-700",
                        i === 1
                          ? "bg-primary-50 border-x border-primary-200"
                          : "",
                      ].join(" ")}
                    >
                      {i === 1 && (
                        <span className="block text-xs font-mono text-primary-600 uppercase tracking-wide mb-0.5">
                          Recomendado
                        </span>
                      )}
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, rowIdx) => (
                  <tr
                    key={row.feature}
                    className={[
                      "border-b border-neutral-200 hover:bg-primary-50 transition-colors duration-150",
                      rowIdx % 2 === 1 ? "bg-neutral-50" : "bg-white",
                    ].join(" ")}
                  >
                    <th
                      scope="row"
                      className="text-left py-3 px-5 text-sm text-neutral-800 font-normal sticky left-0 bg-inherit"
                    >
                      {row.feature}
                    </th>
                    <td className="text-center">
                      <DataCell value={row.terceros} />
                    </td>
                    <td className="text-center bg-primary-50 border-x border-primary-200">
                      <DataCell
                        value={row.tercerosPlus}
                        tooltip={row.tooltip}
                      />
                    </td>
                    <td className="text-center">
                      <DataCell value={row.todoRiesgo} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expand control */}
        {hiddenCount > 0 && (
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline underline-offset-2 transition-colors duration-150 bg-transparent border-0 cursor-pointer"
            >
              {expanded ? (
                <>
                  Ocultar coberturas adicionales
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="rotate-180 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  Ver tabla completa ({hiddenCount} ítems más)
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
