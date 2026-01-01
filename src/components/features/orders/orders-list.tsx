"use client";

import Modal from "@/components/modal";
import OrderDetails from "@/components/order-details";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getOrderItemsByOrderId } from "@/services/api/order";
import { formatDate } from "@/services/helpers/formatDate";
import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import { useState } from "react";

export interface Order {
  order_number: string;
  created_at: string;
  total_amount: number;
  status: "Delivered" | "Processing" | string;
  payment_status?: "Paid" | "Unpaid" | string;
  product_data?: any[]; // kept (not removed)
  id: number; // ✅ FIX: bigint → number
}

interface OrdersProps {
  orders?: Order[];
}

export function Orders({ orders: initialOrders }: OrdersProps) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders = initialOrders || [];

  const {
    data: orderItems = [],
    isLoading: isOrderItemsLoading,
  } = useQuery({
    queryKey: ["order-items", selectedOrder?.id],
    queryFn: () => getOrderItemsByOrderId(selectedOrder!.id),
    enabled: !!selectedOrder?.id,
  });

  console.log("orderItems", orderItems);

  if (!orders.length) {
    return <div className="text-center py-8">You have no orders yet.</div>;
  }

  return (
    <div className="w-full">
      <Table className="max-w-6xl mx-auto font-satoshi">
        <TableHeader className="bg-black hover:bg-black">
          <TableRow className="border border-gray-200">
            <TableHead className="text-white">Order #</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Total</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_number}>
              <TableCell className="border border-gray-200">
                {order.order_number}
              </TableCell>

              <TableCell className="border border-gray-200">
                {formatDate(order.created_at)}
              </TableCell>

              <TableCell className="border border-gray-200">
                ₦{order.total_amount.toLocaleString()}
              </TableCell>

              <TableCell className="border border-gray-200">
                <span
                  className={cn(
                    "inline-flex items-center px-3 py-1 text-xs rounded-full font-medium",
                    order.status === "Delivered"
                      ? "bg-green-700 text-white"
                      : "bg-amber-900 text-white"
                  )}
                >
                  <span className="w-2 h-2 mr-1 rounded-full bg-white" />
                  {order.status}
                </span>
              </TableCell>

              <TableCell className="border border-gray-200">
                <Button
                  className="rounded-none !px-6 py-1 bg-black text-white hover:bg-gray-800"
                  onClick={() => {
                    setSelectedOrder(order);
                    setOpen(true);
                  }}
                >
                  View Details <MoveRight strokeWidth={1} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        className="w-[90vw]! md:max-w-[40vw]! no-scrollbar rounded-md! shadow-sm!"
        trigger={""}
        open={open}
        onOpenChange={setOpen}
      >
        {selectedOrder && (
          <OrderDetails
            onCloseButton={() => setOpen(false)}
            orderId={selectedOrder.order_number} // display ID
            orderStatus={
              selectedOrder.status === "Delivered"
                ? "Completed"
                : selectedOrder.status === "Processing"
                ? "Pending"
                : "Failed"
            }
            paymentStatus={selectedOrder.payment_status || "Unpaid"}
            totalAmount={selectedOrder.total_amount}
            productData={orderItems} // ✅ REAL order_items data
            // isLoading={isOrderItemsLoading} // optional but useful
          />
        )}
      </Modal>
    </div>
  );
}
