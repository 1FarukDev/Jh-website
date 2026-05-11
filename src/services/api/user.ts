import { createClient } from "@/lib/supabase/client";
import { subscribeNewsletterAction } from "@/app/actions/public-forms";

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

export const createNewsletterSubscription = async (data: {
  email: string;
  firstName?: string;
}) => {
  const result = await subscribeNewsletterAction({
    email: data.email,
    firstName: data.firstName,
  });
  if (!result.ok) {
    throw new Error(result.message || "Newsletter subscription failed");
  }
  return { email: data.email };
};