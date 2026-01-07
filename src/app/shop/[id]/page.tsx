"use client";

import React, { useState } from "react";
import { Info, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import Likes from "@/components/features/shop/likes";
import PrintMockup from "@/components/features/shop/print-mockup";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/api/product";
import { useCurrency } from "@/context/currency-context";
import { useCart } from "@/context/cart-context";
import { CustomSelect } from "@/components/select";
import { FormCheckbox } from "@/components/checkbox";
import { useForm, FormProvider } from "react-hook-form";

interface Color {
  text: string;
  value: string;
  code: string;
}

function Page() {
  const [scale, setScale] = useState(1);
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

  // --- Form setup for checkbox + variants ---
  const form = useForm({
    defaultValues: {
      print_development: false,
      color_variant: "",
    },
  });

  const { setValue: setFormValue, getValues } = form;
  const [colorValue, setColorValue] = useState("");

  // --- Colors example, can be used later if you want swatches ---
  const colors: Color[] = [
    { text: "Blue", value: "Blue", code: "#3570E0" },
    { text: "Red", value: "Red", code: "#992626" },
    { text: "Green", value: "Green", code: "#8A8635" },
    { text: "Dark Blue", value: "Dark Blue", code: "#141B34" },
  ];

  const handleAddToCart = () => {
    if (!productData) return;

    const print_development = getValues("print_development");
    const color_variant = getValues("color_variant");

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
      print_development,
      color_variant,
    });
  };

  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
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
                scale={scale}
                onScaleChange={setScale}
              />
            </div>

            <div className="md:w-1/2 w-full">
              <p className="font-satoshi text-[#4E5157] text-lg">
                {productData?.category}
              </p>
              <p className="text-[40px] text-[#230D06]">{productData?.name}</p>

              <hr className="my-4" />

              <section className="flex flex-col gap-6">
                {productData?.description && (
                  <div className="max-w-3xl">
                    <p className="font-satoshi font-normal">About</p>
                    <div
                      className="prose prose-lg font-satoshi prose-satoshi mx-auto"
                      dangerouslySetInnerHTML={{
                        __html: productData.description,
                      }}
                    />
                  </div>
                )}

                <div className="font-satoshi text-[#4E5157]">
                  <p className="font-satoshi font-bold">Delivery Guide</p>
                  <p className="font-medium">
                    After selecting your print, you'll receive scale options via
                    email within 24 hours. Once you confirm your choice, we'll
                    deliver the high-resolution final file (300 DPI) in JPG,
                    TIFF, or PNG format, along with a commercial license. Other
                    file types are available for an additional fee.
                  </p>
                  <p>
                    Need changes before purchase? Use the drop-down buttons
                    above to request custom colorways or print
                  </p>
                  <ul className="mt-4">
                    <li>- Print Modification </li>
                    <li className="flex items-center gap-2">
                      - Additional color variants:
                      <CustomSelect
                        value={colorValue}
                        onValueChange={(val) => {
                          setColorValue(val);
                          setFormValue("color_variant", val, {
                            shouldDirty: true,
                          });
                        }}
                        placeholder="variants counts"
                        options={[
                          { label: "1", value: "1" },
                          { label: "2", value: "2" },
                          { label: "3", value: "3" },
                        ]}
                        className="h-2"
                      />
                    </li>
                    <li className="flex items-center gap-2">
                      -
                      <FormCheckbox
                        name="print_development"
                        label={
                          <span>
                            Print development: Custom quote provided via email
                          </span>
                        }
                      />
                    </li>
                  </ul>
                </div>

                <div className="font-satoshi">
                  <p className="font-light">Exclusivity</p>
                  <div className="flex gap-2 items-center mt-3">
                    <p className="border px-4 py-2 rounded-none border-black font-light">
                      {productData?.exclusive
                        ? "EXCLUSIVE PRINT"
                        : "NON-EXCLUSIVE PRINT"}
                    </p>
                  </div>
                </div>

                <div className="font-satoshi text-black">
                  <p className="font-light">Size:</p>
                  <div className="border px-4 py-2 border-black w-max font-normal text-xs mt-3">
                    Scaled to {scale.toFixed(1)}x
                  </div>
                  <div className="text-xs flex items-center gap-2 mt-1">
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
    </FormProvider>
  );
}

export default Page;
