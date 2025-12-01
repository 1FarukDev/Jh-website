"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import cart from "@/app/assets/svg/shopping-cart-white.svg";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import { useCart } from "@/context/cart-context";

type PrintCardProps = {
  productId?: number;
  image: StaticImageData | string;
  hoverImage?: StaticImageData | string;
  images?: string[];
  label: string;
  title: string;
  price: string | number;
  category?: string;
  onAddToCart?: () => void;
  onViewDetails?: string;
  loading?: boolean;
};

function PrintCard({
  image,
  hoverImage,
  label,
  title,
  price,
  onAddToCart,
  onViewDetails,
  loading = false,
}: PrintCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { formatPrice } = useCurrency();

  if (loading) {
    return (
      <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-md">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <Link
      href={onViewDetails ?? "#"}
      className="w-full group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={`${label} Image`}
          fill
          onLoadingComplete={() => setIsImageLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${
            isHovered && hoverImage ? "opacity-0" : "opacity-100"
          } ${!isImageLoaded ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 768px) 100vw, 388px"
        />

        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${label} Hover Image`}
            fill
            className={`object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 388px"
          />
        )}

        <div
          className="
            absolute bottom-0 left-0 w-full 
            transform translate-y-full opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500 ease-in-out
            p-4
          "
        >
          <div className="bg-white/90 p-4">
            <p className="font-satoshi text-sm md:text-base">{label}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm md:text-lg">{title}</p>
              <p className="font-satoshi text-medium text-[#2A1407]">
                {typeof price === "number" || !isNaN(Number(price))
                  ? formatPrice(Number(price))
                  : price}
              </p>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default PrintCard;
