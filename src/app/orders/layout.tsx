import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Orders",
  description:
    "View order history and status for textile print purchases from JH Textiles.",
  alternates: {
    canonical: absoluteUrl("/orders"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
