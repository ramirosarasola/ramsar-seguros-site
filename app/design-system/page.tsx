import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AccordionDemo, TooltipDemo } from './_components/interactive-demos'

export const metadata: Metadata = {
  title: 'Design System | Ramsar Seguros',
  robots: { index: false, follow: false },
}

// ── Static token data (mirrors globals.css) ─────────────────────

const primaryScale = [
  { step: '50',  hex: '#ecf4f3', light: true },
  { step: '100', hex: '#cee2df', light: true },
  { step: '200', hex: '#9ec5bf', light: true },
  { step: '300', hex: '#6ea89f', light: true },
  { step: '400', hex: '#418c82', light: false },
  { step: '500', hex: '#1f6f66', light: false },
  { step: '600', hex: '#155952', light: false },
  { step: '700', hex: '#0e433f', light: false },
  { step: '800', hex: '#0a302e', light: false },
  { step: '900', hex: '#061f1e', light: false },
]

const secondaryScale = [
  { step: '100', hex: '#dbdee2', light: true },
  { step: '300', hex: '#7b8590', light: false },
  { step: '500', hex: '#2e3a47', light: false },
  { step: '700', hex: '#0b1f2a', light: false },
  { step: '900', hex: '#061018', light: false },
]

const accentScale = [
  { step: '300', hex: '#f4c98a', light: true },
  { step: '500', hex: '#e8a451', light: true },
  { step: '600', hex: '#d18a37', light: false },
  { step: '700', hex: '#a86a23', light: false },
]

const neutralScale = [
  { step: '0',   hex: '#ffffff', light: true },
  { step: '50',  hex: '#f8f7f4', light: true },
  { step: '100', hex: '#efeee9', light: true },
  { step: '200', hex: '#e2e0d8', light: true },
  { step: '300', hex: '#cac7bc', light: true },
  { step: '400', hex: '#a8a496', light: true },
  { step: '500', hex: '#807c6e', light: false },
  { step: '600', hex: '#5e5b50', light: false },
  { step: '700', hex: '#423f37', light: false },
  { step: '800', hex: '#292723', light: false },
  { step: '900', hex: '#181612', light: false },
  { step: '950', hex: '#0c0b09', light: false },
]

const semanticColors = [
  { name: 'Success', base: '#1f7a4d', light: '#e4f1ea', dark: '#0f4a2c' },
  { name: 'Warning', base: '#c8881e', light: '#fbefd8', dark: '#6e4a0c' },
  { name: 'Error',   base: '#b8341c', light: '#f6e2dd', dark: '#7a1f0f' },
  { name: 'Info',    base: '#2a5f9e', light: '#e1ecf7', dark: '#173a66' },
]

const shadcnTokens = [
  { token: '--background',         hex: '#f8f7f4', label: 'Background',         light: true },
  { token: '--foreground',         hex: '#181612', label: 'Foreground',         light: false },
  { token: '--card',               hex: '#ffffff', label: 'Card',               light: true },
  { token: '--card-foreground',    hex: '#181612', label: 'Card Foreground',    light: false },
  { token: '--primary',            hex: '#0e433f', label: 'Primary',            light: false },
  { token: '--primary-foreground', hex: '#ffffff', label: 'Primary Foreground', light: false },
  { token: '--secondary',          hex: '#efeee9', label: 'Secondary',          light: true },
  { token: '--muted',              hex: '#efeee9', label: 'Muted',              light: true },
  { token: '--muted-foreground',   hex: '#807c6e', label: 'Muted Foreground',   light: false },
  { token: '--accent',             hex: '#e8a451', label: 'Accent',             light: true },
  { token: '--accent-foreground',  hex: '#061018', label: 'Accent Foreground',  light: false },
  { token: '--destructive',        hex: '#b8341c', label: 'Destructive',        light: false },
  { token: '--border',             hex: '#e2e0d8', label: 'Border',             light: true },
  { token: '--ring',               hex: '#0e433f', label: 'Ring / Focus',       light: false },
]

