import { createClient } from "@/lib/supabase/client";

export type CreateOrderPayload = {
  tx_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  product_data: {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }[];
};

const supabase = createClient();

export async function createOrder(payload: CreateOrderPayload) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      tx_ref: payload.tx_ref,
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      customer_phone: payload.customer_phone,
      total_amount: payload.total_amount,
      status: "pending",
      payment_status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    console.error("Create order error FULL:", orderError);
    throw orderError; // 👈 IMPORTANT
  }

  // 2️⃣ Insert order items
  const orderItems = payload.product_data.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    line_total: item.price * item.quantity,
    color: item.color,
    size: item.size,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Create order items error:", itemsError);
    throw new Error("Failed to create order items");
  }

  return order;
}
