import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { CreateOrderPayload } from "@/services/api/order";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = (await req.json()) as CreateOrderPayload;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        tx_ref: payload.tx_ref,
        customer_name: payload.customer_name,
        customer_email: user.email ?? payload.customer_email,
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
      return NextResponse.json(
        { success: false, message: "Failed to create order" },
        { status: 500 }
      );
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
      return NextResponse.json(
        { success: false, message: "Failed to create order items" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
