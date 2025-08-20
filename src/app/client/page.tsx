"use client";

import React from "react";
import ClientImage from "@/app/assets/png/client-image.png";
import ClientImage2 from "@/app/assets/png/client-image2.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientWork from "../features/homepage/client-works";
import ClientMessage from "../features/client/client-message";
import { useRouter } from "next/navigation";
import Testimonies from "../features/testimonies/testimonies";
import PortfolioRequest from "../features/client/portfolio-request";
import { motion } from "framer-motion";

function Client() {
    const router = useRouter();

    return (
        <section className="py-26">
            
            <main className="flex items-start justify-between md:mt-10">
                {/* Left Image - Slide from Left + Bounce */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    viewport={{ once: true }}
                    className="md:block hidden"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Image
                            src={ClientImage}
                            alt="client image"
                            height={600}
                        />
                    </motion.div>
                </motion.div>

                {/* Middle Text - Fade Up */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center mt-10 px-4 md:px-0"
                >
                    <h1 className="text-[40px] md:text-[50px] font-normal text-center leading-tight">
                        Collaborations <br className="hidden md:block" /> Rooted
                        in Creativity
                    </h1>
                    <p className="text-center font-satoshi text-base text-[#4E5157]">
                        From J.H Textile studios to large-scale spaces, we bring
                        textile ideas to life.
                    </p>
                    <Button
                        className="bg-black font-satoshi rounded-none flex justify-center items-center mt-4 h-10"
                        onClick={() => router.push("/shop")}
                    >
                        View Collections
                    </Button>
                </motion.div>

                {/* Right Image - Slide from Top + Bounce */}
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    viewport={{ once: true }}
                    className="md:block hidden"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <Image
                            src={ClientImage2}
                            alt="client image"
                            height={600}
                        />
                    </motion.div>
                </motion.div>
            </main>

           
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="md:hidden flex justify-between items-center mt-20"
            >
                <Image src={ClientImage} alt="client image" height={300} />
                <Image src={ClientImage2} alt="client image" height={300} />
            </motion.div>

            <ClientWork />

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
