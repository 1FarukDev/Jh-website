"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogItem {
  title: string;
  description: string;
  image: string;
}

const blogItems: BlogItem[] = [
  {
    title: "A DAY IN J.H TEXTILES' STUDIO",
    description:
      "From the first cup of coffee to the final varnish stroke, here's what a day behind the canvas looks like. Go inside Dara's creative process and see how inspiration becomes print.",
    image: "/assets/png/blog.jpg",
  },
  {
    title: "HOW I TURN STORIES INTO ART",
    description:
      "Every print has a soul — and a story. In this post, I break down how personal memories, cultural roots, and moments of silence shape my visual language.",
    image: "/assets/png/blog.jpg",
  },
  {
    title: "A DAY IN DARA'S STUDIO",
    description:
      "From the first cup of coffee to the final varnish stroke, here's what a day behind the canvas looks like.",
    image: "/assets/png/blog.jpg",
  },
];

export default function Studio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = blogItems.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const currentItem = blogItems[currentIndex];
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section className="my-16 mx-auto md:px-15 px-4">
      <p className="text-2xl sm:text-4xl md:text-5xl lg:text-[60px] font-normal text-center leading-tight md:leading-[40px]">
        In The Studio & In The Press
      </p>
      <p className="text-sm md:text-xl font-satoshi font-normal text-[#4E5157] text-center mt-2 max-w-2xl mx-auto">
        A glimpse behind the canvas stories, thoughts & headlines.
      </p>

      <div className="mt-8 md:mt-12 bg-[#1c1b0b0c] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + "-text"}
            className="md:w-1/2 flex flex-col justify-center"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-[70%] w-full text-center  flex flex-col justify-center mx-auto">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-4 tracking-wide leading-tight">
                {currentItem.title}
              </h2>
              <p className="text-sm sm:text-base font-satoshi mb-6 text-[#4E5157]">
                {currentItem.description}
              </p>

              <Button
                className="relative w-max mx-auto overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
              bg-transparent border-black text-black hover:text-white rounded-none py-2 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
                <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            key={currentIndex + "-image"}
            className="md:w-1/2 relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 px-4 gap-4">
        <button
          onClick={handlePrev}
          className="border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors"
        >
          <Icon icon="guidance:right-arrow" width="20" height="20" />
        </button>

        <div className="flex items-center gap-2">
          {blogItems.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-1 ${
                i === currentIndex
                  ? "bg-[#1C1B0B] w-[50px] rounded-4xl"
                  : "bg-gray-300 w-[10px] rounded-full"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors"
        >
          <Icon icon="guidance:left-arrow" width="20" height="20" />
        </button>
      </div>
    </section>
  );
}
