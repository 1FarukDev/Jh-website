"use client";

import React, { useState } from "react";
import ClientProducts from "./client-products";
import ClientMessage from "../../components/features/client/client-message";
import Testimonies from "../../components/features/testimonies/testimonies";
import PortfolioRequest from "../../components/features/client/portfolio-request";

import ClientHero from "./client-hero";
import Consultation from "@/components/consultation";
import Modal from "@/components/modal";

function Client() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  return (
    <section className="py">
      <ClientHero />

      <ClientProducts />

      <div data-aos="fade-up" data-aos-delay="200">
        <PortfolioRequest />
      </div>

      <div data-aos="fade-up" data-aos-delay="400">
        <ClientMessage />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <Modal
          className=""
          trigger={""}
          open={showConsultationModal}
          onOpenChange={setShowConsultationModal}
        >
          <Consultation onClose={() => setShowConsultationModal(false)} />
        </Modal>
      </div>
    </section>
  );
}

export default Client;
