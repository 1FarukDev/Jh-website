import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");

  if (!tx_ref) {
    return new Response(JSON.stringify({ error: "Missing tx_ref" }), {
      status: 400,
    });
  }

  try {
    const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    const res = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!data.status || data.status !== "success") {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not successful" }),
        { status: 400 }
      );
    }

    const amountPaid = data.data.amount;
    const currencyPaid = data.data.currency;

    const supabase = await createClient();

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: "confirmed",
        updated_at: new Date(),
      })
      .eq("tx_ref", tx_ref);

    if (!error) {
      // Get order details to send email
      const { data: order } = await supabase
        .from("orders")
        .select("customer_email, customer_name, total_amount")
        .eq("tx_ref", tx_ref)
        .single();

      if (order) {
        // Send payment confirmation email
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-payment-confirmation`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: order.customer_email,
              customerName: order.customer_name,
              orderId: tx_ref,
              amount: `${order.total_amount.toLocaleString()}`,
              transactionId: data.data.id,
              paymentDate: new Date().toLocaleDateString(),
              paymentMethod: data.data.payment_method,
            }),
          }
        );
      }
    }
  } catch (err) {
    console.error("Payment verification error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
