import React from "react";
import consultationImage from "@/app/assets/webp/consultation.webp";
import PlacementPrints from "@/app/assets/webp/placement prints- J.webp";
import PrintScalingImage from "@/app/assets/webp/print rescaling-jh textiles.webp";
import RushImage from "@/app/assets/png/Rush-Service--JH-Textiles.jpg";
import PrintingLicence from "@/app/assets/webp/print licensing.webp";
import IllustrationImage from "@/app/assets/webp/hand drawn illustrations.webp";
import MockupsImage from "@/app/assets/webp/mockups.webp";
import PrintImage from "@/app/assets/webp/development.webp";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DaraPrints from "@/app/assets/png/Dara-JH-Textiles--Custom-print-design.jpg";
function Services() {
  const router = useRouter();
  const services = [
    {
      header: "Consultation",
      subText:
        "Personalized design guidance where we listen to your ideas, review your inspirations, and help shape prints that reflect your vision with expertise.",
      color: "#1C1B0B",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: consultationImage,
    },
    {
      header: "Custom Prints",
      subText:
        "Unique hand-crafted patterns designed exclusively for your brand.",
      color: "#8A8635",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: DaraPrints,
    },
    {
      header: "Placement Prints",
      subText:
        "Strategically engineered motifs and designs, carefully aligned to garments or products",
      color: "#E9C892",
      textColor: "#2F281D",
      subTextColor: "#4E5157",
      image: PlacementPrints,
    },
    {
      header: "Print Rescaling",
      subText:
        "Seamlessly resizing patterns for different products, from large-scale designs to small repeats, ensuring consistency across application.",
      color: "#2F281D",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: PrintScalingImage,
    },
    {
      header: "Print Licensing",
      subText:
        "Access to exclusive, ready-made designs tailored to your brand's needs.",
      color: "#8A8635",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: PrintingLicence,
    },
    {
      header: "Rush Service",
      subText:
        "Fast-tracked design for projects on tight deadlines, delivering high-quality prints without compromising on craftsmanship.",
      color: "#230D06",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: RushImage,
    },
    {
      header: "Illustration & Artwork",
      subText:
        "Hand-painted or digitally crafted motifs, artworks, and non-repeats created to meet your brand's needs.",
      color: "#683112",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: IllustrationImage,
    },
    {
      header: "Color Separation",
      subText:
        "Technical expertise to prepare your prints for production across different printing method.",
      color: "#1C1B0B",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: MockupsImage,
    },
    {
      header: "Color Variants",
      subText:
        "Developing new color-ways to match the seasons (Spring/Summer, Autumn/Winter), trends and your brand needs in the moment.",
      color: "#F0DAB6",
      textColor: "#230D06",
      subTextColor: "#4E5157",
      image: PrintImage,
    },
    {
      header: "Print Development",
      subText:
        "Crafting high-quality prints from images or motifs provided by you; developing existing prints into new creative directions.",
      color: "#F0DAB6",
      textColor: "#230D06",
      subTextColor: "#4E5157",
      image: PrintImage,
    },
  ];

  return (
    <div className="md:mt-32 mt-20" data-aos="fade-up">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-[32px] sm:text-[40px] md:text-[60px] text-center leading-tight">
          Our Services
        </h1>
        <p className="md:text-lg text-sm sm:text-base text-[#4E5157] max-w-3xl mx-auto text-center font-satoshi mb-8 md:mb-12 px-4">
          At J.H. Textiles, each print begins with a process—consultation,
          ideation, developing prints and presentation through the use
          traditional and digital mediums.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {services.map((service, idx) => {
          const rowIndex = Math.floor(idx / 2);
          const isOddRow = rowIndex % 2 !== 0;

          return (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row ${
                isOddRow ? "lg:flex-row-reverse" : ""
              }`}
              style={{ backgroundColor: service.color }}
            >
              <div className="w-full lg:w-1/2 px-10 h-[300px] py-8 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center order-2 lg:order-none">
                <h2
                  className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-normal mb-3 lg:mb-4"
                  style={{ color: service.textColor }}
                >
                  {service.header}
                </h2>
                <p
                  className="text-sm sm:text-base lg:text-base xl:text-lg leading-relaxed font-satoshi"
                  style={{ color: service.subTextColor }}
                >
                  {service.subText}
                </p>
                {service.header === "Print Licensing" && (
                  <Button
                    onClick={() => router.push("/shop")}
                    className="mt-4 w-fit rounded-none px-6 py-2 font-satoshi text-sm
      bg-white text-black hover:bg-black hover:text-white transition-colors border"
                  >
                    Shop exclusive prints
                  </Button>
                )}
              </div>

              <div className="relative w-full lg:w-1/2 h-[320px] sm:h-[350px] lg:h-[350px] xl:h-[400px] order-1 lg:order-none">
                <Image
                  src={service.image}
                  alt={service.header}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx < 2}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <Button
          onClick={() => router.push("/shop")}
          className="relative overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
          bg-black border-white text-white  hover:text-shite hover:border-black rounded-none py-2 transition-all duration-300 group"
        >
          <span className="relative z-10 flex items-center">Browse Prints</span>
        </Button>
        <Button
          onClick={() => router.push("/shop")}
          className="relative overflow-hidden border px-5 sm:px-7 font-satoshi text-xs sm:text-sm 
          bg-black border-white text-white  hover:text-white hover:border-black rounded-none py-2 transition-all duration-300 group"
        >
          <span className="relative z-10 flex items-center">
            Book a consultation
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Services;