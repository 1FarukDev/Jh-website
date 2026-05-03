import { createServiceRoleClient } from "@/lib/supabase/admin";

/**
 * After a successful purchase, set exclusive products in this order to `draft`
 * so they disappear from the storefront (`published` only).
 *
 * Uses the service role so RLS cannot hide `order_items` or block `products` updates.
 */
export async function draftExclusiveProductsAfterPurchase(orderId: string) {
  const admin = createServiceRoleClient();
  if (!admin) {
    return;
  }

  const { data: rows, error: itemsError } = await admin
    .from("order_items")
    .select("product_id")
    .eq("order_id", orderId);

  if (itemsError) {
    return;
  }

  const productIds = [
    ...new Set(
      (rows ?? [])
        .map((r) => r.product_id)
        .filter((id): id is string => id != null && String(id).length > 0)
        .map((id) => String(id))
    ),
  ];

  if (productIds.length === 0) {
    return;
  }

  const { data: products, error: prodError } = await admin
    .from("products")
    .select("id, exclusive, tag")
    .in("id", productIds);

  if (prodError) {
    return;
  }

  const exclusiveIds = (products ?? [])
    .filter((p) => p.exclusive === true)
    .map((p) => String(p.id));

  if (exclusiveIds.length === 0) {
    return;
  }

  const { error: updateError } = await admin
    .from("products")
    .update({
      status: "draft",
    })
    .in("id", exclusiveIds);

  if (updateError) {
    return;
  }
}
