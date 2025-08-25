"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function Studio() {
    return (
        <section className="my-16 px-4 mx-auto max-w-[1440px]">
            <p
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[60px] font-normal text-center leading-tight md:leading-[40px]"
            >
                In The Studio & In The Press
            </p>
            <p
                // data-aos="fade-up"
                // data-aos-delay="200"
                className="text-sm md:text-xl font-satoshi font-normal text-[#4E5157] text-center mt-2 max-w-2xl mx-auto"
            >
                A glimpse behind the canvas stories, thoughts & headlines.
            </p>
            <div className="mt-8 md:mt-12">
                <BlogComponent />
            </div>
        </section>
    );
}

export default Studio;

function BlogComponent() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 overflow-hidden">
                <div
                    data-aos="fade-right"
                    className="relative w-full aspect-[4/5] sm:aspect-[3/2] lg:aspect-[5/6] rounded-none overflow-hidden min-w-0"
                >
                    <Image
                        src="/assets/png/blog.jpg"
                        alt="Colorful traditional textiles and rugs"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                        <div className="max-w-md">
                            <h1 className="text-lg sm:text-2xl lg:text-3xl font-light text-white mb-3 sm:mb-4 tracking-wide leading-tight">
                                A DAY IN J.H TEXTILES&apos; STUDIO
                            </h1>
                            <p className="text-white/90 text-sm sm:text-base font-satoshi leading-relaxed mb-4 sm:mb-6">
                                From the first cup of coffee to the final
                                varnish stroke, here&apos;s what a day behind
                                the canvas looks like. Go inside Dara&apos;s
                                creative process and see how inspiration becomes
                                print.
                            </p>
                            <Button className="border px-5 sm:px-8 font-satoshi text-xs sm:text-sm bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none py-2 transition-all duration-300">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:gap-6 min-w-0">
                    <div
                        // data-aos="fade-left"
                        // data-aos-delay="200"
                        className="relative w-full aspect-[4/5] sm:aspect-[3/2] rounded-none overflow-hidden min-w-0"
                    >
                        <Image
                            src="/assets/png/blog.jpg"
                            alt="Traditional textile patterns"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                            <div className="max-w-sm">
                                <h2 className="text-base sm:text-xl lg:text-2xl font-light text-white mb-2 sm:mb-3 tracking-wide leading-tight">
                                    HOW I TURN STORIES INTO ART
                                </h2>
                                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-satoshi mb-3 sm:mb-4">
                                    Every print has a soul — and a story. In
                                    this post, I break down how personal
                                    memories, cultural roots, and moments of
                                    silence shape my visual language.
                                </p>
                                <Button className="border font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none px-5 sm:px-8 py-2 transition-all duration-300">
                                    Read More
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                        <div
                            // data-aos="fade-up"
                            // data-aos-delay="300"
                            className="relative w-full aspect-[4/5] sm:aspect-square rounded-none overflow-hidden min-w-0"
                        >
                            <Image
                                src="/assets/png/blog.jpg"
                                alt="Textile studio workspace"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                                <div className="max-w-xs">
                                    <h3 className="text-sm sm:text-lg font-light text-white mb-1 sm:mb-2 tracking-wide leading-tight">
                                        A DAY IN DARA&apos;S STUDIO
                                    </h3>
                                    <p className="text-white/90 text-xs leading-relaxed font-satoshi mb-3 sm:mb-4">
                                        From the first cup of coffee to the
                                        final varnish stroke, here&apos;s what a
                                        day behind the canvas looks like.
                                    </p>
                                    <Button
                                        size="sm"
                                        className="border font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none px-4 sm:px-6 py-1.5 sm:py-2 transition-all duration-300"
                                    >
                                        Read More
                                        <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div
                            // data-aos="fade-up"
                            // data-aos-delay="400"
                            className="relative w-full aspect-[4/5] sm:aspect-square rounded-none overflow-hidden min-w-0"
                        >
                            <Image
                                src="/assets/png/blog.jpg"
                                alt="Creative textile process"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                                <div className="max-w-xs">
                                    <h3 className="text-sm sm:text-lg font-light text-white mb-1 sm:mb-2 tracking-wide leading-tight">
                                        A DAY IN DARA&apos;S STUDIO
                                    </h3>
                                    <p className="text-white/90 text-xs leading-relaxed font-satoshi mb-3 sm:mb-4">
                                        Go inside J.H Textiles&apos; creative
                                        process and see how inspiration becomes
                                        print.
                                    </p>
                                    <Button
                                        size="sm"
                                        className="border font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none px-4 sm:px-6 py-1.5 sm:py-2 transition-all duration-300"
                                    >
                                        Read More
                                        <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3" />
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
