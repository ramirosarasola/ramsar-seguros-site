@AGENTS.md

## Skills

@.agents/skills/nextjs-seo/SKILL.md

## shadcn/ui

Use the shadcn/ui MCP for all component installation — never copy/paste component code manually.

Before implementing any UI component:
1. Check if a shadcn/ui equivalent exists via the MCP
2. Install it using the MCP CLI tool
3. Extend/customize the installed component with design tokens — never modify the base component directly, create a wrapper instead

Workflow:
- Install → `shadcn add <component>`
- Wrap → `components/ui/<component>.tsx` stays untouched
- Extend → create `components/<feature>/<Component>.tsx` that imports from `components/ui/`

## Design

@.agents/design/styles.css
@.agents/design/components.css
@.agents/design/wireframes.css
@.agents/design/Ramsar Seguros - Brand Identity & Design Tokens.html
@.agents/design/components/
@.agents/design/Ramsar Seguros - HomePage Wireframes.html

Always use design tokens from the files above — never hardcode colors, spacing, or typography.
Use shadcn/ui as the component base, extend with design system tokens via tailwind.config.ts.

---

# Ramsar Seguros — Next.js 16

Insurance comparison platform targeting #1 ranking for "seguros de auto Argentina".

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Strapi CMS (headless, via MCP)
- Vercel (deploy + CDN)

## Project Structure

app/
seguros-de-auto/
page.tsx → landing principal
cotizar/page.tsx
[marca]/page.tsx
[marca]/[modelo]/page.tsx
aseguradoras/[nombre]/page.tsx
blog/[categoria]/[slug]/page.tsx
sitemap.ts
robots.ts
components/
ui/ → shadcn components
seo/ → JsonLd, MetaTags
cotizador/
lib/
strapi.ts → Strapi client (fetch wrapper)
metadata.ts → generateMetadata helpers

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`

## Next.js Principles

Read `node_modules/next/dist/docs/` before implementing any feature.

### Components

- Server Components by default — `'use client'` only for interactivity (forms, useState, useEffect)
- Use `<Suspense>` with meaningful fallbacks for every async component
- Colocate `loading.tsx` and `error.tsx` per route segment
- No barrel exports (index.ts re-exports) — kills tree shaking
- Dynamic imports (`next/dynamic`) for heavy client components
- Push `'use client'` down to leaf components, never wrap large trees

### Caching

- Use `fetch` with explicit `next: { revalidate }` — never leave it implicit
- Static pages: `export const dynamic = 'force-static'`
- Dynamic but cacheable: `export const revalidate = 3600`
- Personalized/real-time: `export const dynamic = 'force-dynamic'`
- Use `unstable_cache` for expensive Strapi calls shared across requests

### Images

- Always `next/image` — never `<img>`
- Explicit `width` and `height` on every image (CLS = 0)
- `priority` on LCP image (hero, above-the-fold)
- Use `sizes` prop for responsive images

### Fonts

- Always `next/font` — never load fonts from external URLs
- Define fonts in `app/layout.tsx`, pass as CSS variables to Tailwind

### Strapi

- Consume via MCP tools — never hardcode fetch URLs
- ISR via `next: { revalidate }` in every Strapi fetch call
- Always `populate=*` or explicit populate for relations and media

## SEO Requirements

- `generateMetadata()` on every route — never static metadata object
- JSON-LD via `<JsonLd />` component per page (colocated in each route)
- Schema types: InsuranceAgency (home), Article (blog), FAQPage donde aplique
- `app/sitemap.ts` and `app/robots.ts` — dynamic, never static files
- Canonical URL on every page via `metadata.alternates.canonical`
- OG image via `app/opengraph-image.tsx` per route segment
- `/public/llms.txt` for AEO

## Core Web Vitals Targets

- LCP < 1.2s
- CLS = 0
- INP < 100ms

## Env Vars

- STRAPI_URL
- STRAPI_API_TOKEN
- NEXT_PUBLIC_SITE_URL
