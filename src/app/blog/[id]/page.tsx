import type { Metadata } from "next";
import BlogDetail from "./BlogDetail";
import { getBlogBySlug } from "@/services/api/blog";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>; 
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params; 
  const blog = await getBlogBySlug(id);

  if (!blog) {
    return {
      title: "Blog Not Found | JH Textiles",
      robots: { index: false },
    };
  }

  return {
    title: blog.title,
    description:
      blog.excerpt ||
      "Read insights on textile prints, surface pattern design, and creative inspiration from JH Textiles.",
    alternates: {
      canonical: absoluteUrl(`/blog/${blog.slug}`),
    },
    openGraph: {
      title: blog.title,
      description:
        blog.excerpt ||
        "Insights and inspiration from JH Textiles on textile design.",
      url: absoluteUrl(`/blog/${blog.slug}`),
      type: "article",
      publishedTime: blog.created_at,
      authors: ["Jesudara Hinmikaiye"],
      images: blog.image
        ? [{ url: blog.image }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description:
        blog.excerpt ||
        "Insights and inspiration from JH Textiles.",
    },
  };
}

export default function Page() {
  return <BlogDetail />;
}