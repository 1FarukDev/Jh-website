"use client";

import React from "react";
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

  if (isClientLoading) {
    return (
      <section className="py-[100px] flex justify-center items-center">
        <p>Loading client details...</p>
      </section>
    );
  }

  return (
    <section className="py-[100px] px-10">
      <div className="flex flex-col leading-tight mb-8 items-center text-center">
        <h1 className="font-normal text-[60px]">{clientData?.name || "Client Name"}</h1>
        <p className="text-[#4E5157] font-normal text-lg font-satoshi max-w-[600px]">
          {clientData?.description ||
            "Commissioned installation using indigo and rust dye techniques, tailored for a calm reception space."}
        </p>
      </div>

      <div className="columns-1 md:columns-3 space-y-3">
        {clientData?.images && clientData.images.length > 0 ? (
          clientData.images.map((img: string, index: number) => (
            <div key={index} className="relative overflow-hidden ">
              <Image
                src={img}
                alt={`${clientData.name || "Client"} image ${index + 1}`}
                width={800}
                height={800}
                className="w-full h-auto  object-contain"
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
