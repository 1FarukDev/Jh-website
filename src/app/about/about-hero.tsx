"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import ClientBg from "@/app/assets/png/clientbg.png"; // you can swap this for an "about" background later
import { ArrowRight } from "lucide-react";

function AboutHero() {
  const router = useRouter();
  return (
    <div className="w-full relative h-[90vh] overflow-hidden">
      <Image
        src={ClientBg}
        alt="About Hero"
        width={1920}
        height={200}
        className="w-full object-cover mx-auto h-full"
        priority
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
        <p className="text-[32px] leading-[48px] md:text-[90px] md:leading-[100px] font-extralight font-rose">
          About Our Studio <br className="hidden md:block" /> Designed with
          Passion
        </p>

        <p className="mt-4 font-satoshi max-w-2xl mx-auto">
          Discover the story behind our textile journey — where creativity meets
          tradition, and every pattern is crafted with meaning.
        </p>

        <Button
          onClick={() => router.push("/about")}
          className="relative overflow-hidden border mt-8 px-6 sm:px-8 font-satoshi text-xs sm:text-sm 
    bg-white border-white text-black hover:text-white rounded-none py-2 
    transition-all duration-300 group w-[140px] hover:w-[170px]"
        >
          <span className="relative z-10 flex items-center justify-center">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 hidden group-hover:inline opacity-0 -translate-x-2 transform transition-all duration-300 text-white group-hover:opacity-100 group-hover:translate-x-0" />
          </span>

          <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </Button>
      </div>
    </div>
  );
}

export default AboutHero;
