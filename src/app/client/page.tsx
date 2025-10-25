"use client";

import React from "react";
import ClientImage from "@/app/assets/png/client-image.png";
import ClientImage2 from "@/app/assets/png/client-image2.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientProducts from "./client-products";
import ClientMessage from "../../components/features/client/client-message";
import Testimonies from "../../components/features/testimonies/testimonies";
import PortfolioRequest from "../../components/features/client/portfolio-request";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ClientBg from "@/app/assets/png/clientbg.png";
import ClientHero from "./client-hero";

function Client() {
  const router = useRouter();

  return (
    <section className="py">
      
      <ClientHero />
     

      <ClientProducts />

      <div data-aos="fade-up" data-aos-delay="200">
        <PortfolioRequest />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <Testimonies />
      </div>

      <div data-aos="fade-up" data-aos-delay="400">
        <ClientMessage />
      </div>
    </section>
  );
}

export default Client;
