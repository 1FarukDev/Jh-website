"use client";

import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import TestimonialCard from "@/components/testimonial-card";

function Testimonies() {
  const testimonials = [
    {
      text: "JH Textile brought a vision to life that we couldn't fully describe — yet somehow, they understood it instinctively. Their sensitivity to color, mastery of texture, and ability to tell stories through fabric and form is truly unmatched.",
      author: "Lara Benson",
      title: "Creative Director at Homebound Studio",
    },
    {
      text: "JH Textile brought a vision to life that we couldn't fully describe — yet somehow, they understood it instinctively. Their sensitivity to color, mastery of texture, and ability to tell stories through fabric and form is truly unmatched.",
      author: "Michael Adeyemi",
      title: "Interior Stylist",
    },
    {
      text: "JH Textile brought a vision to life that we couldn't fully describe — yet somehow, they understood it instinctively. Their sensitivity to color, mastery of texture, and ability to tell stories through fabric and form is truly unmatched.",
      author: "Fatima Bello",
      title: "Design Consultant",
    },
    {
      text: "Every piece felt alive — the texture, the colors, and the story behind it. JH Textile exceeded our expectations in every way.",
      author: "David Okoro",
      title: "Architect",
    },
    {
      text: "Working with JH Textile was seamless. Their attention to detail and dedication to storytelling through textiles is incredible.",
      author: "Aisha Musa",
      title: "Interior Designer",
    },
    {
      text: "Working with JH Textile was seamless. Their attention to detail and dedication to storytelling through textiles is incredible.",
      author: "Aisha Musa",
      title: "Interior Designer",
    },
    {
      text: "Working with JH Textile was seamless. Their attention to detail and dedication to storytelling through textiles is incredible.",
      author: "Aisha Musa",
      title: "Interior Designer",
    },
    {
      text: "Working with JH Textile was seamless. Their attention to detail and dedication to storytelling through textiles is incredible.",
      author: "Aisha Musa",
      title: "Interior Designer",
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleCards = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / visibleCards);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const totalWidth = container.scrollWidth;

    const scrollableWidth = totalWidth - containerWidth;
    const scrollPercentage = scrollLeft / scrollableWidth;
    const pageIndex = Math.round(scrollPercentage * (totalPages - 1));

    setCurrentIndex(Math.max(0, Math.min(pageIndex, totalPages - 1)));
  };

  const scrollToPage = (pageIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const totalWidth = container.scrollWidth;
    const scrollableWidth = totalWidth - containerWidth;

    const targetScroll = (pageIndex / (totalPages - 1)) * scrollableWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToPage(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      scrollToPage(currentIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-15">
      <h1 className="md:text-[60px] text-[28px] md:px-0 px-4 font-light text-center leading-[40px]">
        Words From Our Clients
      </h1>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto scroll-smooth no-scrollbar mt-8 px-4 flex gap-4 items-stretch"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`flex-shrink-0 flex ${
              isMobile ? "w-full" : "w-[calc(33.333%-11px)]"
            }`}
          >
            <TestimonialCard text={t.text} author={t.author} title={t.title} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4 px-4 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`border rounded-full border-black p-3 transition-colors ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
        >
          <Icon icon="guidance:right-arrow" width="20" height="20" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={`h-1 transition-all cursor-pointer ${
                currentIndex === i
                  ? "bg-[#1C1B0B] w-[50px] rounded-2xl"
                  : "bg-gray-300 w-[10px] rounded-full hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === totalPages - 1}
          className={`border rounded-full border-black p-3 transition-colors ${
            currentIndex === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
        >
          <Icon icon="guidance:left-arrow" width="20" height="20" />
        </button>
      </div>
    </div>
  );
}

export default Testimonies;
