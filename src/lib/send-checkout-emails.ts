import { resend } from "@/lib/resend";
import OrderConfirmationEmail from "@/emails/order-confirmation";
import PaymentConfirmationEmail from "@/emails/payment-confirmation";
import { formatOrderMoney } from "@/lib/format-money";

export type OrderConfirmationLineItem = {
  name: string;
  quantity: number;
  lineTotal: string;
  image?: string;
  color?: string;
  size?: string;
};

export async function sendOrderConfirmationEmail(payload: {
  email: string;
  customerName: string;
  orderId: string;
  orderDate: string;
  total: string;
  items: OrderConfirmationLineItem[];
}) {
  return resend.emails.send({
    from: "J.H. Textiles <orders@jesudarahinmikaiye.com>",
    to: payload.email,
    subject: `Order Confirmation #${payload.orderId}`,
    react: OrderConfirmationEmail({
      customerName: payload.customerName,
      orderId: payload.orderId,
      orderDate: payload.orderDate,
      total: payload.total,
      items: payload.items,
    }),
  });
}

export async function sendPaymentConfirmationEmail(payload: {
  email: string;
  customerName: string;
  orderId: string;
  amount: number;
  currency: string;
  transactionId: string;
  paymentDate: string;
  paymentMethod?: string;
}) {
  const paymentAmountDisplay = formatOrderMoney(
    payload.amount,
    payload.currency || "NGN"
  );

  return resend.emails.send({
    from: "J.H. Textiles <payments@jhtextiles.com>",
    to: payload.email,
    subject: `Payment Confirmed - Order #${payload.orderId}`,
    react: PaymentConfirmationEmail({
      customerName: payload.customerName,
      orderId: payload.orderId,
      paymentAmountDisplay,
      transactionId: payload.transactionId,
      paymentDate: payload.paymentDate,
      paymentMethod: payload.paymentMethod,
    }),
  });
}
