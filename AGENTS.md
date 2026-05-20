<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Agents

## content-architect
Designs content structure and Strapi schemas.
- Models content types: Articulo, Aseguradora, MarcaVehiculo, Modelo, LandingPage
- Defines fields needed for SEO (metaTitle, metaDescription, ogImage, canonicalUrl)
- Uses MCP Strapi tools to create/update content types
- Output: schema definitions, field mappings

## seo-builder
Builds and maintains SEO infrastructure.
- Implements generateMetadata() per route
- Creates JSON-LD schemas per page type
- Generates sitemap.ts from Strapi content via MCP
- Maintains /public/llms.txt
- Validates Core Web Vitals requirements (LCP, CLS, INP targets)

## page-builder
Implements Next.js pages and components.
- Fetches content from Strapi via MCP tools
- Uses generateStaticParams() for [marca]/[modelo] routes
- Applies ISR revalidation strategy per content type
- No client components unless strictly necessary

## cotizador-agent
Handles the insurance quote flow.
- Manages the /seguros-de-auto/cotizar route
- Can use Server Actions or API Routes
- Integrates with external insurance APIs if needed

## content-ops
Manages content creation and updates via Strapi MCP.
- Creates/updates Articulos, Aseguradoras, Marcas and Modelos
- Validates SEO fields are complete before publishing
- Triggers ISR revalidation after publishing