import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/send-checkout-emails";

export async function POST(req: NextRequest) {
  try {
    const { email, customerName, orderId, orderDate, total, items } = await req.json();

    const { data, error } = await sendOrderConfirmationEmail({
      email,
      customerName,
      orderId,
      orderDate,
      total,
      items,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}