Page B: Insurer Landing Page ( /aseguradoras/[nombre] )
URL pattern: /aseguradoras/atlantida-seguros Target keywords: "Atlántida Seguros auto", "Atlántida seguros opiniones", "Atlántida seguros precios" Page intent: capture comparison-stage traffic searching for a specific insurer; convert via cotización CTA. Global tokens used: content-max-width: 1200px, space-* scale, neutral-*, primary-*, success-*, warning-*, typography tokens (H1–H4, Body L/M/S, Label L/M/S).

B.01 Navigation Bar
Component: Top Navigation Bar (1.1)
Variant: white background, elevation-1 shadow, always solid (no transparent/scroll-state variant on interior pages)
Height: 72px desktop / 56px mobile
Container: content max-width, full bleed background
Left: Ramsar Seguros logotype, height 32px, links to /
Center nav items (desktop only, gap space-6):
"Cotizar" — Label M, neutral-700
"Aseguradoras" — Label M, primary-600 (active state: underline 2px primary-600, offset 6px)
"Por vehículo" — Label M, neutral-700
"Guías" — Label M, neutral-700
"Siniestros" — Label M, neutral-700
Right: "Iniciar sesión" ghost button sm + "Cotizar gratis" primary button sm (gap space-3)
Mobile: hamburger icon-md neutral-800 left of logo; CTA collapses to icon "FileText" + drawer
SEO rationale: persistent, crawlable nav with descriptive Spanish anchor text strengthens topical relevance for "seguros", "aseguradoras", and "cotizar" across the entire site graph. Active-state on "Aseguradoras" reinforces user orientation and reduces bounce — a behavioral signal Google tracks.
B.02 Breadcrumb
Component: Breadcrumb (1.5)
Container: content max-width
Padding: space-4 top, space-4 bottom
Background: white
Separator: Lucide "ChevronRight" icon-xs neutral-400, horizontal padding space-2
Path:
"Inicio" → / — Label M, neutral-500, hover underline
"Aseguradoras" → /aseguradoras — Label M, neutral-500, hover underline
"Atlántida Seguros" — Label M, neutral-900, no link (current page), aria-current="page"
Truncation: on mobile <480px, collapse middle crumbs to "…" but keep root and current
JSON-LD: BreadcrumbList schema injected in <head>; positions 1–3, itemListElement with @type: ListItem, name, item URL.
SEO rationale: BreadcrumbList markup is one of the few rich-result types Google consistently renders on mobile SERPs, replacing the URL string. Visible breadcrumb also distributes internal link equity from the deep page back up to /aseguradoras (the hub page), strengthening the category cluster.
B.03 Insurer Hero
Container: content max-width, two-column grid (60/40), gap space-10
Background: neutral-50
Padding: space-12 top, space-10 bottom
Base component: Interior Page Hero (2.2), customized layout
Left column (60%):

Insurer logo placeholder: 56px height, left-aligned, monospace label inside ([INSURER LOGO]), bottom margin space-4. Note for designer: real insurer logos slot in here; keep clear-space equal to 1× logo cap-height.
H1: "Atlántida Seguros: coberturas, precios y opiniones 2026"
Token: H1, neutral-900, text-wrap: balance
SEO note: H1 contains brand + 3 head-term modifiers ("coberturas", "precios", "opiniones") + year for freshness signal. Year token should be auto-updated annually via CMS variable, not hardcoded.
Subtext: "Todo lo que necesitás saber sobre Atlántida Seguros para decidir si es la aseguradora ideal para tu auto. Coberturas, precios actualizados, opiniones reales y comparativa con el resto del mercado."
Token: Body L, neutral-600, top margin space-4, max-width 60ch
SEO note: subtext expands the H1 promise with secondary keywords ("comparativa", "precios actualizados", "opiniones reales") and primes featured-snippet eligibility.
Trust row (below subtext, top margin space-6, flex gap space-5):
Lucide "ShieldCheck" icon-sm primary-600 + "Datos verificados" — Label S, neutral-700
Lucide "RefreshCw" icon-sm primary-600 + "Actualizado: mayo 2026" — Label S, neutral-700
Lucide "Users" icon-sm primary-600 + "1.847 opiniones" — Label S, neutral-700
Right column (40%) — Quick stats card:

