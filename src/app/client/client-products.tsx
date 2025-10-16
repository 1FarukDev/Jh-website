"use client";

import React from "react";
import ClientImage from "@public/assets/png/clientimage.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/api/client";

interface ClientWorkProps {
  text: string;
  subText: string;
  image: string | StaticImageData;
}

function ClientProducts() {
  const router = useRouter();

    const {
    data: clientsData,
    isLoading: isClientDataLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });


  console.log(clientsData, 'clients')

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
    {
      text: "AUTUMN LEAVES COLLECTION",
      subText: "Warm-toned textiles for seasonal interior design projects.",
      image: ClientImage,
    },
    {
      text: "WINTER BLOOM SERIES",
      subText: "Textiles inspired by frosted landscapes and muted tones.",
      image: ClientImage,
    },
    {
      text: "TROPICAL ESCAPE",
      subText: "Vibrant prints capturing the essence of lush jungles.",
      image: ClientImage,
    },
    {
      text: "DESERT HUES",
      subText: "Warm, earthy tones reflecting arid landscapes.",
      image: ClientImage,
    },
    {
      text: "OCEAN WAVES",
      subText: "Soft flowing patterns inspired by the sea.",
      image: ClientImage,
    },
  ];

  return (
    <section className="my-[100px] px-4 md:px-15">
      <p className="md:text-[60px] text-[28px] font-light text-center leading-[40px]">
        Client Work Highlights
      </p>
      <p className="md:text-lg text-sm font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[40px] mt-2">
        A creative textile studio crafting meaningful prints, rooted in texture,
        tradition, and storytelling.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-8">
        {clientWorks.map((work, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center h-[400px] md:h-[500px] text-white overflow-hidden group"
          >
            <Image
              src={work.image}
              alt={work.text}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-[#5C3B00CC] flex flex-col items-center justify-center gap-4 p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[18px] md:text-[24px] leading-[32px] tracking-tighter">
                {work.text}
              </p>
              <p className="md:text-sm text-xs font-satoshi -mt-1">
                {work.subText}
              </p>
              <Button
                className="bg-white text-black font-satoshi rounded-none px-4 md:px-6"
                onClick={() => router.push("/client")}
              >
                View Project
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClientProducts;
