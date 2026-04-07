import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Email Preview",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: absoluteUrl("/preview-emails"),
  },
};

export default function PreviewEmailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
