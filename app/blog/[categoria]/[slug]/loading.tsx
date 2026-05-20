export default function BlogPostLoading() {
  return (
    <>
      {/* Header skeleton */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16 pt-8 pb-2">
          <div className="flex gap-2 items-center">
            {[40, 16, 32, 16, 56, 16, 120].map((w, i) =>
              i % 2 === 1 ? (
                <span key={i} className="text-neutral-300 text-sm">
                  /
                </span>
              ) : (
                <div
                  key={i}
                  className="h-3 rounded bg-neutral-200 animate-pulse"
                  style={{ width: w }}
                />
              ),
            )}
          </div>
        </div>
        <div className="max-w-300 mx-auto px-6 lg:px-16 py-10 lg:py-14 flex flex-col gap-5">
          <div className="h-6 w-20 rounded-full bg-neutral-200 animate-pulse" />
          <div className="flex flex-col gap-2 max-w-[72ch]">
            <div className="h-10 w-full rounded bg-neutral-200 animate-pulse" />
            <div className="h-10 w-4/5 rounded bg-neutral-200 animate-pulse" />
          </div>
          <div className="h-5 w-3/4 rounded bg-neutral-200 animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-200 animate-pulse shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-32 rounded bg-neutral-200 animate-pulse" />
              <div className="h-3 w-24 rounded bg-neutral-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content + sidebar skeleton */}
      <div className="bg-white">
        <div className="max-w-300 mx-auto px-6 lg:px-16 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-16">
            {/* Article body skeleton */}
            <div className="flex flex-col gap-5">
              {[100, 85, 100, 70, 90, 40, 100, 80, 95, 60, 100, 75].map(
                (w, i) => (
                  <div
                    key={i}
                    className="h-4 rounded bg-neutral-200 animate-pulse"
                    style={{ width: `${w}%` }}
                  />
                ),
              )}
              <div className="h-40 rounded-lg bg-neutral-200 animate-pulse mt-4" />
            </div>

            {/* Sidebar skeleton */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-neutral-100 rounded-xl p-5 flex flex-col gap-2.5 animate-pulse">
                <div className="h-3 w-24 rounded bg-neutral-200" />
                {[80, 60, 90, 70].map((w, i) => (
                  <div
                    key={i}
                    className="h-3 rounded bg-neutral-200"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="h-36 rounded-xl bg-neutral-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
