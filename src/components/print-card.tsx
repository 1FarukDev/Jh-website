"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import cart from "@/app/assets/svg/shopping-cart-white.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PrintCardProps = {
  image: StaticImageData | string;
  label: string;
  title: string;
  price: string | number;
  onAddToCart?: () => void;
  onViewDetails?: string;
  loading?: boolean;
};

function PrintCard({
  image,
  label,
  title,
  price,
  onAddToCart,
  onViewDetails,
  loading = false,
}: PrintCardProps) {
  if (loading) {
    // 💀 Skeleton loader
    return (
      <div className="w-full h-full flex flex-col animate-pulse">
        <div className="relative w-full aspect-square bg-gray-200 rounded-md" />
        <div className="flex-1 flex flex-col justify-between pt-3 px-1">
          <div className="space-y-3 mb-3">
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 🖼️ Actual product card
  return (
    <Link
      href={`${onViewDetails}`}
      className="w-full h-full flex flex-col"
    >
      <div className="relative w-full aspect-square sm:aspect-square md:aspect-square lg:aspect-square xl:aspect-square">
        <Image
          src={image}
          alt={`${label} Image`}
          fill
          className="object-cover transition-transform duration-300"
          priority={false}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between pt-3 px-1">
        <div className="space-y-2 mb-3">
          <p className="font-satoshi text-xs sm:text-sm md:text-base text-gray-600 line-clamp-1">
            {label}
          </p>
          <div className="space-y-1 flex md:flex-row flex-col justify-between md:items-center">
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-black line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="font-satoshi text-sm sm:text-base md:text-lg font-medium text-[#2A1407]">
              {typeof price === "number"
                ? `₦${price.toLocaleString()}`
                : price}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button
            className="bg-black hover:bg-gray-800 text-white font-satoshi rounded-none font-normal 
              px-3 sm:px-4 md:px-6 lg:px-8 
              py-2 sm:py-2.5 
              text-xs sm:text-sm md:text-base
              flex-1 transition-colors duration-200"
            onClick={onAddToCart}
          >
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add to Cart</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PrintCard;
