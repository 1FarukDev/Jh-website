import { NextRequest, NextResponse } from "next/server";
import { sendPaymentConfirmationEmail } from "@/lib/send-checkout-emails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      customerName,
      orderId,
      transactionId,
      paymentDate,
      paymentMethod,
      currency,
    } = body;
    const rawAmount = body.paymentAmount ?? body.amount;

    const amount =
      typeof rawAmount === "number"
        ? rawAmount
        : Number.parseFloat(String(rawAmount ?? ""));

    const { data, error } = await sendPaymentConfirmationEmail({
      email,
      customerName,
      orderId,
      amount: Number.isFinite(amount) ? amount : 0,
      currency: currency || "NGN",
      transactionId,
      paymentDate,
      paymentMethod,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}