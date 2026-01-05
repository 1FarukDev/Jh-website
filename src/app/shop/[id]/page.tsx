"use client";

import React, { useState } from "react";
import { Info, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import Likes from "@/components/features/shop/likes";
import PrintMockup from "@/components/features/shop/print-mockup";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/api/product";
import Image from "next/image";
import { useCurrency } from "@/context/currency-context";
import { useCart } from "@/context/cart-context";

interface Color {
  text: string;
  value: string;
  code: string;
}

function Page() {
  const router = useRouter();
  const params = useParams();
  const { formatPrice } = useCurrency();
  const { addToCart: addToCartContext } = useCart();
  const id = params?.id
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : null;

  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as unknown as number),
    enabled: id !== null,
  });

  const colors: Color[] = [
    { text: "Blue", value: "Blue", code: "#3570E0" },
    { text: "Red", value: "Red", code: "#992626" },
    { text: "Green", value: "Green", code: "#8A8635" },
    { text: "Dark Blue", value: "Dark Blue", code: "#141B34" },
  ];

  const handleAddToCart = () => {
    if (productData) {
      addToCartContext({
        productId: productData.id,
        name: productData.name,
        title: productData.name,
        price: Number(productData.price) || 0,
        image: productData.images[0] || "",
        images: productData.images,
        category: productData.category,
        exclusivity: "Non-Exclusive Print",
        size: 'Scaled to 10.4" x 12.5"',
      });
    }
  };

  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="py-26 px-4">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => router.push("/shop")}
        >
          <MoveLeft strokeWidth={1} />
          <p className="font-satoshi text-xs">Back to Shop</p>
        </div>
        <div className="flex md:flex-row flex-col gap-3 mt-5">
          <div className="md:w-1/2 w-full min-h-[50vh]">
            <PrintMockup
              print={productData.images[0]}
              images={productData.images}
            />
          </div>
          <div className="md:w-1/2 w-full">
            <p className="font-satoshi text-[#4E5157] text-lg">
              {productData?.category}
            </p>
            <p className="text-[40px] text-[#230D06]">{productData?.name}</p>

            <hr className="my-4" />

            <section className="flex flex-col gap-6">
              <div>
                <p className="font-satoshi font-normal">About</p>
                <p className="font-satoshi font-normal">
                  <span className="font-bold">"{productData?.name}"</span>{" "}
                  <div
                    className="prose prose-lg font-satoshi prose-satoshi mx-auto text-[#4E5157]"
                    dangerouslySetInnerHTML={{ __html: productData.description }}
                  />
                </p>
              </div>

              <div className="font-satoshi">
                <p className="font-light">Exclusivity</p>
                <div className="flex gap-2 items-center mt-3">
                  <p className="border px-4 py-2 rounded-none border-black font-light">
                    NON-EXCLUSIVE PRINT
                  </p>
                  <p className="border px-4 py-2 rounded-none border-black font-light">
                    EXCLUSIVE PRINT
                  </p>
                </div>
              </div>

              {/* <div className="font-satoshi text-black ">
                <p className=" font-light">
                  Color: <span className="font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2 items-center mt-3">
                  {productData?.images.map((image:any) => (
                    <Image
                      key={image}
                      className={`w-[40px] h-[40px] cursor-pointer rounded-none border transition-all duration-200 ${
                        selectedColor === image.value
                          ? "border-2 border-black"
                          : "border border-gray-300"
                      }`}
                      style={{ backgroundColor: image.code }}
                      src={image}
                      alt=""
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
              </div> */}

              <div className="font-satoshi text-black ">
                <p className=" font-light">Size:</p>
                <div className="border px-4 py-2 border-black w-max font-normal text-xs mt-3">
                  Scaled to 10.4" x 12.5
                </div>
                <div className="text-xs flex items-center gap-2 mt-1 ">
                  <Info strokeWidth={1} width={20} />
                  <p className="text-[#828892]">
                    The size of the print can be tailored to fit any client's
                    request, ensuring a perfect match for any project.
                  </p>
                </div>
              </div>
            </section>

            <hr className="my-4" />

            <div>
              <p className="font-satoshi text-[#4E5157]">Price</p>
              <p className="text-[40px] font-bold">
                {formatPrice(Number(productData?.price) || 0)}
              </p>
            </div>
            <div className="font-satoshi font-light w-full md:flex-row flex-col flex gap-3 mt-6">
              <Button
                className="bg-black text-white rounded-none shadow-none md:w-1/2 h-12 hover:bg-opacity-90 transition"
                onClick={() => {
                  handleAddToCart();
                  router.push("/cart");
                }}
              >
                Buy Now
              </Button>
              <Button
                className="bg-white text-black border border-black rounded-none shadow-none md:w-1/2 h-12 hover:bg-gray-100 transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <Likes />
      </div>
    </section>
  );
}

export default Page;
