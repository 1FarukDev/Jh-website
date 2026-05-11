/** Static skeleton for `/orders` — safe for `loading.tsx` and client `page.tsx`. */
export function OrdersPageSkeleton() {
  return (
    <section className="py-26 px-4" aria-busy="true" aria-label="Loading orders">
      <div className="flex flex-col items-center max-w-6xl mx-auto">
        <div className="h-12 md:h-14 w-64 md:w-80 bg-neutral-200 rounded animate-pulse mb-3" />
        <div className="h-5 w-full max-w-md bg-neutral-100 rounded animate-pulse mb-10" />

        <div className="w-full max-w-6xl border border-gray-200 overflow-hidden rounded-sm">
          <div className="grid grid-cols-5 gap-0 bg-black text-white text-xs md:text-sm font-satoshi py-3 px-2 md:px-4">
            {["Order #", "Date", "Total", "Status", "Actions"].map((label) => (
              <div key={label} className="font-medium">
                {label}
              </div>
            ))}
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-2 items-center border-t border-gray-200 py-4 px-2 md:px-4 animate-pulse"
            >
              <div className="h-4 bg-neutral-200 rounded w-20" />
              <div className="h-4 bg-neutral-100 rounded w-24" />
              <div className="h-4 bg-neutral-200 rounded w-16" />
              <div className="h-6 bg-neutral-100 rounded-full w-20" />
              <div className="h-8 bg-neutral-200 rounded w-28 justify-self-start" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
