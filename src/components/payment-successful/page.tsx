"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import SuccessfulCheck from "@/app/assets/svg/successful-check.svg";
import { OrderSummaryCard } from "@/components/order-summary-card";
import NewsletterSignup from "@/components/features/homepage/news-letter";
import { Button } from "@/components/ui/button";

import { getOrderItems } from "@/services/api/order";

type PaymentSuccessfulProps = {
  tx_ref: string;
};

function PaymentSuccessful({ tx_ref }: PaymentSuccessfulProps) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-items", tx_ref],
    queryFn: () => getOrderItems(tx_ref),
    enabled: !!tx_ref,
  });

  if (isLoading) {
    return <div className="text-center p-8">Loading order details...</div>;
  }

  if (error || !data) {
    return <div className="text-center p-8">Failed to load order</div>;
  }

  const subtotal = data.reduce(
    (sum: number, item: any) => sum + Number(item.line_total),
    0
  );

  return (
    <section className="py-26">
      <div className="px-4 flex flex-col gap-6 justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={SuccessfulCheck} alt="successful check" width={70} />
          <h2 className="text-[#230D06] text-center text-[28px] md:text-[50px]">
            Thank You for Your Purchase!
          </h2>
          <p className="font-satoshi text-xs text-center text-[#4E5157]">
            We’ve received your payment. An order confirmation has been sent to
            your email
          </p>
        </div>

        {/* Order Summary */}
        <section className="bg-[#E8E7D7] md:p-8 p-4 pt-8 mx-auto w-full md:w-[40%]">
          <h2 className="font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase">
            Order Summary
          </h2>

          <div className="space-y-2">
            {data.map((item: any) => (
              <OrderSummaryCard
                key={item.id}
                title={item.product?.name ?? item.product_name}
                price={item.unit_price}
                exclusivity="EXCLUSIVE PRINT"
                color={item.color || "Default"}
                colorCode={item.colorCode || "#8A8635"}
                quantity={item.quantity}
                size={item.size}
                image={item.product?.images[0]}
              />
            ))}
          </div>

          {/* <div className="py-8 flex flex-col gap-3">
            <div className="flex justify-between text-[20px]">
              <p>Subtotal</p>
              <p>NGN {subtotal.toLocaleString()}</p>
            </div>
          </div> */}

          <div className="bg-gray-400 w-full h-px" />
          <div className="flex justify-between pt-4 text-[20px]">
            <p>Total</p>
            <p>NGN {subtotal.toLocaleString()}</p>
          </div>
        </section>
        <div className="flex md:flex-row flex-col gap-0 md:gap-4 items-center w-full md:w-1/2 justify-center ">
          <button
            type="button"
            className="mt-4 bg-white text-black border border-black h-13 px-6 py-3 text-sm w-full md:w-1/2 rounded-none font-satoshi font-normal"
            onClick={() => router.push("/orders")}
          >
            View my orders
          </button>
          <button
            type="button"
            className="mt-4 bg-black text-white px-6 py-3 h-13 text-sm w-full md:w-1/2 rounded-none font-satoshi font-normal"
            onClick={() => router.push("/shop")}
          >
            Continue shopping
          </button>
        </div>
      </div>

      <NewsletterSignup />
    </section>
  );
}

export default PaymentSuccessful;
