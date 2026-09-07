"use server";

import { z } from "zod";
import { requireServiceRoleClient } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";
import ContactReceiptEmail from "@/emails/contact-form";
import ConsultationEmail from "@/emails/consultation";
import NewsletterWelcomeEmail from "@/emails/news-letter";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { subscribeToKit } from "@/lib/kit";

function dbOrConfigError():
  | { ok: true; db: ReturnType<typeof requireServiceRoleClient> }
  | { ok: false; message: string } {
  try {
    return { ok: true, db: requireServiceRoleClient() };
  } catch {
    return {
      ok: false,
      message:
        "Server is not configured for this action. Ask the admin to set SUPABASE_SERVICE_ROLE_KEY.",
    };
  }
}

const turnstileTokenSchema = z.string().min(1, "Bot check required");

async function requireHuman(token: string | undefined) {
  if (!token || !(await verifyTurnstileToken(token))) {
    return {
      ok: false as const,
      message: "Bot check failed. Please try again.",
    };
  }
  return { ok: true as const };
}

const contactSchema = z.object({
  first_name: z.string().min(1).max(200),
  last_name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone_number: z.string().max(50).optional(),
  company_name: z.string().max(200).optional(),
  message_header: z.string().min(1).max(300),
  message: z.string().min(1).max(20_000),
  turnstileToken: turnstileTokenSchema,
});

export async function submitContactFormAction(
  input: z.infer<typeof contactSchema>
) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Invalid form data" };
  }
  const data = parsed.data;
  const human = await requireHuman(data.turnstileToken);
  if (!human.ok) return human;

  const gate = dbOrConfigError();
  if (!gate.ok) {
    return { ok: false as const, message: gate.message };
  }

  const { error: insertError } = await gate.db.from("messages").insert({
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
    from: "J.H. Textiles <contact@jesudarahinmikaiye.com>",
    to: "info@jesudarahinmikaiye.com",
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
  turnstileToken: turnstileTokenSchema,
});

export async function subscribeNewsletterAction(
  input: z.infer<typeof newsletterSchema>
) {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Invalid email" };
  }
  const data = parsed.data;
  const human = await requireHuman(data.turnstileToken);
  if (!human.ok) return human;

  const kit = await subscribeToKit({
    email: data.email,
    firstName: data.firstName,
  });
  if (!kit.ok) {
    return { ok: false as const, message: kit.message };
  }

  const gate = dbOrConfigError();
  if (!gate.ok) {
    return { ok: false as const, message: gate.message };
  }

  const { error: insertError } = await gate.db.from("newsletter").insert({
    email: data.email,
  });

  // Unique/duplicate emails in Supabase shouldn't fail the Kit subscribe
  if (insertError && insertError.code !== "23505") {
    console.error("Newsletter Supabase insert failed:", insertError);
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
    // Already in Kit + Supabase — don't fail the whole signup
    console.error("Newsletter welcome email failed:", emailError);
  }

  return { ok: true as const };
}

const consultationSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(20_000),
  turnstileToken: turnstileTokenSchema,
});

export async function submitConsultationAction(
  input: z.infer<typeof consultationSchema>
) {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Invalid form data" };
  }
  const data = parsed.data;
  const human = await requireHuman(data.turnstileToken);
  if (!human.ok) return human;

  const gate = dbOrConfigError();
  if (!gate.ok) {
    return { ok: false as const, message: gate.message };
  }

  const { error: insertError } = await gate.db.from("consultations").insert({
    name: data.name,
    email: data.email,
    message: data.message,
  });

  if (insertError) {
    return { ok: false as const, message: "Failed to book consultation" };
  }

  const { error: emailError } = await resend.emails.send({
    from: "J.H. Textiles <consultations@jesudarahinmikaiye.com>",
    to: "info@jesudarahinmikaiye.com", 
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
