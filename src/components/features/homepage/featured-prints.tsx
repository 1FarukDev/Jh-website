"use client";

import React from "react";
import PrintImage from "@public/assets/png/print.png";
import PrintCard from "@/components/home-page-card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/api/product";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PrintCardSkeleton from "@/components/print-card-skeleton";

function FeaturedPrints() {
  const router = useRouter();
  const {
    data: productData = [],
    isLoading,
    error,
  } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <section className="my-[100px] md:px-15 px-4">
      <p className="md:text-[45px] text-[30px] font-semibold md:font-normal text-center leading-[20px] md:leading-[40px]">
        Featured Prints
      </p>

      <p
        data-aos-delay="200"
        className="md:text-xl text-sm font-satoshi font-normal text-[#4E5157] text-center mt-2 max-w-4xl mx-auto"
      >
        Discover a curated showcase of exclusive and original surface patterns
        ranging from abstract and floral, geometric, photographic, and
        minimalist designs.
      </p>


      <div className="mt-[25px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-4 md:gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
            <PrintCardSkeleton key={i} />
          ))
          : productData.slice(0, 6).map((item) => (
            <PrintCard
              key={item.id}
              productId={item.id}
              image={item.images[0]}
              images={item.images}
              label={item.category}
              title={item.name}
              price={item.price}
              category={item.category}
              hoverImage={item.images[1]}
              onViewDetails={`/shop/${item.id}`}
            />
          ))}
      </div>
      <Button
        onClick={() => router.push("/shop")}
        className="relative overflow-hidden border mt-3 md:mt-8 px-6 sm:px-8 font-satoshi text-xs sm:text-sm 
    bg-black border-black text-white hover:text-white rounded-none py-2 
    transition-all duration-300 group w-[160px] hover:w-[190px] flex justify-center items-center mx-auto"
      >
        <span className="relative z-10 flex items-center justify-center">
          Explore the Collection
          <ArrowRight className="ml-2 h-4 w-4 hidden group-hover:inline opacity-0 -translate-x-2 transform transition-all duration-300 text-white group-hover:opacity-100 group-hover:translate-x-0" />
        </span>

        <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      </Button>
    </section>
  );
}

export default FeaturedPrints;