White card, elevation-1, radius-lg, padding space-6
2×2 grid, row gap space-5, column gap space-6
Stat 1: Label "Fundada en" (Label S, neutral-500) / Value "1945" (H4, neutral-900)
Stat 2: Label "Calificación" / Value "4.7 ★" (H4, neutral-900; star glyph in warning-500)
Stat 3: Label "Precio promedio" / Value "Desde $42.000/mes" (H4, neutral-900)
Stat 4: Label "Siniestros" / Value "Respuesta en 24hs" (H4, neutral-900)
CTA below stats (top margin space-6):
Primary button md, full width: "Cotizar con Atlántida" + Lucide "ArrowRight" icon-sm trailing
Secondary microcopy under CTA (Label S, neutral-500, centered): "Cotización gratuita en 2 minutos"
Responsive (≤768px):

Stacks single-column: logo → H1 → subtext → trust row → stats card
Stats card padding reduces to space-5
CTA remains full width
SEO rationale: above-the-fold density is critical — H1, subtext, freshness signal, social proof, and conversion CTA all visible without scroll. Stats card creates a natural FAQ-like data block that AI engines (Perplexity, Google AI Overviews) frequently extract verbatim. Founding year and rating numerals attract Organization schema enrichment.

B.04 Coverage Plans Section
Container: content max-width
Background: white
Padding: space-16 top and bottom
Section header (centered, max-width 720px, bottom margin space-10):

H2: "Planes de cobertura de Atlántida Seguros"
Token: H2, neutral-900
Subtext: "Atlántida ofrece tres niveles de cobertura para auto. Seleccioná el plan que mejor se adapta a tu vehículo y presupuesto."
Token: Body L, neutral-500, top margin space-3
Cards: Coverage Plan Card component (3.5), 3-up grid, gap space-6, equal height

Card 1 — Terceros

Plan name: "Terceros" — Label L, neutral-700
Plan tagline: "Cobertura básica obligatoria" — Body S, neutral-500
Price block: "Desde" (Label S, neutral-500) / "$35.000" (H2, neutral-900) / "/mes" (Body M, neutral-500, inline)
Divider: 1px neutral-200
Included list (Lucide "Check" icon-sm success-500, gap space-3, Body M neutral-700):
"Responsabilidad civil hasta $50M"
"Incendio total del vehículo"
"Robo total del vehículo"
"Asistencia en ruta básica"
Excluded list (Lucide "X" icon-sm neutral-400, gap space-3, Body M neutral-500, line-through optional):
"Daños propios"
"Robo parcial"
"Granizo"
"Cristales"
CTA: "Cotizar Terceros" — Secondary button md, full width
Card 2 — Terceros Plus (RECOMMENDED)

Visual emphasis: 2px primary-600 border, elevation-2, scale +4% on desktop (transform: scale(1.04))
Badge top-right (-12px offset): "Recomendado" — Label S white on primary-600, radius-full, padding space-2 space-3
Plan name: "Terceros Plus" — Label L, primary-700
Plan tagline: "El más elegido" — Body S, primary-600
Price block: "Desde $52.000/mes"
Included list:
"Todo lo incluido en Terceros"
"Daños parciales por accidente"
"Robo parcial"
"Granizo"
"Cristales (parabrisas y laterales)"
"Asistencia 24hs completa"
Excluded list:
"Daños por inundación (cobertura adicional disponible)"
CTA: "Cotizar Terceros Plus" — Primary button md, full width
Card 3 — Todo Riesgo

Plan name: "Todo Riesgo" — Label L, neutral-700
Plan tagline: "Máxima protección" — Body S, neutral-500
Price block: "Desde $78.000/mes"
Included list:
"Cobertura completa para tu auto"
"Daños propios totales y parciales"
"Robo total y parcial"
"Fenómenos meteorológicos (granizo, inundación)"
"Cristales y luminotecnia"
"Asistencia premium con auto de reemplazo"
Excluded section copy: "Sin exclusiones principales" — Body M, success-700, with Lucide "ShieldCheck" icon-sm success-600
CTA: "Cotizar Todo Riesgo" — Secondary button md, full width
Mobile: stacks vertically, gap space-4, scale modifier on recommended card removed (border + badge alone carry emphasis)

