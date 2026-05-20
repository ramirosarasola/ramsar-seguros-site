/**
 * Tailwind CSS v4 — plugin registration
 *
 * In Tailwind v4, design tokens live in CSS via `@theme` (see app/globals.css).
 * This file is reserved for plugin registration (e.g. @tailwindcss/typography).
 *
 * shadcn/ui components are already wired through globals.css:
 *   - shadcn semantic vars  →  :root { --primary: ... }
 *   - Tailwind tokens       →  @theme inline { --color-primary: var(--primary) }
 *   - Ramsar brand tokens   →  @theme { --color-primary-700: #0e433f; ... }
 */

import type { Config } from 'tailwindcss'

export default {
  plugins: [
    // @tailwindcss/typography — add when blog article styles are needed
    // require('@tailwindcss/typography'),
  ],
} satisfies Config
