"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import FirstImage from "@/app/assets/webp/filler image 1.webp";
import SecondImage from "@/app/assets/webp/filler image 2.webp";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import { useState } from "react";
import Consultation from "@/components/consultation";

function BentoSection() {
  return (
    <section className="my-12 mx-auto">
      <BlogComponent />
    </section>
  );
}

export default BentoSection;

function BlogComponent() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden h-auto lg:h-[500px] md:px-15 px-4">
        <div className="relative rounded-none bg-[#1c1b0b0c] w-full h-[350px] lg:h-full border  overflow-hidden min-w-0">
          <div className="absolute inset-0 flex flex-col text-black justify-center items-center p-4 sm:p-6 lg:p-8 text-center">
            <div className="max-w-lg">
              <h1 className="text-base text-black sm:text-2xl lg:text-4xl font-light  mb-3 tracking-wide leading-tight">
                Custom Prints to Define Your Vision
              </h1>
              <p className=" text-sm  font-satoshi leading-relaxed mb-4">
                We are a Nigerian textile print design studio specializing in
                exclusive surface patterns. Our services range from bold digital aesthetics and hand-painted watercolour motifs.
                Each print is designed for versatile applications, including
                digital printing, screen printing, jacquard, adire, batik, and
                more. Whatever your medium, our designs can adapt seamlessly.
              </p>
              <Button
                onClick={() => setShowConsultationModal(true)}
                className="relative overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
          bg-black border-white text-white  hover:text-black hover:border-black rounded-none py-2 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  Book a consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
                <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-0 h-auto lg:h-full">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="relative w-full h-[220px] sm:h-[280px] lg:flex-[2] rounded-none overflow-hidden min-w-0"
          >
            <Image
              src={SecondImage}
              alt="Traditional textile patterns"
              fill
              className="object-cover transform transition-transform duration-300 ease-out hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
              <div className="max-w-md">
                <h2 className="text-base sm:text-xl lg:text-2xl font-light text-white mb-2 tracking-wide leading-tight">
                  Where Prints Tell Your Story
                </h2>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-satoshi mb-3">
                  {/* Each design is a timeless story told through texture, colour,
                  and balance . */}
                  Learn more about services we offer...
                </p>
                <Button
                  onClick={() => router.push("/about")}
                  className="relative overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
          bg-transparent border-white text-white hover:text-black rounded-none py-2 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center">
                    About Us
                  </span>
                  <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 min-w-0">
            <div className="relative w-full h-[180px] sm:h-[200px] rounded-none overflow-hidden min-w-0">
              <Image
                src={FirstImage}
                alt="Textile studio workspace"
                fill
                className="object-cover transform transition-transform duration-300 ease-out hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                <div className="max-w-xs" />
              </div>
            </div>
          </div>
          <Modal
            className=""
            trigger={""}
            open={showConsultationModal}
            onOpenChange={setShowConsultationModal}
          >
            <Consultation onClose={() => setShowConsultationModal(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

{
  /* <div
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="relative w-full h-[220px] sm:h-[200px] rounded-none overflow-hidden min-w-0 bg-[#2A1407]"
            >
              <div className="absolute inset-0 flex flex-col justify-center items-center p-3 sm:p-4 text-center">
                <div className="max-w-xs space-y-2">
                  <Image src={OffTag} alt="offtag" width={200} />
                  <Button
                    onClick={() => router.push("/shop")}
                    size="sm"
                    className="border font-satoshi text-xs mt-4 bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none px-4 sm:px-6 py-2 transition-all duration-300"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div> */
}
