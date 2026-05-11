import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import {
  approximateCheckoutTotalFromNgn,
  fetchConversionRatesFromNgn,
  totalsMatchWithinTolerance,
} from "@/lib/checkout-pricing-server";
import type { PricingCountry } from "@/types/pricing";
import {
  expectedOrderTotalNgn,
  unitPriceFromBaseAndOptions,
  type OrderLinePricingInput,
} from "@/lib/order-pricing";

const lineSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  color: z.string().optional(),
  size: z.string().optional(),
  image: z.string().optional(),
  print_development: z.boolean().optional(),
  print_modification: z.boolean().optional(),
  color_variant: z.string().optional().nullable(),
});

const payloadSchema = z.object({
  customer_name: z.string().min(1).max(500),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().max(100).optional(),
  customer_company: z.string().max(500).optional(),
  total_amount: z.number(),
  currency: z.string().min(1).max(10),
  pricing_country: z.enum(["NG", "US", "GB"]),
  product_id: z.union([z.array(z.string()), z.string()]).optional(),
  product_data: z.array(lineSchema).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be signed in to place an order.",
        },
        { status: 401 }
      );
    }

    const raw = await req.json();
    const parsed = payloadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid order payload" },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const linesForPricing: OrderLinePricingInput[] = payload.product_data.map(
      (i) => ({
        productId: i.productId,
        quantity: i.quantity,
        print_development: i.print_development,
        print_modification: i.print_modification,
        color_variant: i.color_variant,
      })
    );

    const ids = [...new Set(linesForPricing.map((l) => l.productId))];
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, price")
      .in("id", ids);

    if (productsError || !products?.length) {
      return NextResponse.json(
        { success: false, message: "Could not validate products" },
        { status: 400 }
      );
    }

    const priceById = new Map(
      products.map((p) => [p.id as string, Number(p.price) || 0])
    );
    if (ids.some((id) => !priceById.has(id))) {
      return NextResponse.json(
        { success: false, message: "Unknown product in cart" },
        { status: 400 }
      );
    }

    const ngnTotal = expectedOrderTotalNgn(linesForPricing, priceById);
    const rates = await fetchConversionRatesFromNgn();
    const country = payload.pricing_country as PricingCountry;
    const expectedCheckout = approximateCheckoutTotalFromNgn(
      ngnTotal,
      country,
      rates
    );

    if (
      !totalsMatchWithinTolerance(payload.total_amount, expectedCheckout)
    ) {
      return NextResponse.json(
        { success: false, message: "Order total does not match server pricing" },
        { status: 400 }
      );
    }

    const tx_ref = `tx-${randomUUID()}`;
    const productIdsJson = Array.isArray(payload.product_id)
      ? JSON.stringify(payload.product_id)
      : (payload.product_id ??
        JSON.stringify(payload.product_data.map((x) => x.productId)));

    const totalQty = payload.product_data.reduce((a, i) => a + i.quantity, 0);

    /** Prefer service role so RLS on `order_items` / joins to `users` cannot block trusted server writes. */
    const db = createServiceRoleClient() ?? supabase;

    const { data: order, error: orderError } = await db
      .from("orders")
      .insert({
        tx_ref,
        customer_id: user.id,
        customer_name: payload.customer_name,
        customer_email: user.email ?? payload.customer_email ?? "",
        customer_phone: payload.customer_phone ?? null,
        customer_company: payload.customer_company ?? null,
        total_amount: expectedCheckout,
        currency: payload.currency || "NGN",
        status: "pending",
        payment_status: "pending",
        product_id: productIdsJson,
        quantity: String(totalQty),
      })
      .select()
      .single();

    if (orderError) {
      console.error("Create order error FULL:", orderError);
      return NextResponse.json(
        { success: false, message: "Failed to create order" },
        { status: 500 }
      );
    }

    const orderItems = payload.product_data.map((item) => {
      const base = priceById.get(item.productId) ?? 0;
      const lineInput: OrderLinePricingInput = {
        productId: item.productId,
        quantity: item.quantity,
        print_development: item.print_development,
        print_modification: item.print_modification,
        color_variant: item.color_variant,
      };
      const unit = unitPriceFromBaseAndOptions(base, lineInput);
      return {
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: unit,
        line_total: unit * item.quantity,
        color: item.color,
        size: item.size,
        image: item.image,
      };
    });

    const { error: itemsError } = await db.from("order_items").insert(orderItems);

    if (itemsError) {
      console.error("Create order items error:", itemsError);
      await db.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { success: false, message: "Failed to create order items" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
