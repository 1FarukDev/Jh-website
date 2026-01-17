import type { Metadata } from "next";
import ProductDetail from "./ProductDetail";
import { getProductById } from "@/services/api/product";

type Props = {
  params: Promise<{ id: string }>; // Next.js 15 - params is a Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // Await params before using
  const product = await getProductById(id); // Pass as string (UUID)

  if (!product) {
    return {
      title: "Product Not Found | JH Textiles",
      robots: { index: false },
    };
  }

  // Clean description (strip HTML tags if present)
  const cleanDescription = product.description
    ? product.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : "Premium textile print available for purchase from JH Textiles.";

  return {
    title: `${product.name} – ${product.category} | JH Textiles`,
    description: cleanDescription,
    alternates: {
      canonical: `https://jh-website-lime.vercel.app/shop/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description: cleanDescription,
      url: `https://jh-website-lime.vercel.app/shop/${product.id}`,
      type: "website",
      images: product.images?.length > 0
        ? product.images.slice(0, 5).map((img: string) => ({ url: img }))
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: cleanDescription,
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
        "@type": "Product",
        name: product.name,
        description: cleanDescription,
        image: product.images?.slice(0, 5) || [],
        sku: product.id,
        category: product.category,
        brand: {
          "@type": "Organization",
          name: "JH Textiles",
          url: "https://jh-website-lime.vercel.app",
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "NGN",
          availability: "https://schema.org/InStock",
        },
      }),
    },
  };
}

export default function Page() {
  return <ProductDetail />;
}