const radiusTokens = [
  { label: 'sm',   value: '6px',    twClass: 'rounded-sm' },
  { label: 'md',   value: '8px',    twClass: 'rounded-md' },
  { label: 'lg',   value: '12px',   twClass: 'rounded-lg' },
  { label: 'xl',   value: '16px',   twClass: 'rounded-xl' },
  { label: '2xl',  value: '24px',   twClass: 'rounded-2xl' },
  { label: '3xl',  value: '32px',   twClass: 'rounded-3xl' },
  { label: 'full', value: '9999px', twClass: 'rounded-full' },
]

const shadows = [
  { label: 'elevation-1', css: '0 1px 0 rgba(15,67,63,.06), 0 1px 2px rgba(15,67,63,.04)',         usage: 'Cards at rest, inputs' },
  { label: 'elevation-2', css: '0 1px 2px rgba(15,67,63,.06), 0 2px 6px rgba(15,67,63,.06)',        usage: 'Dropdowns, popovers' },
  { label: 'elevation-3', css: '0 2px 4px rgba(15,67,63,.06), 0 8px 16px rgba(15,67,63,.08)',       usage: 'Modals, sidesheets' },
  { label: 'elevation-4', css: '0 4px 8px rgba(15,67,63,.06), 0 16px 32px rgba(15,67,63,.12)',      usage: 'Dialogs (important)' },
  { label: 'elevation-5', css: '0 8px 16px rgba(15,67,63,.08), 0 32px 64px rgba(15,67,63,.18)',     usage: 'Floating panels' },
]

const spacingScale = [
  { token: '1',  px: '4px',  w: 4 },
  { token: '2',  px: '8px',  w: 8 },
  { token: '3',  px: '12px', w: 12 },
  { token: '4',  px: '16px', w: 16 },
  { token: '5',  px: '20px', w: 20 },
  { token: '6',  px: '24px', w: 24 },
  { token: '8',  px: '32px', w: 32 },
  { token: '10', px: '40px', w: 40 },
  { token: '12', px: '48px', w: 48 },
  { token: '16', px: '64px', w: 64 },
  { token: '20', px: '80px', w: 80 },
  { token: '24', px: '96px', w: 96 },
]

const typeScale = [
  { label: 'text-xs',   spec: '12px' },
  { label: 'text-sm',   spec: '14px' },
  { label: 'text-base', spec: '16px' },
  { label: 'text-lg',   spec: '18px' },
  { label: 'text-xl',   spec: '20px' },
  { label: 'text-2xl',  spec: '24px' },
  { label: 'text-3xl',  spec: '30px' },
  { label: 'text-4xl',  spec: '36px' },
  { label: 'text-5xl',  spec: '48px' },
  { label: 'text-6xl',  spec: '60px' },
  { label: 'text-7xl',  spec: '72px' },
]

const navSections = [
  'colors', 'tokens', 'typography', 'spacing',
  'radius', 'shadows', 'button', 'badge', 'card',
  'accordion', 'separator', 'tooltip',
]

// ── Sub-components ───────────────────────────────────────────────

function Section({
  id,
  label,
  title,
  description,
  children,
}: {
  id: string
  label: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t border-border pt-16 pb-14 scroll-mt-8">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">{label}</p>
      <h2 className="font-serif text-5xl text-foreground leading-tight mb-3">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-base max-w-2xl leading-relaxed mb-10">{description}</p>
      )}
      {!description && <div className="mb-10" />}
      {children}
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
      {children}
    </p>
  )
}