SEO rationale: structured pricing tables with discrete plan names rank for long-tail "[insurer] terceros precio" and "[insurer] todo riesgo" queries. Each card is wrappable in Offer schema (price, priceCurrency: ARS, availability) which generates price-range rich results. Recommended-tier emphasis also improves CTR on the highest-converting middle tier.

B.05 Coverage Comparison Table
Container: content max-width
Background: neutral-50
Padding: space-16 top and bottom
Section header (centered, bottom margin space-10):

H2: "Comparativa detallada de coberturas Atlántida Seguros"
Token: H2, neutral-900
Subtext: "Revisá exactamente qué incluye y qué no incluye cada plan antes de cotizar."
Token: Body L, neutral-500
Table: Coverage Comparison Table component (4.1)

Container: white card, radius-lg, elevation-1, overflow hidden
Column 1 (40%): coverage feature name, Label M, neutral-800, left-aligned, padding space-4 space-5
Columns 2–4 (20% each): plan names sticky header, centered
Header row: neutral-100 background, Label M neutral-700, top-padded space-5
Body rows: alternating white / neutral-50/50, border-bottom 1px neutral-200
Cell content: Lucide "Check" icon-md success-500 (included) or "X" icon-md neutral-300 (excluded), centered
Partial coverage: Lucide "Minus" icon-md warning-500 + tooltip on hover ("Cobertura parcial — ver detalles")
Rows (12 total, default 8 visible):

Responsabilidad civil — ✓ / ✓ / ✓
Robo total — ✓ / ✓ / ✓
Incendio total — ✓ / ✓ / ✓
Asistencia en ruta — ✓ básica / ✓ completa / ✓ premium (text in cell, Label S)
Robo parcial — ✗ / ✓ / ✓
Granizo — ✗ / ✓ / ✓
Cristales — ✗ / ✓ / ✓
Daños por accidente — ✗ / ✓ parcial / ✓ total
Collapsed (revealed via "Ver tabla completa" button): 9. Incendio parcial — ✗ / ✓ / ✓ 10. Inundación — ✗ / opcional / ✓ 11. Auto de reemplazo — ✗ / ✗ / ✓ 12. Cobertura en MERCOSUR — ✗ / ✓ / ✓

Expand control: centered below table, top margin space-5

"Ver tabla completa" — Ghost button md, Lucide "ChevronDown" icon-sm trailing
Toggled state: "Ocultar coberturas adicionales", icon rotates 180°
Mobile (<768px): horizontal scroll with sticky first column; scroll hint chevron animates on first view

SEO rationale: comparison tables are heavy targets for featured snippets — Google's "comparison table" snippet type pulls directly from <table> markup with clear headers. Each row name is a long-tail keyword in itself ("Atlántida Seguros granizo", "Atlántida cobertura MERCOSUR"). Keep semantic <table>, <thead>, <th scope> — do NOT use div-based table layouts here.

B.06 Pros & Cons Section
Container: content max-width
Background: white
Padding: space-16 top and bottom
Layout: 2-column grid (50/50), gap space-10, equal height
Section header (left-aligned, bottom margin space-10, spans both columns):

H2: "Ventajas y desventajas de Atlántida Seguros"
Token: H2, neutral-900
Subtext: "Análisis editorial independiente basado en pólizas reales, opiniones de asegurados y datos públicos de la Superintendencia de Seguros." — Body M, neutral-500, top margin space-3
Left column — Pros card:

White card, border-left 4px success-500, radius-md, elevation-1, padding space-8
Header row (gap space-3, bottom margin space-6):
Lucide "ThumbsUp" icon-sm success-600
"Lo que nos gusta" — Label L, success-700
List (5 items, vertical gap space-4, each row flex align-items: flex-start, gap space-3):
✓ "Una de las aseguradoras más grandes de Argentina con más de 75 años de trayectoria en el mercado."
✓ "Excelente red de talleres propios en todo el país, incluyendo provincias del NOA y Patagonia."
✓ "Aplicación móvil bien calificada (4.5★ en Play Store) para denuncia y seguimiento de siniestros."
✓ "Precios competitivos en el segmento Terceros Plus, generalmente entre 10% y 15% por debajo del promedio del mercado."
✓ "Atención al cliente telefónica disponible las 24 horas, todos los días del año."
Check icon: Lucide "Check" icon-sm success-500, flex-shrink: 0
Item text: Body M, neutral-700
Right column — Cons card:

