import React, { useState } from "react";
import Mockup1 from "@/app/assets/png/darashop4.png";
import Mockup2 from "@/app/assets/png/darashop3.png";
import Mockup3 from "@/app/assets/png/darashop2.png";
import Mockup4 from "@/app/assets/png/darashop1.png";
import Image, { StaticImageData } from "next/image";

interface PrintMockupProps {
  print: string;
  images: string[];
  scale: number;
  onScaleChange: (scale: number) => void;
  mockups?: Array<{
    id: string;
    name: string;
    image: StaticImageData;
  }>;
}

const defaultMockups = [
  { id: "tshirt", name: "T-Shirt", image: Mockup1 },
  { id: "pillow", name: "Pillow", image: Mockup2 },
  { id: "bag", name: "Tote Bag", image: Mockup3 },
  { id: "wallart", name: "Wall Art", image: Mockup4 },
];

function PrintMockup({
  print,
  images,
  scale,
  onScaleChange,
  mockups = defaultMockups,
}: PrintMockupProps) {
  const [selectedPrint, setSelectedPrint] = useState(print);
  const [selectedMockup, setSelectedMockup] = useState(mockups[0]);

  const handleIncrease = () => onScaleChange(Math.min(scale + 0.1, 2));
  const handleDecrease = () => onScaleChange(Math.max(scale - 0.1, 0.8));

  return (
    <div className="flex flex-col w-full gap-6 px-4">
      {/* MAIN LAYOUT — ALWAYS SIDE BY SIDE */}
      <div className="flex w-full gap-4 items-stretch">
        {/* PRINT SELECTOR (LEFT STRIP) */}
        <div className="flex flex-col w-[72px] sm:w-[96px] gap-2 overflow-y-auto">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative aspect-square cursor-pointer border-2 transition-all ${
                selectedPrint === img
                  ? "border-black"
                  : "border-gray-300 hover:border-gray-400"
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

        {/* PREVIEW */}
        <div className="flex flex-col flex-1 gap-4">
          <div className="relative w-full aspect-square overflow-hidden">
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
              src={selectedMockup.image}
              alt={selectedMockup.name}
              fill
              className="object-contain pointer-events-none"
            />
          </div>

          {/* SCALE CONTROLS */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDecrease}
              className="px-3 py-[2px] bg-[#8A8635] text-lg text-white"
            >
              –
            </button>

            <input
              type="range"
              min="0.8"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => onScaleChange(parseFloat(e.target.value))}
              className="w-full max-w-[250px] h-[2px] appearance-none rounded-full accent-[#8A8635]"
              style={{
                background: `linear-gradient(to right, #8A8635 0%, #8A8635 ${
                  ((scale - 0.8) / (2 - 0.8)) * 100
                }%, #e5e7eb ${
                  ((scale - 0.8) / (2 - 0.8)) * 100
                }%, #e5e7eb 100%)`,
              }}
            />

            <button
              onClick={handleIncrease}
              className="px-3 py-[2px] bg-[#8A8635] text-lg text-white"
            >
              +
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Scale: {scale.toFixed(1)}x
          </p>
        </div>
      </div>

      {/* MOCKUP SELECTOR */}
      <div className="w-full border-t pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          View on different products:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {mockups.map((mockup) => (
            <button
              key={mockup.id}
              onClick={() => {
                setSelectedMockup(mockup);
                onScaleChange(1);
              }}
              className={`relative aspect-square border-2 transition-all overflow-hidden group ${
                selectedMockup.id === mockup.id
                  ? "border-[#8A8635] bg-[#8A8635]/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Image
                src={mockup.image}
                alt={mockup.name}
                fill
                className="object-contain p-2"
              />

              <div
                className={`absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center transition-opacity ${
                  selectedMockup.id === mockup.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {mockup.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrintMockup;
