import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const getUserDetails = async (id: number | string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product ${id}:`, error.message);
    throw new Error(error.message);
  }

  return data;
};

export const createConsultation = async (data: any) => {
  const { data: consultationData, error } = await supabase
    .from("consultations")
    .insert(data);

  if (error) {
    console.error(`Error creating consultation:`, error.message);
    throw new Error(error.message);
  }

  return consultationData;
};

export const createNewsletterSubscription = async (data: any) => {
  const { data: newsletterData, error } = await supabase
    .from("newsletter")
    .insert(data);

  if (error) {
    console.error(`Error creating newsletter subscription:`, error.message);
    throw new Error(error.message);
  }
  await fetch('/api/send-newsletter-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return newsletterData;
};