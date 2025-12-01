"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
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
  productId,
  image,
  hoverImage,
  images,
  label,
  title,
  price,
  category,
  onAddToCart,
  onViewDetails,
  loading = false,
}: PrintCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart();
    } else if (productId) {
      addToCart({
        productId,
        name: title,
        title,
        price: typeof price === "number" ? price : Number(price) || 0,
        image: typeof image === "string" ? image : "",
        images: images || [],
        category: category || label,
        exclusivity: "Non-Exclusive Print",
        size: 'Standard Size',
      });
    }
  };

  if (loading) {
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

  return (
    <Link
      href={onViewDetails ?? "#"}
      className="w-full h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={isHovered && hoverImage ? hoverImage : image}
          alt={`${label} Image`}
          fill
          className="object-cover transition-transform duration-300"
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
              {typeof price === "number" || !isNaN(Number(price))
                ? formatPrice(Number(price))
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
            onClick={handleAddToCart}
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
