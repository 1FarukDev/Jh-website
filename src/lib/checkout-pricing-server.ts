import type { PricingCountry } from "@/types/pricing";

const defaultRates: Record<PricingCountry, number> = {
  NG: 1,
  US: 0.0012,
  GB: 0.00095,
};

export async function fetchConversionRatesFromNgn(): Promise<
  Record<PricingCountry, number>
> {
  const key = process.env.EXCHANGE_RATE_API_KEY;
  if (!key) {
    return { ...defaultRates };
  }
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${key}/latest/NGN`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    if (data?.conversion_rates) {
      return {
        NG: 1,
        US: data.conversion_rates.USD,
        GB: data.conversion_rates.GBP,
      };
    }
  } catch {
    /* use defaults */
  }
  return { ...defaultRates };
}

/** Mirrors client `CurrencyProvider` approximate totals for checkout. */
export function approximateCheckoutTotalFromNgn(
  ngnTotal: number,
  country: PricingCountry,
  rates: Record<PricingCountry, number>
): number {
  if (!ngnTotal || !Number.isFinite(ngnTotal)) return 0;
  const rate = rates[country] ?? 1;
  const converted = ngnTotal * rate;
  switch (country) {
    case "NG":
      return Math.round(converted / 100) * 100;
    case "US":
    case "GB":
      return Math.round(converted);
    default:
      return Math.round(converted);
  }
}

export function totalsMatchWithinTolerance(
  claimed: number,
  expected: number
): boolean {
  if (!Number.isFinite(claimed) || !Number.isFinite(expected)) return false;
  const diff = Math.abs(claimed - expected);
  const slack = Math.max(1, Math.abs(expected) * 0.02);
  return diff <= slack;
}
