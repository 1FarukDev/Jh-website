"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import FirstImage from "@/app/assets/png/bento1.png";
import SecondImage from "@/app/assets/png/bento2.png";
import ThirdImage from "@/app/assets/png/bento3.png";
import FourthImage from "@/app/assets/png/bento4.png";
import OffTag from '@/app/assets/svg/offtag.svg'

function BentoSection() {
    return (
        <section className="my-12 mx-auto">
            <BlogComponent />
        </section>
    );
}

export default BentoSection;

function BlogComponent() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden h-auto lg:h-[500px] md:px-15 px-4">
                <div
                    // data-aos="fade-right"
                    // data-aos-duration="1000"
                    className="relative rounded-none bg-[#1c1b0b0c] w-full h-[220px] sm:h-[250px] lg:h-full border  overflow-hidden min-w-0"
                >
                    {/* <div className="absolute inset-0 bg-black/10" /> */}
                    <div className="absolute inset-0 flex flex-col text-black justify-center items-center p-4 sm:p-6 lg:p-8 text-center">
                        <div className="max-w-lg">
                            <h1 className="text-lg text-black sm:text-2xl lg:text-4xl font-light  mb-3 tracking-wide leading-tight">
                                Where Prints Tells Your Story
                            </h1>
                            <p className=" text-sm sm:text-base font-satoshi leading-relaxed mb-4">
                                Each piece is a story—told through texture,
                                tone, and timeless print.
                            </p>
                            <Button
                                className="relative overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
          bg-black border-white text-white  hover:text-black hover:border-black rounded-none py-2 transition-all duration-300 group"
                            >
                                <span className="relative z-10 flex items-center">
                                    View collection
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </span>
                                <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                            </Button>
                        </div>
                    </div>
                    {/* <BorderBeam duration={8} size={100} /> */}
                </div>

                {/* Right container */}
                <div
                    // data-aos="fade-left"
                    // data-aos-duration="1000"
                    className="flex flex-col gap-4 min-w-0 h-auto lg:h-full"
                >
                    {/* Top image */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="relative w-full h-[220px] sm:h-[280px] lg:flex-[2] rounded-none overflow-hidden min-w-0"
                    >
                        <Image
                            src={SecondImage}
                            alt="Traditional textile patterns"
                            fill
                            className="object-cover transform transition-transform duration-300 ease-out hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                            <div className="max-w-md">
                                <h2 className="text-base sm:text-xl lg:text-2xl font-light text-white mb-2 tracking-wide leading-tight">
                                    Where Fabric Tells Your story
                                    
                                </h2>
                                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-satoshi mb-3">
                                    Each piece is a story—told through texture,
                                    tone, and timeless print.
                                </p>
                                <Button
                                    className="relative overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
              bg-transparent border-white text-white hover:text-black rounded-none py-2 transition-all duration-300 group"
                                >
                                    <span className="relative z-10 flex items-center">
                                        About Us
                                    </span>
                                    <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex-1 min-w-0">
                        <div
                            // data-aos="fade-up-right"
                            // data-aos-duration="1000"
                            className="relative w-full h-[180px] sm:h-[200px] rounded-none overflow-hidden min-w-0"
                        >
                            <Image
                                src={ThirdImage}
                                alt="Textile studio workspace"
                                fill
                                className="object-cover transform transition-transform duration-300 ease-out hover:scale-105"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                                <div className="max-w-xs">
                                    {/* <h3 className="text-sm sm:text-lg font-light text-white mb-1 tracking-wide leading-tight">
                                        Sustainable Threads
                                    </h3>
                                    <p className="text-white/90 text-xs leading-relaxed font-satoshi">
                                        Responsibly made, ethically sourced.
                                    </p> */}
                                </div>
                            </div>
                        </div>

                        <div
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            className="relative w-full h-[180px] sm:h-[200px] rounded-none overflow-hidden min-w-0 bg-[#2A1407]"
                        >
                            {/* <Image
                                src={FourthImage}
                                alt="Creative textile process"
                                fill
                                className="object-cover transform transition-transform duration-300 ease-out hover:scale-105"
                            /> */}
                            {/* <div className="absolute inset-0 bg-black/50" /> */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-3 sm:p-4 text-center">
                                <div className="max-w-xs space-y-2">
                                    {/* <h3 className="text-xs font-satoshi text-gray-300 font-light tracking-wide">
                                        Limited Collection
                                    </h3>
                                    <p className="text-white/90 text-3xl sm:text-4xl leading-relaxed font-bold">
                                        50% Off
                                    </p> */}
                                    <Image 
                                    src={OffTag}
                                    alt="offtag"
                                    width={200}
                                    />
                                    <Button
                                        size="sm"
                                        className="border font-satoshi text-xs mt-4 bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none px-4 sm:px-6 py-2 transition-all duration-300"
                                    >
                                        Shop Now
                                        <ArrowRight className="ml-2 h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
