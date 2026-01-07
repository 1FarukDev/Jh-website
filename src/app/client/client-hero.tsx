"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import ClientBg from "@/app/assets/png/clients-and-collaborations-jh-textiles.jpg";
import { ArrowRight } from "lucide-react";

function ClientHero() {
  const router = useRouter();
  return (
    <div className="w-full relative h-[90vh] overflow-hidden">
      <Image
        src={ClientBg}
        alt="Hero"
        width={1920}
        height={200}
        className="w-full object-cover mx-auto h-full"
        priority
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
        <div className="max-w-5xl mx-auto">
          <p
            data-aos="fade-up"
            data-aos-duration="1200"
            className="text-[32px] leading-[48px] md:text-[70px] md:leading-[100px] font-extralight font-rose "
          >
            {/* Collaborations  Rooted in creativity */}
            Collaborations Trusted to interpret ideas into print.
          </p>

          <p className="mt-4 font-satoshi">
            Trusted to interpret ideas into print, we’ve spent over 5 years
            collaborating with brands to translate creative visions into
            standout surface designs. From paintings to digital renderings, and
            employing experimental techniques, we ensure each print has a unique
            identity. Our work spans apparel and packaging, with each design
            carefully developed to ensure originality, brand recognition, and
            market distinction.
          </p>
        </div>

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

export default ClientHero;
