'use client'

import React, { useMemo } from "react";
import CloseIcon from "@/app/assets/svg/close.svg";
import Image from "next/image";
import SuccessCheckmark from "@/app/assets/svg/success.svg";

type OrderDetailsProps = {
  onCloseButton: () => void;
  orderId: string | number;
  orderStatus: "Completed" | "Pending" | "Failed" | string;
  paymentStatus: "Paid" | "Unpaid" | string;
  totalAmount: string | number;
  productData: string[];
};

function OrderDetails({
  onCloseButton,
  orderId,
  orderStatus,
  paymentStatus,
  totalAmount,
  productData,
}: OrderDetailsProps) {
  const parsedItems = useMemo(() => {
    try {
      return productData.map((item) => JSON.parse(item));
    } catch (err) {
      console.error("Error parsing product data:", err);
      return [];
    }
  }, [productData]);

  return (
    <section className="font-satoshi p-3.5 px-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
        <h1>Order Details – {orderId}</h1>
        <Image
          src={CloseIcon}
          alt="Close"
          width={11}
          onClick={onCloseButton}
          className="cursor-pointer"
        />
      </div>

      {/* Order Summary */}
      <div className="mt-5">
        <p className="text-[#686D75] text-[12px] font-normal border-b border-gray-300 pb-3">
          Order Summary
        </p>
      </div>

      <div className="mt-3 border-b border-gray-300 pb-3 flex gap-25">
        <p className="w-[20%] text-black text-[12px] font-medium">Order Status:</p>
        <p className="text-[#686D75] text-[12px] flex gap-2 items-center">
          <Image src={SuccessCheckmark} alt="Success" /> {orderStatus}
        </p>
      </div>

      <div className="mt-3 border-b border-gray-300 pb-3 flex gap-25">
        <p className="w-[20%] text-black text-[12px] font-medium">Payment Status:</p>
        <p className="text-[#686D75] text-[12px] flex gap-2 items-center">
          <Image src={SuccessCheckmark} alt="Success" /> {paymentStatus}
        </p>
      </div>

      <div className="mt-3 border-b border-gray-300 pb-3 flex gap-25">
        <p className="w-[20%] text-black text-[12px] font-medium">Order ID:</p>
        <p className="text-[#686D75] text-[12px]">{orderId}</p>
      </div>

      <div className="mt-3 border-b border-gray-300 pb-3 flex gap-25">
        <p className="w-[20%] text-black text-[12px] font-medium">Total Amount:</p>
        <p className="text-[#686D75] text-[12px]">${totalAmount}</p>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {parsedItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-4 shadow-sm flex flex-col gap-2"
          >
            <p className="font-medium text-sm">{item.product_name}</p>
            <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-xs text-gray-500">Price: ${item.price}</p>
            <p className="text-xs text-gray-500 font-semibold">
              Subtotal: ${item.subtotal}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderDetails;
