"use client";

import React from "react";
import CloseIcon from "@/app/assets/svg/close.svg";
import Image from "next/image";
import SuccessCheckmark from "@/app/assets/svg/success.svg";

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  color: string | null;
  size: string | null;
  image: string | null;
};

type OrderDetailsProps = {
  onCloseButton: () => void;
  orderId: string | number;
  orderStatus: "Completed" | "Pending" | "Failed" | string;
  paymentStatus: "Paid" | "Unpaid" | string;
  totalAmount: string | number;
  productData: OrderItem[];
  isLoading?: boolean;
};

function OrderDetails({
  onCloseButton,
  orderId,
  orderStatus,
  paymentStatus,
  totalAmount,
  productData,
  isLoading,
}: OrderDetailsProps) {
  return (
    <section className="font-satoshi p-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
        <h1 className="text-sm md:text-base font-medium">
          Order Details – {orderId}
        </h1>
        <Image
          src={CloseIcon}
          alt="Close"
          width={12}
          onClick={onCloseButton}
          className="cursor-pointer"
        />
      </div>

      <div className="mt-5">
        <p className="text-[#686D75] text-xs font-normal border-b border-gray-300 pb-3">
          Order Summary
        </p>
      </div>

      {/* Summary rows */}
      {[
        { label: "Order Status", value: orderStatus },
        { label: "Payment Status", value: paymentStatus },
        { label: "Order ID", value: orderId },
        { label: "Total Amount", value: `₦${totalAmount}` },
      ].map((row, index) => (
        <div
          key={index}
          className="mt-3 border-b border-gray-300 pb-3 flex flex-col md:flex-row md:items-center md:gap-25 gap-1"
        >
          <p className="md:w-[20%] text-black text-xs font-medium">
            {row.label}:
          </p>
          <p className="text-[#686D75] text-xs flex gap-2 items-center">
            {(row.label === "Order Status" ||
              row.label === "Payment Status") && (
              <Image src={SuccessCheckmark} alt="status" />
            )}
            {row.value}
          </p>
        </div>
      ))}

      {/* Products */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Products</h3>

        {isLoading ? (
          <p className="text-xs text-gray-500">Loading products...</p>
        ) : productData.length === 0 ? (
          <p className="text-xs text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {productData.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-md p-3 flex flex-col sm:flex-row gap-4"
              >
                {item.image && (
                  <div className="w-full sm:w-20 h-40 sm:h-20 relative rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1 text-xs">
                  <p className="font-medium text-sm">
                    {item.product_name}
                  </p>

                  <p className="text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  {item.size && (
                    <p className="text-gray-500">
                      Size: {item.size}
                    </p>
                  )}

                  {item.color && (
                    <p className="text-gray-500">
                      Color: {item.color}
                    </p>
                  )}

                  <p className="text-gray-500">
                    Unit Price: ₦{item.unit_price.toLocaleString()}
                  </p>

                  <p className="font-semibold">
                    Subtotal: ₦{item.line_total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderDetails;
