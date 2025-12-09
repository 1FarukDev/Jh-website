"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import StoryImage from "@/app/assets/png/story.png";
import ClientMessage from "../../components/features/client/client-message";
import Profile from "./profile";
import AboutHero from "./about-hero";
import Services from "./services";
import FAQ from "./faqs";

function AboutPage() {
  return (
    <section className="py">
      <AboutHero />

      <div
        className="max-w-2xl mx-auto mt-10 px-8 md:px-0"
        data-aos="fade-up"
        id="about-section"
      >
        <h1 className="text-[32px] md:text-[60px] text-center">Our Story</h1>
        <p className="text-center text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[25px] text-[#4E5157]">
          From the Creative Director- Jesudara Hinmikaiye Creating print designs
          had always been a passion of mine. J.H. Textiles was born out of a
          lifelong fascination with patterns. Inspired by the intricate ankara
          fabrics and lace worn by women in Nigeria, I developed an early
          interest in understanding how prints connect across fabric. Over time,
          this curiosity grew into a professional practice shaped by training in
        </p>
        <p
          className="text-center text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[25px] text-[#4E5157] my-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          textile design at the University of Lagos and international exchange
          in Hamburg, Germany. Today, our studio merges heritage with
          experimentation, crafting prints that are meaningful.Our designs have
          been trusted by brands such as DLCT Contemporary, Meiji Meji, Grapes
          Pattern Bank, Nyosi Brand, The Lady Maker, Akwa Baby, and more.
        </p>
      </div>

      <Profile />

      <Services />
      <FAQ />
      {/* <div
        className="flex md:flex-row flex-col-reverse  gap-8 mb-32 items-stretch px-8"
        data-aos="fade-up"
      >
        <div
          className="md:w-1/2 w-full px-8 md:px-0 flex flex-col justify-center"
          data-aos="fade-right"
        >
          <h2 className="text-[#230D06] text-[20px] md:text-[64px] text-center font-normal">
            Our Story
          </h2>
          <p className="md:text-center text-lg md:text-[20px] font-satoshi font-normal max-w-3xl leading-[24px] md:leading-[25px] text-[#4E5157]">
            What began as a solo experiment in natural dyes and block printing
            has grown into a full-bodied practice rooted in craftsmanship,
            curiosity, and cultural connection. Over time, JH Textile evolved
            from a small batch of experimental swatches into a thoughtful body
            of work that bridges art and utility — from heirloom-quality prints
            to immersive spatial commissions.
          </p>
          <p
            className="md:text-center text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-[#4E5157] my-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Each piece from JH Textile carries the imprint of the maker’s hands
            and a commitment to process. From sketching and carving to printing
            and finishing, the journey is slow, thoughtful, and deliberate a
            counterbalance to fast production.
          </p>
          <p
            className="md:text-center text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[25px] text-[#4E5157]"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Today, JH Textile remains rooted in that original curiosity,
            exploring the intersection of creativity and craftsmanship with each
            new collection. Every design is more than decoration, it’s an
            invitation to feel, remember, and connect.
          </p>
        </div>

        <div
          className="md:w-1/2 w-full flex"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <Image
            src={StoryImage}
            alt="Story Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}

      <div data-aos="fade-up border border-red-500">
        <ClientMessage />
      </div>
    </section>
  );
}

export default AboutPage;
