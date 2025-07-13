'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Button } from './ui/button'

type PrintCardProps = {
  image: StaticImageData | string
  label: string
  title: string
  price: string | number
  onAddToCart?: () => void
  onViewDetails?: () => void
}

function PrintCard ({
  image,
  label,
  title,
  price,
  onAddToCart,
  onViewDetails
}: PrintCardProps) {
  return (
    <section className='max-w-[388px]'>
      <Image src={image} alt={`${label} Image`} width={388} />
      <div className='pr-1'>
        <p className='font-satoshi'>{label}</p>
        <div className='flex justify-between items-center'>
          <p>{title}</p>
          <p className='font-satoshi text-medium text-[#2A1407]'>
            {typeof price === 'number' ? `₦${price.toLocaleString()}` : price}
          </p>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <Button
            className='bg-black text-white font-satoshi rounded-none font-normal px-8'
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            className='bg-white border shadow-none border-black text-black font-satoshi rounded-none font-normal px-8'
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PrintCard
