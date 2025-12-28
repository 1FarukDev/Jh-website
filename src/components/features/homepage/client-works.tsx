"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/api/client";
import ClientImage from "@public/assets/png/clientimage.png";

interface ClientWorkProps {
  name: string;
  subText: string;
  images: string[];
}

function ClientWork() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const {
    data: clientWorks = [],
    isLoading,
    error,
  } = useQuery<ClientWorkProps[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const scrollByAmount = () => {
    if (!scrollRef.current) return 0;
    return scrollRef.current.offsetWidth * 0.8;
  };

  const handlePrev = () => {
    scrollRef.current?.scrollBy({
      left: -scrollByAmount(),
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    scrollRef.current?.scrollBy({
      left: scrollByAmount(),
      behavior: "smooth",
    });
  };

  // Track scroll position → step counter
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateSteps = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const steps = Math.ceil(el.scrollWidth / el.clientWidth);
      const current = Math.round((el.scrollLeft / maxScroll) * (steps - 1));

      setTotalSteps(steps);
      setCurrentStep(isNaN(current) ? 0 : current);
    };

    updateSteps();
    el.addEventListener("scroll", updateSteps);
    window.addEventListener("resize", updateSteps);

    return () => {
      el.removeEventListener("scroll", updateSteps);
      window.removeEventListener("resize", updateSteps);
    };
  }, [clientWorks]);

  return (
    <section className="my-[100px] px-4 md:px-15">
      <p className="md:text-[45px] text-[25px] font-semibold mb-2 md:font-normal text-center">
        Clients / Collaborations
      </p>
      <p className="md:text-lg text-sm text-center text-[#4E5157]">
        Explore our portfolio of prints designed with care for forward-thinking
        brands.
      </p>

      {!isLoading && clientWorks.length > 0 && (
        <>
          <div ref={scrollRef} className="mt-8 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 snap-x snap-mandatory">
              {clientWorks.map((work, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[85%] md:w-[40%] min-h-[400px] md:min-h-[600px] snap-start"
                >
                  <Image
                    src={work.images?.[0] || ClientImage}
                    alt={work.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-[#07070737] flex flex-col items-center justify-center gap-4 text-white p-4 text-center">
                    <p className="text-[20px] md:text-[30px]">{work.name}</p>
                    <p className="text-sm md:text-base">{work.subText}</p>
                    <Button
                      className="bg-white text-black rounded-none px-6"
                      onClick={() => router.push("/client")}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 px-4">
            <button
              onClick={handlePrev}
              className="border rounded-full border-black p-3 hover:bg-black hover:text-white"
            >
              <Icon icon="guidance:right-arrow" width="20" height="20" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`transition-all h-1 ${
                    currentStep === i
                      ? "bg-[#1C1B0B] w-[50px] rounded-4xl"
                      : "bg-gray-300 w-[10px] rounded-full"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="border rounded-full border-black p-3 hover:bg-black hover:text-white"
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
