"use client";

import React from "react";
import BlogFilters from "../features/blog/blog-filters";
import BlogImage from "@/app/assets/png/blog--image.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveLeft, MoveRight } from "lucide-react";
import ClientMessage from "../features/client/client-message";
import BlogCard from "@/components/blog-card";

function BlogPage() {
    const featuredPrints = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        image: BlogImage,
        description: "Explore the beauty of hand-made irregularities ",
        title: `The Art of Imperfection`,
        price: 25000,
    }));

    return (
        <section className="py-26">
            <div className="">
                <div className="flex flex-col items-center justify-center mb-10">
                    <h1 className="text-[30px] text-center md:text-[80px] text-[#230D06] tracking-tight">
                        In the Studio & In the Press
                    </h1>
                    <p className="font-satoshi text-xs text-center md:text-base text-[#4E5157] leading-[20px]">
                        Stories from behind the loom, creative thoughts, process
                        journals, and moments we've been featured.
                    </p>
                </div>
                <BlogFilters />

                <div className="">
                    <div className="flex justify-between items-start">
                        <div className="w-1/2 p-8">
                            <p className="font-normal text-[50px] leading-[50px] ">
                                Why We Embrace Irregular Prints
                            </p>
                            <p className="font-normal font-satoshi mt-5 text-base text-[#4E5157]">
                                Explore the beauty of hand-made irregularities
                                in block printing and dyeing, and why Wabi-Sabi
                                aesthetics play a vital role in JH Textile’s
                                design philosophy.
                            </p>

                            <Button
                                className="relative overflow-hidden mt-5 border-black border px-6 sm:px-8 font-satoshi text-xs sm:text-sm 
                                bg-transparent text-black hover:text-white rounded-none py-2 transition-all duration-300 group"
                            >
                                <span className="relative z-10 flex items-center">
                                    Read More
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </span>
                                <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                            </Button>
                        </div>
                        <div className="w-1/2 border-l p-8 border-[#8A8635]">
                            <div className="w-full h-[600px] relative">
                                <Image
                                    src={BlogImage}
                                    alt="blog image"
                                    className="h-full"
                                    fill
                                />
                            </div>
                        </div>
                    </div>

                    <section className="">
                        {Array.from({
                            length: Math.ceil(featuredPrints.length / 3),
                        }).map((_, rowIndex) => {
                            const start = rowIndex * 3;
                            const end = start + 3;
                            const rowItems = featuredPrints.slice(start, end);

                            return (
                                <div
                                    key={rowIndex}
                                    className="flex border-t border-[#8A8635]"
                                >
                                    {rowItems.map((item, colIndex) => (
                                        <div
                                            key={item.id}
                                            className={`w-1/3 p-4 ${
                                                colIndex !== rowItems.length - 1
                                                    ? "border-r border-[#8A8635]"
                                                    : ""
                                            }`}
                                        >
                                            <BlogCard
                                                image={item.image}
                                                title="Beautiful Prints"
                                                description="Exploring the inspirations behind our latest hand-printed collection, woven from memory and salt air."
                                                onReadMore={() =>
                                                    console.log(
                                                        "Read more clicked"
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </section>
                </div>

                <div className="mt-10 flex justify-between items-center w-full px-4 md:px-[30px]">
                    <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8">
                        <MoveLeft strokeWidth={0.5} />
                        Previous
                    </Button>
                    <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8">
                        Next
                        <MoveRight strokeWidth={0.5} />
                    </Button>
                </div>
            </div>

            <ClientMessage />
        </section>
    );
}

export default BlogPage;
