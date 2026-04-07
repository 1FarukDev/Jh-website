import { createClient } from "@/lib/supabase/server";

export async function getFilteredProductsServer(filters: {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
}) {
  const supabase = await createClient();
  let query = supabase.from("products").select("*");

  if (filters.category && filters.category !== "all") {
    query = query.ilike("tag", `%${filters.category}%`);
  }

  if (filters.type === "new-arrivals") {
    query = query.order("created_at", { ascending: false });
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
    console.error("Error fetching filtered products (server):", error.message);
    return [];
  }

  return data ?? [];
}

export async function getProductByIdServer(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product ${id} (server):`, error.message);
    return null;
  }

  return data;
}
