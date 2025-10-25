"use client";

import React from "react";
import BlogFilters from "./blog-filters";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveLeft, MoveRight } from "lucide-react";
import ClientMessage from "../client/client-message";
import BlogCard from "@/components/blog-card";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/services/api/blog";

function BlogPage() {
  const {
    data: blogsData = [],
    isLoading,
    error,
  } = useQuery<any[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <p className="text-center py-20">Loading blogs...</p>;
  if (error)
    return (
      <p className="text-center py-20 text-red-500">Failed to load blogs</p>
    );

  // Separate featured and regular blogs
  const featuredBlog = blogsData.find((blog) => blog.is_featured);
  const otherBlogs = blogsData.filter((blog) => !blog.is_featured);

  return (
    <section className="py-26">
      <div className="">
        <div
          className="flex flex-col items-center justify-center mb-10"
          data-aos="fade-up"
        >
          <h1 className="text-[30px] text-center md:text-[80px] text-[#230D06] tracking-tight">
            In the Studio & In the Press
          </h1>
          <p className="font-satoshi text-xs text-center md:text-base text-[#4E5157] leading-[20px]">
            Stories from behind the loom, creative thoughts, process journals,
            and moments we've been featured.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <BlogFilters />
        </div>

        {featuredBlog && (
          <div
            className="flex md:flex-row flex-col-reverse justify-between items-start"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="md:w-1/2 p-4 md:p-8" data-aos="fade-right">
              <p className="font-normal text-2xl md:text-[40px] md:leading-[50px]">
                {featuredBlog.title}
              </p>
              <p className="font-normal font-satoshi mt-2 md:mt-5 text-base text-[#4E5157]">
                {featuredBlog.excerpt}
              </p>

              <Button
                className="relative overflow-hidden mt-5 border-black border px-6 sm:px-8 font-satoshi text-xs sm:text-sm 
                                bg-transparent text-black hover:text-white rounded-none py-2 transition-all duration-300 group"
                onClick={() => console.log("Read more:", featuredBlog.id)}
              >
                <span className="relative z-10 flex items-center">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
                <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Button>
            </div>

            <div
              className="md:w-1/2 w-full md:border-l p-4 pb-0 md:p-8 border-[#8A8635]"
              data-aos="fade-left"
            >
              <div className="w-full h-[300px] md:h-[600px] relative">
                <Image
                  src={featuredBlog.image || "/assets/png/blog--image.png"}
                  alt={featuredBlog.title}
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        )}

        <section className="">
          {Array.from({ length: Math.ceil(otherBlogs.length / 2) }).map(
            (_, rowIndex) => {
              const start = rowIndex * 2;
              const end = start + 2;
              const rowItems = otherBlogs.slice(start, end);

              return (
                <div
                  key={`mobile-${rowIndex}`}
                  className="flex border-t border-[#8A8635] md:hidden"
                  data-aos="fade-up"
                  data-aos-delay={rowIndex * 100}
                >
                  {rowItems.map((item, colIndex) => (
                    <div
                      key={item.id}
                      className={`w-1/2 p-4 ${
                        colIndex !== rowItems.length - 1
                          ? "border-r border-[#8A8635]"
                          : ""
                      }`}
                      data-aos="zoom-in"
                      data-aos-delay={colIndex * 100}
                    >
                      <BlogCard
                        image={item.image}
                        title={item.title}
                        description={item.excerept}
                        onReadMore={() => console.log("Read more:", item.id)}
                      />
                    </div>
                  ))}
                </div>
              );
            }
          )}

          {Array.from({ length: Math.ceil(otherBlogs.length / 3) }).map(
            (_, rowIndex) => {
              const start = rowIndex * 3;
              const end = start + 3;
              const rowItems = otherBlogs.slice(start, end);

              return (
                <div
                  key={`desktop-${rowIndex}`}
                  className="hidden md:flex border-t border-[#8A8635]"
                  data-aos="fade-up"
                  data-aos-delay={rowIndex * 200}
                >
                  {rowItems.map((item, colIndex) => (
                    <div
                      key={item.id}
                      className={`w-1/3 p-4 ${
                        colIndex !== rowItems.length - 1
                          ? "border-r border-[#8A8635]"
                          : ""
                      }`}
                      data-aos="zoom-in"
                      data-aos-delay={colIndex * 50}
                    >
                      <BlogCard
                        image={item.image}
                        title={item.title}
                        description={item.excerpt}
                        onReadMore={() => console.log("Read more:", item.id)}
                      />
                    </div>
                  ))}
                </div>
              );
            }
          )}
        </section>

        <div
          className="mt-10 flex justify-between items-center w-full px-4 md:px-[30px]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8">
            <MoveLeft strokeWidth={0.5} />
            Previous
          </Button>
          <Button className="bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8">
            Next
            <MoveRight strokeWidth={0.5} />
          </Button>
        </div>
      </div>

      <ClientMessage />
    </section>
  );
}

export default BlogPage;
