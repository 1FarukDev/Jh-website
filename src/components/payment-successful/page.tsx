"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import SuccessfulCheck from "@/app/assets/svg/successful-check.svg";
import { OrderSummaryCard } from "@/components/order-summary-card";
import NewsletterSignup from "@/components/features/homepage/news-letter";
import { Button } from "@/components/ui/button";

import { getOrderItems, type CheckoutOrderLine } from "@/services/api/order";
import type { VerifiedOrderSummary } from "@/types/verified-order";
import { formatOrderMoney } from "@/lib/format-money";

type PaymentSuccessfulProps = {
  tx_ref: string;
  verifiedOrder: VerifiedOrderSummary | null;
};

function formatStatusLabel(value: string) {
  if (!value) return "—";
  return value.replace(/_/g, " ");
}

function PaymentSuccessful({ tx_ref, verifiedOrder }: PaymentSuccessfulProps) {
  const router = useRouter();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["order-items", tx_ref],
    queryFn: () => getOrderItems(tx_ref),
    enabled: !!tx_ref,
  });

  const showLineItemsSkeleton =
    isPending || (isFetching && (!data || data.length === 0));

  if (error || (!showLineItemsSkeleton && !data)) {
    return (
      <div className="text-center p-8 font-satoshi">
        Failed to load order line items.
      </div>
    );
  }

  const subtotal =
    data?.reduce(
      (sum: number, item: { line_total?: number | string }) =>
        sum + Number(item.line_total ?? 0),
      0
    ) ?? 0;

  const currency = verifiedOrder?.currency || "NGN";
  const displayTotal =
    verifiedOrder != null
      ? formatOrderMoney(Number(verifiedOrder.total_amount), currency)
      : `NGN ${subtotal.toLocaleString()}`;

  return (
    <section className="py-26">
      <div className="px-4 flex flex-col gap-6 justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={SuccessfulCheck} alt="successful check" width={70} />
          <h2 className="text-[#230D06] text-center text-[28px] md:text-[50px]">
            Thank You for Your Purchase!
          </h2>
          <p className="font-satoshi text-xs text-center text-[#4E5157]">
            We&apos;ve received your payment. An order confirmation has been sent
            to your email
          </p>
        </div>

        {/* {verifiedOrder && (
          <div className="w-full max-w-md md:max-w-lg border border-gray-200 bg-white px-4 py-4 font-satoshi text-sm text-[#4E5157]">
            <p className="text-xs uppercase tracking-wide text-[#828892] mb-2">
              Order status
            </p>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[#828892]">Order</dt>
                <dd className="font-medium text-[#230D06]">
                  {verifiedOrder.order_number ?? verifiedOrder.tx_ref}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#828892]">Fulfillment</dt>
                <dd className="font-medium capitalize">
                  {formatStatusLabel(verifiedOrder.status)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#828892]">Payment</dt>
                <dd className="font-medium capitalize">
                  {formatStatusLabel(verifiedOrder.payment_status)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#828892]">Total</dt>
                <dd className="font-medium text-[#230D06]">{displayTotal}</dd>
              </div>
            </dl>
          </div>
        )} */}

        <section className="bg-[#E8E7D7] md:p-8 p-4 pt-8 mx-auto w-full md:w-[40%]">
          <h2 className="font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase">
            Order Summary
          </h2>

          <div className="space-y-2">
            {showLineItemsSkeleton ? (
              <div className="text-center py-6 font-satoshi text-sm text-[#4E5157]">
                Loading order details…
              </div>
            ) : (
              data!.map((item: CheckoutOrderLine) => (
                <OrderSummaryCard
                  key={item.id}
                  title={item.product?.name ?? item.product_name ?? "Item"}
                  price={item.unit_price ?? 0}
                  exclusivity="EXCLUSIVE PRINT"
                  color={item.color || "Default"}
                  colorCode="#8A8635"
                  quantity={item.quantity ?? 1}
                  size={item.size ?? "N/A"}
                  image={item.product?.images?.[0] ?? ""}
                />
              ))
            )}
          </div>

          <div className="bg-gray-400 w-full h-px" />
          <div className="flex justify-between pt-4 text-[20px]">
            <p>Total</p>
            <p>{displayTotal}</p>
          </div>
        </section>
        <div className="flex md:flex-row flex-col gap-0 md:gap-4 items-center w-full md:w-1/2 justify-center ">
          <Button
            type="button"
            variant="outline"
            className="mt-4 bg-white text-black border border-black h-13 px-6 py-3 text-sm w-full md:w-1/2 rounded-none font-satoshi font-normal"
            onClick={() => router.push("/orders")}
          >
            View my orders
          </Button>
          <Button
            type="button"
            className="mt-4 bg-black text-white px-6 py-3 h-13 text-sm w-full md:w-1/2 rounded-none font-satoshi font-normal"
            onClick={() => router.push("/shop")}
          >
            Continue shopping
          </Button>
        </div>
      </div>

      <NewsletterSignup />
    </section>
  );
}

export default PaymentSuccessful;
