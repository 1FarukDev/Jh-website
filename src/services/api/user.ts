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