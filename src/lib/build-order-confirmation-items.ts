import { formatOrderMoney } from "./format-money";

type DbOrderItem = {
  product_name: string;
  quantity: number;
  line_total: number | string | null;
  image?: string | null;
  color?: string | null;
  size?: string | null;
};

/**
 * Split the charged order total across line items proportionally to stored line_totals
 * (base amounts) so email line totals match the payment currency.
 */
export function buildOrderConfirmationItemsFromOrderItems(
  items: DbOrderItem[],
  totalCharged: number,
  currencyCode: string
): Array<{
  name: string;
  quantity: number;
  lineTotal: string;
  image?: string;
  color?: string;
  size?: string;
}> {
  const rows = items.map((i) => ({
    ...i,
    lineNgn: Number(i.line_total) || 0,
  }));
  const sumNgn = rows.reduce((s, r) => s + r.lineNgn, 0);
  const total = Number(totalCharged);
  const currency = currencyCode || "NGN";

  if (!rows.length || sumNgn <= 0 || Number.isNaN(total)) {
    return rows.map((r) => ({
      name: r.product_name,
      quantity: r.quantity,
      lineTotal: formatOrderMoney(0, currency),
      image: r.image ?? undefined,
      color: r.color ?? undefined,
      size: r.size ?? undefined,
    }));
  }

  let allocated = 0;
  return rows.map((r, idx) => {
    let lineAmount: number;
    if (idx === rows.length - 1) {
      lineAmount = Math.max(0, total - allocated);
    } else {
      lineAmount = Math.round((r.lineNgn / sumNgn) * total * 100) / 100;
      allocated += lineAmount;
    }
    return {
      name: r.product_name,
      quantity: r.quantity,
      lineTotal: formatOrderMoney(lineAmount, currency),
      image: r.image ?? undefined,
      color: r.color ?? undefined,
      size: r.size ?? undefined,
    };
  });
}
