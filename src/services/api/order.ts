import { createClient } from "@/lib/supabase/client";

const supabase = createClient();



export type CreateOrderPayload = {
  tx_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  product_data: any[];

  // shipping_address?: {
  //   country: string;
  //   state: string;
  //   city: string;
  //   postal_code: string;
  //   address: string;
  // };
};

export async function createOrder(payload: CreateOrderPayload) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        tx_ref: payload.tx_ref,
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        customer_phone: payload.customer_phone,
        total_amount: payload.total_amount,
        status: "pending",
        payment_status: "pending",
        product_data: payload.product_data,

        // shipping_address: payload.shipping_address,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Create order error:", error);
    throw new Error("Failed to create order");
  }

  return data;
}
