import type { ContentBlock } from '@/lib/blog'

type Props = { content: ContentBlock[] }

export function ArticleBody({ content }: Props) {
  return (
    <article className="min-w-0">
      <div className="flex flex-col gap-5">
        {content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  )
}

function Block({ block }: { block: ContentBlock }) {
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
          {block.text}
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
              <span>{item}</span>
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
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )

    case 'callout':
      return <CalloutBlock block={block} />

    case 'table':
      return <TableBlock block={block} />

    case 'image':
      return (
        <figure className="my-2">
          <div
            className="w-full aspect-video rounded-lg overflow-hidden relative"
            style={{
              background:
                'repeating-linear-gradient(135deg,#cee2df 0,#cee2df 14px,#ecf4f3 14px,#ecf4f3 28px)',
            }}
            role="img"
            aria-label={block.alt}
          >
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.18em] uppercase text-primary-500">
              {block.alt}
            </span>
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
}: {
  block: Extract<ContentBlock, { type: 'callout' }>
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
          {block.body}
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
                className="px-4 py-3 text-left font-semibold text-neutral-700 whitespace-nowrap"
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
