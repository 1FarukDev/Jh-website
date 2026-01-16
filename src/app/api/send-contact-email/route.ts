import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ContactFormEmail from "@/emails/contact-form";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "J.H. Textiles <contact@jhtextiles.com>",
      to: "jhtextiles@icloud.com",
      subject: `New Contact Form: ${subject}`,
      react: ContactFormEmail({
        name,
        email,
        // phone,
        subject,
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