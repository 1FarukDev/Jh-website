import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected textile prints and proceed to checkout. Secure payment and commercial licence options at JH Textiles.",
  alternates: {
    canonical: absoluteUrl("/cart"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
