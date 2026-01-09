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

export const getFilteredProducts = async (filters: {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}) => {
  let query = supabase.from("products").select("*");

  if (filters.category && filters.category !== "all") {
    query = query.ilike("tag", `%${filters.category}%`);
  }


  if (filters.minPrice) {
    query = query.gte("price", parseFloat(filters.minPrice));
  }
  if (filters.maxPrice) {
    query = query.lte("price", parseFloat(filters.maxPrice));
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching filtered products:", error.message);
    return [];
  }

  return data;
};
