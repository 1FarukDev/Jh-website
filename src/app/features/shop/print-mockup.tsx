import React, { useState } from 'react'
import Print from '@/app/assets/png/print.jpg'
import Mockup from '@/app/assets/png/darashop4.png'
import Image from 'next/image'

function PrintMockup() {
  const [scale, setScale] = useState(1) // Default scale

  // Handle increase/decrease with limits
  const handleIncrease = () => {
    setScale(prev => Math.min(prev + 0.1, 2)) // max = 2
  }
  const handleDecrease = () => {
    setScale(prev => Math.max(prev - 0.1, 0.8)) // min = 0.8
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      {/* Image section */}
      <section className="relative flex flex-col items-center justify-center gap-4 w-full max-w-[400px]">
        {/* Responsive square container */}
        <div
          className="relative bg-white overflow-hidden w-full aspect-square"
        >
          {/* Scalable Print Image */}
          <Image
            src={Print}
            alt="Print"
            className="absolute w-full h-full object-cover"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              transition: 'transform 0.2s ease-in-out'
            }}
          />

          {/* Mockup overlay */}
          <Image
            src={Mockup}
            alt="Mockup"
            className="absolute w-full h-full object-contain pointer-events-none"
          />
        </div>
      </section>

      {/* Slider with + and - buttons */}
      <div className="flex items-center gap-3 w-full justify-center">
        {/* Decrease Button */}
        <button
          onClick={handleDecrease}
          className="px-3 py-[2px] bg-[#8A8635] text-lg text-white  hover:opacity-90"
        >
          –
        </button>

        {/* Custom Slider */}
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
            }%, #e5e7eb ${((scale - 0.8) / (2 - 0.8)) * 100}%, #e5e7eb 100%)`
          }}
        />

        {/* Increase Button */}
        <button
          onClick={handleIncrease}
          className="px-3 py-[2px] bg-[#8A8635] text-lg text-white  hover:opacity-90"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-600">Scale: {scale.toFixed(1)}x</p>
    </div>
  )
}

export default PrintMockup
