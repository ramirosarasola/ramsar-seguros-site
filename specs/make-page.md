Page C: Vehicle Make Landing Page ( /seguros-de-auto/[marca] )

URL pattern: /seguros-de-auto/toyota
Target keywords: "seguro Toyota Argentina", "cotizar seguro Toyota", "seguros para autos Toyota"
Page intent: capturar tráfico de búsqueda por marca de vehículo; convertir vía cotización y derivar a páginas de modelos específicos (/seguros-de-auto/toyota/[modelo]).
Global tokens usados: content-max-width: 1200px, space-_ scale, neutral-_, primary-_, success-_, warning-\*, typography tokens (H1–H4, Body L/M/S, Label L/M/S).

---

C.01 Navigation Bar
Component: Top Navigation Bar (1.1)
Variante: idéntica a B.01 excepto que el ítem activo cambia.
Active state: "Por vehículo" — Label M, primary-600, underline 2px primary-600, offset 6px
(resto de especificaciones idénticas a B.01)
SEO rationale: coherencia de navegación entre clústeres; "Por vehículo" activo refuerza la arquitectura de silo ante Googlebot.

---

C.02 Breadcrumb
Component: Breadcrumb (1.5)
Padding: space-4 top, space-4 bottom
Background: white
Separator: Lucide "ChevronRight" icon-xs neutral-400, horizontal padding space-2
Path:
"Inicio" → / — Label M, neutral-500, hover underline
"Seguros de auto" → /seguros-de-auto — Label M, neutral-500, hover underline
"Toyota" — Label M, neutral-900, no link (current), aria-current="page"
Truncation: en mobile <480px colapsar crumb del medio a "…"
JSON-LD: BreadcrumbList schema, 3 posiciones, idéntico patrón a B.02.
SEO rationale: distribuye link equity desde la página de marca hacia el hub /seguros-de-auto; crea señal de breadcrumb en SERP mobile.

---

C.03 Make Hero
Container: content max-width, two-column grid (60/40), gap space-10
Background: neutral-50
Padding: space-12 top, space-10 bottom
Base component: Interior Page Hero (2.2), layout personalizado

Left column (60%):
Logo de marca placeholder: 56px height, left-aligned, monospace label ([MAKE LOGO])
bottom margin space-4. Nota: logos de Toyota, VW, Ford, etc. se insertan aquí; clear-space 1× cap-height.
H1: "Seguros para Toyota: coberturas y precios 2026"
Token: H1, neutral-900, text-wrap: balance
SEO note: H1 contiene marca + "seguros" + "coberturas" + "precios" + año para freshness. Año vía CMS variable.
Subtext: "Encontrá la mejor cobertura para tu Toyota. Comparamos precios de todas las aseguradoras del mercado argentino para cada modelo de la marca."
Token: Body L, neutral-600, top margin space-4, max-width 60ch
SEO note: expande con secundarias ("comparamos precios", "aseguradoras", "mercado argentino").
Trust row (top margin space-6, flex gap space-5):
Lucide "ShieldCheck" icon-sm primary-600 + "Datos verificados" — Label S, neutral-700
Lucide "RefreshCw" icon-sm primary-600 + "Actualizado: mayo 2026" — Label S, neutral-700
Lucide "Car" icon-sm primary-600 + "12 modelos disponibles" — Label S, neutral-700

Right column (40%) — Quick stats card:
White card, elevation-1, radius-lg, padding space-6
2×2 grid, row gap space-5, column gap space-6
Stat 1: Label "Modelos cubiertos" / Value "12" (H4, neutral-900)
Stat 2: Label "Aseguradoras" / Value "18 disponibles" (H4, neutral-900)
Stat 3: Label "Precio promedio" / Value "Desde $38.000/mes" (H4, neutral-900)
Stat 4: Label "Ahorro estimado" / Value "Hasta 35% vs contratación directa" (H4, neutral-900; "35%" en primary-600)
CTA debajo de stats (top margin space-6):
Primary button md, full width: "Cotizar seguro Toyota" + Lucide "ArrowRight" icon-sm trailing
Microcopy (Label S, neutral-500, centrado): "Cotización gratuita en 2 minutos"

Responsive (≤768px):
Single column: logo → H1 → subtext → trust row → stats card
Stats card padding → space-5; CTA full width.
SEO rationale: densidad above-the-fold con H1, subtext, freshness signal, social proof y CTA visible sin scroll. Stats card genera bloque extraíble por AI Overviews / Perplexity. "18 aseguradoras" y "12 modelos" atraen enriquecimiento con Product y AggregateOffer schema.

