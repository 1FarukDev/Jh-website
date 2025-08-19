"use client";
import React, { useState } from "react";
import ClientImage from "@public/assets/png/clientimage.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import ClientBg from "@/app/assets/png/client.png";

interface ClientWorkProps {
    text: string;
    subText: string;
    image: string | StaticImageData;
}

function ClientWork() {
    const router = useRouter();
    const clientWorks: ClientWorkProps[] = [
        {
            text: "GRAPES PATTERN BANK",
            subText:
                "Commissioned installation using indigo and rust dye techniques, tailored for a calm reception space.",
            image: ClientImage,
        },
        {
            text: "MOSS TEXTILE SERIES",
            subText:
                "An abstract exploration of nature’s impermanence, designed for a botanical conservatory.",
            image: ClientImage,
        },
        {
            text: "SUNSET THREADS",
            subText:
                "Textile panels reflecting sunset hues, created for a coastal art exhibit.",
            image: ClientImage,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? clientWorks.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === clientWorks.length - 1 ? 0 : prev + 1
        );
    };

    const work = clientWorks[currentIndex];

    return (
        <section className="my-[100px]">
            <p className="md:text-[60px] text-[28px] md:px-0 px-4 font-light text-center leading-[40px]">
                Client Work Highlights
            </p>
            <p className="md:text-lg text-sm md:px-0 px-4 font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[40px]">
                A creative textile studio crafting meaningful prints, rooted in
                texture, tradition, and storytelling.
            </p>

            <div className="flex flex-col-reverse md:flex-row items-center mt-2 overflow-hidden bg-[#5C3B00] text-white transition-all duration-500">
                <div className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 relative">
                    <Image src={ClientBg} alt=";" />
                    <div className="absolute bg-[#5C3B00CC] flex flex-col items-center justify-center gap-4 w-[80%] p-4">
                        <p className="text-[20px] md:text-[30px] leading-[48px] tracking-tighter text-center">
                            {work.text}
                        </p>
                        <p className="md:text-base text-sm font-satoshi text-center -mt-4 md:-mt-2">
                            {work.subText}
                        </p>
                        <Button
                            className="bg-white text-black font-satoshi rounded-none px-6"
                            onClick={() => router.push("/client")}
                        >
                            View Project
                        </Button>
                    </div>
                </div>
                <div className="w-full md:w-[50%] ml-auto">
                    <Image
                        src={work.image}
                        alt={work.text}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 px-4 gap-4">
                <button
                    onClick={handlePrev}
                    className="border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors"
                >
                    <Icon icon="guidance:right-arrow" width="20" height="20" />
                </button>
                <div className="flex items-center gap-2">
                    {clientWorks.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-1 transition-all ${
                                currentIndex === i
                                    ? "bg-[#1C1B0B] w-[50px] rounded-4xl"
                                    : "bg-gray-300 w-[10px] rounded-full"
                            }`}
                        ></div>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors"
                >
                    <Icon icon="guidance:left-arrow" width="20" height="20" />
                </button>
            </div>
        </section>
    );
}

export default ClientWork;
