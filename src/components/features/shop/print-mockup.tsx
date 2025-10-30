import React, { useState } from "react";
import Mockup from "@/app/assets/png/darashop4.png";
import Image from "next/image";

interface PrintMockupProps {
  print: string;
  images: string[];
}

function PrintMockup({ print, images }: PrintMockupProps) {
  const [scale, setScale] = useState(1);
  const [selectedPrint, setSelectedPrint] = useState(print);

  const handleIncrease = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const handleDecrease = () => setScale((prev) => Math.max(prev - 0.1, 0.8));

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <div className="flex w-full gap-2">
        {images.map((img: string, index: number) => (
          <div
            key={index}
            className={`relative w-1/2 aspect-3/4 border cursor-pointer ${
              selectedPrint === img ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedPrint(img)}
          >
            <Image
              src={img}
              alt={`Print ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <section className="relative flex flex-col items-center justify-center gap-4 w-full max-w-[400px]">
        <div className="relative bg-white overflow-hidden w-full aspect-square">
          <Image
            src={selectedPrint}
            alt="Print"
            className="absolute w-full h-full object-cover"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease-in-out",
            }}
            width={400}
            height={400}
          />

          <Image
            src={Mockup}
            alt="Mockup"
            className="absolute w-full h-full object-contain pointer-events-none"
          />
        </div>
      </section>

      <div className="flex items-center gap-3 w-full justify-center">
        <button
          onClick={handleDecrease}
          className="px-3 py-[2px] bg-[#8A8635] text-lg text-white hover:opacity-90"
        >
          –
        </button>

        <input
          type="range"
          min="0.8"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="flex-1 max-w-[250px] h-[2px] appearance-none bg-gray-300 rounded-full accent-[#8A8635]"
          style={{
            background: `linear-gradient(to right, #8A8635 0%, #8A8635 ${
              ((scale - 0.8) / (2 - 0.8)) * 100
            }%, #e5e7eb ${((scale - 0.8) / (2 - 0.8)) * 100}%, #e5e7eb 100%)`,
          }}
        />

        <button
          onClick={handleIncrease}
          className="px-3 py-[2px] bg-[#8A8635] text-lg text-white hover:opacity-90"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-600">Scale: {scale.toFixed(1)}x</p>
    </div>
  );
}

export default PrintMockup;
