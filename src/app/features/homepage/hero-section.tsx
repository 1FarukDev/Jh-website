"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HeroImage from "@/app/assets/png/hero-bg.jpg";
import MobileHero from "@/app/assets/png/hero-bg-mobile.jpg";
import { TextAnimate } from "@/components/text-animate";
import { ArrowRight } from "lucide-react";

function Hero() {
    const router = useRouter();

    return (
        <div className="w-full relative">
            <Image
                src={HeroImage}
                alt="Hero"
                width={1920}
                height={200}
                className="hidden md:block w-full object-cover mx-auto"
                priority
            />

            <div className="block md:hidden relative h-[85vh] w-full">
                <Image
                    src={MobileHero}
                    alt="Hero Mobile"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute top-[50%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
                <p
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    className="text-[32px] leading-[48px] md:text-[100px] md:leading-[100px] font-extralight font-rose"
                >
                    Prints That Pulse <br className="hidden md:block" /> With
                    Meaning
                </p>

                <p>
                    Each piece is a story—told through texture, tone, and
                    timeless print.
                </p>
                <Button
                    onClick={() => router.push("/shop")}
                    className="relative overflow-hidden border mt-8 px-6 sm:px-8 font-satoshi text-xs sm:text-sm 
    bg-white border-white text-black hover:text-white rounded-none py-2 
    transition-all duration-300 group w-[140px] hover:w-[170px]"
                >
                    <span className="relative z-10 flex items-center justify-center">
                        View collection
                        <ArrowRight className="ml-2 h-4 w-4 hidden group-hover:inline opacity-0 -translate-x-2 transform transition-all duration-300 text-white group-hover:opacity-100 group-hover:translate-x-0" />
                    </span>

                    <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Button>
            </div>
        </div>
    );
}

export default Hero;