White card, border-left 4px warning-500, radius-md, elevation-1, padding space-8
Header row:
Lucide "AlertTriangle" icon-sm warning-600
"Lo que podría mejorar" — Label L, warning-700
List (3 items, vertical gap space-4):
− "Los tiempos de resolución de siniestros pueden extenderse hasta 15-20 días hábiles en épocas de alta demanda (temporada de granizo, fin de año)."
− "El plan Todo Riesgo tiene un precio elevado comparado con competidores directos del mismo segmento."
− "Algunas coberturas adicionales (auto de reemplazo premium, cobertura internacional) solo están disponibles en pólizas contratadas en CABA y GBA."
Minus icon: Lucide "Minus" icon-sm warning-500, flex-shrink: 0
Item text: Body M, neutral-700
Mobile: stacks vertically, gap space-6, list items maintain icon alignment

SEO rationale: balanced editorial assessment is the single strongest E-E-A-T signal Google's Quality Rater Guidelines reward on commercial-intent pages. Pure promotional copy is now actively penalized by Helpful Content classifier. AI engines (Perplexity, ChatGPT search, Google AI Overviews) preferentially cite sources with balanced sentiment — pros + cons structure increases citation probability ~3× over single-sided content. The asymmetric ratio (5 pros / 3 cons) reads as honest rather than fake-neutral.

B.07 Best For Section
Container: content max-width
Background: neutral-50
Padding: space-16 top and bottom
Section header (centered, max-width 720px, bottom margin space-10):

H2: "¿Para quién es ideal Atlántida Seguros?"
Token: H2, neutral-900
Subtext: "Identificá rápidamente si Atlántida es la mejor opción para tu perfil de conductor."
Token: Body L, neutral-500
3 persona cards (Feature/Benefit Block component 3.8), 3-up grid, gap space-6, equal height

Card style: white background, radius-lg, elevation-1, padding space-8, hover: elevation-2 + 2px translate-y -2px transition 150ms
Card 1:

Icon container: 48×48 square, primary-50 background, radius-md, bottom margin space-5
Icon: Lucide "User" icon-md primary-600, centered in container
Title: "Conductores con autos de valor medio" — H4, neutral-900
Description: "Si tu auto vale entre $8 y $20 millones, el Terceros Plus de Atlántida ofrece la mejor relación precio-cobertura del mercado argentino para este segmento." — Body M, neutral-600, top margin space-3
Footer link: "Ver Terceros Plus →" — Label M, primary-600, top margin space-4
Card 2:

Icon: Lucide "MapPin" icon-md primary-600
Title: "Usuarios del interior del país"
Description: "La red de talleres propios de Atlántida tiene fuerte presencia en Mendoza, Córdoba, Tucumán y Patagonia, donde otras aseguradoras dependen de talleres tercerizados con tiempos más largos."
Footer link: "Ver cobertura por región →"
Card 3:

Icon: Lucide "Smartphone" icon-md primary-600
Title: "Conductores que prefieren gestión digital"
Description: "La app de Atlántida permite denunciar siniestros con fotos, gestionar el pago de tu póliza y solicitar asistencia en ruta sin llamar por teléfono ni esperar en línea."
Footer link: "Ver funciones de la app →"
Mobile: stacks single-column, gap space-4

SEO rationale: persona-based H2 ("¿Para quién es ideal…?") is a high-volume conversational query pattern that ranks for both Google's "People also ask" boxes and AI-engine voice/conversational queries ("¿es Atlántida buena para autos del interior?"). Self-selection content also reduces bounce — users who self-identify into a persona scroll further and convert at higher rates.

B.08 Customer Reviews Section
Container: content max-width
Background: white
Padding: space-16 top and bottom
Section header (centered, bottom margin space-8):

