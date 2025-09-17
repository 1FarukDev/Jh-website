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
        "Fine-tuning existing designs whether it's refining colors, enhancing details, or altering motifs to achieve a perfect fit for your project.",
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
    <div className="md:mt-32 mt-20" data-aos="fade-up">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-[32px] sm:text-[40px] md:text-[60px] text-center leading-tight">
          Our Services
        </h1>
        <p className="md:text-lg text-sm sm:text-base text-[#4E5157] max-w-3xl mx-auto text-center font-satoshi mb-8 md:mb-12 px-4">
          A creative textile studio crafting meaningful prints, rooted in texture,
          tradition, and storytelling.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {services.map((service, idx) => {
          const isLast = idx === services.length - 1;
          const rowIndex = Math.floor(idx / 2);
          const isOddRow = rowIndex % 2 !== 0;

          if (isLast) {
            return (
              <div
                key={idx}
                className="flex flex-col lg:flex-row w-full col-span-1 lg:col-span-2"
                style={{ backgroundColor: service.color }}
              >
                {/* Content */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <h2
                    className="text-xl sm:text-2xl lg:text-3xl font-normal mb-3 lg:mb-4"
                    style={{ color: service.textColor }}
                  >
                    {service.header}
                  </h2>
                  <p
                    className="text-sm sm:text-base lg:text-lg leading-relaxed font-satoshi"
                    style={{ color: service.subTextColor }}
                  >
                    {service.subText}
                  </p>
                </div>

                {/* Image */}
                <div className="relative w-full lg:w-1/2 h-[250px] sm:h-[300px] lg:h-[400px] xl:h-[450px] order-1 lg:order-2">
                  <Image
                    src={service.image}
                    alt={service.header}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            );
          }

          // Normal alternating layout (desktop only - mobile stacks consistently)
          return (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row ${
                isOddRow ? "lg:flex-row-reverse" : ""
              }`}
              style={{ backgroundColor: service.color }}
            >
              {/* Content */}
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
              </div>

              {/* Image */}
              <div className="relative w-full lg:w-1/2 h-[320px] sm:h-[350px] lg:h-[350px] xl:h-[400px] order-1 lg:order-none">
                <Image
                  src={service.image}
                  alt={service.header}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx < 2} // Load first two images with priority
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