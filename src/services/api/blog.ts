import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getBlogs = async () => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (err: any) {
    console.error("Error fetching blogs:", err.message);
    return [];
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error(`Error fetching blog with slug "${slug}":`, err.message);
    return null;
  }
};


export const getAdjacentBlogs = async (currentId: number) => {
  try {
    const { data: nextBlog } = await supabase
      .from("blogs")
      .select("*")
      .gt("id", currentId)
      .order("id", { ascending: true })
      .limit(1)
      .single();

    const { data: prevBlog } = await supabase
      .from("blogs")
      .select("*")
      .lt("id", currentId)
      .order("id", { ascending: false })
      .limit(1)
      .single();

    return { nextBlog, prevBlog };
  } catch (err: any) {
    console.error("Error fetching adjacent blogs:", err.message);
    return { nextBlog: null, prevBlog: null };
  }
};
