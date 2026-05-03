/** Matches `public.products` in Supabase */
export type ProductRow = {
  id: string;
  created_at: string;
  name: string | null;
  price: string | null;
  images: string[] | null;
  image: string | null;
  quantity: string | null;
  description: string | null;
  exclusive: boolean | null;
  tag: string | null;
  status: string | null;
};
