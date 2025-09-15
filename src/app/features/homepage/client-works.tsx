"use client";
import React, { useState } from "react";
import ClientImage from "@public/assets/png/clientimage.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";


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
    {
      text: "AUTUMN LEAVES COLLECTION",
      subText: "Warm-toned textiles for seasonal interior design projects.",
      image: ClientImage,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 2;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(clientWorks.length - itemsPerSlide, 0)
        : prev - itemsPerSlide
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerSlide >= clientWorks.length ? 0 : prev + itemsPerSlide
    );
  };

  const currentWorks = clientWorks.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  const totalSlides = Math.ceil(clientWorks.length / itemsPerSlide);

  const currentSlide = Math.floor(currentIndex / itemsPerSlide);

  return (
    <section className="my-[100px] px-4 md:px-15">
      <p className="md:text-[60px] text-[28px] md:px-0 px-4 font-light text-center leading-[40px]">
        Client Work Highlights
      </p>
      <p className="md:text-lg text-sm md:px-0 px-4 font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[40px]">
        A creative textile studio crafting meaningful prints, rooted in texture,
        tradition, and storytelling.
      </p>

      <div className="flex flex-col md:flex-row items-center mt-8 gap-4">
        {currentWorks.map((work, index) => (
          <div
            key={currentIndex + "-" + index}
            className="flex-1 relative flex flex-col items-center justify-center h-[400px] md:h-[600px] text-white overflow-hidden "
          >
            <Image
              src={work.image}
              alt={work.text}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#5C3B00CC] flex flex-col items-center justify-center gap-4 p-4 text-center">
              <p className="text-[20px] md:text-[30px] leading-[48px] tracking-tighter">
                {work.text}
              </p>
              <p className="md:text-base text-sm font-satoshi -mt-2">
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
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 px-4 gap-4">
        <button
          onClick={handlePrev}
          className="border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors"
        >
          <Icon icon="guidance:right-arrow" width="20" height="20" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-1 ${
                currentSlide === i
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
