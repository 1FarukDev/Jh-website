"use client";

import Image from "next/image";
import Hero from "../components/features/homepage/hero-section";
import ClientWork from "../components/features/homepage/client-works";
import FeaturedPrints from "../components/features/homepage/featured-prints";
import Studio from "../components/features/homepage/studio";
import BentoSection from "../components/features/homepage/bento-section";
import ClientMessage from "@/components/features/client/client-message";

export default function Home() {
    return (
        <section className="pb-15">
            <Hero />
            <BentoSection />
            <ClientWork />
            <FeaturedPrints />
            <Studio />
            <ClientMessage />
        </section>
    );
}
