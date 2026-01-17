import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import OrderConfirmationEmail from "@/emails/order-confirmation";

export async function POST(req: NextRequest) {
  try {
    const { email, customerName, orderId, orderDate, total, items, currency } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "J.H. Textiles <orders@jesudarahinmikaiye.com>",
      to: email,
      subject: `Order Confirmation #${orderId}`,
      react: OrderConfirmationEmail({
        customerName,
        orderId,
        orderDate,
        total,
        items,
        currency,
      }),
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