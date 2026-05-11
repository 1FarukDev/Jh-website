/** Must stay in sync with `ProductDetail` surcharge constants (amounts in NGN). */
export const ORDER_PRICING_ADDONS = {
  ADDITIONAL_VARIANTS: 74000,
  PRINT_MODIFICATION: 74000,
  PRINT_DEVELOPMENT: 320000,
} as const;

export type OrderLinePricingInput = {
  productId: string;
  quantity: number;
  print_development?: boolean;
  print_modification?: boolean;
  color_variant?: string | null;
};

export function unitPriceFromBaseAndOptions(
  baseUnit: number,
  line: OrderLinePricingInput
): number {
  let unit = baseUnit;
  if (line.print_modification) {
    unit += ORDER_PRICING_ADDONS.PRINT_MODIFICATION;
  }
  if (line.print_development) {
    unit += ORDER_PRICING_ADDONS.PRINT_DEVELOPMENT;
  }
  const variantExtra = Number.parseInt(String(line.color_variant || ""), 10);
  if (Number.isFinite(variantExtra) && variantExtra > 0) {
    unit += ORDER_PRICING_ADDONS.ADDITIONAL_VARIANTS * variantExtra;
  }
  return unit;
}

export function expectedOrderTotalNgn(
  lines: OrderLinePricingInput[],
  priceByProductId: Map<string, number>
): number {
  let total = 0;
  for (const line of lines) {
    const base = priceByProductId.get(line.productId) ?? 0;
    total += unitPriceFromBaseAndOptions(base, line) * line.quantity;
  }
  return total;
}
