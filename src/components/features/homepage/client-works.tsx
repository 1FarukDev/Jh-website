"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/api/client";
import ClientImage from "@public/assets/png/clientimage.png";

interface ClientWorkProps {
  name: string;
  subText: string;
  images: string[] ;
}

function ClientWork() {
  const router = useRouter();

  const {
    data: clientWorks = [],
    isLoading,
    error,
  } = useQuery<ClientWorkProps[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

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
      <p className="md:text-[60px] text-[28px] font-light text-center leading-[40px]">
        Client Work Highlights
      </p>
      <p className="md:text-lg text-sm font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[40px]">
        A creative textile studio crafting meaningful prints, rooted in texture,
        tradition, and storytelling.
      </p>

      {isLoading && (
        <div className="flex flex-col md:flex-row items-center mt-8 gap-4">
          {Array.from({ length: itemsPerSlide }).map((_, index) => (
            <div
              key={index}
              className="w-full min-h-[400px] md:min-h-[600px] bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 mt-6">
          Failed to load client projects. Please try again later.
        </div>
      )}

      {!isLoading && !error && clientWorks.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          No client work available at the moment.
        </div>
      )}

      {!isLoading && clientWorks.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row items-center mt-8 gap-4">
            {currentWorks.map((work, index) => (
              <div
                key={currentIndex + "-" + index}
                className="relative flex flex-col items-center justify-center w-full min-h-[400px] md:min-h-[600px] text-white overflow-hidden"
              >
                <Image
                  src={work.images[0] || ClientImage}
                  alt={work.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#07070737] flex flex-col items-center justify-center gap-4 p-4 text-center">
                  <p className="text-[20px] md:text-[30px] leading-[48px] tracking-tighter">
                    {work.name}
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
        </>
      )}
    </section>
  );
}

export default ClientWork;
