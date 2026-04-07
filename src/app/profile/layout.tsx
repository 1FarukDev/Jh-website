import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Profile",
  description:
    "Manage your JH Textiles account details, preferences, and notifications.",
  alternates: {
    canonical: absoluteUrl("/profile"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
