import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { CATEGORY_LABELS, CATEGORY_STYLES, formatDate } from '@/lib/blog'

type Props = { post: BlogPost }

export function ArticleHeader({ post }: Props) {
  const cat = CATEGORY_STYLES[post.categoria]
  const label = CATEGORY_LABELS[post.categoria]

  return (
    <header className="bg-neutral-50 border-b border-neutral-200">
      {/* Breadcrumb */}
      <div className="max-w-300 mx-auto px-6 lg:px-16 pt-8 pb-2">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-neutral-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-neutral-900 transition-colors duration-120 no-underline">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300">
              /
            </li>
            <li>
              <Link href="/blog" className="hover:text-neutral-900 transition-colors duration-120 no-underline">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300">
              /
            </li>
            <li>
              <Link
                href={`/blog?categoria=${post.categoria}`}
                className="hover:text-neutral-900 transition-colors duration-120 no-underline"
              >
                {label}
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300">
              /
            </li>
            <li
              className="text-neutral-700 truncate max-w-[30ch]"
              aria-current="page"
            >
              {post.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero content */}
      <div className="max-w-300 mx-auto px-6 lg:px-16 py-10 lg:py-14">
        <div className="max-w-[72ch] flex flex-col gap-5">
          {/* Category badge */}
          <span
            className={[
              'self-start font-sans font-semibold text-[10.5px] px-2.5 py-1 rounded-full',
              cat.bg,
              cat.text,
            ].join(' ')}
          >
            {label}
          </span>

          {/* Title */}
          <h1 className="font-serif text-[32px] lg:text-[44px] leading-[1.06] tracking-[-0.02em] text-neutral-900">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="font-serif text-[17px] lg:text-[19px] leading-[1.55] text-neutral-600">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 pt-1">
            <div
              className="w-9 h-9 rounded-full bg-neutral-200 shrink-0"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-semibold text-[14px] text-neutral-800">
                {post.author}
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                {post.authorRole}
              </span>
            </div>
            <div
              aria-hidden="true"
              className="w-px h-7 bg-neutral-300 mx-1"
            />
            <div className="font-mono text-[11px] text-neutral-500 flex flex-col gap-0.5">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>{post.readMinutes} min de lectura</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10.5px] tracking-[0.04em] px-2.5 py-1 rounded-full bg-neutral-200 text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
