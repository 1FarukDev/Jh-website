"use client";

import React from "react";
import Filters from "../features/shop/filters";
import PrintImage from "@public/assets/png/print.png";
import PrintCard from "@/components/print-card";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import ShopImage from "@/app/assets/png/shop.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function page() {
    const router = useRouter();

    const featuredPrints = Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        image: PrintImage,
        label: "Print",
        title: `Green Gradient ${i + 1}`,
        price: 25000,
    }));

    const hnadleViewDetails = (productId: string | number) => {
        router.push(`/shop/${productId}`);
    };

    return (
        <section>
            <div className="pt-15">
                <Image src={ShopImage} alt="shop" />
            </div>
            <div className="">
                <div className="pt-10">
                    <h1 className="text-center font-light text-[20px] md:text-[80px]">
                        Shop Prints & Textiles
                    </h1>
                    <p className="font-satoshi font-normal md:text-xl text-base text-[#4E5157] text-center -mt-3">
                        Each piece is a story—told through texture, tone, and
                        timeless print.
                    </p>
                </div>
                <div className="mt-10 md:px-[30px] px-4">
                    <Filters />
                </div>

                <section className="mt-[45px]">
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
                                        <PrintCard
                                            image={item.image}
                                            label={item.label}
                                            title={item.title}
                                            price={item.price}
                                            onAddToCart={() =>
                                                console.log(
                                                    `Added ${item.title} to cart`
                                                )
                                            }
                                            onViewDetails={() =>
                                                hnadleViewDetails(item.id)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </section>

                <div className="mt-10 flex justify-between items-center w-full mb-10 md:px-[30px] px-4">
                    <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors  font-satoshi !px-8">
                        <MoveLeft strokeWidth={0.5} />
                        Previous
                    </Button>
                    <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors  font-satoshi !px-8">
                        Next
                        <MoveRight strokeWidth={0.5} />
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default page;
