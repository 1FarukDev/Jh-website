import { createClient } from "@/lib/supabase/server";
import { formatOrderMoney } from "@/lib/format-money";
import { buildOrderConfirmationItemsFromOrderItems } from "@/lib/build-order-confirmation-items";
import { draftExclusiveProductsAfterPurchase } from "@/lib/draft-exclusive-products-after-purchase";
import {
  sendOrderConfirmationEmail,
  sendPaymentConfirmationEmail,
} from "@/lib/send-checkout-emails";
import { totalsMatchWithinTolerance } from "@/lib/checkout-pricing-server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
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

    const { data: existingOrder, error: loadError } = await supabase
      .from("orders")
      .select(
        "id, order_number, customer_email, customer_name, total_amount, currency, customer_id, payment_status"
      )
      .eq("tx_ref", tx_ref)
      .maybeSingle();

    if (loadError || !existingOrder) {
      return new Response(
        JSON.stringify({ success: false, message: "Order not found" }),
        { status: 404 }
      );
    }

    if (existingOrder.customer_id !== user.id) {
      return new Response(
        JSON.stringify({ success: false, message: "Forbidden" }),
        { status: 403 }
      );
    }

    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(tx_ref)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const fwJson = await verifyRes.json();

    if (!verifyRes.ok || !fwJson?.status || fwJson.status !== "success") {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not successful" }),
        { status: 400 }
      );
    }

    const charged = Number(fwJson?.data?.amount);
    const chargedCurrency = String(fwJson?.data?.currency || "").toUpperCase();
    const orderCurrency = String(existingOrder.currency || "NGN").toUpperCase();

    if (
      !Number.isFinite(charged) ||
      !totalsMatchWithinTolerance(
        charged,
        Number(existingOrder.total_amount)
      ) ||
      (chargedCurrency && chargedCurrency !== orderCurrency)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Payment amount or currency does not match order",
        }),
        { status: 400 }
      );
    }

    if (existingOrder.payment_status !== "pending") {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Payment already recorded",
        }),
        { status: 200 }
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
      .eq("customer_id", user.id)
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
    if (!order) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Order could not be confirmed",
        }),
        { status: 409 }
      );
    }

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

    const { error: orderMailError } = await sendOrderConfirmationEmail({
      email: order.customer_email,
      customerName: order.customer_name,
      orderId: displayOrderId,
      orderDate: new Date().toLocaleDateString(),
      total: formatOrderMoney(Number(order.total_amount), currency),
      items: itemsPayload,
    });

    if (orderMailError) {
      console.error("Order confirmation email failed:", orderMailError);
    }

    const { error: payMailError } = await sendPaymentConfirmationEmail({
      email: order.customer_email,
      customerName: order.customer_name,
      orderId: displayOrderId,
      amount: Number(order.total_amount),
      currency,
      transactionId: String(fwJson?.data?.id ?? ""),
      paymentDate: new Date().toLocaleDateString(),
      paymentMethod:
        fwJson?.data?.payment_type || fwJson?.data?.payment_method,
    });

    if (payMailError) {
      console.error("Payment confirmation email failed:", payMailError);
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
