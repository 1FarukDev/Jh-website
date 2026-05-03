import { createClient } from "@/lib/supabase/server";
import { formatOrderMoney } from "@/lib/format-money";
import { buildOrderConfirmationItemsFromOrderItems } from "@/lib/build-order-confirmation-items";
import { draftExclusiveProductsAfterPurchase } from "@/lib/draft-exclusive-products-after-purchase";

export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");

  if (!tx_ref) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing tx_ref" }),
      { status: 400 }
    );
  }

  try {
    const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!flutterwaveSecretKey) {
      return new Response(
        JSON.stringify({ success: false, message: "Server misconfiguration" }),
        { status: 500 }
      );
    }

    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await verifyRes.json();

    if (!verifyRes.ok || !data?.status || data.status !== "success") {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not successful" }),
        { status: 400 }
      );
    }

    const { data: confirmedOrders, error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: "confirmed",
        updated_at: new Date().toISOString(),
      })
      .eq("tx_ref", tx_ref)
      .eq("payment_status", "pending")
      .select(
        "id, order_number, customer_email, customer_name, total_amount, currency"
      );

    if (error) {
      return new Response(
        JSON.stringify({ success: false, message: "Failed to update order" }),
        { status: 500 }
      );
    }

    const order = confirmedOrders?.[0];

    if (order) {
      const displayOrderId = order.order_number ?? tx_ref;
      const { data: orderItems } = await supabase
        .from("order_items")
        .select(
          "product_id, product_name, quantity, line_total, image, color, size"
        )
        .eq("order_id", order.id);

      const currency = order.currency || "NGN";
      const itemsPayload = buildOrderConfirmationItemsFromOrderItems(
        orderItems ?? [],
        Number(order.total_amount),
        currency
      );

      await draftExclusiveProductsAfterPurchase(String(order.id));

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-order-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: order.customer_email,
            customerName: order.customer_name,
            orderId: displayOrderId,
            orderDate: new Date().toLocaleDateString(),
            total: formatOrderMoney(Number(order.total_amount), currency),
            items: itemsPayload,
          }),
        }
      );

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-payment-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: order.customer_email,
            customerName: order.customer_name,
            orderId: displayOrderId,
            amount: Number(order.total_amount),
            currency,
            transactionId: String(data?.data?.id ?? ""),
            paymentDate: new Date().toLocaleDateString(),
            paymentMethod:
              data?.data?.payment_type || data?.data?.payment_method,
          }),
        }
      );

    }
  
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified successfully",
      }),
      { status: 200 }
    );
  } catch (err) {

    const message =
      err instanceof Error ? err.message : "Internal server error";

    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
    });
  }
}