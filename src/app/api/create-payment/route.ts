import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireServiceRoleClient } from "@/lib/supabase/admin";
import { totalsMatchWithinTolerance } from "@/lib/checkout-pricing-server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let admin;
    try {
      admin = requireServiceRoleClient();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Checkout is temporarily unavailable (server configuration).",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const amount = Number(body.amount);
    const currency = String(body.currency || "NGN").toUpperCase();
    const email = body.email as string;
    const name = body.name as string;
    const tx_ref = body.tx_ref as string;

    if (!tx_ref || !Number.isFinite(amount) || !email || !name) {
      return NextResponse.json(
        { success: false, message: "Invalid payment request" },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await admin
      .from("orders")
      .select("id, total_amount, currency, customer_id, tx_ref")
      .eq("tx_ref", tx_ref)
      .maybeSingle();

    if (orderError || !order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (order.customer_id !== user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const orderCurrency = String(order.currency || "NGN").toUpperCase();
    if (orderCurrency !== currency) {
      return NextResponse.json(
        { success: false, message: "Currency mismatch" },
        { status: 400 }
      );
    }

    if (
      !totalsMatchWithinTolerance(amount, Number(order.total_amount))
    ) {
      return NextResponse.json(
        { success: false, message: "Amount does not match order" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
      body: JSON.stringify({
        tx_ref,
        amount,
        currency: currency || "NGN",
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status`,
        customer: { email, name },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ success: true, link: data.data.link });
    }

    return NextResponse.json(
      { success: false, message: "Payment creation failed", data },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
