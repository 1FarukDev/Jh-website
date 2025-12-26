"use client";

import React from "react";
import PrintCard from "@/components/print-card";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/services/api/product";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
  });

  const resultCount = products.length;

  if (isLoading) {
    return (
      <section className="py-26">
        <div className="px-6 text-[#230D06]">
          <p className="text-[40px]">Searching...</p>
          <div className="mt-[45px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-80 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-26">
        <div className="px-6 text-[#230D06]">
          <div className="mt-[45px] text-center py-20">
            <p className="text-2xl text-red-500 mb-2">Something went wrong</p>
            <p className="text-gray-400">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-26">
      <div className="px-6 text-[#230D06]">
        <p className="md:text-[40px] text-[20px]">
          {query ? (
            <>
              Results for <span className="font-medium">{query}</span>{" "}
              <span className="text-gray-400">({resultCount})</span>
            </>
          ) : (
            <>
              All Products{" "}
              <span className="text-gray-400">({resultCount})</span>
            </>
          )}
        </p>

        <section>
          {products.length > 0 ? (
            <div className="mt-[45px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item: any) => (
                <PrintCard
                  productId={item.id}
                  image={item.images[0]}
                  images={item.images}
                  label={item.category}
                  title={item.name}
                  price={item.price}
                  category={item.category}
                  hoverImage={item.images[1]}
                  onViewDetails={`/shop/${item.id}`}
                  loading={isLoading}
                />
              ))}
            </div>
          ) : (
            <div className="mt-[45px] text-center py-20">
              <p className="text-2xl text-gray-500 mb-2">No results found</p>
              <p className="text-gray-400">
                Try searching with different keywords
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default SearchPage;
