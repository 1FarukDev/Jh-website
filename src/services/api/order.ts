import { createClient } from "@/lib/supabase/client";
import type { PricingCountry } from "@/types/pricing";

export type CreateOrderPayload = {
  /** Ignored — server generates `tx_ref` */
  tx_ref?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  currency?: string;
  /** Must match `CurrencyProvider` country for server pricing */
  pricing_country: PricingCountry;
  product_id: string[] | string;
  customer_company: string;
  product_data: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
    image?: string;
    exclusivity?: string;
    print_development?: boolean;
    print_modification?: boolean;
    color_variant?: string | null;
  }[];
};

const supabase = createClient();

export const getOrderItems = async (tx_ref: string) => {
  if (!tx_ref) throw new Error("Missing tx_ref");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) throw new Error("Not authenticated");

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("tx_ref", tx_ref)
    .eq("customer_id", user.id)
    .maybeSingle();

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

  const productIds = items.map((item: { product_id: string }) => item.product_id);

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

  const mergedItems = items.map((item: Record<string, unknown>) => ({
    ...item,
    product:
      products?.find((p: { id: string }) => p.id === item.product_id) || null,
  }));

  return mergedItems;
};

export const getOrders = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const getOrderItemsByOrderId = async (orderId: number | string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) throw new Error("Not authenticated");

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .eq("customer_id", user.id)
    .maybeSingle();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

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
    .eq("order_id", order.id);

  if (error) throw error;
  return data;
};
