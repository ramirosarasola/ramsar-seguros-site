export default function InsurerLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="bg-white py-4">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-neutral-200 rounded" />
            <div className="h-4 w-3 bg-neutral-100 rounded" />
            <div className="h-4 w-24 bg-neutral-200 rounded" />
            <div className="h-4 w-3 bg-neutral-100 rounded" />
            <div className="h-4 w-32 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-neutral-50 pt-12 pb-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
            <div className="flex flex-col gap-4">
              <div className="h-14 w-40 bg-neutral-200 rounded-lg" />
              <div className="h-12 w-full bg-neutral-200 rounded" />
              <div className="h-12 w-3/4 bg-neutral-200 rounded" />
              <div className="h-20 w-full bg-neutral-100 rounded mt-2" />
              <div className="flex gap-5 mt-2">
                <div className="h-4 w-28 bg-neutral-200 rounded" />
                <div className="h-4 w-36 bg-neutral-200 rounded" />
                <div className="h-4 w-24 bg-neutral-200 rounded" />
              </div>
            </div>
            <div className="bg-white shadow-elevation-1 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-3 w-16 bg-neutral-200 rounded" />
                    <div className="h-6 w-20 bg-neutral-200 rounded" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-neutral-200 rounded-lg mt-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Plans skeleton */}
      <div className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="h-10 w-80 bg-neutral-200 rounded" />
            <div className="h-5 w-96 bg-neutral-100 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-neutral-100 rounded-xl h-96" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
