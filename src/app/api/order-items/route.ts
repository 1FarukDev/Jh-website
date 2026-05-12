import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireServiceRoleClient } from "@/lib/supabase/admin";


export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let admin;
  try {
    admin = requireServiceRoleClient();
  } catch {
    return NextResponse.json(
      { error: "Server configuration: missing or invalid service role key" },
      { status: 503 }
    );
  }

  const orderId = req.nextUrl.searchParams.get("order_id");
  const txRef = req.nextUrl.searchParams.get("tx_ref");

  if (!orderId && !txRef) {
    return NextResponse.json(
      { error: "Provide order_id or tx_ref" },
      { status: 400 }
    );
  }

  let order: { id: number | string } | null = null;

  if (txRef) {
    const { data, error } = await admin
      .from("orders")
      .select("id")
      .eq("tx_ref", txRef)
      .eq("customer_id", user.id)
      .maybeSingle();
    if (error || !data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    order = data;
  } else {
    const { data, error } = await admin
      .from("orders")
      .select("id")
      .eq("id", orderId!)
      .eq("customer_id", user.id)
      .maybeSingle();
    if (error || !data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    order = data;
  }

  const { data: items, error: itemsError } = await admin
    .from("order_items")
    .select(
      `
      id,
      order_id,
      product_id,
      product_name,
      quantity,
      unit_price,
      line_total,
      color,
      size,
      image
    `
    )
    .eq("order_id", order.id);

  if (itemsError) {
    console.error("order_items fetch:", itemsError);
    return NextResponse.json(
      { error: "Failed to load line items" },
      { status: 500 }
    );
  }

  const list = items ?? [];

  if (txRef) {
    const productIds = [
      ...new Set(
        list
          .map((row: { product_id: string | null }) => row.product_id)
          .filter((id): id is string => id != null && String(id).length > 0)
      ),
    ];

    if (productIds.length === 0) {
      return NextResponse.json(list);
    }

    const { data: products, error: productsError } = await admin
      .from("products")
      .select("id, name, price, images")
      .in("id", productIds);

    if (productsError) {
      return NextResponse.json(
        { error: "Failed to load products" },
        { status: 500 }
      );
    }

    const merged = list.map((item: Record<string, unknown>) => ({
      ...item,
      product:
        products?.find((p: { id: string }) => p.id === item.product_id) ?? null,
    }));

    return NextResponse.json(merged);
  }

  return NextResponse.json(
    list.map(
      ({
        id,
        product_name,
        quantity,
        unit_price,
        line_total,
        color,
        size,
        image,
      }: Record<string, unknown>) => ({
        id,
        product_name,
        quantity,
        unit_price,
        line_total,
        color,
        size,
        image,
      })
    )
  );
}
