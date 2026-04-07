import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment Status",
  description:
    "Payment confirmation and status for your JH Textiles order.",
  alternates: {
    canonical: absoluteUrl("/payment-status"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PaymentStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