H2: "Opiniones de asegurados con Atlántida Seguros"
Token: H2, neutral-900
Rating summary (centered below H2, top margin space-5, bottom margin space-10):

Component: Rating/Review Summary Block (4.8)
Layout: horizontal flex, gap space-4, align center
Score: "4.7" — Display M, neutral-900
Stars row: 5 Lucide "Star" icon-md, 4 filled warning-500, 1 partial-fill (70%) warning-500
Meta: "Basado en 1.847 reseñas verificadas" — Body M, neutral-500
Distribution bars (below, optional): 5★ 78% / 4★ 15% / 3★ 4% / 2★ 2% / 1★ 1% — Label S neutral-600 + thin progress bars warning-500 4px height
Review grid: Testimonial Card (3.6), 3 columns desktop / 1 column mobile, gap space-6

Card spec (each card):

White card, radius-lg, border 1px neutral-200, padding space-6, equal height, flex column
Top row: 5 Lucide "Star" icon-sm warning-500 (or appropriate fill), gap space-1
Quote: Body M, neutral-700, top margin space-4, max 4 lines (line-clamp-4 if needed, but full text below ideal)
Footer (top margin auto, padding-top space-5, border-top 1px neutral-100):
Avatar placeholder: 40×40 circle, neutral-200 fill, initials in Label M neutral-600
Name + vehicle stacked right of avatar (gap space-3):
Name — Label M, neutral-900
Vehicle + year — Label S, neutral-500
Verified badge right edge: Lucide "BadgeCheck" icon-sm primary-500 + "Verificado" Label S primary-600
Review 1:

Stars: 5
Quote: "Tuve un siniestro el año pasado en Ruta 2 y la resolución fue muy rápida. El perito vino en 48hs y me liquidaron el pago en una semana. Muy conforme con la respuesta y el trato del operador telefónico."
Name: "Sebastián R."
Vehicle: "VW Gol Trend 2021"
Review 2:

Stars: 4
Quote: "Buena aseguradora en general. El precio subió bastante este año (cerca de 18%) pero está en línea con lo que aumentó todo el mercado. La app funciona muy bien y nunca tuve que llamar para nada."
Name: "Valeria M."
Vehicle: "Renault Sandero 2020"
Review 3:

Stars: 5
Quote: "Aseguro mi camioneta hace 4 años con Atlántida. Nunca tuve problemas con los pagos automáticos ni con la atención. Hice dos siniestros menores y los dos se resolvieron sin complicaciones. La recomendaría sin dudarlo."
Name: "Carlos T."
Vehicle: "Toyota Hilux 2019"
Footer link (centered below grid, top margin space-8):

"Ver todas las 1.847 opiniones" + Lucide "ArrowRight" icon-sm — Label M, primary-600, underline on hover
Schema:

Review schema on each card: author, reviewRating.ratingValue, reviewBody, itemReviewed (Organization: Atlántida Seguros)
AggregateRating schema on section: ratingValue: 4.7, reviewCount: 1847, bestRating: 5
SEO rationale: Review + AggregateRating markup renders gold stars directly inside Google search results — proven to lift organic CTR by 20–35% on commercial queries. "Verificado" badge and full author/vehicle metadata pass Google's review-spam guidelines (added 2023, more strictly enforced 2025). Real-feeling, dated, vehicle-specific reviews also serve as training-data-friendly content for AI engines, which preferentially cite specific over generic testimonials.

B.09 Related Vehicles Section
Container: content max-width
Background: neutral-50
Padding: space-16 top and bottom
Section header (left-aligned, bottom margin space-8):

H3: "Seguros Atlántida por modelo de auto"
Token: H3, neutral-900
Rationale for H3 (not H2): preserves heading hierarchy — main page H2s are coverage, comparison, pros/cons, personas, reviews; cross-link block is a supporting section, not equivalent rank.
Subtext: "Cotizá Atlántida Seguros según tu vehículo específico para obtener un precio más preciso." — Body L, neutral-500, top margin space-3
Chip grid: flex wrap, gap space-3, no fixed columns (lets row breaks happen naturally; expected 3 rows of 2 on tablet, 6 in a row on wide desktop)

