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
    <div className="flex w-full gap-6 px-4 items-stretch">
      <div className="flex flex-col w-[30%] gap-2 h-full">
        {images.map((img: string, index: number) => (
          <div
            key={index}
            className={`relative aspect-square cursor-pointer border ${
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

      <div className="flex flex-col flex-1 gap-4 h-full">
        <div className="relative w-full aspect-square bg-white overflow-hidden">
          <Image
            src={selectedPrint}
            alt="Print"
            fill
            className="object-cover"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.2s ease-in-out",
            }}
          />

          <Image
            src={Mockup}
            alt="Mockup"
            fill
            className="object-contain pointer-events-none"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
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
            className="w-[250px] h-[2px] appearance-none rounded-full accent-[#8A8635]"
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

        <p className="text-sm text-center text-gray-600">
          Scale: {scale.toFixed(1)}x
        </p>
      </div>
    </div>
  );
}

export default PrintMockup;
