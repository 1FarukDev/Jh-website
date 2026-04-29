import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const { amount, currency, email, name, tx_ref } = await req.json();

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
        // payment_options: "card,ussd,banktransfer,qr",
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