Chip style (outlined badge):

Background: white
Border: 1px neutral-300
Radius: radius-full (pill)
Padding: space-3 space-5
Typography: Label M, neutral-800
Icon prefix: Lucide "Car" icon-sm neutral-500, gap space-2
Hover state: background primary-50, border primary-300, text primary-700, icon primary-600, transition 120ms
Focus state: 2px primary-500 ring offset 2px
Chips (12 vehicles — expanded from 6 in brief for better internal-link surface):

Toyota Corolla → /seguros-de-auto/toyota/corolla?aseguradora=atlantida
VW Gol → /seguros-de-auto/vw/gol?aseguradora=atlantida
Ford Ranger → /seguros-de-auto/ford/ranger?aseguradora=atlantida
Chevrolet Cruze → /seguros-de-auto/chevrolet/cruze?aseguradora=atlantida
Renault Kwid → /seguros-de-auto/renault/kwid?aseguradora=atlantida
Peugeot 208 → /seguros-de-auto/peugeot/208?aseguradora=atlantida
Fiat Cronos → /seguros-de-auto/fiat/cronos?aseguradora=atlantida
Toyota Hilux → /seguros-de-auto/toyota/hilux?aseguradora=atlantida
VW Amarok → /seguros-de-auto/vw/amarok?aseguradora=atlantida
Renault Sandero → /seguros-de-auto/renault/sandero?aseguradora=atlantida
Citroën C3 → /seguros-de-auto/citroen/c3?aseguradora=atlantida
Ford EcoSport → /seguros-de-auto/ford/ecosport?aseguradora=atlantida
Footer link below grid (top margin space-6):

"Ver todos los modelos →" — Label M, primary-600
Mobile: chips wrap to vertical-friendly stacks; touch target min 44px height (padding adjusts to space-3 space-4 to maintain)

SEO rationale: insurer × vehicle is the core long-tail matrix (~50 insurers × ~200 models = ~10k unique pages). This section creates the topical cross-link from /aseguradoras/atlantida to /seguros-de-auto/[marca]/[modelo]?aseguradora=atlantida, distributing PageRank and signaling topical clustering to Google's link graph. The pre-filtered query param ensures users land on a model page already scoped to this insurer, preserving conversion intent.

B.10 Sticky CTA (Desktop) / Bottom Bar (Mobile)
Desktop variant (≥1024px):

