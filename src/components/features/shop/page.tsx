"use client";

import React, { useMemo } from "react";
import Filters from "./filters";
import PrintCard from "@/components/print-card";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import ShopImage from "@/app/assets/png/2-shop-prints-jh-textiles.jpg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "@/services/api/product";

function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "all";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const {
    data: productData = [],
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ["products", category, minPrice, maxPrice],
    queryFn: () => getFilteredProducts({ category, minPrice, maxPrice }),
  });

  return (
    <section>
      <div className="pt-15" data-aos="fade-down" data-aos-duration="1000">
        <Image src={ShopImage} alt="shop" className="md:h-[700px] h-[35vh]" />
      </div>

      <div
        className="px-4 md:px-0 pt-5"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-center font-light text-[30px] md:text-[80px]">
          Shop Prints & Textiles
        </h1>
        <p className="font-satoshi font-normal md:text-xl text-base text-[#4E5157] text-center md:-mt-3 max-w-5xl mx-auto">
          Browse a curated collection of ready-to-use textile prints. Perfect
          for fashion brands, interior designers, or creatives looking for
          exclusive, high-quality surface patterns.
        </p>
      </div>

      <div className="mt-10 md:px-15 px-4" data-aos="fade-right">
        <Filters />
      </div>

      <section className="mt-[45px] md:mx-10 px-0 border border-t-0 border-b-0 border-[#8A8635] min-h-[300px]">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {isError && (
          <p className="text-center py-20 text-red-500">
            Failed to load products.
          </p>
        )}

        {!isLoading && productData.length === 0 && (
          <p className="text-center py-20 text-gray-500">
            No products found matching your filters.
          </p>
        )}

        {!isLoading && productData.length > 0 && (
          <>
            {Array.from({
              length: Math.ceil(productData.length / 2),
            }).map((_, rowIndex) => {
              const start = rowIndex * 2;
              const end = start + 2;
              const rowItems = productData.slice(start, end);

              return (
                <div
                  key={`mobile-${rowIndex}`}
                  className="flex border-t border-[#8A8635] md:hidden"
                >
                  {rowItems.map((item: any, colIndex: number) => (
                    <div
                      key={item.id}
                      className={`w-1/2 md:p-2 p-1 ${
                        colIndex !== rowItems.length - 1
                          ? "border-r border-[#8A8635]"
                          : ""
                      }`}
                    >
                      <PrintCard
                        productId={item.id}
                        image={
                          item?.images[0] || item?.thumbnail || "/fallback.png"
                        }
                        images={item?.images}
                        label={item?.tag || item?.label || "No tag"}
                        title={item?.title || item.name}
                        price={item?.price}
                        category={item?.category}
                        onViewDetails={`/shop/${item.id}`}
                        hoverImage={item?.hoverImage}
                        exclusivity={item?.exclusive}
                      />
                    </div>
                  ))}
                </div>
              );
            })}

            {Array.from({
              length: Math.ceil(productData.length / 4),
            }).map((_, rowIndex) => {
              const start = rowIndex * 4;
              const end = start + 4;
              const rowItems = productData.slice(start, end);

              return (
                <div
                  key={`desktop-${rowIndex}`}
                  className="hidden md:flex border-t border-[#8A8635]"
                >
                  {rowItems.map((item: any, colIndex: number) => (
                    <div
                      key={item.id}
                      className={`w-1/4 p-2 ${
                        colIndex !== rowItems.length - 1
                          ? "border-r border-[#8A8635]"
                          : ""
                      }`}
                    >
                      <PrintCard
                        productId={item.id}
                        image={
                          item?.images[0] || item?.thumbnail || "/fallback.png"
                        }
                        images={item?.images}
                        label={item?.tag || item?.label || "No tag"}
                        title={item?.title || item?.name}
                        price={item?.price}
                        category={item?.category}
                        onViewDetails={`/shop/${item.id}`}
                        loading={isLoading}
                        hoverImage={item?.images[1]}
                        exclusivity={item?.exclusive}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </section>

      {/* Show filter summary */}
      {(category !== "all" || minPrice || maxPrice) && !isLoading && (
        <div className="mx-10 mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {category !== "all" && (
            <span className="bg-gray-200 px-3 py-1 rounded">
              Category: {category}
            </span>
          )}
          {minPrice && (
            <span className="bg-gray-200 px-3 py-1 rounded">
              Min: ${minPrice}
            </span>
          )}
          {maxPrice && (
            <span className="bg-gray-200 px-3 py-1 rounded">
              Max: ${maxPrice}
            </span>
          )}
        </div>
      )}

      {/* Pagination */}
      <div
        className="mt-10 flex justify-between items-center w-full mb-10 md:px-[30px] px-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8">
          <MoveLeft strokeWidth={0.5} />
          Previous
        </Button>
        <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8">
          Next
          <MoveRight strokeWidth={0.5} />
        </Button>
      </div>
    </section>
  );
}

export default ShopPage;
