import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact JH Textiles",
  description:
    "Get in touch with JH Textiles for custom textile prints, collaborations, licensing, or general enquiries. We respond to brands, designers, and creatives worldwide.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact JH Textiles",
    description:
      "Reach out for custom prints, licensing, or project enquiries.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
