import type { Metadata } from "next";
import HomePageClient from "./home-page-client";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "JH Textiles – Premium Textile Prints & Surface Patterns",
  description:
    "Browse exclusive surface pattern designs for fashion, interiors, and lifestyle. Nigerian print design studio specialising in production-ready textile files for digital, screen, and jacquard printing.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "JH Textiles – Premium Textile Prints & Patterns",
    description:
      "Premium textile prints and surface patterns for fashion brands and interior designers.",
    url: absoluteUrl("/"),
    type: "website",
  },
};

export default function Home() {
  return <HomePageClient />;
}
