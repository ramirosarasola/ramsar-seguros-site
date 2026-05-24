<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Ramsar Seguros. Client-side initialization was set up via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), a reverse proxy was configured in `next.config.ts` to route PostHog requests through `/ingest`, and a server-side client was created in `lib/posthog-server.ts`. Seven events were instrumented across five components, covering the full user acquisition and conversion funnel — from landing on the home page to clicking a plan CTA on an insurer page.

| Event | Description | File |
|---|---|---|
| `cotizador_submitted` | User submits the quote widget on the home page | `components/home/CotizadorWidget.tsx` |
| `insurer_card_clicked` | User clicks on an insurer card from the home page grid | `components/home/AseguradorasGrid.tsx` |
| `insurer_plan_cta_clicked` | User clicks the CTA button on an insurance plan card to start quoting | `components/aseguradoras/CoveragePlansSection.tsx` |
| `sticky_cta_clicked` | User clicks the sticky/floating CTA to quote with a specific insurer | `components/aseguradoras/StickyCta.tsx` |
| `sticky_cta_dismissed` | User dismisses the sticky CTA | `components/aseguradoras/StickyCta.tsx` |
| `vehicle_brand_clicked` | User clicks on a vehicle brand in the brands section | `components/home/VehiclesBrandsSection.tsx` |
| `cta_banner_clicked` | User clicks the main CTA banner at the bottom of the home page | `components/home/CtaBanner.tsx` |

## Next steps

To set up the "Analytics basics" dashboard in PostHog, visit your project and create the following insights:

- **Cotizador conversion funnel** — Funnel: `cotizador_submitted` → `insurer_plan_cta_clicked` → `sticky_cta_clicked`
- **Top insurer cards clicked** — Trends: `insurer_card_clicked` broken down by `insurer_name`
- **Top vehicle brands clicked** — Trends: `vehicle_brand_clicked` broken down by `brand_name`
- **Plan CTA clicks by plan** — Trends: `insurer_plan_cta_clicked` broken down by `plan_name`
- **Sticky CTA dismiss rate** — Trends: `sticky_cta_dismissed` vs `sticky_cta_clicked`

Dashboard link: https://us.posthog.com/project/438642/dashboards

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
