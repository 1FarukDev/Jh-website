"use client";

import React from "react";
import PrintImage from "@public/assets/png/print.png";
import PrintCard from "@/components/home-page-card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/api/product";

function FeaturedPrints() {

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
      <p className="md:text-[45px] text-[30px] font-bold md:font-normal text-center leading-[20px] md:leading-[40px]">
        Featured Prints
      </p>

      <p
        data-aos-delay="200"
        className="md:text-xl text-sm font-satoshi font-normal text-[#4E5157] text-center mt-2"
      >
        Curated works handpicked from J.H Textiles collection.
      </p>

      <div className="mt-[25px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-4 md:gap-4">
        {productData.slice(0, 6).map((item, index) => (
          <div key={item.id}>
            <PrintCard
              image={item.images[0]}
              label={item.category}
              title={item.name}
              price={item.price}
              hoverImage={item.images[1]}
              onAddToCart={() => console.log(`Added ${item.title} to cart`)}
              onViewDetails={`/shop/${item.id}`}
              loading={isLoading}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedPrints;
