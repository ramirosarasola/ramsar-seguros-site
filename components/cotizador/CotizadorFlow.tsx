"use client";

import { useState } from "react";
import {
  Lock,
  CircleCheck,
  Clock,
  ShieldCheck,
  Shield,
  ShieldPlus,
  Star,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Step = 1 | 2 | 3 | "done";

interface FormData {
  marca: string;
  modelo: string;
  anio: string;
  cp: string;
  cobertura: string;
  email: string;
  telefono: string;
}

/* ── Constants ──────────────────────────────────────────────────────── */

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
const YEARS = Array.from({ length: 16 }, (_, i) => String(currentYear - i));

const COBERTURAS = [
  {
    slug: "responsabilidad-civil",
    name: "Responsabilidad Civil",
    description: "Cobertura mínima obligatoria por ley.",
    icon: Shield,
    badge: "Obligatorio",
    badgeCls: "bg-warning/10 text-warning",
  },
  {
    slug: "terceros",
    name: "Terceros",
    description: "RC + daños accidentales a tu propio auto.",
    icon: ShieldCheck,
    badge: null,
    badgeCls: "",
  },
  {
    slug: "terceros-completo",
    name: "Terceros Completo",
    description: "Incluye robo total, granizo e incendio.",
    icon: ShieldPlus,
    badge: "Más elegido",
    badgeCls: "bg-accent-300/30 text-accent-700",
  },
  {
    slug: "todo-riesgo",
    name: "Todo Riesgo",
    description: "Protección completa. Cubre daños propios por accidente.",
    icon: Star,
    badge: "Máxima protección",
    badgeCls: "bg-primary-50 text-primary-700",
  },
] as const;

const TRUST_BADGES = [
  { Icon: Lock, label: "SSL Seguro" },
  { Icon: CircleCheck, label: "Sin cargo" },
  { Icon: Clock, label: "Respuesta inmediata" },
  { Icon: ShieldCheck, label: "+20 aseguradoras" },
];

/* ── Shared input styles ────────────────────────────────────────────── */

const inputCls = [
  "w-full h-12 px-4 rounded-sm",
  "bg-white border border-neutral-300",
  "font-sans text-base text-neutral-900 placeholder:text-neutral-400",
  "focus:outline-none focus:ring-2 focus:ring-primary-700/25 focus:border-primary-700",
  "transition-colors duration-120",
].join(" ");

const selectCls = [
  inputCls,
  "appearance-none cursor-pointer",
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23807c6e' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_12px_center] pr-9",
].join(" ");

const labelCls =
  "block font-sans font-medium text-[13px] text-neutral-800 mb-1.5";

/* ── Step components ────────────────────────────────────────────────── */

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  onNext: () => void;
}) {
  const valid = data.marca && data.anio;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="marca" className={labelCls}>
          Marca del vehículo <span className="text-error">*</span>
        </label>
        <select
          id="marca"
          value={data.marca}
          onChange={(e) => onChange({ marca: e.target.value })}
          className={selectCls}
          required
        >
          <option value="" disabled>
            Seleccioná una marca
          </option>
          {MARCAS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="modelo" className={labelCls}>
          Modelo{" "}
          <span className="text-neutral-400 font-normal">(opcional)</span>
        </label>
        <input
          id="modelo"
          type="text"
          placeholder="Ej: Gol Trend, Corolla, Sandero"
          value={data.modelo}
          onChange={(e) => onChange({ modelo: e.target.value })}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="anio" className={labelCls}>
          Año del vehículo <span className="text-error">*</span>
        </label>
        <select
          id="anio"
          value={data.anio}
          onChange={(e) => onChange({ anio: e.target.value })}
          className={selectCls}
          required
        >
          <option value="" disabled>
            Seleccioná el año
          </option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!valid}
        className={[
          "w-full h-12 rounded-sm",
          "font-sans font-semibold text-[15px]",
          "inline-flex items-center justify-center gap-2",
          "transition-colors duration-120",
          valid
            ? "bg-primary-700 text-white hover:bg-primary-600 active:bg-primary-800"
            : "bg-neutral-200 text-neutral-400 cursor-not-allowed",
        ].join(" ")}
      >
        Continuar
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = data.cp.length === 4;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="cp" className={labelCls}>
          Código postal <span className="text-error">*</span>
        </label>
        <input
          id="cp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          placeholder="Ej: 1425"
          value={data.cp}
          onChange={(e) => onChange({ cp: e.target.value.replace(/\D/g, "") })}
          className={inputCls}
          required
        />
        <p className="font-mono text-[11px] text-neutral-400 mt-1.5">
          La zona afecta las coberturas disponibles y condiciones.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-4 rounded-sm border border-neutral-300 font-sans font-medium text-[14px] text-neutral-700 hover:border-neutral-400 transition-colors duration-120 inline-flex items-center gap-2 shrink-0"
        >
          <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
          Atrás
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!valid}
          className={[
            "flex-1 h-12 rounded-sm",
            "font-sans font-semibold text-[15px]",
            "inline-flex items-center justify-center gap-2",
            "transition-colors duration-120",
            valid
              ? "bg-primary-700 text-white hover:bg-primary-600 active:bg-primary-800"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed",
          ].join(" ")}
        >
          Continuar
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Step3({
  data,
  onChange,
  onSubmit,
  onBack,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const valid = data.cobertura && data.email;

  return (
    <div className="flex flex-col gap-6">
      {/* Coverage selector */}
      <div>
        <p className={labelCls}>
          Tipo de cobertura preferida <span className="text-error">*</span>
        </p>
        <div className="flex flex-col gap-3 mt-1">
          {COBERTURAS.map(
            ({ slug, name, description, icon: Icon, badge, badgeCls }) => {
              const selected = data.cobertura === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onChange({ cobertura: slug })}
                  className={[
                    "flex items-center gap-4 p-4 rounded-sm border text-left",
                    "transition-colors duration-120",
                    selected
                      ? "border-primary-700 bg-primary-50"
                      : "border-neutral-200 bg-white hover:border-neutral-300",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "w-9 h-9 rounded-md flex items-center justify-center shrink-0",
                      selected ? "bg-primary-100" : "bg-neutral-100",
                    ].join(" ")}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.75}
                      className={
                        selected ? "text-primary-700" : "text-neutral-500"
                      }
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-semibold text-[14px] text-neutral-900">
                        {name}
                      </span>
                      {badge && (
                        <span
                          className={`font-mono text-[10px] tracking-[0.06em] uppercase px-2 py-0.5 rounded-full ${badgeCls}`}
                        >
                          {badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[12.5px] text-neutral-500 mt-0.5 leading-snug">
                      {description}
                    </p>
                  </div>
                  <div
                    className={[
                      "w-4 h-4 rounded-full border-2 shrink-0",
                      selected
                        ? "border-primary-700 bg-primary-700"
                        : "border-neutral-300 bg-white",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Contact info */}
      <div>
        <label htmlFor="email" className={labelCls}>
          Email <span className="text-error">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={inputCls}
          required
        />
      </div>

      <div>
        <label htmlFor="telefono" className={labelCls}>
          Teléfono{" "}
          <span className="text-neutral-400 font-normal">(opcional)</span>
        </label>
        <input
          id="telefono"
          type="tel"
          placeholder="Ej: 11 1234-5678"
          value={data.telefono}
          onChange={(e) => onChange({ telefono: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-4 rounded-sm border border-neutral-300 font-sans font-medium text-[14px] text-neutral-700 hover:border-neutral-400 transition-colors duration-120 inline-flex items-center gap-2 shrink-0"
        >
          <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
          Atrás
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!valid}
          className={[
            "flex-1 h-12 rounded-sm",
            "font-sans font-semibold text-[15px]",
            "inline-flex items-center justify-center gap-2",
            "transition-colors duration-120",
            valid
              ? "bg-accent-500 text-secondary-700 hover:bg-accent-600 active:bg-accent-700"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed",
          ].join(" ")}
        >
          Ver cotizaciones →
        </button>
      </div>
    </div>
  );
}

function DoneScreen({ data }: { data: FormData }) {
  return (
    <div className="text-center py-8 flex flex-col items-center gap-5">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
        <CircleCheck
          size={32}
          strokeWidth={1.75}
          className="text-primary-700"
          aria-hidden="true"
        />
      </div>
      <div>
        <h2 className="font-serif text-[28px] leading-[1.1] text-neutral-900">
          ¡Listo! Estamos procesando tu cotización.
        </h2>
        <p className="font-sans text-[16px] text-neutral-600 mt-3 max-w-[38ch] mx-auto leading-[1.6]">
          En breve vas a recibir las mejores opciones de{" "}
          <strong className="font-semibold text-neutral-900">
            {data.marca} {data.anio}
          </strong>{" "}
          en tu email.
        </p>
      </div>
      <div className="bg-neutral-50 border border-neutral-200 rounded-sm px-5 py-4 text-left w-full max-w-sm">
        <p className="font-mono text-[10.5px] tracking-widest uppercase text-neutral-400 mb-2">
          Resumen de tu consulta
        </p>
        <dl className="flex flex-col gap-1.5">
          {[
            [
              "Vehículo",
              `${data.marca}${data.modelo ? ` ${data.modelo}` : ""} ${data.anio}`,
            ],
            [
              "Cobertura",
              COBERTURAS.find((c) => c.slug === data.cobertura)?.name ??
                data.cobertura,
            ],
            ["Email", data.email],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2 font-sans text-[13px]">
              <dt className="text-neutral-500 shrink-0 w-20">{k}</dt>
              <dd className="text-neutral-900 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ── Progress bar ───────────────────────────────────────────────────── */

function ProgressBar({ step }: { step: Step }) {
  if (step === "done") return null;
  const pct = { 1: 33, 2: 66, 3: 100 }[step];
  const labels = { 1: "Tu vehículo", 2: "Tus datos", 3: "Cobertura" };
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-500">
          Paso {step} de 3
        </span>
        <span className="font-mono text-[11px] tracking-widest uppercase text-primary-600">
          {labels[step]}
        </span>
      </div>
      <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-700 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */

export function CotizadorFlow({
  initialData,
}: {
  initialData?: Partial<FormData>;
}) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    marca: "",
    modelo: "",
    anio: "",
    cp: "",
    cobertura: "",
    email: "",
    telefono: "",
    ...initialData,
  });

  const patch = (p: Partial<FormData>) => setForm((f) => ({ ...f, ...p }));

  return (
    <div className="w-full max-w-140 mx-auto px-6 py-12 flex flex-col">
      {/* Reassurance header */}
      {step !== "done" && (
        <div className="text-center mb-10">
          <h1 className="sr-only">
            Cotizador de seguros de auto — Ramsar Seguros
          </h1>
          <h2 className="font-serif text-[32px] md:text-[36px] leading-[1.1] tracking-[-0.015em] text-neutral-900 max-w-[18ch] mx-auto">
            Vamos a buscarte la mejor cobertura.
          </h2>
          {/* <p className="font-sans text-[16px] text-neutral-600 mt-3 max-w-[44ch] mx-auto">
            Te toma menos de 2 minutos. Sin cargos. Sin tarjeta de crédito.
          </p> */}
        </div>
      )}

      {/* Form card */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-elevation-2 p-6 md:p-8">
        <ProgressBar step={step} />

        {step === 1 && (
          <Step1 data={form} onChange={patch} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2
            data={form}
            onChange={patch}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3
            data={form}
            onChange={patch}
            onSubmit={() => setStep("done")}
            onBack={() => setStep(2)}
          />
        )}
        {step === "done" && <DoneScreen data={form} />}
      </div>

      {/* Trust badges */}
      {step !== "done" && (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-5">
          {TRUST_BADGES.map(({ Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 font-sans font-medium text-[12px] text-neutral-500"
            >
              <Icon
                size={14}
                strokeWidth={1.75}
                className="text-primary-600"
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
