import { Suspense } from "react";
import SearchPageClient from "./search-client";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <section className="py-26 px-6">
          <p className="text-[40px]">Loading search…</p>
        </section>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
