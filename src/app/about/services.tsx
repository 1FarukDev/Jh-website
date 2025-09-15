import React from "react";
import consultationImage from "@/app/assets/webp/consultaion.webp";
import customPrintImage from "@/app/assets/webp/customprints.webp";
import PrintScalingImage from "@/app/assets/webp/rescaling.webp";
import AdjustmentImage from "@/app/assets/webp/adjustment.webp";
import RushImage from "@/app/assets/webp/rushservice.webp";
import IllustrationImage from "@/app/assets/webp/illustration.webp";
import MockupsImage from "@/app/assets/webp/mockups.webp";
import PrintImage from "@/app/assets/webp/development.webp";
import Image from "next/image";

function Services() {
  const services = [
    {
      header: "Consultation",
      subText:
        "Personalized design guidance where we listen to your ideas, review your inspirations, and help shape textiles that reflect your vision with expertise and care.",
      color: "#1C1B0B",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: consultationImage,
    },
    {
      header: "Custom Prints",
      subText:
        "Unique hand-crafted patterns designed exclusively for you, blending tradition and innovation to create fabrics that cannot be found anywhere else.",
      color: "#8A8635",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: customPrintImage,
    },
    {
      header: "Placement Prints",
      subText:
        "Strategically positioned motifs and designs, carefully aligned to garments or products, ensuring each piece tells a story with precision and balance.",
      color: "#E9C892",
      textColor: "#2F281D",
      subTextColor: "#4E5157",
      image: consultationImage,
    },
    {
      header: "Print Rescaling",
      subText:
        "Seamlessly resizing patterns to fit different products, from large-scale installations to smaller accessories, while preserving detail and integrity.",
      color: "#2F281D",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: PrintScalingImage,
    },
    {
      header: "Print Adjustment",
      subText:
        "Fine-tuning existing designs whether it’s refining colors, enhancing details, or altering motifs to achieve a perfect fit for your project.",
      color: "#8A8635",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: AdjustmentImage,
    },
    {
      header: "Rush Service",
      subText:
        "Fast-tracked design and production for projects on tight deadlines, delivering high-quality textiles without compromising on craftsmanship.",
      color: "#230D06",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: RushImage,
    },
    {
      header: "Illustration",
      subText:
        "Hand-drawn or digitally crafted motifs created by our artists, designed to capture emotion, story, and texture that inspire your finished textiles.",
      color: "#683112",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: IllustrationImage,
    },
    {
      header: "Mockups",
      subText:
        "Visual representations of your designs on products, giving you a realistic preview before production begins.",
      color: "#1C1B0B",
      textColor: "white",
      subTextColor: "#CDD1D7",
      image: MockupsImage,
    },
    {
      header: "Print Development",
      subText:
        "A full creative journey from concept sketches to final textiles, where designs evolve through exploration, sampling, and refinement.",
      color: "#F0DAB6",
      textColor: "#230D06",
      subTextColor: "#4E5157",
      image: PrintImage,
    },
  ];

  return (
    <div className="mt-32 " data-aos="fade-up">
      <h1 className="text-[32px] md:text-[60px] text-center">Our Services</h1>
      <p className="md:text-lg text-sm text-[#4E5157] max-w-3xl mx-auto text-center font-satoshi mb-12">
        A creative textile studio crafting meaningful prints, rooted in texture,
        tradition, and storytelling.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {services.map((service, idx) => {
          const isLast = idx === services.length - 1;
          const rowIndex = Math.floor(idx / 2);
          const isOddRow = rowIndex % 2 !== 0;

          if (isLast) {
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row w-full col-span-2"
                style={{ backgroundColor: service.color }}
              >
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <h2
                    className="text-2xl font-normal"
                    style={{ color: service.textColor }}
                  >
                    {service.header}
                  </h2>
                  <p
                    className="text-sm md:text-base leading-relaxed font-satoshi"
                    style={{ color: service.subTextColor }}
                  >
                    {service.subText}
                  </p>
                </div>

                <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
                  <Image
                    src={service.image}
                    alt={service.header}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          }

          // normal alternating layout
          return (
            <div
              key={idx}
              className={`flex flex-col md:flex-row ${
                isOddRow ? "md:flex-row-reverse" : ""
              }`}
              style={{ backgroundColor: service.color }}
            >
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2
                  className="text-2xl font-normal"
                  style={{ color: service.textColor }}
                >
                  {service.header}
                </h2>
                <p
                  className="text-sm md:text-base leading-relaxed font-satoshi"
                  style={{ color: service.subTextColor }}
                >
                  {service.subText}
                </p>
              </div>

              <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
                <Image
                  src={service.image}
                  alt={service.header}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Services;
