"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import ContactReceiptEmail from "@/emails/contact-form";
import ConsultationEmail from "@/emails/consultation";
import NewsletterWelcomeEmail from "@/emails/news-letter";

const contactSchema = z.object({
  first_name: z.string().min(1).max(200),
  last_name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone_number: z.string().max(50).optional(),
  company_name: z.string().max(200).optional(),
  message_header: z.string().min(1).max(300),
  message: z.string().min(1).max(20_000),
});

export async function submitContactFormAction(input: z.infer<typeof contactSchema>) {
  const data = contactSchema.parse(input);
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("messages").insert({
    name: `${data.first_name} ${data.last_name}`,
    email: data.email,
    subject: data.message_header,
    body: `Phone: ${data.phone_number || "N/A"}\nCompany: ${data.company_name || "N/A"}\n\n${data.message}`,
    status: "pending",
  });

  if (insertError) {
    return { ok: false as const, message: "Failed to save message" };
  }

  const { error: emailError } = await resend.emails.send({
    from: "J.H. Textiles <contact@jhtextiles.com>",
    to: "jhtextiles@icloud.com",
    replyTo: data.email,
    subject: `New Contact Form: ${data.message_header}`,
    react: ContactReceiptEmail({
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      subject: data.message_header,
      message: data.message,
    }),
  });

  if (emailError) {
    return { ok: false as const, message: "Failed to notify team" };
  }

  return { ok: true as const };
}

const newsletterSchema = z.object({
  email: z.string().email().max(320),
  firstName: z.string().max(200).optional(),
});

export async function subscribeNewsletterAction(
  input: z.infer<typeof newsletterSchema>
) {
  const data = newsletterSchema.parse(input);
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("newsletter").insert({
    email: data.email,
  });

  if (insertError) {
    return { ok: false as const, message: "Failed to subscribe" };
  }

  const { error: emailError } = await resend.emails.send({
    from: "J.H. Textiles <noreply@jesudarahinmikaiye.com>",
    to: data.email,
    subject: "Welcome to J.H. Textiles Newsletter!",
    react: NewsletterWelcomeEmail({
      email: data.email,
      firstName: data.firstName ?? "Subscriber",
    }),
  });

  if (emailError) {
    return { ok: false as const, message: "Subscribed but welcome email failed" };
  }

  return { ok: true as const };
}

const consultationSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(20_000),
});

export async function submitConsultationAction(
  input: z.infer<typeof consultationSchema>
) {
  const data = consultationSchema.parse(input);
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("consultations").insert({
    name: data.name,
    email: data.email,
    message: data.message,
  });

  if (insertError) {
    return { ok: false as const, message: "Failed to book consultation" };
  }

  const { error: emailError } = await resend.emails.send({
    from: "J.H. Textiles <consultations@jhtextiles.com>",
    to: "jhtextiles@icloud.com",
    replyTo: data.email,
    subject: "Consultation Request Received",
    react: ConsultationEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    }),
  });

  if (emailError) {
    return { ok: false as const, message: "Saved but notification email failed" };
  }

  return { ok: true as const };
}