function ColorStrip({
  name,
  swatches,
}: {
  name: string
  swatches: { step: string; hex: string; light: boolean }[]
}) {
  return (
    <div>
      <SectionLabel>{name}</SectionLabel>
      <div className="flex rounded-xl overflow-hidden border border-border">
        {swatches.map((s) => (
          <div
            key={s.step}
            className="flex-1 flex flex-col justify-end gap-1 p-2 min-h-24"
            style={{ backgroundColor: s.hex }}
          >
            <span
              className="font-mono text-xs font-medium leading-none"
              style={{ color: s.light ? '#181612' : '#ffffff' }}
            >
              {s.step}
            </span>
            <span
              className="font-mono text-xs leading-none opacity-60 hidden sm:block"
              style={{ color: s.light ? '#181612' : '#ffffff' }}
            >
              {s.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6">
            Ramsar Seguros · Design System · v1.0
          </p>
          <h1 className="font-serif text-8xl text-primary leading-none tracking-tight mb-6">
            Design<br />
            <em className="text-accent-600">System</em>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-xl mb-10">
            Tokens de marca, tipografía, espaciado y todos los componentes
            shadcn/ui configurados con la paleta Ramsar.
          </p>
          <nav className="flex flex-wrap gap-2">
            {navSections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-mono text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {id}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">

        {/* ── Colors ── */}
        <Section
          id="colors"
          label="01 · Brand Palette"
          title="Colors"
          description="Tres paletas de marca más neutros cálidos con 2% de sesgo warm. Todos los tokens están definidos en globals.css vía @theme."
        >
          <div className="space-y-8">
            <ColorStrip name="Primary — Marine Teal · core brand" swatches={primaryScale} />
            <ColorStrip name="Secondary — Midnight Navy · footer, deep contrast" swatches={secondaryScale} />
            <ColorStrip name="Accent — Amber · CTAs en fondos oscuros" swatches={accentScale} />
            <ColorStrip name="Neutral — Sand · backgrounds y jerarquía de texto" swatches={neutralScale} />

            <div>
              <SectionLabel>Semantic</SectionLabel>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {semanticColors.map((c) => (
                  <div key={c.name}>
                    <p className="font-mono text-xs text-muted-foreground mb-2">{c.name}</p>
                    <div className="rounded-xl overflow-hidden border border-border">
                      <div className="h-10 flex items-center justify-end px-3" style={{ backgroundColor: c.light }}>
                        <span className="font-mono text-xs" style={{ color: c.base }}>light</span>
                      </div>
                      <div className="h-10 flex items-center justify-end px-3" style={{ backgroundColor: c.base }}>
                        <span className="font-mono text-xs text-white">base</span>
                      </div>
                      <div className="h-10 flex items-center justify-end px-3" style={{ backgroundColor: c.dark }}>
                        <span className="font-mono text-xs text-white">dark</span>
                      </div>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mt-1.5">{c.base}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── shadcn Tokens ── */}
        <Section
          id="tokens"
          label="02 · Semantic Tokens"
          title="shadcn Tokens"
          description="Variables CSS que consumen los componentes shadcn/ui. Mapean la paleta Ramsar. Definidas en :root de globals.css."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shadcnTokens.map((t) => (
              <div key={t.token} className="rounded-xl overflow-hidden border border-border">
                <div
                  className="h-14 flex items-end p-2.5"
                  style={{ backgroundColor: t.hex }}
                >
                  <span
                    className="font-mono text-xs opacity-80 truncate"
                    style={{ color: t.light ? '#181612' : '#ffffff' }}
                  >
                    {t.hex}
                  </span>
                </div>
                <div className="bg-card p-2.5 space-y-0.5">
                  <p className="font-mono text-xs text-primary truncate">{t.token}</p>
                  <p className="text-xs text-muted-foreground">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section
          id="typography"
          label="03 · Type"
          title="Typography"
          description="Tres familias tipográficas cargadas vía next/font. Nunca URLs externas en runtime."
        >
          <div className="space-y-12">
            {/* Font families */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Serif · Heading</p>
                <p className="font-serif text-6xl text-foreground leading-none">Aa</p>
                <div>
                  <p className="font-serif text-xl text-foreground">Instrument Serif</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">font-serif · font-heading</p>
                  <p className="font-serif text-sm text-muted-foreground mt-3 leading-relaxed">
                    Comparamos seguros de auto de las mejores aseguradoras.
                  </p>
                  <p className="font-serif text-sm text-muted-foreground italic mt-1 leading-relaxed">
                    Italic — para énfasis editorial.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Sans · Body</p>
                <p className="font-sans text-6xl text-foreground leading-none font-medium">Aa</p>
                <div>
                  <p className="font-sans text-xl font-medium text-foreground">Geist Sans</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">font-sans</p>
                  <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">
                    Cotizá en 2 minutos sin llamados. Firma digital, 100% online.
                  </p>
                  <p className="font-sans text-sm font-semibold text-foreground mt-1">
                    600 — Semibold para CTAs y labels.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Mono · Code</p>
                <p className="font-mono text-6xl text-foreground leading-none">Aa</p>
                <div>
                  <p className="font-mono text-xl text-foreground">Geist Mono</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">font-mono</p>
                  <p className="font-mono text-sm text-muted-foreground mt-3 leading-relaxed">
                    Labels, tokens, badges, precios.
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-widest">
                    UPPERCASE TRACKING
                  </p>
                </div>
              </div>
            </div>

            {/* Type scale */}
            <div>
              <SectionLabel>Type Scale · font-sans</SectionLabel>
              <div className="divide-y divide-border">
                {typeScale.map((t) => (
                  <div key={t.label} className="flex items-baseline gap-6 py-3">
                    <span className="font-mono text-xs text-muted-foreground w-24 shrink-0">{t.label}</span>
                    <span className={`${t.label} font-sans text-foreground leading-none flex-1 truncate`}>
                      Seguros de Auto Argentina
                    </span>
                    <span className="font-mono text-xs text-muted-foreground shrink-0 hidden sm:block">
                      {t.spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Font weights */}
            <div>
              <SectionLabel>Weights · font-sans</SectionLabel>
              <div className="divide-y divide-border">
                {[
                  { label: 'font-normal',    w: '400' },
                  { label: 'font-medium',    w: '500' },
                  { label: 'font-semibold',  w: '600' },
                  { label: 'font-bold',      w: '700' },
                ].map((fw) => (
                  <div key={fw.label} className="flex items-center gap-6 py-3">
                    <span className="font-mono text-xs text-muted-foreground w-36 shrink-0">{fw.label}</span>
                    <span className={`${fw.label} text-2xl text-foreground flex-1`}>
                      Seguros de Auto
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{fw.w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Spacing ── */}
        <Section
          id="spacing"
          label="04 · Space"
          title="Spacing"
          description="Escala de espaciado de Tailwind. 1 unidad = 4px. Usá siempre clases canónicas — nunca valores arbitrarios cuando existe la clase."
        >
          <div className="space-y-3">
            {spacingScale.map((s) => (
              <div key={s.token} className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground w-8 shrink-0 text-right">
                  {s.token}
                </span>
                <div
                  className="bg-primary-200 rounded h-5 shrink-0 border border-primary-300"
                  style={{ width: s.w }}
                />
                <span className="font-mono text-xs text-muted-foreground">{s.px}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Border Radius ── */}
        <Section
          id="radius"
          label="05 · Radius"
          title="Border Radius"
          description="Base: --radius: 0.5rem (8px). El resto de los tokens escalan desde ahí vía calc()."
        >
          <div className="flex flex-wrap gap-10 items-end">
            {radiusTokens.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-3">
                <div
                  className={`w-20 h-20 bg-primary-100 border-2 border-primary-300 ${r.twClass}`}
                />
                <div className="text-center space-y-0.5">
                  <p className="font-mono text-xs text-foreground font-medium">rounded-{r.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">{r.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Shadows ── */}
        <Section
          id="shadows"
          label="06 · Elevation"
          title="Shadows"
          description="Sombras teñidas con marine rgba(15,67,63,α) — nunca negro puro. Definidas como --shadow-elevation-N en @theme."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {shadows.map((s) => (
              <div key={s.label} className="flex flex-col gap-4">
                <div
                  className="h-28 bg-card rounded-xl border border-border/50"
                  style={{ boxShadow: s.css }}
                />
                <div>
                  <p className="font-mono text-xs text-foreground font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Button ── */}
        <Section
          id="button"
          label="07 · Component"
          title="Button"
          description="Componente base de shadcn/ui con variantes de la paleta Ramsar. Importar siempre desde @/components/ui/button."
        >
          <div className="space-y-10">
            <div>
              <SectionLabel>Variants</SectionLabel>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div>
              <SectionLabel>Sizes</SectionLabel>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <SectionLabel>Icon Sizes</SectionLabel>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="icon-xs" variant="outline" aria-label="icon-xs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /></svg>
                </Button>
                <Button size="icon-sm" variant="outline" aria-label="icon-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /></svg>
                </Button>
                <Button size="icon" variant="outline" aria-label="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /></svg>
                </Button>
                <Button size="icon-lg" variant="outline" aria-label="icon-lg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /></svg>
                </Button>
              </div>
            </div>

            <div>
              <SectionLabel>States</SectionLabel>
              <div className="flex flex-wrap gap-3 items-center">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button aria-invalid="true">Invalid</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Badge ── */}
        <Section
          id="badge"
          label="08 · Component"
          title="Badge"
          description="Labels inline de estado, categoría o etiqueta. Se renderiza como <span>."
        >
          <div className="space-y-6">
            <div>
              <SectionLabel>Variants</SectionLabel>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="ghost">Ghost</Badge>
                <Badge variant="link">Link</Badge>
              </div>
            </div>
            <div>
              <SectionLabel>In context</SectionLabel>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Cobertura total</span>
                  <Badge variant="default">Recomendado</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Terceros completo</span>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Plan básico</span>
                  <Badge variant="outline">Nuevo</Badge>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Card ── */}
        <Section
          id="card"
          label="09 · Component"
          title="Card"
          description="Contenedor principal de contenido. Soporta size default y sm. Compuesto por CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter."
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <SectionLabel>Default</SectionLabel>
              <Card>
                <CardHeader>
                  <CardTitle>Seguros de Auto</CardTitle>
                  <CardDescription>
                    Comparamos las 14 mejores aseguradoras de Argentina.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Protegé tu vehículo con la cobertura más completa al mejor precio del mercado.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Cotizar ahora</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-3">
              <SectionLabel>Small</SectionLabel>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>Plan Básico</CardTitle>
                  <CardDescription>Cobertura contra terceros.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Protección esencial para circular tranquilo.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="xs" variant="outline">Ver detalle</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-3">
              <SectionLabel>With Action</SectionLabel>
              <Card>
                <CardHeader>
                  <CardTitle>Zurich Argentina</CardTitle>
                  <CardAction>
                    <Badge variant="default">Destacada</Badge>
                  </CardAction>
                  <CardDescription>
                    Una de las aseguradoras más confiables del país.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Más de 30 años de presencia en Argentina con amplia red de talleres.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">Ver planes</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Section>

        {/* ── Accordion ── */}
        <Section
          id="accordion"
          label="10 · Component"
          title="Accordion"
          description='Componente "use client" basado en Radix UI. Usado en FaqSection. Soporta type="single" | "multiple" y collapsible.'
        >
          <div className="max-w-2xl">
            <AccordionDemo />
          </div>
        </Section>

        {/* ── Separator ── */}
        <Section
          id="separator"
          label="11 · Component"
          title="Separator"
          description="Divisor visual semántico. orientation: horizontal (default) | vertical."
        >
          <div className="space-y-10 max-w-xl">
            <div>
              <SectionLabel>Horizontal</SectionLabel>
              <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
                <p className="text-sm text-foreground">Sección superior</p>
                <Separator />
                <p className="text-sm text-foreground">Sección inferior</p>
              </div>
            </div>
            <div>
              <SectionLabel>Vertical</SectionLabel>
              <div className="flex items-center gap-4 h-8 bg-card px-6 rounded-xl border border-border">
                <span className="text-sm text-foreground">Inicio</span>
                <Separator orientation="vertical" />
                <span className="text-sm text-foreground">Seguros de Auto</span>
                <Separator orientation="vertical" />
                <span className="text-sm text-foreground">Blog</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Tooltip ── */}
        <Section
          id="tooltip"
          label="12 · Component"
          title="Tooltip"
          description="TooltipProvider ya está en el Providers global (delayDuration: 300ms). Solo necesitás Tooltip + TooltipTrigger + TooltipContent."
        >
          <TooltipDemo />

          <div className="mt-8 bg-card rounded-xl border border-border p-5 max-w-xl">
            <SectionLabel>Usage</SectionLabel>
            <pre className="font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap">
{`import { Tooltip, TooltipContent, TooltipTrigger }
  from '@/components/ui/tooltip'

<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Texto del tooltip</p>
  </TooltipContent>
</Tooltip>`}
            </pre>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-10 bg-card">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xl text-primary">Ramsar Seguros</p>
          <p className="font-mono text-xs text-muted-foreground">
            Design System · v1.0 · No indexado por bots
          </p>
        </div>
      </footer>
    </div>
  )
}