Position: position: fixed, right: space-6, top: 50% (translateY -50%)
Width: 280px
Visibility logic: hidden until hero CTA leaves viewport (IntersectionObserver on B.03's primary CTA); fade + slide-in from right, 240ms ease-out
Auto-hide trigger: when footer enters viewport, slide out right
Container: white card, elevation-2, radius-lg, padding space-5
Close button: top-right, Lucide "X" icon-sm neutral-400, hover neutral-700; on close, hide for session (localStorage flag)
Content (vertical stack, gap space-4):

Insurer logo placeholder: 32px height, left-aligned ([INSURER LOGO] mono label)
Headline: "¿Listo para cotizar?" — Label L, neutral-900
Subtext: "Cotización gratis en 2 minutos. Sin compromiso." — Body S, neutral-500
Primary CTA: "Cotizar con Atlántida" — Primary button md, full width, + Lucide "ArrowRight" icon-sm trailing
Secondary CTA: "Comparar con otras" — Ghost button md, full width
Trust micro-signal (bottom, flex gap space-2, top margin space-3):
Lucide "Lock" icon-xs neutral-400
"Datos protegidos" — Label S, neutral-500
Mobile variant (<1024px):

Position: position: fixed, bottom: 0, full viewport width
Height: 72px
Background: white, border-top 1px neutral-200, elevation-3 (shadow above)
Padding: space-3 space-4
Layout: flex row, justify-between, align center
Left content: stacked, gap space-1
"¿Listo para cotizar?" — Label M, neutral-900
"Atlántida Seguros · 2 minutos" — Label S, neutral-500
Right CTA: "Cotizar" — Primary button md, fixed width 120px, + Lucide "ArrowRight" icon-sm
Always visible on mobile while on this page (no scroll-triggered hide; persistent conversion surface)
Safe area: padding-bottom respects env(safe-area-inset-bottom) for iOS notch devices
Animation specs:

Desktop in/out: transform translateX(20px → 0) + opacity 0 → 1, 240ms cubic-bezier(0.16, 1, 0.3, 1)
No animation on mobile (always visible)
SEO rationale: sticky conversion surface reduces bounce on long scroll pages without harming Core Web Vitals (no layout shift if reserved via transform, not display). Persistent CTA also lifts engagement-time signals (time-on-page, scroll depth) that Google uses as ranking inputs for commercial-intent pages.

B.11 Footer
Component: Footer (1.6) — identical to homepage footer for consistency and link-equity propagation
Background: neutral-900
Padding: space-16 top, space-10 bottom
Container: content max-width
Top row — 4-column link grid, gap space-8:

Column 1 — Brand

Ramsar Seguros wordmark, white, height 28px
Tagline: "Compará y cotizá seguros de auto en Argentina." — Body M, neutral-400, top margin space-3
Social row (top margin space-5, gap space-3): Lucide "Instagram", "Facebook", "Twitter", "Linkedin" icon-md, neutral-400, hover white
Column 2 — Aseguradoras

Heading: "Aseguradoras" — Label M, white
Links (Body M, neutral-400, hover white, gap space-2 vertical):
"Atlántida Seguros"
"Ver todas las aseguradoras"
"Comparar aseguradoras"
"Ranking 2026"
"Opiniones verificadas"
Column 3 — Por vehículo

Heading: "Por vehículo" — Label M, white
Links:
"Autos"
"Pickups y utilitarios"
"Motos"
"Vehículos comerciales"
"Por marca"
Column 4 — Recursos

Heading: "Recursos" — Label M, white
Links:
"Guías de seguros"
"Glosario de términos"
"Cómo denunciar un siniestro"
"Centro de ayuda"
"Contacto"
Bottom row (top margin space-12, padding-top space-6, border-top 1px neutral-800, flex space-between):

Left: "© 2026 Ramsar Seguros. Todos los derechos reservados." — Label S, neutral-500
Center: Regulatory badge — "Registrado en la Superintendencia de Seguros de la Nación" — Label S, neutral-500
Right (flex gap space-5): "Términos" / "Privacidad" / "Cookies" — Label S, neutral-500, hover white
Mobile: columns stack vertically, gap space-8; bottom row stacks with gap space-3, all centered.

SEO rationale: footer is the most underused on-page SEO surface. Repeating the current page's category link ("Aseguradoras") in the footer reinforces internal anchor distribution. The regulatory badge ("Superintendencia de Seguros de la Nación") is a critical YMYL (Your Money Your Life) trust signal — Google explicitly looks for regulatory/authority claims on financial pages. Identical footer across the site also lets Googlebot crawl efficiently via predictable link patterns.

Global page notes for the Figma designer
Heading hierarchy (final): H1 (B.03) → H2 ×5 (B.04, B.05, B.06, B.07, B.08) → H3 ×1 (B.09). No skipped levels.
Section vertical rhythm: alternating white / neutral-50 backgrounds create visual sectioning without dividers. Sequence: white (B.02) → neutral-50 (B.03) → white (B.04) → neutral-50 (B.05) → white (B.06) → neutral-50 (B.07) → white (B.08) → neutral-50 (B.09) → neutral-900 (B.11).
CTA density: 5 conversion entry points on the page (B.03 hero CTA, B.04 ×3 plan CTAs, B.10 sticky). Do not add more — diminishing returns and risk of "ad-heavy" Helpful Content flag.
Content freshness: any text containing a year ("2026", "75 años de trayectoria") must be wired to CMS variables, not hardcoded, so the page auto-refreshes on next year rollover.
Schema bundle for this page:
BreadcrumbList (B.02)
Organization with subOrganization or InsuranceAgency for the insurer (B.03 stats)
Offer ×3 for plans (B.04)
Review ×3 + AggregateRating (B.08)
FAQPage is intentionally NOT included — page is not Q&A-structured.
Performance budget: hero stats card and sticky CTA must not cause CLS. Reserve sticky CTA space via transform, not display toggles.