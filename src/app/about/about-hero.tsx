"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import AboutImage from "@/app/assets/png/about jh textiles.jpg";
import { ArrowRight } from "lucide-react";

function AboutHero() {
  const handleScroll = () => {
    const section = document.getElementById("about-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative h-[90vh] overflow-hidden">
      <Image
        src={AboutImage}
        alt="JH Textiles studio — about our textile print design and surface pattern work"
        width={1920}
        height={200}
        className="w-full object-cover mx-auto h-full"
        priority
      />

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
        <p className="text-[32px] leading-[48px] md:text-[90px] md:leading-[100px] font-extralight font-rose">
          J.H Textiles
        </p>

        {/* <p className="mt-4 font-satoshi max-w-2xl mx-auto">
          Where creativity meets tradition merging experimentation to craft intentional designs fueled by creativity
        </p> */}
      </div>
    </div>
  );
}

export default AboutHero;
