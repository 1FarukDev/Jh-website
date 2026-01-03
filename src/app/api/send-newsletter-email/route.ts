import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import NewsletterWelcomeEmail from "@/emails/news-letter";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "J.H. Textiles <noreply@jhtextiles.com>",
      to: email,
      subject: "Welcome to J.H. Textiles Newsletter!",
      react: NewsletterWelcomeEmail({ email, firstName }),
    });

    if (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
