
import { createClient } from "@/lib/supabase/client";
// import { AddProductParams } from "@/utils/types/product_types";

const supabase = createClient();

export const getClients = async () => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return [];
  }

  return data;
};

export const getClientById = async (id: string | number) => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching clients with slug "${id}":`, error.message);
    throw new Error(error.message);
  }

  return data;
};
