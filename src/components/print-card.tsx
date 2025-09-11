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
        <section className="w-full h-full flex flex-col">
            <div className="relative w-full aspect-square sm:aspect-square md:aspect-square lg:aspect-square xl:aspect-square">
                <Image
                    src={image}
                    alt={`${label} Image`}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

                    <Button
                        className="bg-white hover:bg-gray-50 border border-black text-black font-satoshi 
                     rounded-none font-normal shadow-none
                     px-3 sm:px-4 md:px-6 lg:px-8 
                     py-2 sm:py-2.5 
                     text-xs sm:text-sm md:text-base
                     flex-1 transition-colors duration-200"
                        onClick={onViewDetails}
                    >
                        <span className="sm:hidden">Details</span>
                        <span className="hidden sm:inline">View Details</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default PrintCard;
