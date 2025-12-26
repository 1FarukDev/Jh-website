import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data;
};

export const getProductById = async (id: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product ${id}:`, error.message);
    throw new Error(error.message);
  }

  return data;
};

export const searchProducts = async (query: string) => {
  if (!query || query.trim() === "") {
    return getProducts();
  }

  const searchTerm = `%${query.trim()}%`;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.${searchTerm},category.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching products:", error.message);
    return [];
  }

  return data;
};