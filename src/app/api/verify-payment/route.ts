import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
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

    const supabase = await createClient();

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: "confirmed",
        updated_at: new Date(),
      })
      .eq("tx_ref", tx_ref);

    if (error) {
      console.error("Order update error:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to update order" }),
        { status: 500 }
      );
    }

    // Get order details to send email
    const { data: order } = await supabase
      .from("orders")
      .select("customer_email, customer_name, total_amount")
      .eq("tx_ref", tx_ref)
      .single();

    if (order) {
      // Non-blocking email failure should not fail payment verification response
      const emailRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-payment-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: order.customer_email,
            customerName: order.customer_name,
            orderId: tx_ref,
            amount: `${order.total_amount.toLocaleString()}`,
            transactionId: data?.data?.id,
            paymentDate: new Date().toLocaleDateString(),
            paymentMethod: data?.data?.payment_method,
          }),
        }
      );

      if (!emailRes.ok) {
        console.warn("Payment confirmation email failed to send");
      }
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