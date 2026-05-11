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

async function parseJsonResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error || `Request failed (${res.status})`
    );
  }
  return data as T;
}

/** Line item shape for order details modal (matches `/api/order-items?order_id=`). */
export type OrderSummaryLine = {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  color: string | null;
  size: string | null;
  image: string | null;
};

export type CheckoutOrderLine = OrderSummaryLine & {
  order_id?: string | number;
  product_id?: string;
  product?: {
    id: string;
    name: string | null;
    price: string | null;
    images: string[] | null;
  } | null;
};

/** Uses server route so PostgREST RLS on `order_items` cannot 42501 on `users`. */
export const getOrderItems = async (tx_ref: string): Promise<CheckoutOrderLine[]> => {
  if (!tx_ref) throw new Error("Missing tx_ref");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) throw new Error("Not authenticated");

  const res = await fetch(
    `/api/order-items?tx_ref=${encodeURIComponent(tx_ref)}`,
    { credentials: "same-origin" }
  );

  return parseJsonResponse<CheckoutOrderLine[]>(res);
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

/** Uses server route so PostgREST RLS on `order_items` cannot 42501 on `users`. */
export const getOrderItemsByOrderId = async (
  orderId: number | string
): Promise<OrderSummaryLine[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) throw new Error("Not authenticated");

  const res = await fetch(
    `/api/order-items?order_id=${encodeURIComponent(String(orderId))}`,
    { credentials: "same-origin" }
  );

  return parseJsonResponse<OrderSummaryLine[]>(res);
};
