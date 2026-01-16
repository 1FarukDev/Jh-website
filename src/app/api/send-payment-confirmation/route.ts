import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import PaymentConfirmationEmail from "@/emails/payment-confirmation";

export async function POST(req: NextRequest) {
  try {
    const { email, customerName, orderId, paymentAmount, transactionId,paymentDate } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "J.H. Textiles <payments@jhtextiles.com>",
      to: email,
      subject: `Payment Confirmed - Order #${orderId}`,
      react: PaymentConfirmationEmail({
        customerName,
        orderId,
        paymentAmount,
        transactionId,
        paymentDate,
        // paymentMethod,
        
      }),
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}