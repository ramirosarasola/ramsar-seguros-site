export default function BlogLoading() {
  return (
    <div className="bg-neutral-50">
      {/* Page header skeleton */}
      <section className="pt-16 pb-10 border-b border-neutral-200">
        <div className="max-w-300 mx-auto px-6 lg:px-16 flex flex-col gap-4">
          <div className="h-3 w-12 bg-neutral-200 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-neutral-200 rounded animate-pulse" />
          <div className="h-5 w-1/2 bg-neutral-200 rounded animate-pulse" />
          {/* Category pills skeleton */}
          <div className="flex gap-2 mt-2">
            {[80, 60, 100, 80, 90].map((w, i) => (
              <div
                key={i}
                className="h-9 bg-neutral-200 rounded-full animate-pulse"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured skeleton */}
      <section className="py-10">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="bg-neutral-200 rounded-xl h-64 animate-pulse" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="pb-20">
        <div className="max-w-300 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-[10px] overflow-hidden"
              >
                <div className="aspect-video bg-neutral-200 animate-pulse" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-neutral-200 rounded animate-pulse mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
