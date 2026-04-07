import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Licence Agreement",
  description:
    "Read the JH Textiles licence agreement for ready-to-use textile prints: usage rights, exclusivity, field of use, and commercial terms.",
  alternates: {
    canonical: absoluteUrl("/license"),
  },
  openGraph: {
    title: "Licence Agreement | JH Textiles",
    description:
      "Commercial licence terms for purchasing textile surface pattern designs from JH Textiles.",
    url: absoluteUrl("/license"),
    type: "website",
  },
};

export default function LicenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
