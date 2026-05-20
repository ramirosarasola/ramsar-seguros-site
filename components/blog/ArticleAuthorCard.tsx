import type { BlogPost } from '@/lib/blog'

type Props = { post: BlogPost }

export function ArticleAuthorCard({ post }: Props) {
  return (
    <aside
      className="mt-12 pt-8 border-t border-neutral-200"
      aria-label="Sobre el autor"
    >
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex gap-5 items-start">
        <div
          className="w-14 h-14 rounded-full bg-neutral-200 shrink-0"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-1.5 min-w-0">
          <div>
            <span className="font-sans font-semibold text-[15px] text-neutral-900">
              {post.author}
            </span>
            <span className="font-mono text-[11px] text-neutral-500 ml-2">
              {post.authorRole}
            </span>
          </div>
          <p className="font-sans text-[13.5px] leading-relaxed text-neutral-600">
            {post.authorBio}
          </p>
        </div>
      </div>
    </aside>
  )
}
