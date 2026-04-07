import type { Metadata } from "next";
import { getClientById } from "@/services/api/client";
import Details from "./details";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClientById(slug);

  if (!client) {
    return {
      title: "Client Not Found | JH Textiles",
      robots: { index: false },
    };
  }

  return {
    title: client.name,
    description:
      client.description ||
      "Discover this textile project by JH Textiles, showcasing our collaboration with clients and our creative process.",
    alternates: {
      canonical: absoluteUrl(`/client/${client.slug}`),
    },
    openGraph: {
      title: client.name,
      description:
        client.description ||
        "Explore the textile project and client collaboration by JH Textiles.",
      url: absoluteUrl(`/client/${client.slug}`),
      type: "article",
      images:
        client.images?.length > 0
          ? client.images.slice(0, 5).map((img: string) => ({ url: img }))
          : [],
    },
    twitter: {
      card: "summary_large_image",
      title: client.name,
      description:
        client.description ||
        "Explore this textile project by JH Textiles.",
    },
  };
}

export default function Page() {
  return <Details />;
}
