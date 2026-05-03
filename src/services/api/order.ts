import { createClient } from "@/lib/supabase/client";

export type CreateOrderPayload = {
  tx_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  currency?: string;
  product_id: any;
  customer_company: string;
  product_data: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
    image?: string;
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
      customer_company: payload.customer_company,
      total_amount: payload.total_amount,
      currency: payload.currency || "NGN", 
      status: "pending",
      payment_status: "pending",
      product_id: payload.product_id,
      quantity: payload.product_data.reduce((acc, item) => acc + item.quantity, 0),
    })
    .select()
    .single();

  if (orderError) {
    console.error("Create order error FULL:", orderError);
    throw orderError;
  }

  const orderItems = payload.product_data.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    line_total: item.price * item.quantity,
    color: item.color,
    size: item.size,
    image: item.image,
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

export const getOrderItems = async (tx_ref: string) => {
  if (!tx_ref) throw new Error("Missing tx_ref");

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("tx_ref", tx_ref)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(
      `
      id,
      order_id,
      product_id,
      product_name,
      quantity,
      unit_price,
      line_total,
      color,
      size,
      image
    `
    )
    .eq("order_id", order.id);

  if (itemsError) {
    throw itemsError;
  }

  if (!items || items.length === 0) return [];

  const productIds = items.map((item: any) => item.product_id);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      price,
      images
    `
    )
    .in("id", productIds);

  if (productsError) {
    throw productsError;
  }

  const mergedItems = items.map((item: any) => ({
    ...item,
    product: products?.find((p: any) => p.id === item.product_id) || null,
  }));

  return mergedItems;
};

export const getOrders = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", user.email)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const getOrderItemsByOrderId = async (orderId: number | any) => {
  const { data, error } = await supabase
    .from("order_items")
    .select(
      `
      id,
      product_name,
      quantity,
      unit_price,
      line_total,
      color,
      size,
      image
    `
    )
    .eq("order_id", orderId);

  if (error) throw error;
  return data;
};
