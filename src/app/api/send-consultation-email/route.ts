import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ConsultationEmail from "@/emails/consultation";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "J.H. Textiles <consultations@jhtextiles.com>",
      to: email,
      cc: "jhtextiles@icloud.com", // Copy to admin
      subject: "Consultation Request Received",
      react: ConsultationEmail({
        name: name,
        email: email,
        message,
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