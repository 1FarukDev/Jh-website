import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, email, name } = await req.json();

    const tx_ref = `tx-${Date.now()}`;

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
      body: JSON.stringify({
        tx_ref,
        amount,
        currency: "NGN",
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/payment-successful`,
        customer: { email, name },
        payment_options: "card,ussd,banktransfer,qr",
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ link: data.data.link });
    }

    return NextResponse.json(
      { message: "Payment creation failed", data },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
