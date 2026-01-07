"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getClientById } from "@/services/api/client";

function Details() {
  const params = useParams();
  const slug = params?.slug;

  const { data: clientData, isLoading: isClientLoading } = useQuery({
    queryKey: ["client", slug],
    queryFn: () => getClientById(slug as string),
    enabled: !!slug,
  });

  const [loadedImages, setLoadedImages] = useState<number>(0);

  const totalImages = clientData?.images?.length || 6;

  const allLoaded = loadedImages === (clientData?.images?.length || 0);

  const skeletonArray = Array.from({ length: totalImages });

  return (
    <section className="py-[100px] px-10">
      <div className="flex flex-col leading-tight mb-8 items-center text-center">
        <h1 className="font-normal text-[60px]">
          {clientData?.name || "Client Name"}
        </h1>
        <p className="text-[#4E5157] font-normal text-lg font-satoshi max-w-[600px]">
          {clientData?.description ||
            "Commissioned installation using indigo and rust dye techniques, tailored for a calm reception space."}
        </p>
      </div>

      <div className="columns-1 md:columns-3 gap-3 space-y-3">
        {isClientLoading ? (
          skeletonArray.map((_, idx) => (
            <div
              key={idx}
              className="w-full mb-3 break-inside-avoid animate-pulse bg-gray-200"
              style={{
                height: `${150 + Math.random() * 600}px`,
              }}
            />
          ))
        ) : clientData?.images && clientData.images.length > 0 ? (
          clientData.images.map((img: string, index: number) => (
            <div
              key={index}
              className="relative mb-3 w-full break-inside-avoid overflow-hidden"
            >
              <Image
                src={img}
                alt={`${clientData.name || "Client"} image ${index + 1}`}
                width={800}
                height={800}
                className="w-full h-auto object-cover"
                onLoadingComplete={() => setLoadedImages((prev) => prev + 1)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </div>
    </section>
  );
}

export default Details;
