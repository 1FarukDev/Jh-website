/**
 * Format an amount for emails using ISO 4217 currency (matches the charged currency on the order).
 */
export function formatOrderMoney(amount: number, currencyCode: string): string {
  const code = (currencyCode || "NGN").toUpperCase();
  const n = Number(amount);
  if (Number.isNaN(n)) return `${code} 0`;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    const fallback =
      code === "USD" ? "$" : code === "GBP" ? "£" : code === "NGN" ? "₦" : "";
    return `${fallback}${n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }
}
