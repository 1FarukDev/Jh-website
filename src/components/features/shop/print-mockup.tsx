"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import MockupHuman from "@/app/assets/png/darashop4.png";

interface PrintMockupProps {
  print: string;
  images: string[];
  scale: number;
  onScaleChange: (scale: number) => void;
}

function PrintMockup({
  print,
  images,
  scale,
  onScaleChange,
}: PrintMockupProps) {
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(
    Math.max(0, images.indexOf(print))
  );

  const [selectedMockup, setSelectedMockup] = useState<{
    id: string;
    name: string;
    image: StaticImageData | string;
  } | null>(null);

  const selectedPattern = images[selectedPatternIndex];

  const handleIncrease = () => onScaleChange(Math.min(scale + 0.1, 3));
  const handleDecrease = () => onScaleChange(Math.max(scale - 0.1, 1));

  const nextPattern = () =>
    setSelectedPatternIndex((i) => (i + 1) % images.length);

  const prevPattern = () =>
    setSelectedPatternIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <div className="flex flex-col w-full gap-6 max-w-[90%] mx-auto">
      <div className="relative w-full aspect-square overflow-hidden bg-white">
        <Image
          src={selectedPattern}
          alt="Pattern preview"
          fill
          priority
          className="transition-transform duration-200 z-10"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            objectFit: "cover",
          }}
        />

        {selectedMockup && (
          <Image
            src={selectedMockup.image}
            alt={selectedMockup.name}
            fill
            className="object-contain pointer-events-none z-20"
          />
        )}

        <button
          onClick={prevPattern}
          className="absolute left-3 top-1/2 -translate-y-1/2
                     w-10 h-10 bg-black/10 hover:bg-black/20
                     text-white text-xl flex items-center justify-center z-30"
        >
          ‹
        </button>

        <button
          onClick={nextPattern}
          className="absolute right-3 top-1/2 -translate-y-1/2
                     w-10 h-10 bg-black/10 hover:bg-black/20
                    text-xl flex items-center justify-center z-30 text-white"
        >
          ›
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 px-4">
        <button
          onClick={handleDecrease}
          className="px-3 py-[2px] bg-[#8A8635] text-lg text-white"
        >
          –
        </button>

        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={scale}
          onChange={(e) => onScaleChange(parseFloat(e.target.value))}
          className="w-full h-[2px] appearance-none rounded-full accent-[#8A8635]"
          style={{
            background: `linear-gradient(to right, #8A8635 0%, #8A8635 ${
              ((scale - 1) / 2) * 100
            }%, #e5e7eb ${((scale - 1) / 2) * 100}%, #e5e7eb 100%)`,
          }}
        />

        <button
          onClick={handleIncrease}
          className="px-3 py-[2px] bg-[#8A8635] text-lg text-white"
        >
          +
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto justify-center px-4 pb-2">
        {images.map((img, index) => (
          <button
            key={`pattern-${index}`}
            onClick={() => {
              setSelectedPatternIndex(index);
              setSelectedMockup(null);
            }}
            className={`relative w-20 aspect-square border-2 shrink-0 ${
              index === selectedPatternIndex && !selectedMockup
                ? "border-[#8A8635]"
                : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Variant ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}

        <button
          onClick={() => {
            setSelectedMockup({
              id: "human",
              name: "On Model",
              image: MockupHuman,
            });
            onScaleChange(1);
          }}
          className={`relative w-20 aspect-square border-2 shrink-0 ${
            selectedMockup?.id === "human"
              ? "border-[#8A8635]"
              : "border-gray-300"
          }`}
        >
          <Image
            src={selectedPattern}
            alt="On Model"
            fill
            className="object-cover"
          />

          <Image
            src={MockupHuman}
            alt="On Model"
            fill
            className="object-contain pointer-events-none"
          />
        </button>
      </div>
    </div>
  );
}

export default PrintMockup;
