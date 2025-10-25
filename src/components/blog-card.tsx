"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
    image: StaticImageData;
    title: string;
    description: string;
    onReadMore?: () => void;
    height?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    image,
    title,
    description,
    onReadMore,
    height = "auto",
}) => {
    return (
        <div className="flex flex-col h-full" style={{ height }}>
            <div className="w-full relative aspect-[4/5] sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[3/2]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                />
            </div>

            <div className="mt-3 sm:mt-4 md:mt-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div className="">
                    <h3
                        className="text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] 
                                 font-semibold leading-tight line-clamp-2 text-black"
                    >
                        {title}
                    </h3>
                    <p
                        className="font-satoshi text-xs sm:text-base md:text-lg 
                                text-gray-600 leading-relaxed line-clamp-3"
                    >
                        {description}
                    </p>
                </div>

                <div className="pt-2 sm:pt-3">
                    <Button
                        className="relative w-full md:w-max overflow-hidden border-black border 
                                 px-4 sm:px-6 md:px-8 font-satoshi 
                                 text-xs sm:text-sm md:text-base
                                 bg-transparent text-black hover:text-white rounded-none 
                                 py-2 sm:py-2.5 transition-all duration-300 group"
                        onClick={onReadMore}
                    >
                        <span className="relative z-10 flex items-center">
                           
                            <span className="">Read More</span>
                            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </span>

                        <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
