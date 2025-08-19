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

function Client() {
    const router = useRouter();
    return (
        <section className="py-26">
            <main className="flex items-start justify-between md:mt-10">
                <Image
                    src={ClientImage}
                    alt="client image"
                    height={600}
                    className="md:block hidden"
                />
                <div className="flex flex-col items-center justify-center mt-10 px-4 md:px-0">
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
                </div>
                <Image
                    src={ClientImage2}
                    alt="client image"
                    height={600}
                    className="md:block hidden"
                />
            </main>
            <div className="md:hidden flex justify-between items-center mt-20 ">
                <Image
                    src={ClientImage}
                    alt="client image"
                    height={300}
                    className=""
                />
                <Image
                    src={ClientImage2}
                    alt="client image"
                    height={300}
                    className=""
                />
            </div>
            <ClientWork />

            <PortfolioRequest />
            <Testimonies />
            <ClientMessage />
        </section>
    );
}

export default Client;
