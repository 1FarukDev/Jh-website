"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import StoryImage from "@/app/assets/png/story.png";
import ClientMessage from "../../components/features/client/client-message";
import Profile from "./profile";
import AboutHero from "./about-hero";
import Services from "./services";
import FAQ from "./faqs";
import Modal from "@/components/modal";
import Consultation from "@/components/consultation";

function AboutPage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);  
  return (
    <section className="py">
      <AboutHero />

      <div
        className="max-w-2xl mx-auto mt-10 px-8 md:px-0"
        data-aos="fade-up"
        id="about-section"
      >
        <h1 className="text-[32px] md:text-[60px] text-center">Our Story</h1>
        <p className="text-justify text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[25px] text-[#4E5157]">
          <span className="italic ">
            From the Creative Director - Jesudara Hinmikaiye
          </span>{" "}
          <br /> Creating print designs had always been a passion of mine. J.H.
          Textiles was born out of a lifelong fascination with patterns.
          Inspired by the intricate ankara fabrics and lace worn by women in
          Nigeria, I developed an early interest in understanding how prints
          connect across fabric. Over time, this curiosity grew into a
          professional practice shaped by training in in Hamburg, Germany.
          Today, our studio merges heritage with experimentation, crafting
          prints that are meaningful.
          <br /> Our designs have been trusted by brands such as DLCT
          Contemporary, Meiji Meji, Grapes Pattern Bank, Nyosi Brand, The Lady
          Maker, Akwa Baby, and more.
        </p>
      </div>

      <Profile />

      <Services handleConsultation={() => setShowConsultationModal(!showConsultationModal)}/>
      <FAQ handleConsultation={() => setShowConsultationModal(!showConsultationModal)}/>

      <div data-aos="fade-up border border-red-500">
        <ClientMessage />
      </div>
      <Modal
          className="!w-[60%] md:!max-w-[40vw] no-scrollbar !rounded-md !shadow-sm"
          trigger={""}
          open={showConsultationModal}
          onOpenChange={setShowConsultationModal}
        >
          <Consultation onClose={() => setShowConsultationModal(false)} />
        </Modal>
    </section>
  );
}

export default AboutPage;
