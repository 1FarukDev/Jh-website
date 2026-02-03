"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { useCart } from "@/context/cart-context";

interface OrderSummaryCardProps {
  title: string;
  price: string | number;
  exclusivity: string;
  color: string;
  colorCode: string;
  quantity: number;
  size: string;
  image: StaticImageData | string;
  images?: string[];
}

function OrderSummaryCard({
  title,
  price,
  exclusivity,
  color,
  colorCode,
  quantity,
  size,
  image,
  images,
}: OrderSummaryCardProps) {
  const { formatPrice } = useCurrency();
  return (
    <div className="flex flex-row items-start gap-3 md:gap-5 py-4 md:py-6">
      <Image
        src={image}
        alt={title}
        width={100}
        height={150}
        className="object-cover mx-auto md:mx-0"
      />
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-2 md:gap-0">
          <div>
            <p className="font-satoshi text-xs md:text-sm text-[#686D75]">
              Print
            </p>
            <p className="font-medium text-base md:text-[18px] text-[#1C1B0B] uppercase">
              {title}
            </p>
          </div>
          <div>
            <p className="font-satoshi text-xs md:text-sm text-[#686D75]">
              Price
            </p>
            <p className="font-bold text-base md:text-[18px] text-[#1C1B0B]">
              {typeof price === "number" || !isNaN(Number(price))
                ? formatPrice(Number(price))
                : price}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex md:justify-between gap-2 md:gap-6 items-center pt-3 md:pt-4 text-xs md:text-sm font-satoshi">
          <div>
            <p className="text-[#686D75] mb-1">Exclusivity</p>
            <p className="text-[#1C1B0B] font-normal">{exclusivity}</p>
          </div>
          <div className="font-satoshi">
            <p className="font-light mb-1 md:mb-2 text-xs md:text-sm">
              Color variants
            </p>
            <div className="flex gap-1 items-center">
              {images?.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Print Image"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10 border object-cover rounded"
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#686D75] mb-1">Size</p>
            <p className="text-[#1C1B0B]">{size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OrderSummaryListProps {
  onClick: () => void;
}

function OrderSummaryList({ onClick }: OrderSummaryListProps) {
  const { formatPrice } = useCurrency();
  const { cart, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const itemCount = getCartCount();
  
  // Calculate VAT (7.5%)
  // const vatRate = 0.075;
  // const vatAmount = subtotal * vatRate;
  const totalWithVat = subtotal; // + vatAmount;

  return (
    <section className="bg-[#E8E7D7] md:p-8 p-4 pt-8 mx-auto">
      <h2 className="font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase">
        Cart Summary
      </h2>

      <div className="mb-4">
        <p className="font-satoshi text-sm text-[#686D75]">
          {itemCount} {itemCount === 1 ? "item" : "items"} in cart
        </p>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {cart.map((item) => (
          <OrderSummaryCard
            key={item.id}
            title={item.title}
            price={item.price}
            exclusivity={item.exclusivity.toUpperCase()}
            color={item.color || "Default"}
            colorCode={item.colorCode || "#8A8635"}
            quantity={item.quantity}
            size={item.size}
            image={item.image}
            images={item.images}
          />
        ))}
      </div>

      <div className="border-t border-[#1C1B0B] mt-6 pt-6">
        <div className="flex justify-between text-[16px] font-satoshi text-[#686D75] mb-2">
          <p>Subtotal</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        
        {/* VAT Amount Row */}
        {/* <div className="flex justify-between text-[16px] font-satoshi text-[#686D75] mb-4">
          <p>VAT (7.5%)</p>
          <p>{formatPrice(vatAmount)}</p>
        </div> */}

        <div className="flex justify-between text-[20px] md:text-[24px] font-bold text-[#1C1B0B]">
          <p>Total</p>
          <p>{formatPrice(totalWithVat)}</p>
        </div>
      </div>

      <button
        className="w-full bg-[#1C1B0B] text-white py-3 mt-6 text-center text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#2C2B1B] transition-colors"
        onClick={onClick}
      >
        Proceed to checkout <MoveRight strokeWidth={1} />
      </button>
    </section>
  );
}

export { OrderSummaryList, OrderSummaryCard };