---

C.04 Models Grid Section
Container: content max-width
Background: white
Padding: space-16 top y bottom
Section header (centrado, max-width 720px, bottom margin space-10):
H2: "Modelos Toyota con seguro disponible"
Token: H2, neutral-900
Subtext: "Seleccioná tu modelo para ver precios, coberturas y comparativa entre aseguradoras."
Token: Body L, neutral-500, top margin space-3

Grid de model cards (3-up desktop / 2-up tablet / 1-up mobile), gap space-6:
Component base: Vehicle Model Card (3.x), igual altura

Card — Toyota Corolla (ejemplo representativo):
Imagen: placeholder rectangular 16:9, radius-md, lazy-load, alt="Seguro Toyota Corolla"
Badge (top-left de imagen): "Más cotizado" — Label S white on primary-600, radius-full, padding space-1 space-3
Model name: "Corolla" — Label L, neutral-900, top margin space-4
Model descriptor: "Sedán · 2019–2026" — Body S, neutral-500, top margin space-2
Price block: "Desde $42.000/mes" — H4, neutral-900 (Label S "Desde" en neutral-500 arriba)
Aseguradoras count: Lucide "Building2" icon-xs neutral-400 + "14 aseguradoras" — Label S, neutral-500, top margin space-2
Divider: 1px neutral-100, top margin space-4
CTA: "Ver seguros" — Secondary button sm, full width, top margin space-4
Hover state: card elevation-2, borde 1px primary-200; CTA → primary variant

Resto de cards (8–11 adicionales según modelos de la marca):
Toyota Hilux → /seguros-de-auto/toyota/hilux
Toyota Yaris → /seguros-de-auto/toyota/yaris
Toyota RAV4 → /seguros-de-auto/toyota/rav4
Toyota Etios → /seguros-de-auto/toyota/etios
Toyota SW4 → /seguros-de-auto/toyota/sw4
Toyota Camry → /seguros-de-auto/toyota/camry
Toyota GR86 → /seguros-de-auto/toyota/gr86
... (resto de modelos activos)

Footer del grid (top margin space-8, centrado):
"¿No encontrás tu modelo? Cotizá igual →" — Label M, primary-600, link a /cotizar?marca=toyota

Mobile: cards stack verticalmente, gap space-4.
SEO rationale: cada model card genera un link interno directo a /seguros-de-auto/toyota/[modelo], construyendo el segundo nivel del silo. El badge "Más cotizado" en el modelo líder eleva CTR interno y orienta la conversión al modelo de mayor volumen de búsqueda.

---

C.05 Price Comparison by Coverage Section
Container: content max-width
Background: neutral-50
Padding: space-16 top y bottom
Section header (centrado, max-width 720px, bottom margin space-10):
H2: "Precios de seguro Toyota por tipo de cobertura"
Token: H2, neutral-900
Subtext: "Precio promedio mensual en Argentina según tipo de cobertura. Datos actualizados a mayo 2026."
Token: Body L, neutral-500, top margin space-3

Tabla comparativa (full width, scroll horizontal en mobile):
Encabezados de columnas: "Modelo" | "Terceros" | "Terceros Plus" | "Todo Riesgo"
Token encabezados: Label M, neutral-700, background neutral-100, padding space-3 space-4
Filas (alternating neutral-50 / white, Body M neutral-900, padding space-3 space-4):
Corolla | $35.000 | $52.000 | $78.000
Hilux | $48.000 | $68.000 | $95.000
Yaris | $30.000 | $44.000 | $65.000
RAV4 | $52.000 | $74.000 | $108.000
Etios | $28.000 | $40.000 | $60.000
(resto de modelos)
Columna "Todo Riesgo": background primary-50, border-left 2px primary-200 (énfasis visual de la columna de mayor margen)
Última fila: "Ver cotización exacta para mi modelo →" — Label M, primary-600, colspan 4, centrado

Nota legal bajo tabla (top margin space-4):
"Precios orientativos. El precio final depende del modelo exacto, año, zona y aseguradora." — Body S, neutral-400, centrado

SEO rationale: las tablas de precios por modelo son el target más competido de long-tail ("seguro Toyota Corolla precio 2026"). Marcar con structured data (Offer + priceCurrency: ARS) maximiza elegibilidad para rich results. La tabla además es el snippet más extraído por AI Overviews en búsquedas de precio.

---

