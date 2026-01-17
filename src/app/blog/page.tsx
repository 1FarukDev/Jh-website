import type { Metadata } from "next";
import BlogPage from "@/components/features/blog/page";
import React from "react";

export const metadata: Metadata = {
  title: "Blog – Textile Design Insights & Print Inspiration",
  description:
    "Explore articles on textile design, surface patterns, fashion prints, and creative insights from JH Textiles.",
  alternates: {
    canonical: "https://jh-website-lime.vercel.app/blog",
  },
  openGraph: {
    title: "JH Textiles Blog",
    description:
      "Insights, stories, and inspiration on textile prints and surface pattern design.",
    url: "https://jh-website-lime.vercel.app/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JH Textiles Blog",
    description:
      "Insights, stories, and inspiration on textile prints and surface pattern design.",
  },
};

function Page() {
  return (
    <div>
      <BlogPage />
    </div>
  );
}

export default Page;
