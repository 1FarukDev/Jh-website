"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import cart from "@/app/assets/svg/shopping-cart-white.svg";

type PrintCardProps = {
  image: StaticImageData | string;
  label: string;
  title: string;
  price: string | number;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
};

function PrintCard({
  image,
  label,
  title,
  price,
  onAddToCart,
  onViewDetails,
}: PrintCardProps) {
  return (
    <section className="w-full group overflow-hidden">
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] md:aspect-[3/3] overflow-hidden">
        <Image
          src={image}
          alt={`${label} Image`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 388px"
        />

        <div
          className="
            absolute bottom-0 left-0 w-full bg-white
            transform translate-y-full opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500 ease-in-out
            p-4
          "
        >
          <p className="font-satoshi text-sm md:text-base">{label}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm md:text-lg">{title}</p>
            <p className="font-satoshi text-medium text-[#2A1407]">
              {typeof price === "number"
                ? `₦${price.toLocaleString()}`
                : price}
            </p>
          </div>

          <div className="flex sm:flex-row gap-2 justify-between items-center mt-2">
            <Button
              className="bg-black md:block hidden text-white font-satoshi rounded-none font-normal px-8 flex-1"
              onClick={onAddToCart}
            >
              Add to Cart
            </Button>

            <div className="bg-black md:hidden p-2 pr-4 rounded-full py-4">
              <Image
                src={cart}
                alt="Cart"
                className="w-[16px] h-[16px] ml-2 md:hidden"
              />
            </div>

            <Button
              className="bg-white border shadow-none border-black text-black font-satoshi rounded-none font-normal px-4 md:px-8 flex-1"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrintCard;