C.06 Top Insurers for This Make Section
Container: content max-width
Background: white
Padding: space-16 top y bottom
Section header (centrado, max-width 720px, bottom margin space-10):
H2: "Mejores aseguradoras para autos Toyota en Argentina"
Token: H2, neutral-900
Subtext: "Según precio, cobertura y satisfacción de usuarios con Toyota asegurado."
Token: Body L, neutral-500, top margin space-3

Cards: Insurer Rank Card, 4-up grid desktop / 2-up tablet / 1-up mobile, gap space-6

Card — Aseguradora (ejemplo: Atlántida Seguros):
Badge de posición: "#1" — H4, primary-600, background primary-50, radius-full 40px, centered, top of card
Insurer logo placeholder: 48px height, centrado, top margin space-3
Insurer name: "Atlántida Seguros" — Label L, neutral-900, top margin space-3, centrado
Rating: "4.7 ★" — Body M, neutral-900 (glyph warning-500), centrado
Precio desde: "Desde $42.000/mes" — Body M, neutral-600, centrado
Highlight chip: "Mejor precio Terceros" — Label S, success-700, background success-50, radius-full, padding space-1 space-3, centrado, top margin space-2
CTA: "Ver oferta" — Secondary button sm, full width, top margin space-4
Link: /seguros-de-auto/toyota?aseguradora=atlantida

