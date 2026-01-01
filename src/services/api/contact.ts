import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type ContactFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  message_header: string;
  message: string;
  terms: boolean;
};

export const sendContactMessage = async (data: ContactFormData) => {
  const { first_name, last_name, email, phone_number, message_header, message } = data;

  const { data: inserted, error } = await supabase
    .from("messages")
    .insert({
      name: `${first_name} ${last_name}`,
      email,
      subject: message_header,
      body: `Phone: ${phone_number || "N/A"}\n\n${message}`,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return inserted;
};
