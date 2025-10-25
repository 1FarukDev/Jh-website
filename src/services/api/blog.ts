import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return [];
  }

  return data;
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching blog with slug "${slug}":`, error.message);
    throw new Error(error.message);
  }

  return data;
};

