import type { Metadata } from "next";
import ShopPage from "@/components/features/shop/page";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop – Premium Textile Prints & Patterns | JH Textiles",
  description:
    "Explore and purchase premium textile prints, patterns, and designs from JH Textiles for fashion brands and interior designers.",
  alternates: {
    canonical: "https://jh-website-lime.vercel.app/shop",
  },
  openGraph: {
    title: "Shop – JH Textiles",
    description:
      "Browse and purchase premium textile prints and surface patterns from JH Textiles.",
    url: "https://jh-website-lime.vercel.app/shop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop – JH Textiles",
    description:
      "Browse and purchase premium textile prints and surface patterns from JH Textiles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "JH Textiles Shop",
      "url": "https://jh-website-lime.vercel.app/shop",
    }),
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <ShopPage />
    </Suspense>
  );
}
