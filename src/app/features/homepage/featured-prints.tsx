'use client'

import React from 'react'
import PrintImage from '@public/assets/png/print.png'
import PrintCard from '@/components/home-page-card'

function FeaturedPrints () {
  const featuredPrints = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: PrintImage,
    label: 'Print',
    title: `Green ${i + 1}`,
    price: 25000
  }))

  return (
    <section className='my-[100px] px-4'>
      {/* Section Title */}
      <p
        data-aos="fade-down"
        className='md:text-[45px] text-[30px] font-bold md:font-normal text-center leading-[20px] md:leading-[40px]'
      >
        Featured Prints
      </p>

      {/* Subtitle */}
      <p
        data-aos="fade-up"
        data-aos-delay="200"
        className='md:text-xl text-sm font-satoshi font-normal text-[#4E5157] text-center mt-2'
      >
        Curated works handpicked from J.H Textiles collection.
      </p>

      {/* Cards Grid */}
      <div className='mt-[25px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-8 md:gap-6'>
        {featuredPrints.slice(0,6).map((item, index) => (
          <div
            key={item.id}
            data-aos="fade-up"
            data-aos-delay={index * 100} // staggered animation
          >
            <PrintCard
              image={item.image}
              label={item.label}
              title={item.title}
              price={item.price}
              onAddToCart={() => console.log(`Added ${item.title} to cart`)}
              onViewDetails={() => console.log(`Viewing details of ${item.title}`)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedPrints
