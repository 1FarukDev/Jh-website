"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import EmptyOrder from "@/components/features/orders/empty-order";
import { OrdersPageSkeleton } from "@/components/features/orders/orders-page-skeleton";
import { Orders } from "@/components/features/orders/orders-list";
import { getOrders } from "@/services/api/order";

function OrderPage() {
  const { data: orders, isPending, isFetching, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const showSkeleton = isPending || (isFetching && !orders);

  if (showSkeleton) {
    return <OrdersPageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8 font-satoshi text-[#4E5157]">
        Failed to load orders. Please try again.
      </div>
    );
  }

  return (
    <section className="py-26">
      <div className="px-4">
        {orders && orders.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[50px]">My Orders</h1>
            <p className="text-lg font-normal font-satoshi mb-10">
              Track and review your recent purchases.
            </p>
            <Orders orders={orders} />
          </div>
        ) : (
          <EmptyOrder />
        )}
      </div>
    </section>
  );
}

export default OrderPage;
