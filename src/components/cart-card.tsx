"use client";

import React from "react";
import Image from "next/image";
import CloseIcon from "@/app/assets/svg/close.svg";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";

interface CartCardProps {
  id?: number;
  image: any;
  title: string;
  exclusivity: string;
  colorLabel: string;
  colorCode: string;
  size: string;
  price: string | number;
  quantity?: number;
  onRemove?: () => void;
  onUpdateQuantity?: (quantity: number) => void;
  color_variant?: string;
  print_development?: boolean;
  print_modification?: boolean;
  images?: string[];
}

const CartCard: React.FC<CartCardProps> = ({
  id,
  image,
  title,
  exclusivity,

  size,
  price,
  onRemove,
  onUpdateQuantity,
  color_variant,
  print_development,
  print_modification,
  images,
}) => {

  const { formatPrice } = useCurrency();

  return (
    <section className="relative items-start border-b pb-4 md:pb-8 w-full bg-white">
      <div className="md:hidden">
        <div
          onClick={onRemove}
          className="absolute top-3 right-3 w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer bg-white z-10"
        >
          <Image src={CloseIcon} alt="Close icon" width={12} height={12} />
        </div>
      </div>
      <div className="flex flex-col  md:flex-row gap-3 md:gap-4 items-start w-full">
        <Image
          src={image}
          alt="Print Image"
          width={320}
          height={240}
          className="w-full md:w-[200px] h-auto border object-cover  mb-2 md:mb-0"
        />

        <div className="flex flex-col w-full mt-2 md:mt-0">
          <div className="flex flex-row justify-between items-start w-full">
            <div>
              <p className="font-satoshi text-xs md:text-base">Print</p>
              <p className="text-lg md:text-[30px] font-medium">{title}</p>
            </div>
            <div className="hidden md:flex">
              <div
                onClick={onRemove}
                className="w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer bg-white ml-4 mt-1"
              >
                <Image
                  src={CloseIcon}
                  alt="Close icon"
                  width={12}
                  height={12}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-6 w-full">
            <div className="font-satoshi">
              <p className="font-light mb-1 md:mb-2 text-xs md:text-sm">
                Exclusivity
              </p>
              <p className="font-normal w-max border border-black px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-base">
                {exclusivity}
              </p>
            </div>
            <div className="font-satoshi">
              <p className="font-light mb-1 md:mb-2 text-xs md:text-sm">
                Color variants
              </p>
              <div className="flex gap-1 items-center">
                {images?.map((image) => (
                  <Image
                    src={image}
                    alt="Print Image"
                    width={32}
                    height={32}
                    className="w-8 h-8 md:w-10 md:h-10 border object-cover rounded"
                  />
                ))}
              </div>
            </div>
            <div className="font-satoshi">
              <p className="font-light mb-1 md:mb-2 text-xs md:text-sm">Size</p>
              <p className="font-normal w-max border border-black px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-base">
                {size}
              </p>
            </div>

            {(print_modification || print_development || color_variant) && (
              <div className="font-satoshi">
                <p className="font-light mb-1 md:mb-2 text-xs md:text-sm">
                  Add-on
                </p>
                <div className="flex flex-wrap gap-2">
                  {print_modification && (
                    <p className="font-normal w-max border border-black px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-base">
                      Print Modification
                    </p>
                  )}
                  {print_development && (
                    <p className="font-normal w-max border border-black px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-base">
                      Print Development
                    </p>
                  )}
                  {color_variant && (
                    <p className="font-normal w-max border border-black px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-base">
                      Color Variant ({color_variant})
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div>
            <hr className="my-5" />
            <p className="font-satoshi mt-2 md:mt-4 text-xs md:text-base">
              Price
            </p>
            <p className="font-bold text-lg md:text-[30px]">
              {typeof price === "number" || !isNaN(Number(price))
                ? formatPrice(Number(price))
                : price}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
