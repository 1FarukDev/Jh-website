import React from "react";
import ClientProducts from "./client-products";
import ClientMessage from "../../components/features/client/client-message";
import Testimonies from "../../components/features/testimonies/testimonies";
import PortfolioRequest from "../../components/features/client/portfolio-request";

import ClientHero from "./client-hero";

function Client() {
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
