import type { Metadata } from "next";
import ProductDetail from "./ProductDetail";
import { getProductByIdServer } from "@/services/api/product-server";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdServer(id);

  if (!product) {
    return {
      title: "Product Not Found | JH Textiles",
      robots: { index: false },
    };
  }

  const cleanDescription = product.description
    ? product.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : "Premium textile print available for purchase from JH Textiles.";

  return {
    title: `${product.name} - ${product.tag && product.tag} | JH Textiles`,
    description: cleanDescription,
    alternates: {
      canonical: absoluteUrl(`/shop/${product.id}`),
    },
    openGraph: {
      title: product.name,
      description: cleanDescription,
      url: absoluteUrl(`/shop/${product.id}`),
      type: "website",
      images:
        product.images?.length > 0
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
          url: absoluteUrl("/"),
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