(3 cards adicionales: #2, #3, #4 aseguradoras más competitivas para la marca)

Footer del grid (top margin space-8, centrado):
"Ver todas las aseguradoras para Toyota →" — Label M, primary-600, link a /aseguradoras?marca=toyota

Mobile: cards stack verticalmente.
SEO rationale: la combinación marca × aseguradora es el segundo eje del keyword matrix. Esta sección crea backlinks internos cruzados hacia /aseguradoras/[nombre], fortaleciendo el cluster y generando la señal de co-ocurrencia temática marca–aseguradora que Google evalúa en búsquedas de intent comparativo.

---

C.07 FAQ Section
Container: content max-width
Background: neutral-50
Padding: space-16 top y bottom
Section header (left-aligned, bottom margin space-8):
H2: "Preguntas frecuentes sobre seguros Toyota"
Token: H2, neutral-900

Accordion component (full width, gap space-3 entre items):

Item 1:
Q: "¿Cuánto cuesta el seguro para un Toyota en Argentina?"
A: "El precio varía según el modelo, año, zona de patentamiento y cobertura elegida. Para un Toyota Corolla 2023 en Buenos Aires, los precios rondan los $35.000/mes para Terceros y $78.000/mes para Todo Riesgo. Usá nuestro cotizador para obtener el precio exacto para tu vehículo."

Item 2:
Q: "¿Qué cobertura conviene para un Toyota Hilux?"
A: "Para camionetas de alta gama como la Hilux, los expertos recomiendan Todo Riesgo o Terceros Plus con adicional de granizo e inundación, dado el valor del vehículo y su exposición en zonas rurales. Comparar entre aseguradoras puede ahorrar hasta un 35%."

Item 3:
Q: "¿Todas las aseguradoras cubren autos Toyota 0km?"
A: "Sí, todos los modelos Toyota nuevos son cubiertos por las principales aseguradoras argentinas. Algunos modelos híbridos como el Corolla Cross pueden tener restricciones en coberturas de taller oficial; verificalo al cotizar."

Item 4:
Q: "¿Cómo comparo seguros para mi Toyota?"
A: "En Ramsar Seguros podés ingresar tu modelo, año y zona, y en 2 minutos recibís cotizaciones de hasta 18 aseguradoras. Comparás precio, coberturas incluidas y reseñas de usuarios antes de decidir."

Item 5:
Q: "¿El seguro cubre repuestos originales Toyota?"
A: "Depende de la aseguradora y el plan. Algunas pólizas Todo Riesgo incluyen reparación en talleres oficiales Toyota con repuestos originales; otras usan talleres de red propia. Verificá este punto al comparar cotizaciones."

Estilo accordion:
Border-bottom 1px neutral-200 por item
Q: Label L, neutral-900, padding space-5 vertical
A: Body M, neutral-600, padding space-1 space-5 space-5
Icon toggle: Lucide "ChevronDown" icon-sm neutral-500 → "ChevronUp" en abierto, right-aligned
Estado abierto: background white, radius-lg, box-shadow elevation-1
Transición: max-height expand 200ms ease

JSON-LD: FAQPage schema, todas las preguntas y respuestas; inyectar en <head>.
SEO rationale: FAQPage schema es el rich result con mayor tasa de aparición en mobile para búsquedas "cuánto cuesta seguro [marca]". A diferencia de la página de aseguradora (B) donde se omitió FAQ por no ser Q&A-estructurada, en la página de marca el FAQ sí corresponde porque el intent de búsqueda es informacional + comparativo, no transaccional puro.

---

C.08 Related Makes Section
Container: content max-width
Background: white
Padding: space-16 top y bottom
Section header (centrado, max-width 720px, bottom margin space-10):
H2: "Seguros para otras marcas de autos"
Token: H2, neutral-900
Subtext: "Comparamos seguros para todas las marcas más vendidas en Argentina."
Token: Body L, neutral-500, top margin space-3

Chip grid: flex wrap, gap space-3
Chip style: idéntico a B.09 (outlined badge, radius-full, Label M, icon "Car")

Chips (10 marcas — excluir la marca actual):
Volkswagen → /seguros-de-auto/volkswagen
Ford → /seguros-de-auto/ford
Chevrolet → /seguros-de-auto/chevrolet
Renault → /seguros-de-auto/renault
Peugeot → /seguros-de-auto/peugeot
Fiat → /seguros-de-auto/fiat
Citroën → /seguros-de-auto/citroen
Honda → /seguros-de-auto/honda
Nissan → /seguros-de-auto/nissan
Jeep → /seguros-de-auto/jeep

Footer link (top margin space-6):
"Ver todas las marcas →" — Label M, primary-600, link a /seguros-de-auto

SEO rationale: los links entre páginas de marcas hermanas distribuyen PageRank horizontalmente dentro del cluster "Por vehículo" y crean co-ocurrencia temática de marcas competidoras (señal positiva en búsquedas de intent comparativo como "seguros autos más vendidos Argentina").

---

C.09 Sticky CTA (Desktop) / Bottom Bar (Mobile)
Idéntico a B.10 con los siguientes cambios de copy:
Desktop headline: "¿Listo para cotizar tu Toyota?"
Desktop CTA primario: "Cotizar seguro Toyota" + Lucide "ArrowRight"
Desktop CTA secundario: "Ver modelos Toyota"
Mobile headline: "¿Cotizás tu Toyota?"
Mobile subtext: "Toyota · 18 aseguradoras · 2 minutos"
Mobile CTA: "Cotizar" — Primary button md, 120px
Visibility logic: igual a B.10 (IntersectionObserver sobre CTA hero C.03).
SEO rationale: idéntico a B.10; el sticky CTA reduce bounce rate y sostiene señales de engagement.

---

C.10 Footer
Component: Footer (1.6) — idéntico a B.11
Única diferencia: en Column 3 "Por vehículo", resaltar "Por marca" con primary-600 (active state de sección).
SEO rationale: coherencia de link-equity y señal de estructura de silo hacia /seguros-de-auto.

---

Global page notes para el diseñador Figma

Heading hierarchy (final): H1 (C.03) → H2 ×5 (C.04, C.05, C.06, C.07, C.08) → H3 ×0. Sin niveles salteados.

Ritmo vertical de secciones (alternancia white / neutral-50):
white (C.02 breadcrumb) → neutral-50 (C.03 hero) → white (C.04 models) → neutral-50 (C.05 precios) → white (C.06 aseguradoras) → neutral-50 (C.07 FAQ) → white (C.08 marcas) → neutral-900 (C.10 footer)

CTA density: 4 puntos de conversión (C.03 hero CTA, C.04 model cards ×N, C.09 sticky). No agregar más.

Content freshness: año en H1, precios en tabla (C.05) y stats card (C.03) deben ser variables CMS, no hardcodeadas.

Schema bundle para esta página:
BreadcrumbList (C.02)
ItemList con ListItem ×N modelos (C.04 — señal de página de categoría para Google)
AggregateOffer por modelo con priceCurrency: ARS (C.05)
FAQPage (C.07) ← único en este template, no presente en Page B
Organization para cada aseguradora mencionada (C.06)

Performance budget:
Images de model cards (C.04): lazy-load, WebP, width 400px 2×. Reservar aspect-ratio 16:9 en CSS para evitar CLS.
Tabla C.05: overflow-x scroll en mobile sin layout shift (wrapper con overflow hidden en parent).
Sticky CTA: transform-based show/hide, sin display toggle.

Parámetros de URL dinámicos:
/seguros-de-auto/toyota/corolla?aseguradora=atlantida — pre-filtra modelo + aseguradora en destino.
/cotizar?marca=toyota — entrada directa al flow de cotización con marca pre-seleccionada.
Canonical en todas las URLs con query params → apuntar a versión limpia sin params.
