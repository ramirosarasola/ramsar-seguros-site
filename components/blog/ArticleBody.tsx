import Link from 'next/link'
import Image from 'next/image'
import type { ContentBlock, InternalLink } from '@/lib/blog'

// ─── Inline renderers ─────────────────────────────────────────────────────────

function renderBold(text: string, keyPrefix: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 0
      ? part || null
      : <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-neutral-900">{part}</strong>
  )
}

function renderWithLinks(text: string, links: InternalLink[], keyPrefix: string) {
  type Span = { start: number; end: number; link: InternalLink }

  const spans: Span[] = []
  for (const link of links) {
    const idx = text.indexOf(link.anchorText)
    if (idx === -1) continue
    spans.push({ start: idx, end: idx + link.anchorText.length, link })
  }
  spans.sort((a, b) => a.start - b.start)

  // remove overlapping spans (keep first occurrence)
  const filtered = spans.filter((s, i) => i === 0 || s.start >= spans[i - 1].end)

  if (filtered.length === 0) return renderBold(text, keyPrefix)

  const nodes: React.ReactNode[] = []
  let cursor = 0

  for (const span of filtered) {
    if (cursor < span.start) {
      nodes.push(...renderBold(text.slice(cursor, span.start), `${keyPrefix}-pre${span.start}`))
    }
    nodes.push(
      <Link
        key={`${keyPrefix}-lnk${span.start}`}
        href={span.link.href}
        title={span.link.title}
        className="text-primary-700 underline underline-offset-2 decoration-primary-300 hover:decoration-primary-600 transition-colors duration-120"
      >
        {span.link.anchorText}
      </Link>
    )
    cursor = span.end
  }

  if (cursor < text.length) {
    nodes.push(...renderBold(text.slice(cursor), `${keyPrefix}-suf`))
  }

  return nodes
}

// ─── Component ────────────────────────────────────────────────────────────────

type Props = { content: ContentBlock[]; internalLinks?: InternalLink[] }

export function ArticleBody({ content, internalLinks = [] }: Props) {
  return (
    <article className="min-w-0">
      <div className="flex flex-col gap-5">
        {content.map((block, i) => (
          <Block key={i} block={block} links={internalLinks} blockIndex={i} />
        ))}
      </div>
    </article>
  )
}

function Block({ block, links, blockIndex }: { block: ContentBlock; links: InternalLink[]; blockIndex: number }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={block.id}
          className="font-serif text-[26px] lg:text-[30px] leading-[1.1] tracking-[-0.015em] text-neutral-900 mt-6 mb-1 scroll-mt-24"
        >
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3
          id={block.id}
          className="font-sans font-semibold text-[18px] leading-[1.3] text-neutral-800 mt-4 mb-1 scroll-mt-24"
        >
          {block.text}
        </h3>
      )

    case 'p':
      return (
        <p className="font-sans text-[15px] lg:text-[16px] leading-[1.75] text-neutral-700 max-w-[68ch]">
          {renderWithLinks(block.text, links, `p${blockIndex}`)}
        </p>
      )

    case 'ul':
      return (
        <ul className="flex flex-col gap-2.5 pl-0 list-none">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 font-sans text-[15px] lg:text-[16px] leading-[1.65] text-neutral-700"
            >
              <span
                aria-hidden="true"
                className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"
              />
              <span>{renderWithLinks(item, links, `ul${blockIndex}-${i}`)}</span>
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="flex flex-col gap-2.5 pl-0 list-none counter-reset-[item]">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 font-sans text-[15px] lg:text-[16px] leading-[1.65] text-neutral-700"
            >
              <span className="font-mono text-[12px] font-semibold text-primary-500 mt-0.5 w-5 shrink-0 tabular-nums">
                {i + 1}.
              </span>
              <span>{renderWithLinks(item, links, `ol${blockIndex}-${i}`)}</span>
            </li>
          ))}
        </ol>
      )

    case 'callout':
      return <CalloutBlock block={block} links={links} blockIndex={blockIndex} />

    case 'table':
      return <TableBlock block={block} />

    case 'image':
      return (
        <figure className="my-2">
          <div className="w-full aspect-video rounded-lg overflow-hidden relative">
            <Image
              src={block.url}
              alt={block.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 900px"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 font-mono text-[11px] text-neutral-500 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'hr':
      return (
        <hr className="border-0 border-t border-neutral-200 my-2" />
      )

    default:
      return null
  }
}

function CalloutBlock({
  block,
  links,
  blockIndex,
}: {
  block: Extract<ContentBlock, { type: 'callout' }>
  links: InternalLink[]
  blockIndex: number
}) {
  const styles = {
    tip: {
      wrapper: 'bg-primary-50 border-primary-300',
      bar: 'bg-primary-500',
      label: 'text-primary-700',
    },
    info: {
      wrapper: 'bg-info-light border-info',
      bar: 'bg-info',
      label: 'text-info-dark',
    },
    warning: {
      wrapper: 'bg-warning-light border-warning',
      bar: 'bg-warning',
      label: 'text-warning-dark',
    },
  }

  const s = styles[block.variant]

  return (
    <div
      className={[
        'flex gap-0 rounded-lg border overflow-hidden',
        s.wrapper,
      ].join(' ')}
    >
      <div className={['w-1 shrink-0', s.bar].join(' ')} aria-hidden="true" />
      <div className="px-4 py-3.5 flex flex-col gap-1">
        <span className={['font-sans font-semibold text-[13px]', s.label].join(' ')}>
          {block.title}
        </span>
        <p className="font-sans text-[14px] leading-[1.6] text-neutral-700">
          {renderWithLinks(block.body, links, `callout${blockIndex}`)}
        </p>
      </div>
    </div>
  )
}

function TableBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: 'table' }>
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 my-2">
      <table className="w-full border-collapse text-[13px] lg:text-[14px] font-sans">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-200">
            {block.headers.map((h, i) => (
              <th
                key={i}
                className={[
                  'px-4 py-3 font-semibold text-neutral-700 whitespace-nowrap',
                  i === 0 ? 'text-left' : 'text-center',
                ].join(' ')}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors duration-120"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={[
                    'px-4 py-3',
                    ci === 0 ? 'text-neutral-700 font-medium' : 'text-center',
                    cell === '✓' ? 'text-success font-semibold' : '',
                    cell === '—' ? 'text-neutral-300' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
