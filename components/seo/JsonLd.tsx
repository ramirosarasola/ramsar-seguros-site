interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

/** Renders a JSON-LD <script> tag. Colocate one per route segment. */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
