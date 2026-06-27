"use server";

import { z } from "zod";
import { requireServiceRoleClient } from "@/lib/supabase/admin";

const productViewSchema = z.object({
  productId: z.string().min(1).max(100),
  productName: z.string().min(1).max(300),
});

export async function recordProductViewAction(
  input: z.infer<typeof productViewSchema>
) {
  const data = productViewSchema.parse(input);

  try {
    const db = requireServiceRoleClient();
    const { error } = await db.from("product_views").insert({
      product_id: data.productId,
      product_name: data.productName,
    });

    if (error) {
      return { ok: false as const };
    }

    return { ok: true as const };
  } catch {
    return { ok: false as const };
  }
}
