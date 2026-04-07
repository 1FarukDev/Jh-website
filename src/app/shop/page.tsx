import type { Metadata } from "next";
import ShopPage from "@/components/features/shop/page";
import React, { Suspense } from "react";
import { absoluteUrl } from "@/lib/site";
import { getFilteredProductsServer } from "@/services/api/product-server";

export const metadata: Metadata = {
  title: "Shop – Premium Textile Prints & Patterns | JH Textiles",
  description:
    "Explore and purchase premium textile prints, patterns, and designs from JH Textiles for fashion brands and interior designers.",
  alternates: {
    canonical: absoluteUrl("/shop"),
  },
  openGraph: {
    title: "Shop – JH Textiles",
    description:
      "Browse and purchase premium textile prints and surface patterns from JH Textiles.",
    url: absoluteUrl("/shop"),
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
      name: "JH Textiles Shop",
      url: absoluteUrl("/shop"),
    }),
  },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const category =
    typeof sp.category === "string" ? sp.category : "all";
  const minPrice = typeof sp.minPrice === "string" ? sp.minPrice : "";
  const maxPrice = typeof sp.maxPrice === "string" ? sp.maxPrice : "";
  const type = typeof sp.type === "string" ? sp.type : "";

  const initialProducts = await getFilteredProductsServer({
    category,
    minPrice,
    maxPrice,
    type,
  });

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <ShopPage initialProducts={initialProducts} />
    </Suspense>
  );
}
