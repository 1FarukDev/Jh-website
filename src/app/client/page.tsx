import type { Metadata } from "next";
import Client from "./Client";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Clients – Premium Textile Projects | JH Textiles",
  description:
    "Explore the projects, products, and collaborations of JH Textiles with fashion brands and interior designers.",
  alternates: {
    canonical: absoluteUrl("/client"),
  },
  openGraph: {
    title: "JH Textiles Clients & Projects",
    description:
      "Discover the portfolio, client collaborations, and textile products by JH Textiles.",
    url: absoluteUrl("/client"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JH Textiles Clients & Projects",
    description:
      "Discover the portfolio, client collaborations, and textile products by JH Textiles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <Client />;
}
