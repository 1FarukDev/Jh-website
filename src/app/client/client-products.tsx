"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/api/client";

function ClientProducts() {
  const router = useRouter();

  const {
    data: clientsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const renderSkeleton = () =>
    Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="relative flex flex-col items-center justify-center h-[400px] md:h-[500px] bg-gray-200 animate-pulse"
      >
        <div className="absolute inset-0 bg-gray-300" />
      </div>
    ));

  const renderClientCards = () =>
    clientsData.map((client: any, index: number) => (
      <div
        key={client.id || index}
        className="relative flex flex-col items-center justify-center h-[400px] md:h-[500px] text-white overflow-hidden group"
      >
        <Image
          src={client.images[0]}
          alt={client.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#0707075e] flex flex-col items-center justify-center gap-4 p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[18px] md:text-[24px] leading-[32px] tracking-tighter">
            {client.title || client.name || "Untitled Project"}
          </p>
          <p className="md:text-sm text-xs font-satoshi -mt-1 line-clamp-3">
            {client.description ||
              client.subText ||
              "A beautiful textile project showcasing creativity and craftsmanship."}
          </p>
          <Button
            className="bg-white text-black font-satoshi rounded-none px-4 md:px-6"
            onClick={() => router.push(`/client/${client.id}`)}
          >
            View Project
          </Button>
        </div>
      </div>
    ));

  return (
    <section className="my-[100px] px-4 md:px-15">
      <p className="md:text-[60px] text-[28px] font-light text-center leading-[40px]">
        Highlights
      </p>
      <p className="md:text-lg text-sm font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[40px] mt-2">
        Browse through a selection of creative projects for brands from our
        portfolio
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-8">
        {isLoading ? (
          renderSkeleton()
        ) : isError ? (
          <p className="col-span-full text-center py-20 text-red-500">
            Failed to load client data.
          </p>
        ) : clientsData.length > 0 ? (
          renderClientCards()
        ) : (
          <p className="col-span-full text-center py-20 text-gray-500">
            No client projects available.
          </p>
        )}
      </div>
    </section>
  );
}

export default ClientProducts;
