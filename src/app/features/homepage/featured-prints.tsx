'use client'

import PrintCard from '@/components/print-card'
import React from 'react'
import PrintImage from '@public/assets/png/print.png'

function FeaturedPrints () {
  const featuredPrints = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: PrintImage,
    label: 'Print',
    title: `Green Gradient ${i + 1}`,
    price: 25000
  }))

  return (
    <section className='my-[100px] px-4'>
      <p className='text-[60px] font-normal text-center leading-[40px]'>
        Featured Prints
      </p>
      <p className='text-xl font-satoshi font-normal text-[#4E5157] text-center mt-2'>
        Curated works handpicked from J.H Textiles collection.
      </p>

      <div className='mt-[45px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {featuredPrints.map((item) => (
          <PrintCard
            key={item.id}
            image={item.image}
            label={item.label}
            title={item.title}
            price={item.price}
            onAddToCart={() => console.log(`Added ${item.title} to cart`)}
            onViewDetails={() => console.log(`Viewing details of ${item.title}`)}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedPrints
