/** Payload returned with `success: true` from `GET /api/verify-payment`. */
export type VerifiedOrderSummary = {
  id: number | string;
  tx_ref: string;
  order_number: string | null;
  status: string;
  payment_status: string;
  total_amount: number;
  currency: string;
};
