"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import NewsletterSignup from "@/components/features/homepage/news-letter";
import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, getAdjacentBlogs } from "@/services/api/blog";
import { formatDate } from "@/services/helpers/formatDate";
import BlogImage from "@/app/assets/png/blog.png";

function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: blogDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogBySlug(id),
    enabled: !!id,
  });

  const { data: adjacentBlogs, isLoading: isAdjacentLoading } = useQuery({
    queryKey: ["adjacentBlogs", blogDetails?.id],
    queryFn: () => getAdjacentBlogs(blogDetails!.id),
    enabled: !!blogDetails?.id,
  });

  if (isLoading) {
    return (
      <section className="py-26 pt-30 animate-pulse">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="h-10 md:h-16 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>

        <div className="mt-10 relative w-full max-w-7xl mx-auto h-[400px] md:h-[600px] overflow-hidden rounded-sm bg-gray-200" />

        <div className="max-w-4xl mx-auto mt-[70px] px-4 md:px-0">
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-5/6" />
            <div className="h-5 bg-gray-200 rounded w-4/6" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>

          <div className="mt-20 flex justify-between items-center w-full">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-center py-10">Error loading blog</p>;
  if (!blogDetails) return <p className="text-center py-10">Blog not found</p>;

  const { nextBlog, prevBlog } = adjacentBlogs || {};

  return (
    <section className="py-26 pt-30">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <h1 className="text-[28px] md:text-[64px] font-normal text-center leading-[32px] md:leading-[62px] text-[#230D06]">
          {blogDetails.title}
        </h1>
        <div className="font-satoshi font-normal mt-3">
          <p>
            Published:{" "}
            <span className="font-medium">
              {formatDate(blogDetails.created_at)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-10 relative w-full max-w-7xl mx-auto h-[400px] md:h-[600px] overflow-hidden rounded-sm">
        <Image
          src={blogDetails.image || BlogImage}
          alt={blogDetails.title || "Blog Image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="max-w-4xl mx-auto mt-[70px] px-4 md:px-0">
        {blogDetails.body && (
          <div
            className="prose prose-lg prose-satoshi mx-auto text-[#4E5157]"
            dangerouslySetInnerHTML={{ __html: blogDetails.body }}
          />
        )}

        <div className="mt-20 flex justify-between items-center w-full">
          <Button
            disabled={!prevBlog || isAdjacentLoading}
            onClick={() => prevBlog && router.push(`/blog/${prevBlog.slug}`)}
            className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8 disabled:opacity-50"
          >
            <MoveLeft strokeWidth={0.5} />
            Previous
          </Button>

          <Button
            disabled={!nextBlog || isAdjacentLoading}
            onClick={() => nextBlog && router.push(`/blog/${nextBlog.slug}`)}
            className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8 disabled:opacity-50"
          >
            Next
            <MoveRight strokeWidth={0.5} />
          </Button>
        </div>
      </div>

      <NewsletterSignup />
    </section>
  );
}

export default BlogDetail;
