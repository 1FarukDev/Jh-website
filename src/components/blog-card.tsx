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
    height = "auto", // optional height
}) => {
    return (
        <div className="flex flex-col h-full" style={{ height }}>
            <div className="w-full relative">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover"
                />
            </div>

            <div className="mt-2 flex-1 flex flex-col -space-y-2 justify-between">
                <div>
                    <p className="text-[32px] font-semibold">{title}</p>
                    <p className="font-satoshi">{description}</p>
                </div>

                <Button
                    className="relative w-max overflow-hidden mt-5 border-black border px-6 sm:px-8 font-satoshi text-xs sm:text-sm 
                                bg-transparent text-black hover:text-white rounded-none py-2 transition-all duration-300 group"
                    onClick={onReadMore}
                >
                    <span className="relative z-10 flex items-center">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </span>

                    <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Button>
            </div>
        </div>
    );
};

export default BlogCard;
